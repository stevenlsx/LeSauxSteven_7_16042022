const db = require("../config/db");

class User {
  async save(user) {
    let sql = `
      INSERT INTO user(
        firstname,
        lastname,
        email,
        password,
        imgpath
      ) VALUES('${user.firstname}','${user.lastname}','${user.email}','${user.password}','${user.imgpath}')
      `;
    console.log(sql);
    const [newUser] = await db.execute(sql);

    return newUser;
  }
  async getUserByEmail(email) {
    let sql = `
    SELECT * FROM user WHERE email='${email}'
    `;
    const [user] = await db.execute(sql);
    return user;
  }
}
module.exports = User;
