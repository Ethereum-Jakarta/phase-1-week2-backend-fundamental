//asynchronous

const token = ~~[Math.random() * 12345678];

const pictures = ["1.jpg", "2.jpg", "3.jpg"]

function login(username, callback) {
    console.log("processing token user now...")
    setTimeout(() => {
        callback({ token, username })
        // return { token, username }
    }, 200)
}

function getUser(token, callback) {
    console.log("processing apikey now...")
    setTimeout(() => {
        callback({ "apiKey": "xkey123" })
    }, 500)
}

function getPictures(apiKey, callback) {
    console.log("processing pictures now...")
    setTimeout(() => {
        callback({ pic: pictures })
    }, 1500)
}

login("cahaya", function (response) {
    // console.log("kelas =>", response)
    const { token } = response;
    // console.log("token =>", token)
    getUser(token, function (response) {
        // console.log("apikey =>", response)
        const { apiKey } = response;
        // console.log("apikey =>", apiKey)
        getPictures(apiKey, function (response) {
            // console.log("pictures =>", response)
            const { pic } = response
            console.log(pic)
        })
    })
})