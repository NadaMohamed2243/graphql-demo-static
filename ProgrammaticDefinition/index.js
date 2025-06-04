const express = require('express');
const { schema } = require('./schema/schema');
const { createHandler } = require("graphql-http/lib/use/express");
const app = express();
const PORT = 3000;


const customFormatErrorFn = (err) => {
  if (!err.originalError) {
    return err;
  } else {
    const data = err.originalError.data;
    const statusCode = err.originalError.statusCode;
    const message = err.message;
    return {
      data,
      statusCode,
      message
    };
  }
};

app.all("/api/products", createHandler({
  schema,
  context: (req) => ({ req }),
  customFormatErrorFn
})
);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api/products`);
});

