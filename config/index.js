module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/blog-app',
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || 'secretKey'
};
