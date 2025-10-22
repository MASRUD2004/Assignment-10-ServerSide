import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/recipe.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const recipes = [
  {
    title: "Chocolate Cake",
    cuisine: "Dessert",
    image: "https://source.unsplash.com/301x301/?cake",
    likes: 15,
    description: "A rich and creamy chocolate cake.",
    user: { name: "Alice", profilePic: "https://source.unsplash.com/50x50/?portrait?1" }
  },
  {
    title: "Spaghetti Bolognese",
    cuisine: "Italian",
    image: "https://source.unsplash.com/301x301/?spaghetti",
    likes: 25,
    description: "Classic spaghetti with meaty tomato sauce.",
    user: { name: "Bob", profilePic: "https://source.unsplash.com/50x50/?portrait?2" }
  },
  {
    title: "Veggie Salad",
    cuisine: "Healthy",
    image: "https://source.unsplash.com/301x301/?salad",
    likes: 8,
    description: "Fresh vegetables with light dressing.",
    user: { name: "Charlie", profilePic: "https://source.unsplash.com/50x50/?portrait?3" }
  }
];

// Insert into MongoDB
const seedDB = async () => {
  await Recipe.deleteMany({}); // optional: clear old data
  await Recipe.insertMany(recipes);
  console.log("Fake recipes added!");
  mongoose.connection.close();
};

seedDB();
