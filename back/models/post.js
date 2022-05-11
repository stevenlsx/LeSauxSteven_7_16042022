const db = require("../config/db");

class Post {
  async createPost(post, url) {
    let sql = `
        INSERT INTO post (content, user_id, img_url)
        VALUES('${post.content}', '${post.user_id}', '${url}') 
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
  async updatePost(post) {
    let sql = `
    UPDATE post SET content = '${post.content}', '${post.img_url}' WHERE id= '${post.id}';
    `;
    const [newPost] = await db.execute(sql);
    return newPost;
  }
}
module.exports = Post;
