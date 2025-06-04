const data = require('../data')
const productSchema = require('../schema/productSchema')
const root = {
    hello: () => {
        return {
            text: "hello graphql",
            view: 123
        };
    },

    getAllProducts: () => {
        return data;
    },

    getProductById: ({ id }) => {
        const product = data.find(d => d.id === id);
        if (!product) throw new Error("Product not found");
        return product;
    },

    addProduct: ({ input }) => {
        const { error, value } = productSchema.validate(input);
        if (error) {
            //   error.statusCode = 400;
            //   throw error;
            const customError = new Error("Error validating the product schema")
            customError.data = error
            customError.statusCode = 400
            throw customError;
        }
        const newProduct = {
            id: data.length + 1,
            ...input,
        };
        data.push(newProduct);
        return newProduct;
    },

    updateProduct: ({ id, input }) => {
        const index = data.findIndex(d => d.id === id);
        if (index === -1) throw new Error("Product not found");
        data[index] = { id, ...input };
        return data[index];
    }

};

module.exports = root;
