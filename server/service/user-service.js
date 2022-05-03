const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exeptions/api-error');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');
const cartService = require('./cart-service');

const usersPath = path.resolve(__dirname, '../../database/users/users.json');
let users = JSON.parse(fs.readFileSync(usersPath));


class UserService {
    async registration(email, password, login, role) {
        const candidate = users.find(item => item.email === email);

        if (candidate) {
            throw ApiError.BadRequest(`User with email: ${email} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const admin = role === 'admin' ? true : false
        const user = {id: v4(), email, password: hashPassword, admin, login};

        users.push(user);
        fs.writeFileSync(usersPath, JSON.stringify(users));

        const userDto = new UserDto(user); // id, email, login, admin
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = users.find(item => item.email === email)
        if (!user) {
            throw ApiError.BadRequest(`User with this email does not exist`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Incorrect password`);
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await cartService.dropZeroUser();
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorisedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);


        const tokenFromDb = await tokenService.findToken(refreshToken);


        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorisedError()
        }
        const user = users.find(user => user.id === userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }
}

module.exports = new UserService();