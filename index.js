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
  formatError(err){
    if(!err.originalError){
        return err;
    } else {
        const data = err.originalError.data;
        const statusCode = err.originalError.statusCode;
        const message = err.message;
        return {
           data, statusCode ,message
        }
    }
  }
}));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}//api/products`);
});

