const express = require('express');
const dbConnection = require('../db/config');
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.paths = {
            trivias: '/api/trivias',
            history: '/api/history'
        }
        this.dbConn();
        this.middlewares();
        this.routes();
    }

    dbConn(){
        dbConnection()
    }

    middlewares(){
        this.app.use( express.json() );
    }

    routes(){
        this.app.use( this.paths.trivias, require('../routes/trivias') ),
        this.app.use( this.paths.history, require('../routes/history') )
    }

    execute(){
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`)
        } )
    }
}

module.exports = Server;