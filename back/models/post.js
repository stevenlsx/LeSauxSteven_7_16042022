const db = require("../config/db");

class Post {
  async createPost(post) {
    console.log(post);
    let sql = `
        INSERT INTO post (content, user_id, img_url)
        VALUES('${post.content}', '${post.user_id}', '${post.img_url}') 
        `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
  async getOnePost(post) {
    let sql = `
    SELECT * FROM post WHERE id='${post}'
    `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
  async getAllPost(post) {
    let sql = `
    SELECT * FROM post
    `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
  async deletePost(post) {
    let sql = `
    DELETE FROM post WHERE id='${post}'
    `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
  async findImg(post) {
    let sql = `
    SELECT img_url FROM post where id='${post}'
    `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
  async updatePost(postReq, result) {
    let sql = `
    UPDATE post SET content = '${postReq.content}', 
    img_url = '${postReq.img_url}' WHERE id = '${result}'
    `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
  async getMyPost(post) {
    console.log(post);
    let sql = `
    SELECT * FROM post WHERE user_id='${post}'
    `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
}
module.exports = Post;
