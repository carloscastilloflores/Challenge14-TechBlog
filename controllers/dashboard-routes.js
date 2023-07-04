const router = require('express').Router(); 
const withAuth = require('../utils/helpers');
const { Post, User, Comment } = require('../models');


router.get('/login', async (req,res)=>{   
    try{
        res.render('login');
    } catch(err){
        res.status(400).json(err)
    }
})

router.get('/dashboard', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.user_id
        //        user_id: req.session.user_id
      },
      attributes: ['id', 'title', 'content', 'date'],
      order: [['date', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['email']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['email']
          }
        }
      ]
    })
    .then(dbPostData => {
      //serialize the data before passing to the template
      const post = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard',);
    //   res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  

  router.get('/', (req, res) => {
      Post.findAll({
          attributes: [
              'id',
              'title', 
              'content', 
              'date'
          ],
          include: [
              {
                  model: Comment, 
                  attributes: ['id', 'comment_text', 'post_id', 'user_id',], 
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
          const posts = dbPostData.map(post => post.get({ plain:true })); 
          res.render('homepage', {
              posts, 
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });
//Get posts from user 
router.get('/new', (req, res) => {
    res.render('new-post');
  });

module.exports = router;


