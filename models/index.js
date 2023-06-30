const User = require('./User'); 
const Post = require('./Post'); 

// Post belongsTo User
// Post.belongsTo(User, {
//     foreignKey: 'id'
//   });

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// User.belongsToMany(Post, {
//     foreignKey: 'id',
//     through: {
//       model: Post,
//     }
//   });
module.exports = { User , Post };