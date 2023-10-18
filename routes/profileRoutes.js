const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');


router.post('/updateAvatar', async (req, res) => {
    const { email, selectedAvatarIndex } = req.body;
    console.log("Backend Avatar: ", email);
    console.log("Backend Avatar: ", selectedAvatarIndex);
    
    const user = await User.findOneAndUpdate(
        {email}, 
        { avatarIndex: selectedAvatarIndex },
        { new: true }
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })

})


module.exports = router;