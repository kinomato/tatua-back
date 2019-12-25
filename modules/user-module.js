const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// user model
const User = require('../models/user-model');
const Order = require('../models/order-model');
// const User = mongoose.Schema("User")
// @route POST api/users/register
// @descr dang ky
// @access public
// lấy tổng số document user
router.get("/get/count", (req, res) => {
    User.estimatedDocumentCount((err, count) => {
        if (err)
            return res.status(400).json({ msg: `something gone wrong: ${err}` });
        res.status(200).json(count);
    }).catch(err => console.log('yolo' + err));
})
//get user's info
// const a= [1,2,3];
// const b= [...a,4];
// b = [...b,5];
router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err || data.isDeleted) {
            res.status(400).json({ msg: `something gone wrong: ${err}` })
        }
        res.json(data);
    })
        .catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})

router.get("/:id", (req, res) => {

    // let arrOrder = [];
    // User.findById(req.params.id, (err, user) => {
    //     if (err) throw err;
    //     // lấy mảng orders trong user
    //     const donHangs = user.get('donHangs');
    //     // dùng operator map để truy cập vào từng biến của mảng
    //     return donHangs.map(iddh => {
    //         // tìm đơn hàng thông qua id trong mảng donhangs
    //         return Order.findById(iddh, (err, donHang) => {
    //             if (err) throw err;
    //             // gán mảng được tạo ở trên
    //             arrOrder = [...arrOrder, donHang];
    //         })
    //             .then(() => {
    //                 return res.status(200).json({ user, arrOrder });
    //             })
    //     })
    // });
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(400).json({ msg: `Somethings went wrong: ${err}` })
        }
        res.json(user)

    })
        .catch(err => res.status(400).json({ msg: `something gone wrong: ${err}` }))
})



router.post('/register', (req, res) => {
    const _id = mongoose.Types.ObjectId();
    const { userName, userEmail, userPassword, userPhone } = req.body;
    if (!userName || !userEmail || !userPassword || !userPhone) {
        return res.status(400).json({ msg: 'Vui lòng nhập đầy đủ field' })
    }

    User.findOne({ userEmail }).then(user => {
        if (user) return res.status(400).json({ msg: 'Người dùng đã tồn tại' })
        // const date = Date().now;
        // console.log(date);
        const newUser = new User({
            _id,
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userGender: '',
            userAddress: '',
            userPassword: userPassword,
            priority: 0
        });
        newUser.save().then(user => {
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                        user: {
                            id: user.id,
                            userName: user.userName,
                            userPhone: user.userPhone,
                            userEmail: user.userEmail,
                            userGender: user.userGender,
                            userAddress: user.userAddress,
                            priority: user.priority
                        }
                    })
                }
            )
        })
        // Tạo mã salt & hash dùng bcrypt
        // bcrypt.genSalt(10, (err, salt) => {
        //     if (err) throw err;
        //     bcrypt.hash(newUser.matKhauDangNhap, salt, (err, hash) => {
        //         if (err) throw err;
        //         newUser.matKhauDangNhap = hash;
        //         newUser.save().then(user => {
        //             jwt.sign(
        //                 { id: user.id },
        //                 config.get('jwtSecret'),
        //                 // { expireqIn: 3600},
        //                 (err, token) => {
        //                     if (err) throw err;
        //                     res.status(200).json({
        //                         token,
        //                         user: {
        //                             id: user.id,
        //                             userName: user.userName,
        //                             sdt: user.sdt,
        //                             email: user.email
        //                         }
        //                     })
        //                 }
        //             )
        //         })
        //     })
        // })
    })
})

//Update user
router.put('/update/:id', (req, res) => {
    const { userName, userAddress, userGender, userEmail, userPhone, userPassword } = req.body;
    if (!userName || !userAddress || !userGender || !userEmail || !userPhone || !userPassword) {
        return res.status(400).json({ msg: 'Vui long nhap day du cac field' })
    }
    User.findById(req.params.id, (err, user) => {
        // console.log(toppName)
        user.userName = req.body.userName
        user.userAddress = req.body.userAddress
        user.userGender = req.body.userGender
        user.userEmail = req.body.userEmail
        user.userPhone = req.body.userPhone
        user.userPassword = req.body.userPassword
        user.save().then(user => {
            res.json('object updated successfully: ' + user);
        }).catch(err => {
            res.status(400).send("unable to update data: " + err);
        });
        // if (req.body.toppPrize !== undefined) {
        //     topping.toppPrize = req.body.toppPrize
        // }

    })
})

module.exports = router;