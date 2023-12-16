// Majed Alshehri 2142466
// Bader Alghamdi 2142471
// Alhussain Essa 2143991
// Ibrahim Alammary 2142267

// create the server
const express = require("express");
const app = express();

// static routing
app.use("/", express.static("./assets"));

// Express-validator
const { check, validationResult } = require("express-validator");
let formValidation = getFormValidation();

//html routing
app.use(express.urlencoded({ extended: false }));
app.post("/process", formValidation, (request, response) => {
  const errors = validationResult(request);
  let msg = "";
  if (!errors.isEmpty()) {
    msg =
      "<h1>Sorry,we found validation errors with your sumbission </h1>" +
      "<p> you can try again <a href='register.html'>  here <a/></p>" +
      "These are the validation errors: ";
    msg += printErrors(errors.array());
    response.send(msg);
  } else {
    //no errors
    const fname = request.body.fname;
    const lname = request.body.lname;
    const mobile = request.body.mobile;
    const email = request.body.email;
    const password = request.body.password;
    const gender = request.body.gender;
    addUser(fname, lname, mobile, email, password, gender);
    msg =
      "<h1>Thank you. your account was created.</h1>" +
      "<p> you can sign in <a href='login.html'>  here <a/></p>";
    response.send(msg);
  }
});

//print errors function
function printErrors(errArray) {
  let errors = [];
  for (let index = 0; index < errArray.length; index++) {
    let err = errArray[index]["msg"];
    let msg = "<p style='color:red'>-" + err + "</p>";
    errors.push(msg);
  }
  return errors.join("");
}

//validation function
function getFormValidation() {
  return [
    //first name validation
    check("fname")
      .isLength({ min: 1, max: 100 })
      .withMessage("First name must be between 1 and 100 chars.") //length
      .isAlpha() //datatype
      .withMessage("First name must be an English character")
      .trim()
      .escape(), //delete anay spaces 
    //last name validation
    check("lname")
      .isLength({ min: 1, max: 100 })
      .withMessage("Last name must be between 1 and 100 chars.") //length
      .isAlpha() //datatype
      .withMessage("Last name must be an English character")
      .trim()
      .escape(),
    //mobile validation
    check("mobile")
      .matches(/^05[0-9]{8}$/)
      .withMessage("Mobile number must be in the format 05xxxxxxxx")
      .trim()
      .escape(),
    //email validation
    check("email")
      .isEmail()
      .withMessage("Email must be in the format x@y.z")
      .trim()
      .escape(),
    //password validation
    check("password")
      .isLength({ min: 8, max: 40 })
      .withMessage("Password must be between 8 and 40 chars.") //length
      .trim()
      .escape(),
    //gender validation
    check("gender")
      .custom((val) => {
        const whitelist = ["انثى", "ذكر"];
        if (whitelist.includes(val)) return true;
        return false;
      })
      .withMessage("Selection is not from the provided list")
      .trim()
      .escape(),
  ];
}

//login validation
app.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  if (email.length > 0 && password.length > 0) {
    loginUser(email, password, (err, result) => {
      if (err) {
        console.log(err);
        response.send("<h1>حدث خطأ أثناء تسجيل الدخول</h1>");
      } else {
        if (result.length > 0) {
          response.send(
            "<h1>تم تسجيل الدخول بنجاح</h1> <p> .للذهاب الى الصفحة الرئيسية<a href='index.html'> اضغط هنا <a/></p>"
          );
        } else {
          response.send("<h1>بيانات الدخول غير صحيحة</h1>");
        }
      }
    });
  } else {
    response.send("<h1>الرجاء إدخال البريد الإلكتروني وكلمة المرور</h1>");
  }
});

//login user
function loginUser(email, password, callback) {
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    port: "8889",
    database: "projectweb",
  });

  db.connect(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    let sql = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
    db.query(sql, function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
      // Close the connection
      db.end();
    });
  });
}
//adding users
function addUser(fname, lname, mobile, email, password, gender) {
  //connection
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    port: "8889",
    database: "projectweb",
  });
  db.connect(function (err) {
    //sql command
    let sql = `INSERT INTO user (fname, lname, mobile, email, password, gender) VALUES ('${fname}', '${lname}', '${mobile}', '${email}', '${password}' ,'${gender}')`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      //close the connection
      db.end();
    });
  });
}
//server
const port = 8000;
app.listen(port, () => {
  console.log("server is running on port " + port);
});
