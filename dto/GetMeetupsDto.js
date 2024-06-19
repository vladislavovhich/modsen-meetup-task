class GetMeetupsDto {
    constructor(data) {
        this.offset = data.offset
        this.sortFields = data.sortFields
        this.filterFields = data.filterFields
    }
}

module.exports = GetMeetupsDto