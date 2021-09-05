//to set the initial cash value of 100000

const {Wallet} = require('../lib/models');
const seedTheDatabase=async ()=>{
    let currentWallet=await Wallet.findAll({})
    if(currentWallet.length==0){
        await Wallet.create({value:100000})
    }
}
seedTheDatabase();