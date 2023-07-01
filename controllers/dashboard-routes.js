const router = require('express').Router(); 
const sequelize =require('../config/connection');
const withAuth = require('../utils/helpers');
const { Post, User, Comment } = require('../models');


router.get('/login', async (req,res)=>{   
    try{
        res.render('login');
    } catch(err){
        res.status(400).json(err)
    }
})

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
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date'], 
                include: {
                    model: User, 
                    attributes: ['username']
                }
            }, 
            {
                model: User, 
                attributes: ['username']
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
module.exports = router;
