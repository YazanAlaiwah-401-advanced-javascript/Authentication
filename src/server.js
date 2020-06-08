'use strict';
const express = require('express');
const morgan = require('morgan');
const authRouter = require('./auth/router.js');
const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(authRouter);

app.use('*',notFound);
app.use(errorHandler);


module.exports = {
  server:app,
  start:(port)=>{
    app.listen(port,()=>console.log(`Hearing from port ${port}`));
  },
};
