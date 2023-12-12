export default () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
});
