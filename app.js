const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');

const PORT = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // so we can use http://localhost:3000/graphql to test locally
}));

app.listen(PORT, () => {
  console.log(`server starting at ${PORT}`)
})

