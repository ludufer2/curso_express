const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class Service{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for(let i = 0;i<limit;i++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newProduct = {
            id: faker.string.uuid(),
            ...data
          };
          this.products.push(newProduct);
          resolve(newProduct);
        } catch (error) {
          reject(error);
        }
      },2000);
    });
  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(this.products);
        } catch (error) {
          reject(error);
        }
      },2000);
    });
  }

  async findById(id){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const product = this.products.find(item => item.id === id);
          if(!product){
            throw boom.notFound('Product not found');
          }
          if(product.isBlock){
            throw boom.conflict('Product is block');
          }
          resolve(product);
        } catch (error) {
          reject(error);
        }
      },2000);
    });
  }

  async update(id, changes){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = this.products.findIndex(item => item.id === id);
          if( index === -1){
            throw boom.notFound('Product not found');
          }

          const product = this.products[index];
          this.products[index] = {
            ...product,
            ...changes
          }
          resolve(this.products[index]);
        } catch (error) {
          reject(error);
        }
      },2000);
    });
  }

  async delete(id){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = this.products.findIndex(item => item.id === id);
          if( index === -1){
            throw new Error('Product not found');
          }
          this.products.splice(index,1);
          resolve({id});
        } catch (error) {
          reject(error);
        }
      },2000);
    });
  }

}

module.exports = Service;
