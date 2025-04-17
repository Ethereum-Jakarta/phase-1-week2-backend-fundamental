import {test, expect, beforeEach, afterEach} from '@jest/globals'
import {encrypt, decrypt} from "../src/CryptoApp.js";
import {scheduleTask} from "../src/Schedule.js";

test("CryptoApp", function () {

    const myName = "Yuyun Purniawan"
    const key = "awan123"

    // console.log(encrypt)

    const encrypted = encrypt(myName, key);
    const decrypted = decrypt(encrypted, key);

    expect(decrypted).toStrictEqual(myName)

});

test("Schedule", function () {

    const s = scheduleTask();

    console.log(s)

});
