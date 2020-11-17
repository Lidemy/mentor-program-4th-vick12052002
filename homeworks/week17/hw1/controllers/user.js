/* eslint-disable consistent-return */
/* eslint-disable no-bitwise */
/* eslint-disable object-shorthand */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
const db = require('../models');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const userModel = db.User;
const postModel = db.Post;
const categoryModel = db.Category;

const userController = {
  homePage: (req, res) => {
    postModel.findAll({
      where: {
        is_deleted: 0,
      },
      include: categoryModel,
    }).then((posts) => {
      res.render('index', {
        posts: posts,
      });
    });
  },
  aboutMe: (req, res) => {
    res.render('about_me');
  },
  category: (req, res) => {
    categoryModel.findAll({
      include: postModel,
    }).then((types) => {
      res.render('category', { types: types });
    }).catch(err => req.flash('errorMessage', err.toString()));
  },
  login: (req, res) => {
    res.render('login');
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
  list: (req, res) => {
    postModel.findAll({
      where: {
        is_deleted: 0,
      },
    }).then((posts) => {
      res.render('list', {
        posts: posts,
      });
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '讀取失敗');
    });
  },
  system: (req, res) => {
    postModel.findAll({
      where: {
        is_deleted: 0,
      },
    }).then((posts) => {
      res.render('system', {
        posts: posts,
      });
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '讀取失敗');
    });
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username | !password) {
      req.flash('errorMessage', '必填項目未填寫');
      return next();
    }
    userModel.findOne({
      where: {
        username,
      },
    }).then((user) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', '帳號或密碼錯誤');
          return next();
        }
        console.log('success login!!!');
        req.session.userId = user.id;
        req.session.username = user.username;
        res.redirect('/');
      });
    }).catch((err) => {
      console.log(err.toString());
      req.flash('errorMessage', '使用者不存在');
      return next();
    });
  },
  register: (req, res) => {
    res.render('register');
  },
  handleRegisterUser: (req, res, next) => {
    const { username, password, nickname } = req.body;
    if (!username | !password | !nickname) {
      req.flash('errorMessage', '必填項目未填寫');
      return next();
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      userModel.create({
        username,
        password: hash,
        nickname,
      }).then(() => {
        console.log('註冊成功！');
        userModel.findOne({
          where: username,
        });
      }).then((userData) => {
        req.session.userId = userData.id;
      }).catch(errMessage => req.flash('errorMessage', errMessage.toString()));
      req.session.username = username;
      res.redirect('/');
    });
  },
};
module.exports = userController;
