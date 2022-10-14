const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

let fakeBookDatabase = [
  { name: "Book 1", pages: 432, id: 1 },
  { name: "Book2", pages: 32, id: 2 },
  { name: "Book3", pages: 532, id: 3 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt },
  }),
});

// root query to get all authors, get all books, get a particular book, or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // how to get data from database source

        // return the book with id passe din argument by the user
        return fakeBookDatabase.find((item) => {
          return item.id == args.id;
        });
      },
    },
  },
});

// create new schema with options query which defines the query we will allow users to use when they are amaking a request.
module.exports = new GraphQLSchema({ query: RootQuery });
