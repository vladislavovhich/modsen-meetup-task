const PaginationDto = require("./PaginationDto")

class GetMeetupsDto extends PaginationDto{
    constructor(data) {
        super(data)
        
        this.sortFields = data.sortFields
        this.filterFields = data.filterFields
    }
}

module.exports = GetMeetupsDto