import crypto from "crypto";
import jwt from "jsonwebtoken";
import * as express from 'express';
import { Auth } from "./auth";

export default class Jwt extends Auth {
    randomsecret: string = '';

    constructor(app: any, config: any, auth: any) {
        super(app, config, auth);
        this.init();
    }

    init() {
        // Random secret for jwt
        this.randomsecret = crypto.randomBytes(16).toString('hex');
        this.randomsecret = this.randomsecret.substring(0,8) + "-" + 
             this.randomsecret.substring(8,12) + "-" + 
             this.randomsecret.substring(12,16) + "-" + 
             this.randomsecret.substring(16,20) + "-" + 
             this.randomsecret.substring(20,32);

        this.app.post(this.config.api.base + '/token', (req,res) => {
            if (req.body.grant_type === this.auth.grant_type && 
                req.body.client_id === this.auth.client_id &&
                req.body.client_secret === this.auth.client_secret) {
                    let token = jwt.sign({ client_id: req.body.client_id },
                        this.randomsecret,
                        { expiresIn: '1h' }
                        );
        
                    res.status(200).json({
                        access_token: token,
                        token_type: "bearer",
                        expires_in: "3600"
                    });
                }
            else {
                res.status(403).json({
                    message: "bad identifiant"
                });
            }
        });
    }

    verifyToken = (req: express.Request, res: express.Response, next: any) => {
        const token: string | undefined = req.headers['authorization']; 
        
        if (token) {
            // Remove Bearer from string
            var tokens: string[] = token.split(" ");
            
            if (tokens[0] === "Bearer" && tokens[1]) {
                try {
                    const decoded = jwt.verify(tokens[1], this.randomsecret);
                } catch (err) {
                    return res.status(401).json({ message: "Invalid Token"});
                }
                return next();
            } else {
                return res.status(401).json({ message: "No Token found"});
            }
        } else {
            return res.status(401).json({ message: "No Authorization header fourd"});
        }
    };

}