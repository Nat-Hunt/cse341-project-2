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
  GraphQLEnumType,
} = graphql;

const CostTypeEnumType = new GraphQLEnumType({
  name: "CostEnumType",
  values: {
    CP: {
      value: "cp",
    },
    SP: {
      value: "sp",
    },
    EP: {
      value: "ep",
    },
    GP: {
      value: "gp",
    },
    PP: {
      value: "pp",
    },
  },
});

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
    costType: { type: CostTypeEnumType },
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
    costType: { type: CostTypeEnumType },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

// root query to get all gear, all armor, or one gear or one armor.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "All GET-type queries.",
  fields: {
    gear: {
      description:
        "Requires the item _id of the item you're requesting, returns one item",
      type: GearType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        // check that ID is in the proper format

        return CustomGear.findById(args.id);
      },
    },
    all_gear: {
      description: "Returns all entries in the CustomGear collection",
      type: new graphql.GraphQLList(GearType),
      resolve: async (root, args, context, info) => {
        return CustomGear.find({});
      },
    },
    armor: {
      description:
        "Requires the item _id of the item you're requesting, returns one item",
      type: ArmorType,
      args: { id: { type: GraphQLID } },
      resolve: async (root, args, context, info) => {
        // check that ID is in the proper format

        return CustomArmor.findById(args.id);
      },
    },
    all_armor: {
      description: "Returns all entries in the CustomArmor collection",
      type: new graphql.GraphQLList(ArmorType),
      resolve: async (root, args, context, info) => {
        return CustomArmor.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Used for making CREATE, PUT, and DELETE queries.",
  fields: {
    addGear: {
      description:
        "Create a new Custom Gear item and add it to the CustomGear collection. Requires all fields to be entered",
      type: GearType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        cost: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        costType: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          const gear = new CustomGear({
            name: args.name,
            cost: args.cost,
            costType: args.costType,
            weight: args.weight,
            description: args.description,
          });
          const newGear = await gear.save();
          return { ...newGear._doc, _id: newGear.id };
        } catch (err) {
          throw err;
        }
      },
    },
    addArmor: {
      description:
        "Create a new Custom Armor item and add it to the CustomArmor collection. Requires all fields to be entered",
      type: ArmorType,
      args: {
        name: { type: new graphql.GraphQLNonNull(GraphQLString) },
        armorType: { type: new graphql.GraphQLNonNull(GraphQLString) },
        ac: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        dexBonus: { type: new graphql.GraphQLNonNull(GraphQLString) },
        stealthDis: { type: new graphql.GraphQLNonNull(GraphQLBoolean) },
        cost: { type: new graphql.GraphQLNonNull(CostTypeEnumType) },
        costType: { type: new graphql.GraphQLNonNull(GraphQLString) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        strengthRqr: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
      },
      resolve: async (root, args, context, info) => {
        try {
          let armor = new CustomArmor({
            name: args.name,
            armorType: args.armorType,
            ac: args.ac,
            dexBonus: args.dexBonus,
            stealthDis: args.stealthDis,
            cost: args.cost,
            costType: args.costType,
            weight: args.weight,
            strengthRqr: args.strengthRqr,
            description: args.description,
          });
          const newArmor = await armor.save();
          return { ...newArmor._doc, _id: newArmor.id };
        } catch (err) {
          throw err;
        }
      },
    },
    updateGear: {
      description:
        "Update a single Custom Gear item. Requires the item _id, returns the former fields",
      type: GearType,
      args: {
        id: { type: graphql.GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        cost: { type: GraphQLInt },
        costType: { type: CostTypeEnumType },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const formerGear = await CustomGear.findById(args.id);
          let newName = args.name;
          let newCost = args.cost;
          let newCostType = args.costType;
          let newWeight = args.weight;
          let newDesc = args.description;

          // validation (graphql does most of it for me)
          if (!newName) {
            newName = formerGear.name;
          }
          if (!newCost) {
            newCost = formerGear.cost;
          }
          if (!newCostType) {
            newCostType = formerGear.costType;
          }
          if (!newWeight) {
            newWeight = formerGear.weight;
          }
          if (!newDesc) {
            newDesc = formerGear.description;
          }

          if (
            newName == formerGear.name &&
            newCost == formerGear.cost &&
            newCostType == formerGear.costType &&
            newWeight == formerGear.weight &&
            newDesc == formerGear.description
          ) {
            throw new Error("You did not change any fields");
          }

          // after validation, find the gear and update it.
          const updatedGear = await CustomGear.findByIdAndUpdate(args.id, {
            name: newName,
            cost: newCost,
            costType: newCostType,
            weight: newWeight,
            description: newDesc,
          });

          return {
            ...updatedGear._doc,
            id: updatedGear.id,
            name: updatedGear.name,
            cost: updatedGear.cost,
            costType: updatedGear.costType,
            weight: updatedGear.weight,
            description: updatedGear.description,
          };
        } catch (err) {
          throw err;
        }
      },
    },
    updateArmor: {
      type: ArmorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        armorType: { type: GraphQLString },
        ac: { type: GraphQLInt },
        dexBonus: { type: GraphQLString },
        stealthDis: { type: GraphQLBoolean },
        cost: { type: GraphQLInt },
        costType: { type: CostTypeEnumType },
        weight: { type: GraphQLInt },
        strengthRqr: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          let newName = args.name;
          let newArmorType = args.armorType;
          let newAc = args.ac;
          let newDexBonus = args.dexBonus;
          let newStealthDis = args.stealthDis;
          let newCost = args.cost;
          let newCostType = args.costType;
          let newWeight = args.weight;
          let newStrengthRqr = args.strengthRqr;
          let newDescription = args.description;

          const formerGear = await CustomArmor.findById(args.id);

          // validation (graphql does most of it for me)
          if (!newName) {
            newName = formerGear.name;
          }
          if (!newArmorType) {
            newArmorType = formerGear.armorType;
          }
          if (!newAc) {
            newAc = formerGear.ac;
          }

          if (!newDexBonus) {
            newDexBonus = formerGear.dexBonus;
          }

          if (!newStealthDis) {
            newStealthDis = formerGear.stealthDis;
          }

          if (!newCost) {
            newCost = formerGear.collection;
          }

          if (!newCostType) {
            newCostType = formerGear.costType;
          }

          if (!newWeight) {
            newWeight = formerGear.weight;
          }

          if (!newStrengthRqr) {
            if (newStrengthRqr > 20) {
              throw new Error(
                "Error: strength requirement cannot be greater than 20"
              );
            }
          }

          if (!newDescription) {
            newDescription = formerGear.description;
          }

          const updatedArmor = await CustomArmor.findByIdAndUpdate(
            newName,
            newArmorType,
            newAc,
            newDexBonus,
            newStealthDis,
            newCost,
            newCostType,
            newWeight,
            newStrengthRqr,
            newDescription
          );

          return {
            ...updatedArmor._doc,
            name: updatedArmor.name,
          };
        } catch (err) {
          throw err;
        }
      },
    },
    removeGear: {
      type: GearType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        try {
          const deletedGear = await CustomGear.findByIdAndDelete(args.id);
          return {
            ...deletedGear._doc,
            _id: deletedGear.id,
          };
        } catch (err) {
          throw err;
        }
      },
    },
    removeArmor: {
      type: ArmorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        try {
          const deletedArmor = await CustomArmor.findByIdAndDelete(args.id);
          return {
            ...deletedArmor._doc,
            _id: deletedArmor.id,
            name: deletedArmor.name,
          };
        } catch (err) {
          throw err;
        }
      },
    },
  },
});

// create new schema with options query which defines the query we will allow users to use when they are making a request.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});