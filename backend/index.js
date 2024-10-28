const express = require("express");
const cors = require("cors");

const app = express();

// Config json reponse
app.use(express.json());

//Solve cors

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Public folder for images
app.use(express.static("public"));

//Import de Routes
const UserRoutes = require("./routes/UserRoutes");

//Routes
app.use("/users", UserRoutes);

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Rodando");
});
