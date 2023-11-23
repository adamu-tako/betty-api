import express, { Router, Request, Response } from "express";
const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { user, password } = req.body;
    console.log(req.body);

    if (!user || !password) {
      return res
        .status(400)
        .json({ message: "User and password are required", ok: false });
    }

    if (user === "demo" && password === "password") {
      return res.json({ message: "Welcome to Betty", ok: true });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid credentials", ok: false });
    }
  } catch (error) {
    console.error("Error processing login:", error);
    res.status(500).json({ message: "Unable to login", ok: false });
  }
});

export default router;
