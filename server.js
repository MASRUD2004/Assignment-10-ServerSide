import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Recipe from "./models/Recipe.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    "https://marvelous-pastelito-00feb3.netlify.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ========================
// ROUTES
// ========================

// Get top 6 recipes by likes
app.get("/recipes/top", async (req, res) => {
  try {
    const topRecipes = await Recipe.find().sort({ likes: -1 }).limit(6);
    res.json(topRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all recipes
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find().sort({ likes: -1 });
    res.json(allRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single recipe by numeric ID
app.get("/recipes/:id", async (req, res) => {
  const id = Number(req.params.id); // convert to number
  try {
    const recipe = await Recipe.findOne({ _id: id }); // <--- change here
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Like/unlike recipe
app.patch("/recipes/:id/like", async (req, res) => {
  const id = Number(req.params.id);
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const recipe = await Recipe.findOne({ _id: id });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    let liked;
    if (recipe.likedBy.includes(email)) {
      // Unlike
      recipe.likedBy = recipe.likedBy.filter((e) => e !== email);
      recipe.likes = Math.max(recipe.likes - 1, 0);
      liked = false;
    } else {
      // Like
      recipe.likedBy.push(email);
      recipe.likes += 1;
      liked = true;
    }

    await recipe.save();
    res.json({ likes: recipe.likes, liked });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new recipe
app.post("/recipes", async (req, res) => {
  const {
    title,
    cuisine,
    image,
    description,
    ingredients,
    instructions,
    prepTime,
    categories,
    user,
  } = req.body;

  if (!title || !user?.name || !user?.email)
    return res.status(400).json({ error: "Title and user info required" });

  try {
    const newRecipe = new Recipe({
      _id: Date.now(), // numeric ID
      title,
      cuisine,
      image,
      description,
      ingredients,
      instructions,
      prepTime,
      categories,
      user: {
        name: user.name,
        email: user.email,
        profilePic:
          user.profilePic || "https://source.unsplash.com/50x50/?portrait",
      },
      likes: 0,
      likedBy: [],
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recipes by user email
app.get("/recipes/my/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const myRecipes = await Recipe.find({ "user.email": email }).sort({
      likes: -1,
    });
    res.json(myRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete recipe (only owner)
app.delete("/recipes/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const recipe = await Recipe.findOne({ _id: id });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    if (recipe.user.email !== email)
      return res
        .status(403)
        .json({ error: "You can only delete your own recipes" });

    await Recipe.findOneAndDelete({ _id: id });
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update recipe (only owner)
app.put("/recipes/:id", async (req, res) => {
  const id = Number(req.params.id);
  const {
    title,
    cuisine,
    image,
    description,
    ingredients,
    instructions,
    prepTime,
    categories,
    email,
  } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const recipe = await Recipe.findOne({ _id: id });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    if (recipe.user.email !== email)
      return res.status(403).json({ error: "You can only update your own recipes" });

    // Update only provided fields
    recipe.title = title || recipe.title;
    recipe.cuisine = cuisine || recipe.cuisine;
    recipe.image = image || recipe.image;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.prepTime = prepTime || recipe.prepTime;
    recipe.categories = categories || recipe.categories;

    await recipe.save();
    res.json({ message: "Recipe updated successfully", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));

