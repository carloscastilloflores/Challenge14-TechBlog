const sequelize = require('../config/connection');
const { User, Post, Comment  } = require('../models');
//Add Comments
const userData = require('./userData.json');
const postsData = require('./postsData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postsData)
  const comments = await Comment.bulkCreate(commentData)
  process.exit(0);
};

seedDatabase();
