import {connect} from "./config/database";
import app from "./app";
const PORT = 3000;

(async function startServer()
{
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
        application.listen(PORT);        
        console.log('Express server linsten port: ' + PORT);

    } catch (error) {
        console.log('Error on initializing server. MSG: ' + error);
    }
})()