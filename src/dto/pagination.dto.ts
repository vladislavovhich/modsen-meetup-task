interface IPaginationDto {
    page: number
    pageSize: number
    offset: number
}

class PaginationDto implements IPaginationDto {
    public page: number
    public pageSize: number
    public offset: number

    constructor(data: IPaginationDto) {
        this.page = data.page
        this.pageSize = data.pageSize
        this.offset = data.pageSize * (data.page - 1)
    }
}

export {PaginationDto, IPaginationDto}