const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    if(!req.body.firstName) {
        return res.status(400).send({
            message: "First name can not be empty"
        });
    }
    if(!req.body.lastName) {
        return res.status(400).send({
            message: "Last name can not be empty"
        });
    }
    if(!req.body.email) { // basic check - should add regex to validate
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    if(!req.body.age) {
        return res.status(400).send({
            message: "Age can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName || "",
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number || ""
    })

    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating User."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users"
        });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
    User.findById(req.params.userId).then(user =>{
        if(!user) {
            return res.status(404).send({
                message: "No user with id " + req.params.userId
            });
        }
        res.send(user)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No user with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.noteId
        });
    });
};

// Update a user with id
exports.update = (req, res) => {
    if(!req.body.firstName) {
        return res.status(400).send({
            message: "First name can not be empty"
        });
    }
    if(!req.body.lastName) {
        return res.status(400).send({
            message: "Last name can not be empty"
        });
    }
    if(!req.body.email) { // basic check - should add regex to validate
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    if(!req.body.age) {
        return res.status(400).send({
            message: "Age can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName || "",
        age: req.body.age,
        email: req.body.email,
        number: req.body.number || "",
        password: req.body.password
    }, {new: true}).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user with id " + req.params.userId
            });
        }
        res.send(user)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No user with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.noteId
        });
    });
};

// Delete a user within req
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.userId).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully"})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No user with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error deleting user with id " + req.params.noteId
        });
    });
};