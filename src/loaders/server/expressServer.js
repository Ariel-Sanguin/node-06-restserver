const express = require('express');
const config = require('../../config');
const morgan = require('morgan');

class ExpressServer {

    constructor(){
        this.app = express();
        this.port = config.port;
        this.basePathUser = `${config.api.prefix}/users`;//1:05hs..0
        this._middlewares();

        this._routes();
    }

    _middlewares(){
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    _routes(){
        
        this.app.head("/status", (req, res)=>{
            res.status(200).end();
        });

        this.app.use(this.basePathUser, require('../../routes/users'));
    }

    async start() {
        this.app.listen(this.port, (error)=>{
            if(error){
                console.log(err);
                process.exit(1);
                return;
            }
        });
    }
}

module.exports = ExpressServer;