const express = require("express")
const router = express.Router()
var Donate = require('../models/donate')


router.get('/donate', (req, res) => {
  res.render('donate', {})
})

let RES = null;

router.post('/donate',(req,res,next)=>{
  const donate = new Donate({
    books_quantity: req.body.book_count,
    clothes_quantity: req.body.cloth_count,
    stationary_quantity: req.body.stationary_count
    });


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

module.exports = router
