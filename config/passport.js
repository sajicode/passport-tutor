const mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      Users = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, done) => {
  Users.findOne({email})
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, {
          errors: {
            'email or password': 'is invalid'
          }
        });
      }

      return done(null, user);
    }).catch(done);
}));