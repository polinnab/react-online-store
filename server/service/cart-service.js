const path = require('path');
const fs = require('fs');
const usersPath = path.resolve(__dirname, '../../database/users/users.json');
const productsPath = path.resolve(__dirname, '../../database/products/products.json');
const tokensPath = path.resolve(__dirname, '../../database/users/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath));
const users = JSON.parse(fs.readFileSync(usersPath));
const products = JSON.parse(fs.readFileSync(productsPath));

class CartService {
    async checkToken(refreshToken) {
        let userIndex = 0;
        if (refreshToken) {
            const userToken = await tokens.find(item => item.refreshToken === refreshToken);
            const cartUser = userToken.user;
            userIndex = await users.findIndex(user => user.id === cartUser);
        };
        return userIndex;
    }

    async getCart(refreshToken) {
        let userIndex = await this.checkToken(refreshToken);
        let cart = [];

        if (!users[userIndex].cart) {
            return cart
        };

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

    async addToCart(refreshToken, id) {
        const userIndex = await this.checkToken(refreshToken);

        if (!users[userIndex].cart) {
            users[userIndex].cart = []
        };

        const productInCart = users[userIndex].cart.find((item) => item.id === id);

        if (users[userIndex].cart.length >= 1 && productInCart) {
            productInCart.count = productInCart.count + 1;
        } 
        else {
          const newProduct = {
            id: id,
            count: 1,
          };
          users[userIndex].cart.push(newProduct);
        }
      
        fs.writeFileSync(usersPath, JSON.stringify(users));

        return users[userIndex].cart
    }

    async changeCount(refreshToken, id, count) {
        const userIndex = await this.checkToken(refreshToken);
        const productIndex = users[userIndex].cart.findIndex((item) => item.id === id);
        users[userIndex].cart[productIndex].count = count;

        fs.writeFileSync(usersPath, JSON.stringify(users));
        const message = 'Product count has changed';

        return {cart: users[userIndex].cart, message};
    }

    async deleteFromCart(refreshToken, id) {
        const userIndex = await this.checkToken(refreshToken);
        const newCart = users[userIndex].cart.filter((item) => item.id !== id);
        users[userIndex].cart = newCart;
        fs.writeFileSync(usersPath, JSON.stringify(users));
        const message =  'Product deleted';
        
        return {cart: users[userIndex].cart, message};
    }

    async cleanCart(refreshToken) {
        const userIndex = await this.checkToken(refreshToken);
        users[userIndex].cart = [];
        fs.writeFileSync(usersPath, JSON.stringify(users));
        const message = 'The cart is empty';

        return {cart: users[userIndex].cart, message};
    }

    async dropZeroUser() {
        users[0].cart = [];
        fs.writeFileSync(usersPath, JSON.stringify(users));
    }
}

module.exports = new CartService()