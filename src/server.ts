import app from "./app";
const PORT = 3000;

(async function startServer()
{
    console.log('Initializing server...');

    try {

        const application = await app.initialize();
        
        application.listen(PORT, () => {
            console.log('Express server linsten port: ' + PORT);
        });

    } catch (error) {
        console.log('Error on initializing server. MSG: ' + error);
    }

})()