//parsing json
// const jsonString = '{"name": "John", "age": 30, "city": "New York"}'
// console.log(jsonString)
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name) // output: John

//membuat json
const person = {
    name: "John",
    age: 30,
    city: "New York"
}
const jsonString = JSON.stringify(person);
console.log(jsonString)
// Output: {"name":"John","age":30,"city":"New York"}