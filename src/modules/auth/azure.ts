import jwt from "jsonwebtoken";
import fetch from 'node-fetch';
import * as express from 'express';
import { Auth } from "./auth";

export default class Azure extends Auth {
    //data:any;
    keys = new Map();

    constructor(app: any, config: any, auth: any) {
        super(app, config, auth);
        this.init();
    }

    // retreive microsoft keys
    
    init() {
        fetch(this.auth.jwks_uri)
        .then(response => response.json())
        .then(json => {
            json.keys.forEach((key: any) => {
                this.keys.set(key.x5t, key.x5c);
            });
    
        });
    }

    verifyToken(req : express.Request, res: express.Response, next: any) {
        const token: string | undefined = req.headers['authorization']; 
        
        if (token) {
            // Remove Bearer from string
            var tokens: string[] = token.split(" ");
            
            if (tokens[0] === "Bearer" && tokens[1]) {
                try {
                    const data: string[] = tokens[1].split(".");
                    const buff: Buffer = Buffer.from(data[0], 'base64');
                    const x5t: string =  JSON.parse(buff.toString('ascii')).x5t;
                    const certificatKey: string = "-----BEGIN CERTIFICATE-----\n" + this.keys.get(x5t) + "\n-----END CERTIFICATE-----";
                    const decoded:any = jwt.verify(tokens[1], certificatKey);

                    // check app / tenantId && scp
                    if (this.auth.aplicationId !== decoded.appid ||
                        this.auth.tenantId !== decoded.tid) {
                            return res.status(401).json({ message: "Invalid Token"});
                    } else {
                        if (this.auth.permission) {
                            if (decoded[this.auth.permission.header] !== this.auth.permission.value) {
                                return res.status(401).json({ message: "Invalid permission"});
                            }
                        }
                    }
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