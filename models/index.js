const User = require('./User'); 
const Post = require('./Post'); 
const Comment = require('./Comment'); 

// Post belongsTo User
// Post.belongsTo(User, {
//     foreignKey: 'id'
//   });

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    references: {
      table: 'user',
      column: 'id'
    }
  }
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});


// User.belongsToMany(Post, {
//     foreignKey: 'id',
//     through: {
//       model: Post,
//     }
//   });
module.exports = { User , Post, Comment };