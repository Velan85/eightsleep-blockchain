import request from 'supertest'
import app from '../src/server'
import { expect } from 'chai'


describe('GET /', () => {
  it('should return 200 and the default response', (done) => {
      request(app).get('/')
        .end((_, res) => {
          expect(res.error).to.be.false
          expect(res.text).to.equal(`Server is running on port 3000`)
          expect(res.status).to.equal(200)
          done()
        })
  })
})


describe('GET /random-url', () => {
    it('should return 404', (done) => {
        request(app).get('/random-url').expect(404, done)
    })
})
