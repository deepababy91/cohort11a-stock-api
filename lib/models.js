//implementing portfolio and wallet models

const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../lib/db');

class Portfolio extends Model {
    // static classLevelMethod() {
    //     return 'foo';
    // }
    //
    // instanceLevelMethod() {
    //     return 'bar';
    // }
    //
    // getFullname() {
    //     return [this.firstname, this.lastname].join(' ');
    // }
}

Portfolio.init({
    // Model attributes are defined here
    symbol: {
        type: DataTypes.STRING,
        //allowNull: false,
        
          
    },
    quantity: {
        type: DataTypes.INTEGER,
        // allowNull defaults to true
    },
    price: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Portfolio', // We need to choose the model name
});

class Wallet extends Model {
    // static classLevelMethod() {
    //     return 'foo';
    // }
    //
    // instanceLevelMethod() {
    //     return 'bar';
    // }
    //
    // getFullname() {
    //     return [this.firstname, this.lastname].join(' ');
    // }
}

Wallet.init({
    // Model attributes are defined here
    value: {
        type: DataTypes.STRING,
        //allowNull: false,    
    },
    
   
    
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Wallet', // We need to choose the model name
});



sequelize.sync({alter: true});

// NOTE: Code below will drop and recreate the DB again. Please use only in localhost. I have added a condition that checks for localhost before it runs
// if(process.env.BASE_URL.match('localhost')){
//     sequelize.sync({force: true});
// }

module.exports = {
    Portfolio,Wallet
};