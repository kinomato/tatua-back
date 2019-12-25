const express = require('express')
const router = express.Router()
const User = require('../models/user-model')

//add a admin
router.post('/add', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user !== null) {

                user.priority = 1;

                user.save()
                    .then(
                        res.status(200).json(user)
                    )
                    .catch(err => {
                        res.status(400).json({ msg: 'Hệ thống gặp lỗi khi lưu thông tin' })
                    })
            }
            else {
                res.status(400).json({ msg: 'Người dùng không tồn tại !' })
            }
        })
        .catch(err => {
            res.status(400).json({ msg: 'Hệ thống gặp lỗi khi thêm admin' })
        })
})

//get list admin
router.get("/", (req, res) => {
    User.find({ isDeleted: false, priority: 1 }, (err, users) => {
        if (err)
            res.status(400).json({ msg: 'Không tìm được dữ liệu' })
        res.status(200).json(users)
    })
})

module.exports = router;