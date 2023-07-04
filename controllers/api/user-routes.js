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
// router.get('/:id', (req, res) => { 
//     User.findOne({
//         attributes: { exclude: [''] },
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(userData => {
//         if (!userData) {
//             res.status(404).json({message: 'No User found with this id 1'}); 
//             return; 
//         }
//     })
//     .catch (err => {
//         res.status(500).json(err); 
//     });
// });

// router.post('/', (req, res) => {
//     User.create({
//         username:req.body.username,
//         password: req.body.password
//     })
//     .then(userData => res.json(userData))
//     .catch(err => {
//         res.status(500).json(err);
//     });
// });

//Create a new User 
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            email: req.body.email, 
            password: req.body.password,
    });
    req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json(userData);
    });
    
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
      

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email, 
            },
        });
        
        if(!userData) {
            res.status(400).json({ message: "Incorrect email or password. Please try again!"});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        console.log("Email:", req.body.email)
        console.log("Password:", req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true; 
            res.status(200).json({ email: userData, message: 'You are now logged in!' });
        });
     } catch (err) {
        console.log(err); 
        res.status(500).json(err);
    }
}) ;

//Update 
router.put ('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'No User found with this id 2'});
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
            res.status(404).json({ message: 'No User found with this id 3'}); 
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        res.status(500).json(err); 
    });
});

//Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedin) {

      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router; 