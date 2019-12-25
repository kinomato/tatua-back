const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


const Topping = require('../models/topping-model');
// const User = mongoose.Schema("User")
// @route POST api/users/register
// @descr dang ky
// @access public
// lấy tổng số document user
router.get("/", (req, res) => {
    Topping.find({}, (err, data) => {
        if (err)
            return res.status(400).json({ msg: `lỗi ${err}` });
        res.json(data);
    })
})

//Lấy 1 cái Topping
router.get('/:id', (req, res) => {
    Topping.findById(req.params.id, (err, topping) => {
        if (err) {
            res.status(400).json({ msg: `something gone wrong: ${err}` })
        }
        // console.log(req.params.id);
        res.json(topping);
    }).catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})

//Add topping
router.post('/add', (req, res) => {
    var id = mongoose.Types.ObjectId();
    const { toppName, toppPrize } = req.body;
    console.log(toppName);
    if (toppName === undefined || toppName === '') {
        res.status(400).json({ msg: 'toppName khong duoc de trong' })
    }
    if (toppPrize === undefined || toppPrize === null) {
        res.status(400).json({ msg: 'toppPrize khong duoc de trong' })
    }
    // if (!toppName || !toppPrize || toppName === undefined || toppName === '' || toppPrize === undefined || toppPrize === null) {
    //     res.status(400).json({ msg: 'Cac field khong duoc de trong' })
    // }
    var topp = new Topping({
        _id: id,
        toppName: req.body.toppName,
        toppPrize: req.body.toppPrize,
        isDeleted: false
    });
    topp.save().then(topping => {
        res.status(200).json('object Added successfully: ' + topp);
    }).catch(err => {
        res.status(400).send("unable to add data: " + err);
    });


})

//Edit topping
router.put('/update/:id', (req, res) => {
    const { toppName, toppPrize } = req.body;
    if (!toppName || !toppPrize) {
        return res.status(400).json({ msg: 'Vui long nhap day du cac field' })
    }
    Topping.findById(req.params.id, (err, topping) => {
        // console.log(toppName)
        topping.toppName = req.body.toppName
        topping.toppPrize = req.body.toppPrize
        topping.save().then(topping => {
            res.json('object updated successfully: ' + topping);
        }).catch(err => {
            res.status(400).send("unable to update data: " + err);
        });
        // if (req.body.toppPrize !== undefined) {
        //     topping.toppPrize = req.body.toppPrize
        // }

    })
})
//Delete topping but not real delete :)))
router.put('/delete/:id', (req, res) => {
    const id = req.params.id;
    Topping.findById(id, (err, topping) => {
        if (topping.isDeleted === false) {
            topping.isDeleted = true;
            topping.save().then(topping => {
                res.status(200).json({ msg: 'successfully deleted ' + id })
            }).catch(err => {
                res.status(400).send('delete failed: ' + err)
            })
        }
        else {
            res.status(400).json({ msg: topping.toppName + 'is deleted, please choose another to delete' })
        }
    })
})

//Real delete
router.put('/realDelete/:id', (req, res) => {
    const id = req.params.id;
    Topping.findById(id, (err, topping) => {
        if (id !== null || id !== undefined) {
            console.log(topping._id)
            topping.remove(id);
            topping.save().then(topping => {
                res.status(200).json({ msg: 'successfully deleted ' + id })
            }).catch(err => {
                res.status(400).send('delete failed: ' + err)
            })
        }
    })
})

//Backup
router.put('/backup/:id', (req, res) => {
    const id = req.params.id;
    Topping.findById(id, (err, topping) => {
        if (topping.isDeleted === true) {
            topping.isDeleted = false;
            topping.save().then(topping => {
                res.status(200).json({ msg: 'successfully backup ' + id })
            }).catch(err => {
                res.status(400).send('backup failed: ' + err)
            })
        }
    })
})

module.exports = router;