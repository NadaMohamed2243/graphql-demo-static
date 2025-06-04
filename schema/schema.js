const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type testData {
    text: String!
    view: Int
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    categoryId: Int!
  }

  type RootQuery {
    getAllProducts: [Product]
    getProductById(id: Int!): Product
    hello: testData
  }

  schema {
    query: RootQuery
  }
`);

module.exports = schema;