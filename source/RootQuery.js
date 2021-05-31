const { GraphQLObjectType, GraphQLList, GraphQLInt } = require("graphql");
//const ClientType = require("./ClientType");

const { ClientType, GenderType } = require("./Type");

const clients = require("../stastic/clients.json");
const genders = require("../stastic/clients_gender.json");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the Root Query",
  fields: () => ({
    client: {
      type: ClientType,
      description: "Just One client",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => clients.find((item) => item.id === args.id),
    },

    clients: {
      type: new GraphQLList(ClientType),
      description: "List of the clients",
      resolve: () => clients,
    },

    genders: {
      type: new GraphQLList(GenderType),
      description: "The Gender of the list of the clients",
      resolve: () => genders,
    },
  }),
});

module.exports = RootQueryType;
