import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/recipe.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection error:", err));

const recipes = [
  {
    _id: 1001,
    title: "Beef Burger",
    cuisine: "American",
    image:
      "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/09/beef-burger-1200x675.jpg",
    likes: 120,
    description: "Juicy grilled beef burger with melted cheese and lettuce.",
    user: {
      name: "Alice",
      email: "alice@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?1",
    },
    likedBy: [],
  },
  {
    _id: 1002,
    title: "California Sushi Roll",
    cuisine: "Japanese",
    image:
      "https://yujinizakaya.com.sg/wp-content/uploads/2025/06/japanese-california-sushi-roll-recipe-1749130724.jpg",
    likes: 110,
    description:
      "Classic Japanese sushi roll with crab, avocado, and cucumber.",
    user: {
      name: "Bob",
      email: "bob@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?2",
    },
    likedBy: [],
  },
  {
    _id: 1003,
    title: "Pancakes",
    cuisine: "Breakfast",
    image:
      "https://www.marthastewart.com/thmb/LtTDqwVJylLB_AuOWrhbB_53wRs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/338185-basic-pancakes-09-00b18f8418fd4e52bb2050173d083d04.jpg",
    likes: 95,
    description: "Fluffy pancakes served with syrup and butter.",
    user: {
      name: "Charlie",
      email: "charlie@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?3",
    },
    likedBy: [],
  },
  {
    _id: 1004,
    title: "Margherita Pizza",
    cuisine: "Italian",
    image:
      "https://i0.wp.com/cookingitalians.com/wp-content/uploads/2024/11/Margherita-Pizza.jpg?fit=1344%2C768&ssl=1",
    likes: 130,
    description: "Authentic Italian pizza with tomato, mozzarella, and basil.",
    user: {
      name: "David",
      email: "david@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?4",
    },
    likedBy: [],
  },
  {
    _id: 1005,
    title: "Fried Rice",
    cuisine: "Chinese",
    image:
      "https://www.sharmispassions.com/wp-content/uploads/2013/04/EggFriedRice4.jpg",
    likes: 80,
    description:
      "Colorful vegetable fried rice with carrots, peas, and green onions.",
    user: {
      name: "Eve",
      email: "eve@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?5",
    },
    likedBy: [],
  },
  {
    _id: 1006,
    title: "Grilled Salmon",
    cuisine: "Seafood",
    image:
      "https://www.dinneratthezoo.com/wp-content/uploads/2019/05/grilled-salmon-final-2.jpg",
    likes: 150,
    description: "Tender salmon fillets grilled with lemon and herbs.",
    user: {
      name: "Frank",
      email: "frank@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?6",
    },
    likedBy: [],
  },
  {
    _id: 1007,
    title: "Butter Naan",
    cuisine: "Indian",
    image:
      "https://foodess.com/wp-content/uploads/2023/02/Butter-Naan-2-819x1024.jpg",
    likes: 70,
    description: "Soft and fluffy naan brushed with butter, served warm.",
    user: {
      name: "Grace",
      email: "grace@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?7",
    },
    likedBy: [],
  },
  {
    _id: 1008,
    title: "Chocolate Cake",
    cuisine: "Dessert",
    image:
      "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg",
    likes: 15,
    description: "A rich and creamy chocolate cake.",
    user: {
      name: "Hank",
      email: "hank@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?8",
    },
    likedBy: [],
  },
  {
    _id: 1009,
    title: "Spaghetti Bolognese",
    cuisine: "Italian",
    image:
      "https://www.preciouscore.com/wp-content/uploads/2024/06/Spaghetti-Bolognese-Chicken.jpg",
    likes: 25,
    description: "Classic spaghetti with meaty tomato sauce.",
    user: {
      name: "Ivy",
      email: "ivy@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?9",
    },
    likedBy: [],
  },
  {
    _id: 1010,
    title: "Chicken Curry",
    cuisine: "Indian",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/chicken-curry-recipe.jpg",
    likes: 45,
    description:
      "A flavorful curry made with tender chicken and aromatic spices.",
    user: {
      name: "Jack",
      email: "jack@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?10",
    },
    likedBy: [],
  },
  {
    _id: 1011,
    title: "Falafel Wrap",
    cuisine: "Middle Eastern",
    image:
      "https://simplyceecee.co/wp-content/uploads/2022/06/falafelfeature.jpg",
    likes: 19,
    description: "Crispy falafel balls wrapped with veggies and tahini sauce.",
    user: {
      name: "Kelly",
      email: "kelly@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?11",
    },
    likedBy: [],
  },
  {
    _id: 1012,
    title: "Ramen Noodles",
    cuisine: "Japanese",
    image:
      "https://somuchfoodblog.com/wp-content/uploads/2022/10/korean-beef-noodles16.jpg",
    likes: 35,
    description: "Japanese ramen with pork broth, noodles, and toppings.",
    user: {
      name: "Leo",
      email: "leo@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?12",
    },
    likedBy: [],
  },
  {
    _id: 1013,
    title: "Caesar Salad",
    cuisine: "Healthy",
    image:
      "https://media.chefdehome.com/740/0/0/caesar/classic-caesar-salad.jpg",
    likes: 17,
    description: "Crisp lettuce with Caesar dressing and croutons.",
    user: {
      name: "Mia",
      email: "mia@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?13",
    },
    likedBy: [],
  },
  {
    _id: 1014,
    title: "Veggie Salad",
    cuisine: "Healthy",
    image: "https://images.media-allrecipes.com/userphotos/952228.jpg",
    likes: 8,
    description: "Fresh vegetables with light dressing.",
    user: {
      name: "Nina",
      email: "nina@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?14",
    },
    likedBy: [],
  },
  {
    _id: 1015,
    title: "Tacos",
    cuisine: "Mexican",
    image:
      "https://mojo.generalmills.com/api/public/content/GmHhoT5mr0Sue2oMxdyEig_webp_base.webp?v=c67813e4&t=191ddcab8d1c415fa10fa00a14351227",
    likes: 38,
    description:
      "Soft tortillas filled with seasoned beef, veggies, and salsa.",
    user: {
      name: "Oscar",
      email: "oscar@example.com",
      profilePic: "https://source.unsplash.com/50x50/?portrait?15",
    },
    likedBy: [],
  },
];

const seedDB = async () => {
  try {
    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);
    console.log("✅ Recipes seeded!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
