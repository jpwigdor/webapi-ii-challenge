const express = require("express");

/* 



*/

const db = require("./db");
const router = express.Router();

// POST - "/api/posts"

// POST - "/api/posts/:id/comments"

// GET - "/api/posts"
router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the Posts"
    });
  }
});

// GET - "/api/posts/:id"

// GET - "/api/posts/:id/comments"

// DELETE - "/api/posts/:id"

// DELETE - "/api/posts/:id"

module.exports = router;
