// imports
const express = require('express');

// creating the app
const app = express();

// ================= app data ===================
const { projects } = require('./data/data.json');

// ======  templating  =======
app.set('views', './views');
app.set('view engine', 'pug');

// ============ static content ==========
app.use('/static', express.static('public'));

// =============== routes =====================
// index
app.get('/', (req, res) => {
	res.render('index', { projects: projects });
});
// about
app.get('/about', (req, res) => {
	res.render('about');
});
// projects
app.get('/projects/:id', (req, res) => {
	res.locals.project = projects.filter((proj) => proj.id === req.params.id)[0];
	res.render('project');
});

// error details button
app.get('/errorDetails', (req, res) => {
	res.render('errorDetails');
});

// ========= error handling ==============
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use((err, req, res, next) => {
	res.locals.error = err;
	console.log('404: Route Not Found');
	res.render('error');
});

// ======= dev server ===============
// setup port number to run via Heroku port but if running locally than it can be run via localhost:3000
app.listen(process.env.PORT || 3000);
