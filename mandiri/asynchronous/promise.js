//asynchronous

const token = ~~[Math.random() * 12345678];

const pictures = ["1.jpg", "2.jpg", "3.jpg"]

function login(username) {
    console.log("processing token user now...")
    return new Promise((success, failed) => {
        setTimeout(() => {
            if (username !== "cahaya") failed("sorry wrong data")
            success({ token })
        }, 200)
    })

}

function getUser(token) {
    console.log("processing apikey now...")
    return new Promise((success, failed) => {
        if (!token) failed("Sorry, no token. Cannot Access")
        if (token) {
            setTimeout(() => {
                success({ "apiKey": "xkey123" })
            }, 500)
        }
    })
}

function getPictures(apiKey) {
    console.log("processing pictures now...")
    return new Promise((success, failed) => {
        if (!apiKey) failed("sorry, no apikey. Cannot Access")
        if (apiKey) {
            setTimeout(() => {
                success({ pic: pictures })
            }, 1500)
        }
    })

}

const user = login("cahaya")
user.then(function (response) {
    // console.log(response)
    const { token } = response
    // console.log(token)

    getUser(token).then(function (response) {
        console.log(response)
        const { apiKey } = response;
        console.log(apiKey)

        getPictures(apiKey).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.error(error)
        })
    }).catch(function (error) {
        console.error(error)
    })
}).catch(function (error) {
    console.error(error)
})