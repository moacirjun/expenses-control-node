const dotenv = require('dotenv');
const config = dotenv.config().parsed;

module.exports = {
    type: "postgres",
    url: config.DATABASE_URL,
    logging: false,
    entities: [
       "build/models/entity/**/*.js"
    ],
    migrations: [
       "build/database/migration/**/*.js"
    ],
    subscribers: [
       "build/subscriber/**/*.js"
    ],
    cli: {
       entitiesDir: "src/models/entity",
       migrationsDir: "src/database/migration",
       subscribersDir: "src/subscriber"
    }
 }