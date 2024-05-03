let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$3OyxWwv1yemF4vpIU/LqCOM/bZQ49CQLaJeSqDHn7Ltj38jBSOWIS',
        name: '김사과',
        email: 'apple@aplle.com',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    },
    {
        id: '2',
        username: 'banana',
        password: '$2b$10$3OyxWwv1yemF4vpIU/LqCOM/bZQ49CQLaJeSqDHn7Ltj38jBSOWIS',
        name: '반하나',
        email: 'banana@aplle.com',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    }
]

//아이디(username) 중복 검사
export async function findByUsername(username){
    return users.find((user)=>user.username === username);
}

// id 중복검사
export async function findById(id){
    return users.find((user)=>user.id === id);
}


//회원가입
export async function createUser(user){
    const created = {id:'10', ...user}
    users.push(created);
    return created.id;
};

export async function login(username){
    return users.find((user)=>user.username === username);
};