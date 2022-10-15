const graphql = require("graphql");
const CustomArmor = require("../models/custom-armor");
const CustomGear = require("../models/custom-gear");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
} = graphql;

const ArmorType = new GraphQLObjectType({
  name: "CustomArmor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    armorType: { type: GraphQLString },
    ac: { type: GraphQLInt },
    dexBonus: { type: GraphQLString },
    stealthDis: { type: GraphQLBoolean },
    cost: { type: GraphQLInt },
    costType: { type: GraphQLString },
    weight: { type: GraphQLInt },
    strengthRqr: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

const GearType = new GraphQLObjectType({
  name: "CustomGear",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cost: { type: GraphQLInt },
    costType: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

// root query to get all gear, all armor, or one gear or one armor.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    gear: {
      type: GearType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return CustomGear.findById(args.id);
      },
    },
    allGear: {
      type: new graphql.GraphQLList(GearType),
      resolve(parent, args) {
        return CustomGear.find({});
      },
    },
    armor: {
      type: ArmorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return CustomArmor.findById(args.id);
      },
    },
    allArmor: {
      type: new graphql.GraphQLList(ArmorType),
      resolve(parent, args) {
        return CustomArmor.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addGear: {
      type: GearType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(GraphQLString) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let gear = new CustomGear({
          name: args.name,
          cost: args.cost,
          costType: args.costType,
          weight: args.weight,
          description: args.description,
        });
        return gear.save();
      },
    },
    addArmor: {
      type: ArmorType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        armorType: { type: new graphql.GraphQLNonNull(GraphQLString) },
        ac: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        dexBonus: { type: new graphql.GraphQLNonNull(GraphQLString) },
        stealthDis: { type: new graphql.GraphQLNonNull(GraphQLBoolean) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(GraphQLString) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        strengthRqr: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let armor = new CustomArmor({
          name: args.name,
          cost: args.cost,
          costType: args.costType,
          weight: args.weight,
          description: args.description,
        });
        return armor.save();
      },
    },
  },
});

// create new schema with options query which defines the query we will allow users to use when they are making a request.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
