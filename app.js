const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const logger = require('morgan');

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

const dbUrl = process.env.DATABASE;
const host = process.env.HOST;
const options = {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://${host}/${dbUrl}`,
  options
)
.then(() => {
	app.listen(PORT, function () {
		console.log('Node server is running...');
		console.log('Listening on port:', PORT);
	});
})
.catch((err) => {
	handleError(err);
});


