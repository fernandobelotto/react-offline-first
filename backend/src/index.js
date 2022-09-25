import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes.js";
import { db } from "./typeorm.js";

const app = express();

// just to slowdown a little bit
app.use(function(req,res,next){ setTimeout(next,250) });

app.use(cors());

app.use(morgan("tiny"));

app.use(express.json());

app.use("/", router);

app.listen(3000, () => {
  db.initialize()
    .then((res) => console.log("db working"))
    .catch((error) => console.log("error running db"));
  console.log("listening on http://locahost:3000");
});
