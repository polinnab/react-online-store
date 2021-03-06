const userService = require('../service/user-service');
const {validationResult} = require("express-validator");
const ApiError = require('../exeptions/api-error');

class UserController {
    async registaration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
               return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password, login, role} = req.body;
            const userData = await userService.registration(email, password, login, role);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e) {
            next(e)
        }
    }

    async edit(req, res, next) {
        try {
            const {user} = req.body;
            const userId = req.params.id;
            const userData = await userService.edit(userId, user);
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new UserController();