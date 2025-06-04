const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const root = require('./resolvers/resolver');

const app = express();
const PORT = 3000;



// GraphQL endpoint
app.use('/api/products', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}//api/products`);
});

