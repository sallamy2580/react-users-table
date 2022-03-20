import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserByemail, validatePassword, findOne } from './db';
import fs from 'fs';

passport.serializeUser(function (user, done) {
  // serialize the email into session
  // console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser(function ({ email }, done) {
  // deserialize the email back into user object
  findOne({ email }).then((user) => {
    // console.log('deserializeUser', email, user);
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      console.log('LocalStrategy', email, password);
      // Here you lookup the user in your DB and compare the password/hashed password
      findOne({ email }).then((user) => {
        console.log('LocalStrategy->findOne', email, password);

        // Security-wise, if you hashed the password earlier, you must verify it
        // if (!user || await argon2.verify(user.password, password))
        if (!user || !validatePassword(user, password)) {
          done(null, false, { message: 'Incorrect username or password.' });
        } else {
          done(null, user);
        }
      });
    }
  )
);

export default passport;
