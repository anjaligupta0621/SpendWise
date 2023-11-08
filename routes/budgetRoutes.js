const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');

router.post('/addBudget', async (req, res) => {
    const { email, budget } = req.body;
    console.log("Budget Email: ", email);
    console.log("Budget: ", budget);

    try {
        const updateDoc = {
            $set: {
                budget: budget,
            },
        };
    
        const result = await User.updateOne({email}, updateDoc);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          );
        res.status(200).json({ message: 'Budget updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
)

module.exports = router;