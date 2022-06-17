const db = require("../config/db");

class Comment {
  async createComment(comment) {
    let sql = `
          INSERT INTO comment (content, user_id, post_id, img_url)
          VALUES('${comment.content}', '${comment.user_id}', '${comment.post_id}', '${comment.img_url}') 
          `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
  async getComment(id) {
    let sql = `
    SELECT * FROM comment WHERE post_id='${id}'
    `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
  async getOneComment(id) {
    let sql = `
    SELECT * FROM comment WHERE id='${id}'
    `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
  async getAllComment() {
    let sql = `
    SELECT * FROM comment
    `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
  async deleteComment(comment) {
    let sql = `
    DELETE FROM comment WHERE id='${comment}'
    `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
  async deleteAllComment(post_id) {
    let sql = `
    DELETE FROM comment WHERE post_id='${post_id}'
    `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
}
module.exports = Comment;
