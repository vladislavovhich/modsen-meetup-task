import request from 'supertest'
import app from '../../app'

describe('GET /api/tags/{id}', () => {
    it('Find non-exist tag', async () => {
        const response = await request(app).post('/api/tags/99999')

        expect(response.status).toBe(404)
    })
})

describe('DELETE /api/tags/{id}', () => {
    it('Try to make actions that can be done by authorized user', async () => {
        const response = await request(app).delete('/api/tags/4')

        expect(response.status).toBe(401)
    })
})

describe('POST /api/tags', () => {
    it('Try to create new tag', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result
        
        const res1 = await request(app)
            .post('/api/tags')
            .set('Cookie', `jwt=${accessToken}`)
            .send({
                name: "Super tag"
            })
        
        const id = res1.body.tag.id

        const res2 = await request(app)
            .delete(`/api/tags/${id}`)
            .set('Cookie', `jwt=${accessToken}`)
        
        expect(res2.status).toBe(200)
    })
})

describe('PUT /api/tags', () => {
    it('Try to update tag and after updating delete item', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result
        
        const res1 = await request(app)
            .post('/api/tags')
            .set('Cookie', `jwt=${accessToken}`)
            .send({
                name: "Modsen test",
            })
        
        const id = res1.body.tag.id

        const res2 = await request(app)
            .put(`/api/tags/${id}`)
            .send({
                name: "Modsen test upd2"
            })
            .set('Cookie', `jwt=${accessToken}`)

        expect(res2.status).toBe(200)

        const res3 = await request(app)
            .delete(`/api/tags/${id}`)
            .set('Cookie', `jwt=${accessToken}`)
        
        expect(res3.status).toBe(200)
    })
})

describe('POST /api/tags', () => {
    it('Student try to create tag (It is impossible)', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "vlad@gmail.com",
            password: "55155"
        })

        const {accessToken} = res.body.result
        
        const res1 = await request(app)
            .post('/api/tags')
            .set('Cookie', `jwt=${accessToken}`)
            .send({
                name: "Modsen test"
            })
        
        expect(res1.status).toBe(403)
    })
})