const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const index = require('./src/routes/index');

/**
 * Template engine
 */
app.use(express.static('dist'));
app.engine('handlebars', exphbs({ defaultLayout: null }));
app.set('views', 'src/views/');
app.set('view engine', 'handlebars');

/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes
 */
app.use('*', index);

/**
 * Program start
 */
app.listen(3000, () => {
  console.log('Your routes will be running on http://localhost:3000');
});
