'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express()




module.exports = {
    server:app,
    start:(port)=>{
      app.listen(port=>console.log(`Hearing from port ${port}`))
    }
}
