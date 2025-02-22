const express = require("express")
const cors = require("cors")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { default: axios } = require("axios")

const apolloServer = new ApolloServer({
    typeDefs: `
        type Products {
            _id: String!
            name: String!
            category: String!
            cost: Int!
            rating: Int!
            image: String!
        }
        type Query {
            getProducts: [Products],
            getProductsById(id: String!): Products
        }

        type Cart {
            cartItems: [Products],
            email: String!,
            _id: String!
        }

        type Mutation {
            addToCart(id: String!, quantity: Int!, token: String!) : Cart
        }
    `,
    resolvers: {
        Query: {
            getProducts: async () => {
                const resp = await axios.get('https://qkart.api.shwan.in/v1/products')
                return resp.data
                },
            getProductsById: async (_, {id}) => {
                const resp = await axios.get(`https://qkart.api.shwan.in/v1/products/${id}`)
                return resp.data
            }
        },
        Mutation: {
            addToCart: async (_, {id, quantity, token}) => {
                const resp = await axios.post(
                    `https://qkart.api.shwan.in/v1/cart`,
                    {
                    productId: id,
                    quantity
                    
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            }
        }
    }
})
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


const port = 3000
app.listen(port, async () => {
    await apolloServer.start()
    app.use("/graphql", expressMiddleware(apolloServer))
    console.log(`App is running on port: ${port}`)
})


