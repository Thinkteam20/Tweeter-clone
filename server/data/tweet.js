import * as authRepository from "./auth.js";

let tweets = [
    {
        id: "1",
        text: "Nice to meet you guys!",
        createdAt: new Date().toString(),
        userId: "1",
    },
    {
        id: "2",
        text: "Hello There",
        createdAt: new Date().toString(),
        userId: "1",
    },
];

export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name, url } = await authRepository.findById(
                tweet.userId
            );
            return { ...tweet, username, name, url };
        })
    );
}

export async function getAllByUsername(username) {
    // return tweets.filter((tweet) => tweet.username === username);
    return getAll().then((tweets) =>
        tweets.filter((tweet) => tweet.username === username)
    );
}

export async function getAllById(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if (!found) {
        return null;
    }
    const { username, name, url } = await authRepository.findById(found.userId);
    return { ...found, username, name, url };
}

export async function create(text, userId) {
    const tweet = {
        id: new Date().toString(),
        text,
        createdAt: new Date(),
        userId,
    };
    tweets = [tweet, ...tweets];
    return getAllById(tweet.id);
}
export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
    }
    // return tweet;
    return getAllById(tweet.id);
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    // console.log(tweets);
}
