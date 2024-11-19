const { request } = require('express');
const express = require('express');

const router = express.Router();

router.get('/:category_id/products/:product_id', (request, response) => {
  const { category_id } = request.params;
  const { product_id } = request.params;
  response.json({
    category_id,
    product_id
  });
});

module.exports = router;
