'use strict';
const server = require('./src/server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB-URI)


server.start(PORT)

