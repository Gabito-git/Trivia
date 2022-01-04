const express = require('express');
const dbConnection = require('../db/config');
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.dbConn();
    }

    dbConn(){
        dbConnection()
    }

    execute(){
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`)
        } )
    }
}

module.exports = Server;