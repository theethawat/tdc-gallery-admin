import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/User';

passport.use(
  new LocalStrategy((username, password, done) => {
    UserModel.findOne({ username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect Username' });
        }
        if (!user.validPassword(password, user)) {
          return done(null, false, { message: 'Incorrect Password' });
        }
        return done(null, user.toJSON());
      })
      .catch((err) => done(err));
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
