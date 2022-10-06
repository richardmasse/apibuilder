import fetch from "node-fetch";
import yaml from 'yaml';
import fs from 'fs';

let fileContents = fs.readFileSync('./config.yml', 'utf8');
let config: any = yaml.parse(fileContents);

// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJhcGk6Ly9iMWY1MDZmMS00ZjBiLTQ1MTEtODI3My03MjY5ZWM1NWFhNGYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xYTk2Y2QwNi1jNDI3LTQ4ZjQtODI5OS00ZDgxZTFmODJlMmIvIiwiaWF0IjoxNjQ5NzkzMDk4LCJuYmYiOjE2NDk3OTMwOTgsImV4cCI6MTY0OTc5Nzc1OSwiYWNyIjoiMSIsImFpbyI6IkFXUUFtLzhUQUFBQUx4N1ZkQjJlbUExMFdOSkJGU2lPcUt3OHJtOWN5VVBhV3JvaTh4eitEajAwVm90RmdRak1FSmxUNmVYYit5U1BaU2FhVzE2YUMzTU02eExmK2YvekhpN1RybkZsQ1FOc3lXSFZDMTVCeUh5MjNDelJTV3NSRTA3T2NLdFRSeEtYIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImIxZjUwNmYxLTRmMGItNDUxMS04MjczLTcyNjllYzU1YWE0ZiIsImFwcGlkYWNyIjoiMCIsImVtYWlsIjoicmljaGFyZC5tYXNzZUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlJpY2hhcmQiLCJnaXZlbl9uYW1lIjoiTWFzc2UiLCJpZHAiOiJsaXZlLmNvbSIsImlwYWRkciI6Ijg4LjE3My4xNzkuNzIiLCJuYW1lIjoiTWFzc2UgUmljaGFyZCIsIm9pZCI6Ijg4ZTJiYzIzLTI1YTYtNDdmZC04NWE0LTQ5YWUyMDJiYjQyNiIsInJoIjoiMC5BVGtBQnMyV0dpZkU5RWlDbVUyQjRmZ3VLX0VHOWJFTFR4RkZnbk55YWV4VnFrODVBQWMuIiwic2NwIjoiYWNjZXNzX2FwaSIsInN1YiI6ImZWMGJSS240YlFKYTlPTXlDUmt3NjRSSDdBLXl4dzQtd0MyWVlYc2RuX3ciLCJ0aWQiOiIxYTk2Y2QwNi1jNDI3LTQ4ZjQtODI5OS00ZDgxZTFmODJlMmIiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI3JpY2hhcmQubWFzc2VAZ21haWwuY29tIiwidXRpIjoiSTJhMmx2UjYxRUtCU1VWMHc3WVpBQSIsInZlciI6IjEuMCJ9.K0wAp9RVpXhKs04bTTC2VlnbVG3MA4HMIjfAnriI-vwAnwmZ_GHnpcyTuf6D_RiA-wn7GG3PAxpcMv_zqNgAPyHEiBQ-WfHNTbOWTi8fcXZZl0Tp0uAduz0zGPLPsJ0bShR78AxVRqxQSKE14wRA1OMh39-MJkV039RkTq9Q5ya2j3t-17_o3l3R8R71YK7YJnprpLf1mYJfYEyHXMxP3RfPMSe74NCpqbDjm4jG1a2b_ntGOrR_Teki6Bc5vlDxLTGRvUMaEF55cOegLOCKAg7zl1zzmackesOdP0CwHTFlmhQMQ5JP-PhVvrEs2iOGEzrAhXUaIkj4DguNssHMJw";
// const key = "-----BEGIN CERTIFICATE-----\n" + key + "\n-----END CERTIFICATE-----";

// const a = jwt.verify(token, key);

// console.log(a);


// const data = fetch("https://login.microsoftonline.com/common/discovery/keys").json();

// var data;

// const request = async () => {
//     const response = await fetch("https://login.microsoftonline.com/common/discovery/keys");
//     data = await response.json();
//     //console.log(json);
// }

// // request().then(d => date = d);


console.log(config);

// data.keys.forEach(key => {
//     console.log(key.x5c);
// });

// const payload ='{  "aud": "api://b1f506f1-4f0b-4511-8273-7269ec55aa4f",  "iss": "https://sts.windows.net/1a96cd06-c427-48f4-8299-4d81e1f82e2b/",  "iat": 1649793098,  "nbf": 1649793098,  "exp": 1649797759,  "acr": "1",  "aio": "AWQAm/8TAAAALx7VdB2emA10WNJBFSiOqKw8rm9cyUPaWroi8xz+Dj00VotFgQjMEJlT6eXb+ySPZSaaW16aC3MM6xLf+f/zHi7TrnFlCQNsyWHVC15ByHy23CzRSWsRE07OcKtTRxKX",  "amr": [    "pwd"  ],  "appid": "b1f506f1-4f0b-4511-8273-7269ec55aa4f",  "appidacr": "0",  "email": "richard.masse@gmail.com",  "family_name": "Richard",  "given_name": "Masse",  "idp": "live.com",  "ipaddr": "88.173.179.72",  "name": "Masse Richard",  "oid": "88e2bc23-25a6-47fd-85a4-49ae202bb426",  "rh": "0.ATkABs2WGifE9EiCmU2B4fguK_EG9bELTxFFgnNyaexVqk85AAc.",  "scp": "access_api",  "sub": "fV0bRKn4bQJa9OMyCRkw64RH7A-yxw4-wC2YYXsdn_w",  "tid": "1a96cd06-c427-48f4-8299-4d81e1f82e2b",  "unique_name": "live.com#richard.masse@gmail.com",  "uti": "I2a2lvR61EKBSUV0w7YZAA",  "ver": "1.0"}';
// const json = JSON.parse(payload);

// console.log(json["scp"]);
// const data = retrieveMsKeys();

