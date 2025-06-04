const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLID,
} = require("graphql");

const data = require('../data');
const productSchema = require('./productSchema');

// --- Product Type ---
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    categoryId: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

// --- Product Input Type ---
const ProductInputType = new GraphQLInputObjectType({
  name: "ProductInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    categoryId: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

// --- Root Query ---
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      resolve: () => data,
    },
    getProductById: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => {
        const product = data.find(p => p.id === args.id);
        if (!product) throw new Error("Product not found");
        return product;
      },
    },
  },
});

// --- Mutations ---
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        input: { type: new GraphQLNonNull(ProductInputType) },
      },
      resolve: (_, args) => {
        const { error, value } = productSchema.validate(args.input);
        if (error) {
          const customError = new Error("Error validating the product schema");
          customError.data = error;
          customError.statusCode = 400;
          throw customError;
        }

        const newProduct = {
          id: data.length + 1,
          ...args.input,
        };
        data.push(newProduct);
        return newProduct;
      },
    },

    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        input: { type: new GraphQLNonNull(ProductInputType) },
      },
      resolve: (_, args) => {
        const index = data.findIndex(p => p.id === args.id);
        if (index === -1) throw new Error("Product not found");

        const { error, value } = productSchema.validate(args.input);
        if (error) {
          const customError = new Error("Error validating the product schema");
          customError.data = error;
          customError.statusCode = 400;
          throw customError;
        }

        data[index] = { id: args.id, ...args.input };
        return data[index];
      },
    },
  },
});

module.exports.schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
