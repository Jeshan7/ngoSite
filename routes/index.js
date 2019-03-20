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
    });

  donate.save(function (err, Donate) {
    if (err)
      return console.log(err);
    else{
      res.send("Done!!!")
    }
  })

  var x = Donate.aggregate([
    {$group: {
      _id: '$books_quantity',
      count: {$sum: 1}
    }
     }
   ], function (err, result) {
      if(err) {
        next(err)
      }else {
        res.send(result)
      }
    })
    //console.log(result)
})

router.get('/feed', (req, res) =>{
   res.render('feed', {})
})

module.exports = router
