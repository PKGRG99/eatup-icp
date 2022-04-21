import bcrypt from "bcryptjs";

const users = [
   {
      name: "Admin User",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
   },
   {
      name: "Sandeep Gurung",
      email: "sandeep@gmail.com",
      password: bcrypt.hashSync("123456", 10),
   },
   {
      name: "Test User",
      email: "user@test.com",
      password: bcrypt.hashSync("123456", 10),
   },
];

export default users;
