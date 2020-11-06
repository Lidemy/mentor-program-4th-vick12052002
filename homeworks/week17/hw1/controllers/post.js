/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */

const db = require('../models');

const postModel = db.Post;
const categoryModel = db.Category;

const postController = {
  getPost: (req, res) => {
    const postId = req.params.id;
    postModel.findOne({
      where: {
        id: postId,
      },
      include: categoryModel,
    }).then((post) => {
      if (!post) {
        req.flash('errorMessage', '沒有這篇文章');
        return res.redirect('/');
      }
      res.render('page', { post: post });
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '文章讀取錯誤');
      res.redirect('/');
    });
  },
  deletePost: (req, res) => {
    const postId = req.params.id;
    postModel.findOne({
      where: {
        id: postId,
      },
    }).then((post) => {
      post.update({
        is_deleted: 1,
      });
    }).then(() => {
      res.redirect('back');
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '文章讀取錯誤');
      res.redirect('/');
    });
  },
  addPost: (req, res) => {
    categoryModel.findAll().then((types) => {
      res.render('add_post', { types: types });
    }).catch(err => req.flash('errorMessage', err.toString()));
  },
  handlesAddPost: (req, res, next) => {
    const { content, title, type } = req.body;
    const UserId = res.locals.userId;
    postModel.create({
      title,
      content,
      CategoryId: type,
      UserId,
    }).then(() => {
      req.flash('infoMessage', '文章新增成功！');
      res.redirect('/system');
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '文章新增失敗！請再試一次');
      next();
    });
  },
  updatePost: (req, res) => {
    const postId = req.params.id;
    postModel.findOne({
      where: {
        id: postId,
      },
      include: categoryModel,
    }).then((post) => {
      if (!post) {
        req.flash('errorMessage', '沒有這篇文章');
        return res.redirect('/');
      }
      categoryModel.findAll().then((types) => {
        res.render('update', { post: post, types: types });
      });
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '文章讀取錯誤');
      res.redirect('/');
    });
  },
  handleUpdatePost: (req, res) => {
    const postId = req.params.id;
    const { content, title, type } = req.body;
    postModel.findOne({
      where: {
        id: postId,
      },
    }).then((post) => {
      post.update({
        content: content,
        title: title,
        CategoryId: type,
      });
    }).then(() => {
      console.log('更新 success!');
      res.redirect('/');
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '文章更新失敗');
      res.redirect('/');
    });
  },
  addCategory: (req, res) => {
    res.render('add_category');
  },
  handleAddCategory: (req, res, next) => {
    const { type } = req.body;
    if (!type) {
      req.flash('errorMessage', '未填寫完整');
      return next();
    }
    categoryModel.create({
      type,
    }).then(() => {
      req.flash('infoMessage', '新增成功');
      res.redirect('/system');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      next();
    });
  },
};

module.exports = postController;
