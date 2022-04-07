const express = require('express')
const router = express.Router();
const elastic = require('elasticsearch')

const elasticClient = elastic.Client({
  host: 'localhost:9200'
})


module.exports = {
  elasticClient
}
