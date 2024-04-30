let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$3QIMI5eNCX6HiY9kwXBtuew91q4kGZsoeMJ8mtUHiG5tRZd9LuVea',
        name: '김사과',
        email: 'apple@aplle.com',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    }
]

//회원가입
export async function createUser(username, password, name, email){
    const user = {
        id: '10',
        username,
        password,
        name,
        email,
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    }
    users = [user, ...users];
    return users;
};

export async function login(username){
    return users.find((user)=>user.username === username);
};