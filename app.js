const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const { v4: uuidv4 } = require("uuid");

const app = express();

let items = [
  { id: uuidv4(), todo: "Buy Food" },
  { id: uuidv4(), todo: "Cook Food" },
  { id: uuidv4(), todo: "Eat Food" },
];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items,
  });
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work",
    newListItems: workItems,
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push({ id: uuidv4(), todo: item });
    res.redirect("/work");
  } else {
    items.push({ id: uuidv4(), todo: item });
    res.redirect("/");
  }
});

app.post("/delete", (req, res) => {
  const idToDelete = req.body.idToDelete;
  const listType = req.body.listType;

  if (listType === "work") {
    workItems = workItems.filter((workItem) => workItem.id !== idToDelete);
    res.redirect("/work");
  } else {
    items = items.filter((item) => item.id !== idToDelete);
    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
