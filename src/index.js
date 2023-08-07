require('dotenv').config();
const app = require('./app');

const main = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

main().catch(e => {
  console.log('Unhandled error:', e);
  process.exit(1);
});
