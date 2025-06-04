const data = require('../data')
const root = {
  hello: () => {
    return {
      text: "hello graphql",
      view: 123
    };
  },

  getAllProducts: () => {
    return data;
  },

  getProductById: ({ id }) => {
    const product = data.find(d => d.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },
};

module.exports = root;
