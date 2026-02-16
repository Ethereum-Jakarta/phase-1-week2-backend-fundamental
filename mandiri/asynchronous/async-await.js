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

// const user = login("cahaya");
// console.log(user)
//pending

async function userDisplay() {
    try {
        const { token } = await login("cahaya");
        // console.log(token)
        const { apiKey } = await getUser(token);
        // console.log(apiKey)
        const { pic } = await getPictures(apiKey);
        // console.log(pic)

        console.log(`
        token anda adalah: ${token}
        apikey anda adalah: ${apiKey}
        hasil request gambar berikut ini: ${pic}
        `)
    } catch (error) {
        console.error(error)
    }
}

userDisplay()