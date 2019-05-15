const express = require("express");

/* 



*/

const db = require("./db");
const router = express.Router();

// POST - "/api/posts"
router.post("/", async (req, res) => {
  const post = req.body;
  const { title, contents } = req.body;

  if (title && contents) {
    try {
      const addPost = await db.insert(post);
      res.status(201).json(addPost);
    } catch (err) {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

// POST - "/api/posts/:id/comments"
router.post("/:id/comments", async (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  //messages should have text and a post_id.

  try {
    const saved = await db.insertComment(commentInfo);
    console.log(commentInfo);
    if (commentInfo) {
      res.status(201).json(saved);
    } else {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist"
      });
    }
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment.",
      err
    });
  }
});

// GET - "/api/posts"
router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved"
    });
  }
});

// GET - "/api/posts/:id"
router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the post"
    });
  }
});

// GET - "/api/posts/:id/comments"
router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await db.findPostComments(id);

    if (comments.length) {
      res.json(comments);
    } else {
      res
        .status(404)
        .json({ err: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The comments information could not be retrieved." });
  }
});

// DELETE - "/api/posts/:id"
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removedPost => {
      res.json(removedPost);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// PUT - "/api/posts/:id"
router.put("/:id", async (req, res) => {
  const editPost = req.body;
  const { title, contents } = req.body;

  if (title && contents) {
    try {
      const updatePost = await db.update(req.params.id, editPost);
      if (updatePost) {
        res.status(200).json(updatePost);
      } else {
        res
          .status(404)
          .json({ messsage: "The post with the specified ID does not exist" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

module.exports = router;
