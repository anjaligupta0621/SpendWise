const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true, // no two users can have the same email
        required: true // email is required
    },
    password: {
        type: String,
        required: true // password is required
    },
    income: {
        type: Number,
        default: 0
    },
    expenses: {
        type: Object,
        default: {
            "Car": 0,
            "Transport": 0,
            "Movies": 0,
            "Clothes": 0,
            "Pets": 0,
            "House": 0,
            "Groceries": 0,
            "Health": 0,
            "Toiletries": 0,
            "Eating Out": 0,
            "Sports": 0,
            "Internet": 0,
            "Custom": 0,
        }
    },
    avatarIndex: {
        type: Number,
        default: 0
    },
    totalExpenses: {
        type: Number,
        default: 0
    },
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }

    // 10 is the number of rounds required to generate the salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        })
    })
}

mongoose.model('User', userSchema);