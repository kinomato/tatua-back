const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoSchema= new Schema({
    _id:{type:String},
    promoName:  {
        type: String,
        require: true
    },
    desPromo:  {
        type: String,
        require: true
    },
    isDeleted:  {
        type: String,
        default: false
    },
})
const Promo = mongoose.model('Promo',PromoSchema,'promo');
module.exports = Promo;