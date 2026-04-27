const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Fashion", "Sports", "Gaming", "Accessories"],
      required: true,
    },
    imageUrl: { type: String, default: "" },
    stock: { type: Number, default: 100 },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);