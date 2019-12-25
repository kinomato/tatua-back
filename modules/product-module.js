const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');

//Lấy 1 cái Product
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.status(400).json({ msg: `something gone wrong: ${err}` })
        }
        // console.log(req.params.id);
        res.json(product);
    }).catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})

//lấy hết Product
router.get('/', (req, res) => {
    Product.find({}, (err, data) => {
        if (err || data.isDeleted) {
            res.status(400).json({ msg: `something gone wrong: ${err}` })
        }
        res.json(data);
    })
        .catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})



//Edit 1 product
router.put('/update/:id', (req, res) => {
    console.log(req.body)
    Product.findById(req.params.id, (err, product) => {
        if (req.body.prodName !== undefined) {
            console.log(req.body.prodName)
            product.prodName = req.body.prodName
        }

        if (req.body.prodPrize !== undefined) {
            console.log(req.body.prodPrize)
            product.prodPrize = req.body.prodPrize
        }
        if (req.body.prodURL !== undefined) {
            product.prodURL = req.body.prodURL
        }
        product.save().then(product => {
            res.json('object updated successfully: ' + product);
        }).catch(err => {
            res.status(400).send("unable to update data: " + err);
        })

    })
})

//Có thể là delete :))
router.put('/delete/:id', (req, res) => {
    Product.findById(req.params.id, (err, data) => {
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