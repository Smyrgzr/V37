const AWS = require('aws-sdk');
const {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} = require('amazon-cognito-identity-js');

// Configure AWS Cognito
const cognitoConfig = {
  region: process.env.AWS_COGNITO_REGION || process.env.AWS_REGION,
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
};

// Cognito Identity Service Provider
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: cognitoConfig.region,
});

// User Pool
const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.clientId,
});

// ============================================
// COGNITO HELPER FUNCTIONS
// ============================================

/**
 * Sign up new user with Cognito
 */
const cognitoSignUp = async ({ email, password, fullName, phone }) => {
  const attributeList = [];

  if (email) {
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
  }

  if (fullName) {
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'name',
        Value: fullName,
      })
    );
  }

  if (phone) {
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phone,
      })
    );
  }

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.user);
      }
    });
  });
};

/**
 * Confirm user email with verification code
 */
const cognitoConfirmSignUp = async (email, code) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Sign in user with Cognito
 */
const cognitoSignIn = async (email, password) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * Get user attributes from Cognito
 */
const cognitoGetUser = async (accessToken) => {
  const params = {
    AccessToken: accessToken,
  };

  try {
    const result = await cognitoIdentityServiceProvider.getUser(params).promise();
    
    const attributes = {};
    result.UserAttributes.forEach((attr) => {
      attributes[attr.Name] = attr.Value;
    });

    return {
      username: result.Username,
      email: attributes.email,
      emailVerified: attributes.email_verified === 'true',
      fullName: attributes.name,
      phone: attributes.phone_number,
      ...attributes,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Refresh access token
 */
const cognitoRefreshToken = async (email, refreshToken) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  const RefreshToken = new CognitoRefreshToken({ RefreshToken: refreshToken });

  return new Promise((resolve, reject) => {
    cognitoUser.refreshSession(RefreshToken, (err, session) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
        });
      }
    });
  });
};

/**
 * Sign out user
 */
const cognitoSignOut = async (accessToken) => {
  const params = {
    AccessToken: accessToken,
  };

  try {
    await cognitoIdentityServiceProvider.globalSignOut(params).promise();
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Forgot password - send verification code
 */
const cognitoForgotPassword = async (email) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * Reset password with verification code
 */
const cognitoResetPassword = async (email, code, newPassword) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        resolve(true);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * Admin create user
 */
const cognitoAdminCreateUser = async ({ email, password, fullName, phone, role }) => {
  const params = {
    UserPoolId: cognitoConfig.userPoolId,
    Username: email,
    TemporaryPassword: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'true' },
      ...(fullName ? [{ Name: 'name', Value: fullName }] : []),
      ...(phone ? [{ Name: 'phone_number', Value: phone }] : []),
      ...(role ? [{ Name: 'custom:role', Value: role }] : []),
    ],
    MessageAction: 'SUPPRESS', // Don't send welcome email
  };

  try {
    const result = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
    return result.User;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify Cognito JWT token
 */
const verifyCognitoToken = async (token) => {
  const params = {
    AccessToken: token,
  };

  try {
    const user = await cognitoIdentityServiceProvider.getUser(params).promise();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  userPool,
  cognitoConfig,
  cognitoSignUp,
  cognitoConfirmSignUp,
  cognitoSignIn,
  cognitoGetUser,
  cognitoRefreshToken,
  cognitoSignOut,
  cognitoForgotPassword,
  cognitoResetPassword,
  cognitoAdminCreateUser,
  verifyCognitoToken,
};
