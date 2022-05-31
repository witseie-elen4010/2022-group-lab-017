const mssql = require('mssql')
// Make sure this is private to this module
const config = {
server: 'wordleplusplusdb.database.windows.net',
database: 'WordlePlusPlus-Database',
// Put login details in environment variables for security
// We don't want to accidently push these to our GitHub repo
// AzureDBAdmin stores the DB server admin's user name
// AzureDBPassword stores the password
user: 'wordleplusplusdb',
password: 'Dbpassword@20222',
port: 1433,
// Required for Azure
options: {
encrypt: true,
enableArithAbort: true
},
pool: {
    max: 10,
min: 0,
idleTimeoutMillis: 30000
}
}
// Get a mssql connection instance
let isConnected = true
let connectionError = null
const pools = new mssql.ConnectionPool(config)
.connect()
.then(pool => {
console.log('Connected to DB')
return pool
})
.catch(err => {
// Handle errors
isConnected = false
connectionError = err
console.log(err)
})
module.exports = {
sql: mssql,
pools: pools,
isConnected: isConnected,
connectionError: connectionError
}