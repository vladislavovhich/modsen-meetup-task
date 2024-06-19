class UpdateMeetupDto {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.place = data.place
        this.time = data.time
        this.tags = data.tags
        this.user = data.user
    }
}

module.exports = UpdateMeetupDto