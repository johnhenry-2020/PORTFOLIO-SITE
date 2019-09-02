/* =============
  dependencies
================*/
const express = require('express');
const projects = require('./data.json');

const app = express();
/* ===========
  middleware
==============*/
app.set('views', './views');
// set view engine to pug
app.set('view engine', 'pug');
// static route and the express.static method serving the static files located in the public folder
app.use('/static', express.static('public'));

/* =======
  routes
==========*/
// index route, renders the "Home" page with the locals set to data.projects
app.get('/', (req, res) => {
	res.render('index', { projects: projects });
});
// about route, renders the "About" page
app.get('/about', (req, res) => {
	res.render('about');
});
// projects routes, dynamic "project" routes based on the id of the project
app.get('/projects', (req, res) => {
	res.render('project');
});

// =========
// server
// =========
app.listen(3000, () => console.log('Local Host: Port 3000'));
