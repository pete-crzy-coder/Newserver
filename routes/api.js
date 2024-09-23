import { Router } from "express";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.use((req, res, next) => {
  res.set("Content-Type", "application/json");
  console.log(`${req.method} ${req.url}`);
  next();
});

router.post("/register", async (req, res, next) => {
  try {
    // Check if req.body exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error('Request body is empty or undefined');
    }
    
    const id = uuidv4();
    fs.writeFile(`./users/${id}.json`, JSON.stringify({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }));

    res.status(201).send(JSON.stringify({
      success: true,
      message: "User registered successfully",
      id: id,
      jwt: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        jwt: btoa(JSON.stringify({
          id,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        })),
      },
    }));

    console.log(" 201 Created");
  } catch (error) {
    next(error);
  }
});

router.get("/login", async (req, res, next) => {
  try {
    const user = await fs.readFile(`./users/${req.query.id}.json`, "utf8");
    res.send(JSON.stringify({
      success: true,
      message: "User logged in successfully",
      user: JSON.parse(user),
    }));
  } catch (error) {
    next(error);
  }
});

export default router;