const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OrderSchema = new schema({
    _id: { type: String },
    userId: {type: String},
    // deliveryDate: {
    //     type: Date,
    //     required: true
    // },
    // recievedDate: {
    //     type: Date,
    //     required: true
    // },
    // product: {
    //     type: schema.Types.ObjectId,
    //     ref: 'product'
    // },
    // topp: {
    //     toppName: {
    //         type: String,
    //         require:true
    //     },
    //     toppPrize:{
    //         type:String,
    //         require:true
    //     }
    // },
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    items: [],
    prizeOrigin:{
        type:String,
        require:true
    },
    prizeWithPromo:{
        type:String,
        require:true
    },
    create_time: {
        type: Date
    }
})

const Order = mongoose.model('Order', OrderSchema, 'order');
module.exports = Order;