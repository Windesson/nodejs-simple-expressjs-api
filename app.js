const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use('/api', routes);

app.use( (req, res, next) => {
    const err = new Error("Not Found");
    next(err);
});

app.use( (err, req, res, next) => {
   res.status(err.status || 500 );
   res.json({
       error: {
           message: err.message
       }
   });
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
