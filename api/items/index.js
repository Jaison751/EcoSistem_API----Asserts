const ctrl = require('./controller')

//const database = require('../../../database/dummy')
//const database = require('../../database/remote-postgresql')
const database = require('../../database/sqlite')

module.exports = ctrl(database)