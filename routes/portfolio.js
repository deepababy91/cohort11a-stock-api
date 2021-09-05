var express = require('express');
var router = express.Router();
const {Portfolio,Wallet} = require('../lib/models');
const yahooStockPrices=require('yahoo-stock-prices')


//DELETE-perform DELETE request on http://localhost:3000/api/v1/stocks/:id
//UPDATE-perform PUT request on http://localhost:3000/api/v1/stocks/:id
//CREATE-perform POST request on http://localhost:3000/api/v1/stocks

router.get('/search/:symbol', async function(req,res,next){
//console.log(req.query)
//console.log(req.params)

try{
const data = await yahooStockPrices.getCurrentData(req.params.symbol);
  res.json({success:true, data:data})
}catch(err){
   res.json({success:false, data:{}})
}
console.log(data); // { currency: 'USD', price: 132.05 }
res.json(data)
})

//CREATE
router.post('/', async function(req, res, next) {
    console.log(req.body)
    let stock= await Portfolio.create(req.body)
    //after this point,the purchase has been made
    let currentWallet=await Wallet.findOne({})
    if(currentWallet){
      let currentWalletValue=currentWallet.value;
      let amountSpent=req.body.quantity*req.body.price 
      let newWalletValue=currentWalletValue-amountSpent
    console.log('newWalletvalue', newWalletValue)
    await currentWallet.update({value:newWalletValue})
    }
  res.json(stock);
});
//UPDATE
router.put('/:id', async function(req, res, next) {
   // console.log(req.body)
   // console.log(req.params)
   let stock = await Portfolio.update(req.body, {
        where: {id: req.params.id}
    });
    res.json(stock)
})


router.delete('/:id', async function(req, res, next) {
  let currentStock=await Portfolio.findOne({where:{id:req.params.id}})
  if(currentStock){
    let symbol=currentStock.symbol;
    let quantity=currentStock.quantity;
    const data = await yahooStockPrices.getCurrentData(symbol);
    console.log(data)
    let cashEarnedFromStockSale=parseInt(parseInt(quantity) * data.price)
  
  
  let currentWallet=await Wallet.findOne({})
    if(currentWallet){
      let currentWalletValue=parseInt(currentWallet.value);
      let newWalletValue=currentWalletValue+ cashEarnedFromStockSale
    console.log('newWalletvalue', newWalletValue)
    await currentWallet.update({value:newWalletValue})
    }
  }
  
  let stock=await Portfolio.destroy({where:{id:req.params.id}})
  //update the wallet here 
  res.json(stock);
})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let items=await Portfolio.findAll({})
  console.log('this is the array of portfolio')
  res.json(items)
  //res.send('respond with a stock');
});

module.exports = router;