import {IOHandle, utilUsage, OSRead} from '../src/IOAndUtil'

import {expect, test} from "@jest/globals";

test('IOAndOS', function () {

    expect(JSON.parse(IOHandle())).toBeDefined()
    expect(OSRead()).toHaveProperty("OS", "Darwin")

});

test('util', function (d) {

    let isAssigned = false

    utilUsage(() => {
        console.log('Delayed task completed.');
        isAssigned = true
        expect(isAssigned).toBeTruthy()
        d()
    })

})