const fs = require('fs')

fs.readFile('person.json', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const jsonObject = JSON.parse(data);
    console.log(jsonObject.name)
})
