const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OrderSchema = new schema({
    _id: { type: String },
    user: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    recievedDate: {
        type: Date,
        required: true
    },
    product: {
        type: schema.Types.ObjectId,
        ref: 'product'
    },
    topp: {
        toppName: {
            type: String,
            require:true
        },
        toppPrize:{
            type:String,
            require:true
        }
    },
    prizeOrigin:{
        type:String,
        require:true
    },
    prizeWithPromo:{
        type:String,
        require:true
    }

})

const Order = mongoose.model('Order', OrderSchema, 'order');
module.exports = Order;