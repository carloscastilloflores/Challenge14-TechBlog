const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   router.post('/', withAuth, (req, res) => {  
//     Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       user_id: req.session.user_id
//     })
//       .then(dbPostData => res.json(dbPostData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

router.put('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.update({
        title:req.body.title,
        content: req.body.content, 
        user_id: req.session.user_id
        },
        {
        where: {
            id: req.params.id
        }
       })
       if (!post) {
        res.status(404).json({message: "unable to update post"})
       } else 
       res.status(200).json(post)
    } catch(err){
        res.status(400).json(err)
    }
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
            res.status(404).json({ message: 'No User found with this id 0'}); 
            return;
        }
        res.json(postsData);
    })
    .catch(err => {
        res.status(500).json(err); 
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router; 