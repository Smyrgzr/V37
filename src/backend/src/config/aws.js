const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// S3 Client for file uploads
const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION || process.env.AWS_REGION,
  signatureVersion: 'v4',
});

// SES Client for emails
const ses = new AWS.SES({
  region: process.env.AWS_SES_REGION || process.env.AWS_REGION,
});

// SNS Client for SMS
const sns = new AWS.SNS({
  region: process.env.AWS_SNS_REGION || process.env.AWS_REGION,
});

// S3 Helper Functions
const uploadToS3 = async (file, folder = 'uploads') => {
  const key = `${folder}/${Date.now()}-${file.originalname}`;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const result = await s3.upload(params).promise();
    return {
      url: result.Location,
      key: result.Key,
      bucket: result.Bucket,
    };
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('File upload failed');
  }
};

const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error('S3 Delete Error:', error);
    throw new Error('File deletion failed');
  }
};

const getSignedUrl = (key, expiresIn = 3600) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Expires: expiresIn,
  };

  return s3.getSignedUrl('getObject', params);
};

// SES Helper Functions
const sendEmail = async ({ to, subject, html, text }) => {
  const params = {
    Source: process.env.AWS_SES_FROM_EMAIL,
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: html,
          Charset: 'UTF-8',
        },
        ...(text && {
          Text: {
            Data: text,
            Charset: 'UTF-8',
          },
        }),
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    return result.MessageId;
  } catch (error) {
    console.error('SES Send Email Error:', error);
    throw new Error('Email sending failed');
  }
};

// SNS Helper Functions
const sendSMS = async (phoneNumber, message) => {
  const params = {
    PhoneNumber: phoneNumber,
    Message: message,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional',
      },
    },
  };

  try {
    const result = await sns.publish(params).promise();
    return result.MessageId;
  } catch (error) {
    console.error('SNS Send SMS Error:', error);
    throw new Error('SMS sending failed');
  }
};

module.exports = {
  s3,
  ses,
  sns,
  uploadToS3,
  deleteFromS3,
  getSignedUrl,
  sendEmail,
  sendSMS,
};
