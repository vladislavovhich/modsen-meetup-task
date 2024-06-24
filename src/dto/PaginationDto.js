class PaginationDto {
    constructor(data) {
        this.page = data.page
        this.pageSize = data.pageSize
        this.offset = data.pageSize * (data.page - 1)
    }
}

module.exports = PaginationDto