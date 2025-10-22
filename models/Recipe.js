import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, // numeric ID, matches seed data
  title: { type: String, required: true },
  cuisine: { type: String },
  image: { type: String }, // URL of the image
  likes: { type: Number, default: 0 },
  description: { type: String },
  ingredients: { type: String }, // optional, can store comma-separated text
  instructions: { type: String }, // optional
  prepTime: { type: Number }, // optional, in minutes
  categories: { type: [String], default: [] }, // e.g., Breakfast, Lunch, Dinner, Vegan
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: {
      type: String,
      default: "https://source.unsplash.com/50x50/?portrait", // default profile pic
    },
  },
  likedBy: { type: [String], default: [] }, // store Gmail IDs
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
