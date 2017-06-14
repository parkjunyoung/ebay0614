import express from 'express';
import path from 'path';
import db from './models';
import logger from 'morgan';
import bodyParser from 'body-parser';
 
import admin from './routes/admin';

const app = express();
 
let port = 3000;

import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG

// DB authentication
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('DB Sync complete.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
});


// logger
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVE STATIC FILES - REACT PROJECT
app.use('/', express.static( path.join(__dirname, '../public') ));

app.use('/api/admin', admin);

app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
})