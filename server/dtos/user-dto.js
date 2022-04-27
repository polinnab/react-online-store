module.exports = class UserDto {
    email;
    id;
    admin;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.admin = model.admin;
    }
}