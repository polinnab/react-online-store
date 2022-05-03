module.exports = class UserDto {
    email;
    id;
    login;
    admin;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.login = model.login;
        this.admin = model.admin;
    }
}