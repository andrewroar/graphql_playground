const RootQuery = require("./source/RootQuery");
const RootMutationType = require("./source/MutationType");
////
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const RootQueryType = require("./source/RootQuery");
const app = express();
const PORT = process.env.PORT || 8000;

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.listen(PORT, () => {
  console.log(PORT + " is running");
});
