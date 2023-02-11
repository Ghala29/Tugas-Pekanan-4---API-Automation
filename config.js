const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

module.exports = {
  request,
  expect,
};