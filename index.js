const {Encrypt,Decrypt} = require("./cryptoApp")
const{scheduleTask} =require("./scheduleApp")

let name ="Arya Enrico";
let encrypt =Encrypt(name,"rahasia");
let decrypt =Decrypt(encrypt,"rahasia");
console.info(decrypt);
scheduleTask();

