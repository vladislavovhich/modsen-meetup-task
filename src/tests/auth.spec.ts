import request from 'supertest'
import app from '../../app'

describe('POST /api/auth/login', () => {
    it('Try to login non-exist user', async () => {
        const response = await request(app).post('/api/auth/login').send({
            login: "kirill@gmail.com",
            password: "55155"
        })

        expect(response.status).toBe(400)
    })
})

describe('POST /api/auth/login', () => {
    it('Try to login', async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: "vlad@gmail.com",
            password: "55155"
        })

        expect(response.status).toBe(200)
    })
})

describe('POST /api/auth/register', () => {
    it('Try to register but wrong (Incorrect login)', async () => {
        const response = await request(app).post('/api/auth/register').send({
            email: "vlad@ail.com",
            password: "55155"
        })

        expect(response.status).toBe(400)
    })
})

describe('POST /api/auth/register', () => {
    it('Try to register but wrong (Incorrect password)', async () => {
        const response = await request(app).post('/api/auth/register').send({
            email: "vlad@gmail.com",
            password: ""
        })

        expect(response.status).toBe(400)
    })
})

describe('GET /api/auth/logout', () => {
    it('Try to logout when user is not logged in', async () => {
        const response = await request(app).get('/api/auth/logout')

        expect(response.status).toBe(401)
    })
})

describe('GET /api/auth/logout', () => {
    it('Try to logout after auth', async () => {
        let res = await request(app).post('/api/auth/login').send({
            email: "modsen@tut.by",
            password: "55155"
        })

        const {accessToken} = res.body.result

        const response = await request(app)
            .get('/api/auth/logout')
            .set('Cookie', `jwt=${accessToken}`)

        expect(response.status).toBe(200)
    })
})