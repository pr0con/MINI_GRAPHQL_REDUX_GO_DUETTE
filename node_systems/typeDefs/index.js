const systemsTypeDef = require('./systems.js');
const servicesTypeDef = require('./services.js');

const usersTypeDef = require('./users.js');

const rootSchema = require('./rootSchema.js');

module.exports = [ rootSchema, usersTypeDef, systemsTypeDef, servicesTypeDef ];