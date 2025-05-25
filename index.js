import cors from 'cors';
import corsconfig from './config/cors.config.json' assert { type: 'json' };
import express from 'express';
import { mainRouter } from './routes/mainRouter.js';
import ErrorLogController from './controllers/errorLogController.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const server = express();

server.use(cors(corsconfig));
server.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "API Tienda",
        version: "1.0.0",
        description: "Documentación de la API de la tienda usando JWT",
        },
        servers: [
        {
            url: "https://apifinal-javiercarranza.up.railway.app/",
            // url: "http://localhost:3000/",
        },
        ],
        components: {
            securitySchemes: {
                JsonWebToken: {
                type: "apiKey",
                in: "header",
                name: "Authorization", // aquí va el encabezado esperado
                description: "Token JWT sin prefijo 'Bearer'",
                },
            },
        },
        security: [
            {
                JsonWebToken: [],
            },
        ],
    },
    apis: ["./routes/userRouter.js", "./routes/productRouter.js", "./routes/authRouter.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customCssUrl: 'https://unpkg.com/swagger-ui-themes@3.0.0/themes/3.x/theme-feeling-blue.css',
    swaggerOptions: {
        showExtensions: true
    }
}));

server.use('/', mainRouter);

server.use(ErrorLogController)

server.listen(process.env.SERVER_PORT, ()=>{
    console.log("Servidor en línea en el puerto: " + process.env.SERVER_PORT);
});