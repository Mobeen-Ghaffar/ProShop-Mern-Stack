
import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Adim",
        email: "admin@212",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true

    },
    {
        name: "John",
        email: "john@212",
        password: bcrypt.hashSync("123456", 10),

    }

]

export default users;
