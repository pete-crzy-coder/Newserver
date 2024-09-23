import { Router } from "express";
import { promises as fs } from "fs";

const router = Router();

router.use((req, res, next) => {
    res.set("Content-Type", "text/html");
    console.log(`${req.method} ${req.get('user-agent')}`);
    next();
})

router.get("/index", async (req, res, next) => {
  try {
    const page = await fs.readFile("./pages/index.html");
    res.send(page);
  } catch (error) {
    next(error);
  }
});

export default router;