const allUsers = [
    {
        user_id : "1", 
        name : "user1",
        email : "user1@gmail.com",
        password : "123",
        chat_ids : [
            {
                chatid : "1234",
            },
            {
                chatid : "1111"
            }
        ]
    },
    {
        user_id : "2", 
        name : "user2",
        email : "user2@gmail.com",
        password : "123",
        chat_ids : [
            {
                chatid : "1234",
            },
            {
                chatid : "2222"
            }
        ]
    },
    {
        user_id : "3", 
        name : "user3",
        email : "user3@gmail.com",
        password : "123",
        chat_ids : [
            {
                chatid : "2222",
            },
            {
                chatid : "1111"
            }
        ]
    }
]

module.exports = {allUsers}