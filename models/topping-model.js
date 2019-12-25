const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ToppingSchema = schema({
    _id: { type: String },
    toppName: {
        type: String,
        require: true
    },
    toppPrize: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        require: true,
        defaut: false
    }
})
const Topping = mongoose.model('Topping', ToppingSchema, 'topping');
module.exports = Topping;