const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');


router.put('/updateProfile', async (req, res) => {
    const { email, selectedAvatarIndex, firstName, lastName } = req.body;
    console.log("Backend Avatar: ", email);
    console.log("Backend Avatar: ", selectedAvatarIndex);
    console.log("Backend Avatar: ", firstName);
    console.log("Backend Avatar: ", lastName);

    try {
        const updateDoc = {
            $set: {
                firstName: firstName,
                lastName: lastName,
                avatarIndex: selectedAvatarIndex,
            },
        };
    
        const result = await User.updateOne({email}, updateDoc);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          );
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
)


module.exports = router;