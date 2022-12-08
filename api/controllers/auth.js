const router = require('express').Router();
const { User } = require('../models');
const passport = require('../middlewares/authentication');


router.post('/signup', (req, res) => {
    console.log('POST body: ', req.body);
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    .then((user) => {
        req.login(user, () => res.status(201).json(user));
    })
    .catch((err) => {
        res.status(400).json({msg: 'Failed Signup', err });
    });
});

router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        res.json(req.user);
    });

router.get('/login', (req,res) => {
    if(req.user) {
        res.json(req.user)
    }
    else{
        res.sendStatus(401);
    }
})

router.post("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logout successful" });
    });
  });

module.exports = router;