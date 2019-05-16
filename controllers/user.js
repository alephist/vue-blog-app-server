const { validateUser, User } = require('../models/user');

module.exports = {
  async registerUser(req, res) {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      const { username, email, password } = req.body;

      let isRegistered = await User.findOne({ email });
      if (isRegistered) {
        return res.status(400).send('Email is already registered');
      }

      let user = await User.create({ username, email, password });
      let token = user.generateAuthToken();

      res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send('Registration successful!');
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  }
};
