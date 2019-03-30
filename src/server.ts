import {connect} from "./config/database";
import app from "./app";
import * as dotenv from "dotenv";

(async function startServer()
{
    dotenv.config();

    console.log('Connecting to database...');    
    try {
        
        const connection = await connect();

    } catch (error) {
        console.log('Cannot connect to database. MSG: ' + error);
        return;
    }

    console.log('Initializing server...');
    try {

        var application = await app.initialize();
        
        //start the server
        application.listen(process.env.PORT);        
        console.log('Express server linsten port: ' + process.env.PORT);

    } catch (error) {
        console.log('Error on initializing server. MSG: ' + error);
    }
})()