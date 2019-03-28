const express = require("express")
const router = express.Router()
var Donate = require('../models/donate')


router.get('/donate', (req, res) => {
  res.render('donate', {})
})

router.post('/donate',(req,res,next)=>{
  const donate = new Donate({
    books_quantity: req.body.book_count,
    clothes_quantity: req.body.cloth_count,
    stationary_quantity: req.body.stationary_count
  })

  donate.save(function (err, Donate) {
    if (err)
      return console.log(err);
    else{
      res.send("done!!")
      }
    })
  })

router.get('/feed', (req, res) =>{
  Donate.aggregate([{
    $group: {
      _id: '',
      books_quantity: { $sum: '$books_quantity' },
      stationary_quantity: { $sum: '$stationary_quantity' },
      clothes_quantity: { $sum: '$clothes_quantity' }
    }
  }, {
    $project: {
      _id: 0,
      books_quantity: '$books_quantity',
      stationary_quantity: '$stationary_quantity',
      clothes_quantity: '$clothes_quantity'
    }
  }
 ], function (err, result) {
  if(err)
    return next(err)
  else
    res.send(result)
  })
})

router.get('/getitems', (req, res) => {
  res.render('getitems', {})
})

router.post('/getitems', (req, res) => {
  var book_count = parseInt(req.body.book_count);
  var cloth_count = parseInt(req.body.cloth_count);
  var stationary_count = parseInt(req.body.stationary_count);

  // console.log(typeof(book_count))

  Donate.aggregate([{
    $group: {
      _id: '',
      books_quantity: { $sum: '$books_quantity' },
      stationary_quantity: { $sum: '$stationary_quantity' },
      clothes_quantity: { $sum: '$clothes_quantity' }
      // value: { $subtract: ["$books_quantity", "book_count"]}
    }
  }, {
    $project: {
      _id: 0,
      books_quantity: '$books_quantity',
      stationary_quantity: '$stationary_quantity',
      clothes_quantity: '$clothes_quantity'
      // value: '$value'
    }
  }
 ], function (err, result) {
  if(err)
    console.log(err)
  else
    var x = result[0]
    var diff1 = x['books_quantity'] - book_count
    var diff2 = x['stationary_quantity'] - stationary_count
    var diff3 = x['clothes_quantity'] - cloth_count

    res.send({diff1, diff2, diff3});
  })
})

module.exports = router
