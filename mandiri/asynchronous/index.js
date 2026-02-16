//synchronous

const token = ~~[Math.random() * 12345678];

const pictures = ["1.jpg", "2.jpg", "3.jpg"]

function login(username) {
    return { token, username }
}

function getUser(token) {
    if (token) return { apiKey: "xKey123" }
}

function getPictures(apiKey) {
    if (apiKey) return pictures;
}

const user = login("cahaya_indrasmara")
console.log(user.token)

const { apiKey } = getUser(user.token);
console.log(apiKey)

const getUserPictures = getPictures(apiKey);
console.log(getUserPictures)