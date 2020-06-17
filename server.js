const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

//init Middlewares
app.use(express.json({extended: true}));

//API routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/links', require('./routes/links.route'));
app.use('/t', require('./routes/redirect.route'));

//Connection to database and server
const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }, ()=> console.log('Database connected'));  

    app.listen(PORT, ()=>{
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server error: ${err.message}`);
    process.exit(1);
  }
}

start();

