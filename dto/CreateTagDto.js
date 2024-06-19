class CreateTagDto {
    constructor(data) {
        this.user = data.user
        this.name = data.name
    }
}

module.exports = CreateTagDto