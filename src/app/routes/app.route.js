import { Controller } from "../controllers/user.controller.js";
import multer from 'multer';
import express from "express";
import {Book} from '../models/book.model.js'
import path from 'path'
import fs from 'fs'
var router = express.Router();

async function AdminRouter() {

 // SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage })


router.get('/book-list' , (req , res) => {
  Book.find((err , docs) => {
    if(err) throw err;
    res.render('../src/app/views/pages/book/BookList.ejs', {BookItems : docs})
  })
})

router.get('/add-book', (req, res) => {
  res.render('../src/app/views/pages/book/addBook.ejs');
});

router.get('/book' , ( req ,res ) => {
    res.render('../src/app/views/pages/book/homeBook.ejs')
})

router.post('/add-book', upload.single('img'), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var obj = {
  title: req.body.title,
  desc: req.body.desc,
  year : req.body.year,
  image: {
    contentType:req.file.mimetype,
    data:new Buffer(encode_img,'base64')
  }
}
Book.create(obj, (err, item) => {
  if (err) {
    console.log(err);
  }
  else {
    item.save();
    res.redirect('/add-book');
  }
});
});  


  

  /**
   * @description get users
   * @method GET /
   */

  router.get("/users", (req, res) => {
    Controller.getData(function (data) {
      res.render("../src/app/views/pages/index.ejs", { users: data });
    });
  });

  /**
   * @description add users
   * @method GET /
   */

  router.get("/users/add", (req, res) => {
    res.render("../src/app/views/pages/add.ejs");
  });

  /**
   * @description update users
   * @method GET /
   */

  router.get("/users/edit/:id", (req, res) => {
    const name = req.body.name;
    const firstname = req.body.firstname;
    const age = req.body.age;

    Controller.UpdateUser(req.params.id, name, firstname, age, (data) => {
      res.render("../src/app/views/pages/edit.ejs", { myuser: data });
    });
  });

  /**
   * @description delete users
   * @method GET /
   */

  router.get("/users/:id", (req, res) => {
    Controller.DeleteUser(req.params.id, () => {
      console.log("User deleted ");
    });

    Controller.getData((data) => {
      res.render("../src/app/views/pages/index.ejs", { users: data });
    });
  });


  //API
  router.get("/users", (req, res) => {
    Controller.getData(function (data) {
      res.render("../src/app/views/pages/index.ejs", { users: data });
    });
  });

  //post
  router.post("/users/add", (req, res) => {
    const name = req.body.name;
    const firstname = req.body.firstname;
    const age = req.body.age;

    Controller.AddUserData(name, firstname, age, () => {
      console.log("data added successfully!!");
    });

    res.render("../src/app/views/pages/add.ejs");
  });

  //update

  router.post("/users/edit/:id", (req, res) => {
    const name = req.body.name;
    const firstname = req.body.firstname;
    const age = req.body.age;

    Controller.UpdateUser(req.params.id, name, firstname, age, (data) => {
      res.render("../src/app/views/pages/edit.ejs", { myuser: data });
    });
  });

  //delete users


  router.delete("/users/:id", (req, res) => {
    Controller.DeleteUser(req.params.id, () => {
      console.log("User deleted ");
    });
  });
}
export { AdminRouter, router };
