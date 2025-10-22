import express from "express";
import Recipe from "../models/recipe.js";

const router = express.Router();

// Get top recipes (sorted by likes)
router.get("/top", async (req, res) => {
  try {
    const topRecipes = await Recipe.find().sort({ likes: -1 }).limit(6);
    res.json(topRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const allRecipes = await Recipe.find().sort({ likes: -1 });
    res.json(allRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single recipe by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like/unlike recipe by Gmail ID
router.patch("/:id/like", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    let liked;
    if (recipe.likedBy.includes(email)) {
      // Unlike
      recipe.likedBy = recipe.likedBy.filter(e => e !== email);
      recipe.likes = Math.max(recipe.likes - 1, 0);
      liked = false;
    } else {
      // Like
      recipe.likedBy.push(email);
      recipe.likes = recipe.likedBy.length; // keep in sync
      liked = true;
    }

    await recipe.save();
    res.json({ likes: recipe.likes, liked });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
