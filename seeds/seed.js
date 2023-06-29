const sequelize = require('../config/connection');
const { User, Post  } = require('../models');

const userData = require('./userData.json');
const postsData = require('./postsData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const clients = await Client.bulkCreate(clientData)
  const products = await Product.bulkCreate(productData);
  const sales = await Sale.bulkCreate(saleData)
  const saleProducts = await SaleProduct.bulkCreate(saleProductData)


  process.exit(0);
};

seedDatabase();
