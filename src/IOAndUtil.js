import fs from 'fs'
import path from 'path'
import os from 'os'
import util from 'util'

export function IOHandle() {

    const pathDir = "/Users/yukenz/WebstormProjects/Week2-Backend-Fundamental-MVC/src/jsonDir/users.json"

    const basename = path.basename(pathDir);
    const dirname = path.dirname(pathDir);


    // console.log(basename, dirname)

    return fs.readFileSync(path.resolve(dirname, basename), "utf-8")

}

export function OSRead() {

    return {
        OS: os.type(),
        totalMem: os.totalmem(),
        freeMem: os.freemem()
    }
}

export function utilUsage(callback) {

    const asyncFunction = util.promisify(setTimeout);

    asyncFunction(2000).then(() => {
        callback()
    });

}