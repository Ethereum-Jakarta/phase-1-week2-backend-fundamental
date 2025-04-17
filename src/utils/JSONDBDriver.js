import fs from "fs";
import e from "express";

export default class JSONDBDriver {

    _filepath

    constructor(filePath) {
        this._filepath = filePath
    }

    read() {

        const readFile = fs.readFileSync(this._filepath).toString();

        //Jika file kosong
        if (!readFile) {
            return []
        }

        return JSON.parse(readFile);

    }

    write(obj) {
        fs.writeFileSync(this._filepath, JSON.stringify(obj, null, 2), "utf-8")
        return true
    }

    flush() {
        fs.writeFileSync(this._filepath, "", "utf-8")
    }

}