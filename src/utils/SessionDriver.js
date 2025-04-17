import fs from "fs";
import path from "path";
import JSONDBDriver from "./JSONDBDriver";


//SingleTon
export class SessionDriver {

    _dbDir = "/Users/yukenz/WebstormProjects/Week2-Backend-Fundamental-MVC/src/mvc/db"
    _sessionDB = new JSONDBDriver(path.resolve(this._dbDir, "session.json"))

    read() {
        return this._sessionDB.read()
    }

    isHave() {

        const session = this._sessionDB.read();

        return session?.username ? true : false

    }

    write(sessionObject) {
        return this._sessionDB.write(sessionObject)
    }

    flush() {

        this._sessionDB.write([])
        return true
    }

    match(property = "id", expect) {

        //Jika property di session ada
        const readProperty = this.read()[property];
        if (readProperty) {
            return readProperty === expect
        }

        return null

    }

}