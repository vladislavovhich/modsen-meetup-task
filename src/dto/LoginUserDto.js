class LoginUserDto {
    constructor(data) {
        this.email = data.email
        this.password = data.password
    }
}

module.exports = LoginUserDto