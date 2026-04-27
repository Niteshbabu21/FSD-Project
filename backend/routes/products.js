const router = require("express").Router();
const Product = require("../models/Product");

// GET all products (with optional category filter)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST seed sample GenZ products
router.post("/seed/init", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0)
      return res.json({ message: "Products already seeded", count });

    const products = [
      // Fashion
      { name: "Y2K Cargo Pants", category: "Fashion", price: 1299, description: "Baggy cargo pants with chain detail. Pure Y2K vibes.", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", tags: ["y2k","streetwear"] },
      { name: "Oversized Hoodie Drop", category: "Fashion", price: 1599, description: "Heavy cotton oversized hoodie with dropped shoulders.", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400", tags: ["hoodie","oversized"] },
      { name: "Crop Denim Jacket", category: "Fashion", price: 2199, description: "Distressed cropped denim jacket for the fit check.", imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", tags: ["denim","crop"] },
      { name: "Boxy Graphic Tee", category: "Fashion", price: 799, description: "Drop-shoulder boxy tee with bold retro graphic.", imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400", tags: ["graphic","tee"] },
      // Sports
      { name: "Hyperflex Training Tights", category: "Sports", price: 1799, description: "4-way stretch compression tights for maximum gains.", imageUrl: "https://images.unsplash.com/photo-1518644961665-ed172691aaa1?w=400", tags: ["gym","compression"] },
      { name: "Cloud Runner Sneakers", category: "Sports", price: 3499, description: "Ultra-light foam sole running shoes with reflective details.", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", tags: ["running","sneakers"] },
      { name: "Mesh Sport Shorts", category: "Sports", price: 899, description: "Breathable quick-dry mesh shorts for any sport.", imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400", tags: ["shorts","breathable"] },
      // Gaming
      { name: "RGB Mechanical Keyboard", category: "Gaming", price: 4999, description: "Tenkeyless RGB keyboard with tactile blue switches.", imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", tags: ["keyboard","rgb"] },
      { name: "Pro Gaming Headset", category: "Gaming", price: 3299, description: "7.1 surround sound headset with noise-cancelling mic.", imageUrl: "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?w=400", tags: ["headset","surround"] },
      { name: "Fast Gaming Mouse", category: "Gaming", price: 2499, description: "16000 DPI optical sensor gaming mouse, ultra-light 68g.", imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400", tags: ["mouse","fps"] },
      { name: "XL Desk Mousepad", category: "Gaming", price: 799, description: "900x400mm stitched edge mousepad for full setup coverage.", imageUrl: "https://images.unsplash.com/photo-1612838320302-4b3b3996b8cf?w=400", tags: ["mousepad","setup"] },
      // Accessories
      { name: "Chunky Chain Necklace", category: "Accessories", price: 699, description: "Gold-tone oversized chain necklace for that baddie energy.", imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", tags: ["jewelry","chain"] },
      { name: "Bucket Hat", category: "Accessories", price: 549, description: "Canvas bucket hat with embroidered logo detail.", imageUrl: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400", tags: ["hat","streetwear"] },
      { name: "Mini Backpack", category: "Accessories", price: 1299, description: "Sleek mini backpack that holds everything you need.", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", tags: ["bag","mini"] },
      { name: "Tinted Sunglasses", category: "Accessories", price: 849, description: "Y2K inspired slim oval tinted sunglasses.", imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", tags: ["sunglasses","y2k"] },
    ];

    await Product.insertMany(products);
    res.json({ message: "GenZ products seeded!", count: products.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;