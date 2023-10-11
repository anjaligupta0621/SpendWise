const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');


router.post('/updateIncome', async (req, res) => {
    const { email, fetchedIncome } = req.body;
    console.log("Backend: ", email);
    console.log("Backend: ", fetchedIncome);
    if (!fetchedIncome) {
        return res.status(422).send({error: "Must add income"});
    }
    const user = await User.findOneAndUpdate({email}, {
        $inc: {
            income: parseFloat(fetchedIncome)
        }
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })

})

router.post('/updateExpenses', async (req, res) => {
    const { email, category, expense } = req.body;
    console.log("Backend: ", email);
    console.log("Backend: ", category);
    console.log("Backend: ", expense);
    if (!category) {
        return res.status(422).send({error: "Must add a category"});
    }
    const user = await User.findOneAndUpdate({email}, {
        $inc: {[`expenses.${category}`]: parseFloat(expense)}
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })

})

module.exports = router;