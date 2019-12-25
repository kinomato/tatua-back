const express = require('express');
const router = express.Router();
const Promo = require('../models/promo-model');
const mongoose = require('mongoose')

//Lấy 1 cái Promo
router.get('/:id', (req, res) => {
    Promo.findById(req.params.id, (err, Promo) => {
        if (err) {
            res.status(400).json({ msg: `something gone wrong: ${err}` })
        }
        // console.log(req.params.id);
        res.json(Promo);
    }).catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})

//lấy hết Promo
router.get('/', (req, res) => {
    Promo.find({}, (err, data) => {
        if (err || data.isDeleted) {
            res.status(400).json({ msg: `something gone wrong: ${err}` })
        }
        res.json(data);
    })
        .catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})
//update
router.put('/update/:id', (req, res) => {
    Promo.findById(req.params.id, (err, promo) => {
        if (req.body.promoName !== undefined) {
            promo.promoName = req.body.promoName
        }

        if (req.body.desPromo !== undefined) {
            promo.desPromo = req.body.desPromo
        }
        promo.save().then(promos => {
            res.json('object updated successfully: ' + promos);
        }).catch(err => {
            res.status(400).send("unable to update data: " + err);
        })

    })
})
//add promo
router.post('/add', (req, res) => {
    var id = mongoose.Types.ObjectId();
    const { promoName, desPromo } = req.body;
    // console.log(promo);
    if (promoName === undefined || promoName === '') {
        res.status(400).json({ msg: 'promo khong duoc de trong' })
    }
    if (desPromo === undefined || desPromo === null) {
        res.status(400).json({ msg: 'despromo khong duoc de trong' })
    }
    var pro = new Promo({
        _id: id,
        promoName: req.body.promoName,
        desPromo: req.body.promoPrize,
        isDeleted: false
    });
    pro.save().then(topping => {
        res.status(200).json('object Added successfully: ' + pro);
    }).catch(err => {
        res.status(400).send("unable to add data: " + err);
    });


})
//delete ảo :))
router.put('/delete/:id', (req, res) => {
    Promo.findById(req.params.id, (err, promo) => {
        promo.isDeleted = true;
        promo.save().then(() => {
            res.json('Delete promo is successful');
        }).catch(err => {
            res.status(400).send("err" + err);
        });

    })
})
module.exports = router;