const router = require('express').Router(); 
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const post = await Post.findAll({
            include: {
                model: User, 
                attributes: ['email']}
        });

        const posts = post.map((post) => post.get({ plain:  true}));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch(err){
        res.status(400).json(err)
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const post = await Post.findAll({
        where: {
          user_id: req.session.user_id
        }, 
        include: {
          model: User, 
          attributes: ['email']}
        });
  
      const posts = post.map((postx) => postx.get({ plain: true})); 
  
      res.render('dashboard', {
        posts, 
        loggedIn: req.session.loggedIn
      })
    } catch(err){
      res.json(err)
    }
  });
  
  router.get('/dashboard/new', withAuth ,async (req,res)=>{
    try{
        const post = await Post.findAll({
            where:{
                user_id: req.session.user_id
            },
            include: {
                model: User,
                attributes: ['email']}
        });

        const posts = post.map((postx) => postx.get({ plain: true }));
        
        res.render('new-post', {
            posts,
            loggedIn: req.session.loggedIn 
        })
    } catch(err){
        res.json(err)
    }  
})

router.get('/dashboard/edit/:id', withAuth ,async (req,res)=>{
    try{
        const post = await Post.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ['email']}
            });

        const posts = post.get({ plain: true });


        res.render('edit-post', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch(err){
        res.json(err)
    }  
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/'); 
        return;
    }
    res.render('login');
});

router.get('/post/;id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }, 
        attributes: [
            'id', 
            'title', 
            'content', 
            'date'
        ],
        include: [
            {
                model: Comment, 
                attributes: [
                    'id', 
                    'comment',
                    'post_id',
                    'user_id'
                ],
                include: {
                    model: User, 
                    attributes: ['email']
                }
            }, 
            { 
            model: User, 
            attributes: ['email']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'}); 
            return;
        }
        const post= dbPostData.get({plain: true}); 

        res.render('single-post', {
            post, 
            loggedIn: req.session.loggedIn
        }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});



module.exports = router;