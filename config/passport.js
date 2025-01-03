
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import * as authModel from '../models/authModel.js';
//Google strategy Login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleUserId = profile.id;
        const userName = profile.displayName;
        const userEmail = profile.emails[0].value;

        // Check if the user exists in the database
        let user = await authModel.findByGoogleId(googleUserId);

        if (user) {
          // User exists
          return done(null, user);
        } else {
          // Insert a new user
          const newUser = {
            google_id: googleUserId,
            name: userName,
            email: userEmail,
            user_type: 0, // Default user type
          };

          const userId = await authModel.insertUser(newUser);
          newUser.id = userId; // Attach the generated ID
          return done(null, newUser);
        }
      } catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error, null);
      }
    }
  )
);

//Github strategy login
passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const githubUserId = profile.id; // GitHub's unique user ID
          const userName = profile.displayName || profile.username; // Use display name or username
          const userEmail = profile.emails && profile.emails[0] ? profile.emails[0].value : null; // GitHub emails may not always be available
  
          // Check if the user exists in the database
          let user = await authModel.findByGithubId(githubUserId); // Updated method to reflect GitHub-specific logic
  
          if (user) {
            // User exists
            return done(null, user);
          } else {
            // Insert a new user
            const newUser = {
              google_id: githubUserId, // Save GitHub-specific ID
              name: userName,
              email: userEmail,
              user_type: 0, // Default user type
            };
  
            const userId = await authModel.insertUser(newUser);
            newUser.id = userId; // Attach the generated ID
            return done(null, newUser);
          }
        } catch (error) {
          console.error("GitHub OAuth Error:", error);
          return done(error, null);
        }
      }
    )
  );
  

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID in the session
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await authModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
