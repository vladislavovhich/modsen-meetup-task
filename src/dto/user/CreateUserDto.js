class CreateUserDto {
    constructor(data) {
        this.email = data.email
        this.password = data.password
        this.roleId = +data.roleId
    }
}

module.exports = CreateUserDto