const { request } = require('express');
const express = require('express');

const Service = require('./../../../services/products/service');
const validatorHandler = require('../../../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../../../schemas/products/schema');

const router = express.Router();
const service = new Service();

router.get('/', async (request,response, next) => {
  try {
    const products = await service.find();
    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (request,response, next) => {
  try {
    const { id } = request.params;
    const product = await service.findById(id);
    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'), async (request, response, next) => {
  try {
    const body = request.body;
    const newProduct = await service.create(body);
    response.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (request, response, next) => {
  try {
    const { id } =  request.params;
    const body = request.body;
    const product = await service.update(id, body);
    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (request, response, next) => {
  try{
    const { id } =  request.params;
    const body = request.body;
    const product = await service.update(id, body);
    response.status(200).json(product);
  }catch(error){
    response.status(404).json({
      message: error.message
    });
  }
});

router.delete('/:id', validatorHandler(getProductSchema, 'params'), async (request, response, next) => {
  try {
    const { id } =  request.params;
    const product = await service.delete(id);
    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
