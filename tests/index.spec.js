const request = require('supertest');
const expect = require('chai').expect
// const assert = require('assert');
// const express = require('express');

// const app = express();

// app.get('/user', function(req, res) {
//   res.status(200).json({ name: 'john' });
// });

describe('api test', () => {
  it('index interface is right?', () => {
    request('http://localhost:3000/')
      .get('api/getDataList')
      .expect(200)
      .end((err, res) => {
        // console.log('res', res._body)
        expect(res._body.length).equal(2)
        expect(res._body[0].id).equal(1)
      })
  })
})

// request(app)
//   .get('/user')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function (err, res) {
//     if (err) throw err;
//   });