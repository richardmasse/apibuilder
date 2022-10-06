import * as express from 'express';

export abstract class Auth {
    app: express.Application;
    config: any;
    auth: any;

    constructor(app: any, config: any, auth: any) {

        this.app = app;
        this.config = config;
        this.auth = auth;
    }

    
    abstract init(): void;
    abstract verifyToken(req : express.Request, res: express.Response, next: any): any;
}