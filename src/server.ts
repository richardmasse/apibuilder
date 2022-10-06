//Initiallising node modules
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import yaml from 'yaml';
import fs from 'fs';
import { Console } from 'console';
import bodyParser from "body-parser";

// Initialize Application
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

if (process.argv[2] == undefined || 
    process.argv[2] == null ||
    fs.existsSync(process.argv[2])) {
        new Error("No configuration file found");
}

// load config 
let fileContents = fs.readFileSync(process.argv[2], 'utf8');
let config: any = yaml.parse(fileContents);

import sqlImport from './modules/sql';

const sql = new sqlImport(config);

// Dynamic build auth middleware
async function loadAuth(): Promise<Map<String, any>> { 
    
    var auths = new Map<String, any>();

    await config.auth.forEach((auth: any)  => {
        // load auth middleware
        import('./modules/auth/' + auth.name).then(({default: authValidatorImport}) => {
            try {
                const authValidator = new authValidatorImport(app, config, auth);
                auths.set(auth.name, authValidator.verifyToken);
            } catch (err) {
                console.log('new failed!', err);
            }
        });
    });

    return auths;
}

function createRoute(authMap: Map<String, any>) {
    // Dynamic build api
    config.api.rest.forEach((api: any) => {

        if (api.type === 'get') {
            if (api.auth !== undefined && api.auth !== null) {
                app.get(config.api.base + api.path, authMap.get(api.auth), (req,res) => {
                    sql.executeQueryNew(res, api.query, req.params);
                })
            } else {
                app.get(config.api.base + api.path, (req,res) => {
                    sql.executeQueryNew(res, api.query, req.params);
                })     
            }
        } 
        else if (api.type === 'post') {
            if (api.auth !== undefined && api.auth !== null) {
                app.post(config.api.base + api.path, authMap.get(api.auth), (req,res) => {
                    sql.executeQueryNew(res, api.query, req.body);
                }) 
            } else {
                app.post(config.api.base + api.path, (req,res) => {
                    sql.executeQueryNew(res, api.query, req.body);
                }) 

            }
        } 
        else if (api.type === 'put') {
            if (api.auth !== undefined && api.auth !== null) {
                app.put(config.api.base + api.path, authMap.get(api.auth), (req,res) => {
                    sql.executeQueryNew(res, api.query, req.params);
                })
            } else {
                app.put(config.api.base + api.path, (req,res) => {
                    sql.executeQueryNew(res, api.query, req.params);
                }) 
            }
        } else if (api.type === 'delete') {
            if (api.auth !== undefined && api.auth !== null) {
                app.delete(config.api.base + api.path, authMap.get(api.auth), (req,res) => {
                    sql.executeQueryNew(res, api.query, req.params);
                })
            } else {
                app.delete(config.api.base + api.path, (req,res) => {
                    sql.executeQueryNew(res, api.query, req.params);
                }) 
            }
        } else {

        }

    });
}

loadAuth().then(authsMap => { 
    createRoute(authsMap);
});

// Start server
app.listen(config.node.port, () => {
    console.log("Serveur Node à l'écoute sur port : " + config.node.port);
})

