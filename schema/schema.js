const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type testData {
    text: String!
    view: Int
  }

  type RootQuery {
    hello: testData
  }

  schema {
    query: RootQuery
  }
`);

module.exports = schema;