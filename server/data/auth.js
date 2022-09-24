// abcd1234 : $2b$12$c.0lHBsn3J2u.gzJTq0DQevnBLhUhTRbKZ9uveaWDWMnDTHXjVLAG round 10

let users = [
    {
        id: "1",
        username: "bob",
        password:
            "$2b$12$c.0lHBsn3J2u.gzJTq0DQevnBLhUhTRbKZ9uveaWDWMnDTHXjVLAG",
        name: "Bob",
        email: "bob@gmail.com",
        url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png",
    },
    {
        id: "2",
        username: "ellie",
        password:
            "$2b$12$c.0lHBsn3J2u.gzJTq0DQevnBLhUhTRbKZ9uveaWDWMnDTHXjVLAG",
        name: "Ellie",
        email: "ellie@gmail.com",
        url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png",
    },
];

export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}

export async function findById(id) {
    return users.find((user) => user.id === id);
}

export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
}
