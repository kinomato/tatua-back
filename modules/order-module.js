const express = require('express');
const router = express.Router();
const config = require('config');
const mongoose=require('mongoose');
const Order =require('../models/order-model');

router.get('/listOrder',(err,data)=>{
    
})
router.post('/saveorder',(req,res) => {
    const _id = mongoose.Types.ObjectId();
    const { userId,items,create_time,prizeOrigin,prizeWithPromo, name,email,phone} = req.body;
    console.log(req.body);
    if( !userId || !name || !email || !phone ||  !create_time||!prizeOrigin||!prizeWithPromo){
        res.status(400).json({msg:"missing data"});
    }
    console.log("normal items"+items);
    // const newItems =  JSON.parse(items);
    // console.log("json items"+newItems);
    const newOrderData = new Order ({
        _id,
        userId,
        items,
        name,
        email,
        phone,
        prizeOrigin,
        prizeWithPromo,
        create_time
    })
    newOrderData.save()
    .then(order => {
        res.status(200).json({msg:"success",id:order.id})
    })
    .catch(reason => {
        res.status(400).json({reason});
    })
})
module.exports = router;