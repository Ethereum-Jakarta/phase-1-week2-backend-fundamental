export function isStringFieldValid(...fields) {

    //setiap array harus benar diceknya jika lolos true
    return fields.every(field => field && /^\w+$/g.test(field))

}