const fs = require('fs');

const person = {
    name: "Cahaya Indrasma",
    age: 22,
    city: "Pekanbaru"
}

fs.writeFile('person.json', JSON.stringify(person), (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Data has been written to person.json')
})