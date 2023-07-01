const router = require('express').Router(); 
const userRoutes = require ('./user-routes'); 
const postRoutes = require ('./post-routes');
const commentsRoutes = require ('./comment-routes');
// post routes 
// comments routes 

router.use('/users', userRoutes); 
router.use('/posts', postRoutes); 

module.exports = router; 


