const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = require("graphql");
const { ClientType, GenderType } = require("./Type");

let clients = require("../stastic/clients.json");
let genders = require("../stastic/clients_gender.json");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutuation",
  fields: () => ({
    addClient: {
      type: ClientType,
      description: "Adding a new client",
      args: {
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
      },
      resolve: (parent, args) => {
        const new_client = {
          id: clients.length + 1,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
        };

        clients.push(new_client);
        return clients;
      },
    },
    deleteClient: {
      type: new GraphQLList(ClientType),
      description: "Delete a client by id",
      args: {
        id: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (parent, args) => {
        return (clients = clients.filter((client) => client.id !== args.id));
      },
    },
  }),
});

module.exports = RootMutationType;
