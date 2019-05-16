const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

module.exports = {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send('Invalid email or password');
      }

      const token = user.generateAuthToken();
      res.send(token);
    } catch (err) {
      res.status(500).send('Something went wrong...');
    }
  }
};
