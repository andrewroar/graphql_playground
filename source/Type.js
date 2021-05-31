const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} = require("graphql");

const clients = require("../stastic/clients.json");
const genders = require("../stastic/clients_gender.json");

const GenderType = new GraphQLObjectType({
  name: "Gender",
  description: "this is the gender of the client",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },

    gender: {
      type: GraphQLNonNull(GraphQLString),
    },

    personal_info: {
      type: new GraphQLList(ClientType),
      resolve: (gender) => {
        return clients.filter((item) => item.id === gender.id);
      },
    },
  }),
});

const ClientType = new GraphQLObjectType({
  name: "Clients",
  description: "this is the list of clients",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    first_name: {
      type: GraphQLNonNull(GraphQLString),
    },
    last_name: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },

    clientGender: {
      type: GenderType,
      resolve: (clients) => {
        return genders.find((item) => item.id === clients.id);
      },
    },
  }),
});

module.exports = { ClientType, GenderType };
