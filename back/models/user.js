const db = require("../config/db");

class User {
  async save(user) {
    let sql = `
      INSERT INTO user(
        firstname,
        lastname,
        email,
        password,
        img_url
      ) VALUES('${user.firstname}','${user.lastname}','${user.email}','${user.password}','${user.img_url}')
      `;

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
  async getAllUser(user) {
    let sql = `
    SELECT * FROM user
    `;
    const [newUser] = await db.execute(sql);
    return newUser;
  }
  async getUser(id) {
    let sql = `
    SELECT * FROM user WHERE id ='${id}'
    `;
    const [user] = await db.execute(sql);
    return user;
  }
  async deleteUser(id) {
    let sql = `
    DELETE FROM user WHERE id ='${id}'
    `;
    const [user] = await db.execute(sql);
    return user;
  }
}
module.exports = User;
