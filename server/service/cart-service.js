const path = require('path');
const fs = require('fs');
const usersPath = path.resolve(__dirname, '../../database/users/users.json');
const productsPath = path.resolve(__dirname, '../../database/products/products.json');
const tokensPath = path.resolve(__dirname, '../../database/users/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath));
const users = JSON.parse(fs.readFileSync(usersPath));
const products = JSON.parse(fs.readFileSync(productsPath));

class CartService {
    async getCart(refreshToken) {
        let userIndex = 0;
        let cart = [];

        if (refreshToken) {
            const userToken = tokens.find(item => item.refreshToken === refreshToken);
            const cartUser = userToken.user;
            userIndex = users.findIndex(user => user.id === cartUser);
        } 
    
        if (!users[userIndex].cart) {
            return cart
        }

        products.map((product) => {
            const prod = users[userIndex].cart.find((item) => item.id === product.id);
            if (prod) {
              const cartProduct = {
                id: product.id,
                name: product.name,
                image: product.images[0].thumbnail,
                price: product.price,
                count: prod.count,
              };
              cart.push(cartProduct);
            }
        });

        return cart
    }
}

module.exports = new CartService()