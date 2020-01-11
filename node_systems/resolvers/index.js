const systemsResolvers = require('./systems.js');
const servicesResolvers = require('./services.js');

const usersResolvers = require('./users.js');

module.exports = [ usersResolvers, systemsResolvers, servicesResolvers ]