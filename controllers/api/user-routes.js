const router = require('express').Router(); 
const { User } = require ('../../models'); 

//Get All users 
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        res.status(500).json(err); 
    });
} );

//Get a single user by its ID
router.get('/:id', (req, res) => { 
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No User found with this id'}); 
            return; 
        }
    })
    .catch (err => {
        res.status(500).json(err); 
    });
});

router.post('/', (req, res) => {
    User.create({
        username:req.body.username,
        password: req.body.password
    })
    .then(userData => res.json(userData))
    .catch(err => {
        res.status(500).json(err);
    });
});
// Login Route 
router.post('/login', (req, res)  => {
    User.findOne({
        where: {
            username: req.body.username 
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'Username not Found'});
            return; 
        }
        const validPassword = 
        userData.checkPassword(req.body.password); 
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Pasword'}); 
            return; 
        }
        res.json({user: userData, message: 'You are now logged in!'});
    })
})

router.put ('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'No User found with this id'});
            return; 
        }
        res.json(userData);
    })
    .catch (err => {
        res.status(500).json(err);
    });
});

//Delete a user by id number 
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No User found with this id'}); 
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err); 
    });
});

module.exports = router; 