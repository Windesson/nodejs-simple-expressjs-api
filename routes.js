const express = require('express');
const router = express.Router();
let {records} = require('./data');

function asyncHandler(cb){
    return async (req, res, next) => {
        try {
          await cb(req, res, next)
        } catch(err){
          next(err);
        }
    }
}

router.get('/quotes', asyncHandler ((req,res) => {
    res.json(records);
}));

router.get('/quotes/quote/random', asyncHandler ((req,res) => {
    const index = Math.floor(Math.random() * Math.floor(records.length));
    res.json(records[index]);
}));

router.get('/quotes/:id', asyncHandler( (req, res, next) =>  {
    const quote = records.find( quote => quote.id == req.params.id);
    if(quote) res.json(quote);
    res.status(404).json({message: "Quote not found."});
}));

router.post('/quotes', asyncHandler((req, res, next) => {
    const {quote, author} = req.body;
    if(quote && author) {
        const id = Math.floor(Math.random() * Math.floor(100));
        records.push({ id: id, quote:quote , author: author});
        res.status(201).json(records);
    } else {
        res.status(400).json({message: "Bad request."});         
    }
}));

router.put('/quotes/:id', asyncHandler((req, res, next) => {
    const {id} = req.params;
    let index = records.findIndex( quote => quote.id == id); 
    if(index > -1){
      const {quoute, author} = req.body
      if(quoute) records[index].quoute = quoute;
      if(author) records[index].author = author;
      res.status(204).end();
    } else {
      res.status(404).json({message: "Quote not found."});
    }
}));

router.delete('/quotes/:id', asyncHandler((req, res, next) => {
    const {id} = req.params;
    let index = records.findIndex( quote => quote.id == id); 
    if(index > -1) {
        records.splice(index, 1);
        res.status(204).end();
    } else {
       res.status(404).json({message: "Quote not found."});
    }
}));


module.exports = router;
