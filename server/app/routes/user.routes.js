module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // create a user in db
    app.post('/users', users.create);

    // return all users in db
    app.get('/users', users.findAll);

    // return user with id
    app.get('/users/:userId', users.findOne);

    // update a user at id
    app.put('/users/:userId', users.update);

    // delete a given user with id
    app.delete('/users/:userId', users.delete);
}