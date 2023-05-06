const app = require('./app');
const routes = require('./routes');
const port = process.env.port || 4000;

routes(app);

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
