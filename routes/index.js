const express = require('express');

const productsRouterv1 = require('./v1/products/router');
const categoriesRouterv1 = require('./v1/categories/router');
const usersRouterv1 = require('./v1/users/router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouterv1);
  router.use('/categories', categoriesRouterv1);
  router.use('/users', usersRouterv1);
}

module.exports = routerApi;
