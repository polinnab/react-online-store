require('dotenv').config()
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const tokensPath = path.resolve(__dirname, '../../database/users/tokens.json');
let tokens = JSON.parse(fs.readFileSync(tokensPath))

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '10d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
       try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET);
            return userData
       } catch(e) {
           return null
       }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET);
            return userData
       } catch(e) {
           return null
        }
     }

    async saveToken(userId, refreshToken) {
        const tokenData = tokens.find(token => token.user === userId)
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            const newTokens = tokens.map(token => token.id === tokenData.id ? tokenData : token);
            fs.writeFileSync(tokensPath, JSON.stringify(newTokens));
            return tokenData
        }

        const token = {id: v4(), user: userId, refreshToken};
        tokens.push(token);
        fs.writeFileSync(tokensPath, JSON.stringify(tokens));

        return token
    }

    async removeToken(refreshToken) {
        const tokenData = tokens.find(token => token.refreshToken === refreshToken);
        const index = tokens.findIndex(el => el.id === tokenData.id);
        tokens.splice(index, 1);
        fs.writeFileSync(tokensPath, JSON.stringify(tokens));
       return tokenData; 
    }

    async findToken(refreshToken) {
        const tokenData = tokens.find(token => token.refreshToken === refreshToken);
        return tokenData; 
    }
}

module.exports = new TokenService();