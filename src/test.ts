import fetch from "node-fetch";
import yaml from 'yaml';
import fs from 'fs';

let fileContents = fs.readFileSync('./config.yml', 'utf8');
let config: any = yaml.parse(fileContents);



console.log(config);

