module.exports = class UserDto {
    email;
    id;
    login;
    admin;
    phone;
    name;
    soc;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.login = model.login;
        this.admin = model.admin;
        this.phone = model.phone;
        this.name = model.name;
        this.soc = model.soc;
    }
}