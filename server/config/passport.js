const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {};

module.export = function (passport) {
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.jwtsecret;
  opts.issuer = process.env.jwtissuer;
  opts.audience = process.env.jwtaudience;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }));
}