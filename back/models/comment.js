const db = require("../config/db");

class Comment {
  async createComment(comment) {
    let sql = `
          INSERT INTO comment (content, user_id, post_id)
          VALUES('${comment.content}', '${comment.user_id}', '${comment.post_id}') 
          `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
  async getOneComment(comment) {
    let sql = `
    SELECT * FROM comment WHERE id='${comment}'
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
  async updateComment(commentReq, result) {
    let sql = `
    UPDATE comment SET content = '${commentReq.content}', 
    img_url = '${commentReq.img_url}' WHERE id = '${result}'
    `;
    const [newComment] = await db.execute(sql);
    return newComment;
  }
}
module.exports = Comment;
