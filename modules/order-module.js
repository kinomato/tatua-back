const express = require('express');
const router = express.Router();
const config = require('config');
const mongoose = require('mongoose');
const Order = require('../models/order-model');

router.get('/', (req, res) => {
    Order.find({}, (err, data) => {
        if (err) {
            res.status(400).json({ msg: `something gone wrong: ${err}` })
        }
        res.json(data);
    })
    .catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})
router.post('/userorder', (req, res) => {
    const { uid } = req.body;
    if (!uid) {
        res.status(400).json({ msg: "user id is required" });
        return;
    }
    Order.find({ userId: uid }, (err, data) => {
        if (err) {
            res.status(400).json({ msg: "can't get order" });
            return;
        }
        res.status(200).json(data)
    }).catch(error => {
        console.log("from order-module userorder" + error)
    })
})
router.post('/saveorder', (req, res) => {
    const _id = mongoose.Types.ObjectId();
    const { userId, items, create_time, prizeOrigin, prizeWithPromo, name, email, phone } = req.body;
    //console.log(req.body);
    if (!userId || !name || !email || !phone || !create_time || !prizeOrigin || !prizeWithPromo) {
        res.status(400).json({ msg: "missing data" });
    }
    //console.log("normal items"+items);
    // const newItems =  JSON.parse(items);
    // console.log("json items"+newItems);
    const newOrderData = new Order({
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
            res.status(200).json({ msg: "success", id: order.id })
        })
        .catch(reason => {
            res.status(400).json({ reason });
        })
})
router.put('/delete/:id', (req, res) => {
    Order.findById(req.params.id, (err, data) => {
        // res.json('object deleted successfull');
        if (!data.isDeleted) {
            data.isDeleted = true; //thay doi isDeleted
            data.save()
                .then(() => {
                    res.json('object deleted successfull');
                })
                .catch(err => {
                    res.status(400).json({error:err});
                });
        }
        res.json('object already deleted');
    })
});
module.exports = router;