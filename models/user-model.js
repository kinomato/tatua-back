const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = schema({
    _id: {
        type: String
    },
    userName: {
        type: String,
        require: true
    },
    userAddress: {
        type: String,
        require: true
    },
    userGender: {
        type: String,
        require: true
    },
    userEmail:{
        type: String,
        require: true
    },
    userPhone: {
        type: String,
        require: true
    },
    // userBirthDay: {
    //     type: Date,
    //     require: false
    // },
    userPassword: {
        type: String,
        require: true
    },
    priority: {
        type: Number,
        require: true
    },
    orders:[
        {
            type:schema.Types.ObjectId,
            ref:'order'
        }
    ]
})

const User = mongoose.model('User', UserSchema, 'user')
module.exports = User