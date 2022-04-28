const userService = require('../service/user-service');
const {validationResult} = require("express-validator");
const ApiError = require('../exeptions/api-error');
const cartService = require('../service/cart-service');

class CartController {
    async getCart(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log('req.cookies: ', req.cookies)
            const cart = await cartService.getCart(refreshToken);
            return res.json(cart);
        } catch(e) {
            console.log(e)
            // next(e)
        }
    }

}

module.exports = new CartController();