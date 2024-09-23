import express from "express";
import pages from "./routes/pages.js";
import api from "./routes/api.js";
const app = express();

app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use('/pages', pages);
app.use('/api', api);
app.use(express.static('./public'));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});