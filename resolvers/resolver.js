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
};

module.exports = root;
