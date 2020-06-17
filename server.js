const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//init Middlewares
app.use(express.json({extended: true}));

//API routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/links', require('./routes/links.route'));
app.use('/t', require('./routes/redirect.route'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

//Connection to database and server
const PORT = process.env.PORT || 8080;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Bexruz:pIxx5QS8SPNm5eLj@cluster0-yjzdx.mongodb.net/linkshorter', {
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

