const userService = require('../service/user-service');
const {validationResult} = require("express-validator");
const ApiError = require('../exeptions/api-error');
const cartService = require('../service/cart-service');

class CartController {
    async getCart(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const cart = await cartService.getCart(refreshToken);
            return res.json(cart);
        } catch(e) {
            console.log(e)
        }
    }

    async addToCart(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const {id} = req.params;
            const cart = await cartService.addToCart(refreshToken, id);
            return res.json(cart);
        } catch(e) {
            console.log(e)
        }
    }

    async changeCount(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const {id} = req.params;
            const {count} = req.body;
            const data = await cartService.changeCount(refreshToken, id, count);
            return res.json(data);
        } catch(e) {
            console.log(e)
        }
    }

    async deleteFromCart(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const {id} = req.params;
            console.log('req.cookies: ', req.cookies)
            console.log('req.params: ', req.params)
            const data = await cartService.deleteFromCart(refreshToken, id);
            return res.json(data);
        } catch(e) {
            console.log(e)
        }
    }

    async cleanCart(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log('req.cookies: ', req.cookies);
            const data = await cartService.cleanCart(refreshToken);
            return res.json(data);
        } catch(e) {
            console.log(e)
        }
    }

}

module.exports = new CartController();