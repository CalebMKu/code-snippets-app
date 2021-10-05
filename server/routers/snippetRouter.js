const router = require("express").Router();
const Snippet = require("../models/snippetsModel");

// CRUD - Create
router.post("/", async (req, res) => {
  try {
    const { title, description, code } = req.body;

    // validation
    if (!description && !code) {
      return res.status(400).json({ errorMessage: "You need to enter at least a description or some code." });
    }

    // create a new snippet
    const newSnippet = new Snippet({
      title,
      description,
      code
    });

    const savedSnippet = await newSnippet.save(); // saves 'newSnippet' to the database
  } catch (error) {
    res.status(500).send();
  }
});

// CRUD - Read
router.get("/", async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (error) {
    res.status(500).send();
  }
});

// CRUD - Update (currently unavailable)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, code } = req.body;
    const snippetId = req.params.id;

    // validation 
    if (!description && !code) {
      return res.status(400).json({ errorMessage: "You need to enter at least a description or some code." });
    }

    const originalSnippet = await Snippet.findById(snippetId);
    if (!originalSnippet) {
      return res.status(400).json({ errorMessage: "Snippet ID not given. Please contact the developer." });
    }
  } catch (error) {
    res.status(500).send();
  }
  
  originalSnippet.title = title;
  originalSnippet.description = description;
  originalSnippet.code = code;

  const savedSnippet = await originalSnippet.save();

  res.json(savedSnippet);
})

// CRUD - Delete/Destroy
router.delete("/:id", async (req, res) => {
  try {
    const snippetId = req.params.id;

    // validation 
    if (!snippetId) {
      return res.status(400).json({ errorMessage: "Snippet ID not given. Please contact the developer." });
    }

    const existingSnippet = await Snippet.findById(snippetId);
    if (!existingSnippet) {
      return res.status(400).json({ errorMessage: "Snippet ID not given. Please contact the developer." });
    }

    await existingSnippet.delete(); // Deletes snippet from the database

    res.json(existingSnippet);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;