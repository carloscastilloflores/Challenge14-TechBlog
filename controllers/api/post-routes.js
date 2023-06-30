const router = require('express').Router();
const { Post, User } = require('../../models');

// Get all posts
router.get('/', (req, res) => {
    Post.findAll({
      include: [User] 
    }).then((postsData) => {
      res.json(postsData);
    })
  });

  //Get a single user by its ID
router.get('/:id', (req, res) => { 
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(postsData => {
        if (!postsData) {
            res.status(404).json({message: 'No post found with this id'}); 
            return; 
        }
    })
    .catch (err => {
        res.status(500).json(err); 
    });
});

router.post('/', (req, res) => {
    Post.create({
        title:req.body.title,
        content: req.body.content
    })
    .then(postsData => res.json(postsData))
    .catch(err => {
        res.status(500).json(err);
    });
});
// Login Route 
// router.post('/login', (req, res)  => {
//     Post.findOne({
//         where: {
//             username: req.body.username 
//         }
//     })
//     .then(userData => {
//         if (!userData) {
//             res.status(400).json({ message: 'Username not Found'});
//             return; 
//         }
//         const validPassword = 
//         userData.checkPassword(req.body.password); 
//         if (!validPassword) {
//             res.status(400).json({ message: 'Incorrect Pasword'}); 
//             return; 
//         }
//         res.json({user: userData, message: 'You are now logged in!'});
//     })
// })

router.put ('/:id', (req, res) => {
    Post.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(postsData => {
        if (!postsData[0]) {
            res.status(404).json({ message: 'No post found with this id'});
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
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postsData => {
        if (!postsData) {
            res.status(404).json({ message: 'No User found with this id'}); 
            return;
        }
        res.json(postsData);
    })
    .catch(err => {
        res.status(500).json(err); 
    });
});

module.exports = router; 