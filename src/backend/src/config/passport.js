const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const { prisma } = require('./database');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// ============================================
// GOOGLE OAUTH STRATEGY
// ============================================
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const fullName = profile.displayName;
          const googleId = profile.id;
          const photo = profile.photos?.[0]?.value;

          // Check if user exists with this email
          let user = await prisma.user.findUnique({
            where: { email }
          });

          if (user) {
            // Update Google ID if not set
            if (!user.googleId) {
              user = await prisma.user.update({
                where: { id: user.id },
                data: { 
                  googleId,
                  ...(photo && !user.profilePhoto && { profilePhoto: photo })
                },
              });
            }
          } else {
            // Create new user
            user = await prisma.user.create({
              data: {
                email,
                fullName,
                googleId,
                profilePhoto: photo,
                password: '', // No password for SSO users
                role: 'CARWASH_OWNER',
                isActive: true,
              },
            });
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          });

          // Log activity
          await prisma.activityLog.create({
            data: {
              userId: user.id,
              activityType: 'USER_LOGIN',
              description: `User ${user.email} logged in via Google`,
            }
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// ============================================
// APPLE SIGN IN STRATEGY
// ============================================
if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID) {
  const fs = require('fs');
  
  passport.use(
    new AppleStrategy(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyString: fs.existsSync(process.env.APPLE_PRIVATE_KEY_PATH || '')
          ? fs.readFileSync(process.env.APPLE_PRIVATE_KEY_PATH, 'utf8')
          : undefined,
        callbackURL: process.env.APPLE_CALLBACK_URL,
        scope: ['name', 'email'],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, idToken, profile, done) => {
        try {
          const email = profile.email;
          const appleId = profile.id;
          
          // Apple only provides name on first login
          const fullName = profile.name 
            ? `${profile.name.firstName || ''} ${profile.name.lastName || ''}`.trim()
            : email.split('@')[0];

          let user = await prisma.user.findUnique({
            where: { email }
          });

          if (user) {
            if (!user.appleId) {
              user = await prisma.user.update({
                where: { id: user.id },
                data: { appleId },
              });
            }
          } else {
            user = await prisma.user.create({
              data: {
                email,
                fullName,
                appleId,
                password: '',
                role: 'CARWASH_OWNER',
                isActive: true,
              },
            });
          }

          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          });

          await prisma.activityLog.create({
            data: {
              userId: user.id,
              activityType: 'USER_LOGIN',
              description: `User ${user.email} logged in via Apple`,
            }
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// ============================================
// MICROSOFT OAUTH STRATEGY
// ============================================
if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
  passport.use(
    new MicrosoftStrategy(
      {
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: process.env.MICROSOFT_CALLBACK_URL,
        scope: ['user.read'],
        tenant: process.env.MICROSOFT_TENANT || 'common',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const fullName = profile.displayName;
          const microsoftId = profile.id;
          const photo = profile.photos?.[0]?.value;

          let user = await prisma.user.findUnique({
            where: { email }
          });

          if (user) {
            if (!user.microsoftId) {
              user = await prisma.user.update({
                where: { id: user.id },
                data: { 
                  microsoftId,
                  ...(photo && !user.profilePhoto && { profilePhoto: photo })
                },
              });
            }
          } else {
            user = await prisma.user.create({
              data: {
                email,
                fullName,
                microsoftId,
                profilePhoto: photo,
                password: '',
                role: 'CARWASH_OWNER',
                isActive: true,
              },
            });
          }

          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          });

          await prisma.activityLog.create({
            data: {
              userId: user.id,
              activityType: 'USER_LOGIN',
              description: `User ${user.email} logged in via Microsoft`,
            }
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

module.exports = passport;
