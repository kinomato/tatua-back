const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProductSchema = schema({
    _id: { type: String },
    prodName: {
        type: String,
        require: true
    },
    prodPrize: {
        type: String,
        require: true
    },
    prodURL: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

})

const Product = mongoose.model('Product', ProductSchema, 'product')
module.exports = Product