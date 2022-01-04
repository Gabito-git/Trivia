const express = require('express');
const dbConnection = require('../db/config');
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.dbConn();
        this.middlewares();
    }

    dbConn(){
        dbConnection()
    }

    middlewares(){
        this.app.use( express.json() );
    }

    execute(){
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`)
        } )
    }
}

module.exports = Server;