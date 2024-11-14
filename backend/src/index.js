import express from "express";
import cors from "cors";

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello Backend!</h1>");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});


