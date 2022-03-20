import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import passport from '../../lib/passport';

const handler = nextConnect();

handler
  .use(auth)
  .post(
    passport.authenticate('local'),
    (req, res) => {
      req.session.user = req.user;
      res.json({ user: req.user });
    }
  );

export default handler;
