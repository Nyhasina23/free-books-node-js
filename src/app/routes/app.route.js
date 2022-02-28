import { Controller } from "../controllers/user.controller.js";
import express from "express";

var router = express.Router();

async function AdminRouter() {

  router.get('/book' , ( req ,res ) => {
    res.render('../src/app/views/pages/book/homeBook.ejs')
  })


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
