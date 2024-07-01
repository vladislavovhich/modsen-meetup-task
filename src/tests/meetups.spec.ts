import request from 'supertest'
import app from '../../app'

describe('GET /api/meetups/{id}', () => {
    it('Find non-exist meetup', async () => {
        const response = await request(app).post('/api/meetups/99999')

        expect(response.status).toBe(404)
    })
})

describe('DELETE /api/meetups/{id}', () => {
    it('Try to make actions that can be done by authorized user', async () => {
        const response = await request(app).delete('/api/meetups/14')

        expect(response.status).toBe(401)
    })
})

describe('POST /api/meetups/subscribe/{id}', () => {
    it('Non-autorized user tries to subscribe on meetup', async () => {
        const response = await request(app).post('/api/meetups/subscribe/14')

        expect(response.status).toBe(401)
    })
})

describe('POST /api/meetups/subscribe/{id}', () => {
    it('Autorized user tries to subscribe on meetup', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result

        const response = await request(app).post('/api/meetups/subscribe/10').set('Cookie', `jwt=${accessToken}`)

        expect(response.status).toBe(200)
    })
})

describe('POST /api/meetups/unsubscribe/{id}', () => {
    it('Autorized user tries to unsubscribe on meetup he did not subscribe', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result

        const response = await request(app).post('/api/meetups/unsubscribe/10').set('Cookie', `jwt=${accessToken}`)

        expect(response.status).toBe(200)
    })
})

describe('POST /api/meetups/unsubscribe/{id}', () => {
    it('Autorized user tries to unsubscribe on meetup', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result

        const response = await request(app).post('/api/meetups/unsubscribe/14').set('Cookie', `jwt=${accessToken}`)

        expect(response.status).toBe(400)
    })
})

describe('POST /api/meetups', () => {
    it('Try to create new meetup', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result
        
        const res1 = await request(app)
            .post('/api/meetups')
            .set('Cookie', `jwt=${accessToken}`)
            .send({
                name: "Modsen test",
                place: "Vitebsk",
                time: "2012-02-02",
                description: "test",
                tags: ["cool", "obed"]
            })
        
        const id = res1.body.meetup.id

        const res2 = await request(app)
            .delete(`/api/meetups/${id}`)
            .set('Cookie', `jwt=${accessToken}`)
        
        expect(res2.status).toBe(200)
    })
})

describe('PUT /api/meetups', () => {
    it('Try to update meetup and after updating delete item', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result
        
        const res1 = await request(app)
            .post('/api/meetups')
            .set('Cookie', `jwt=${accessToken}`)
            .send({
                name: "Modsen test",
                place: "Vitebsk",
                time: "2012-02-02",
                description: "test",
                tags: ["cool", "obed"]
            })
        
        const id = res1.body.meetup.id

        const res2 = await request(app)
            .put(`/api/meetups/${id}`)
            .send({
                name: "Modsen test upd2",
                place: "Vitebsk",
                time: "2012-02-02",
                description: "test",
                tags: ["cool", "obed"],
            })
            .set('Cookie', `jwt=${accessToken}`)

        expect(res2.status).toBe(200)

        const res3 = await request(app)
            .delete(`/api/meetups/${id}`)
            .set('Cookie', `jwt=${accessToken}`)
        
        expect(res3.status).toBe(200)
    })
})

describe('POST /api/meetups', () => {
    it('Student try to create meetup (It is impossible)', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "vlad@gmail.com",
            password: "55155"
        })

        const {accessToken} = res.body.result
        
        const res1 = await request(app)
            .post('/api/meetups')
            .set('Cookie', `jwt=${accessToken}`)
            .send({
                name: "Modsen test",
                place: "Vitebsk",
                time: "2012-02-02",
                description: "test",
                tags: ["cool", "obed"]
            })
        
        expect(res1.status).toBe(403)
    })
})