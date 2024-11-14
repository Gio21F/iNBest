import express, { Application } from 'express';
import authRoutes from './routes/auth';
import imagesRoutes from './routes/images';
import { AppDataSource } from './db/connection';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        images: '/api/images',
        auth: '/api/auth'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try { 
            await AppDataSource.initialize()
            console.log('Database online');
        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    }

    routes() {
        this.app.use( this.apiPaths.auth, authRoutes );
        this.app.use( this.apiPaths.images, imagesRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;