const express = require("express")
const helmet = require("helmet")
const path = require("path")
const fetchAllShops = require("./scripts/fetchAllShops")
const PORT = process.env.PORT || 4567;
const app = express()

// GET /shops
app.get("/shops", async (req, res, next) => {
  try {
    const limit = req.query.limit
    const offset = req.query.offset
    const shopData = await fetchAllShops(limit, offset)
    const shops = shopData.map(shop => ({
      shop_id: shop.shop_id,
      shop_name: shop.shop_name,
      user_id: shop.user_id,
      is_vacation: shop.is_vacation,
      avatar_src: shop.avatar_src,
      shop_url: shop.url
    }))
    res.status(200).json(shops)
  } catch(err) {
    next()
  }
})

// Security middleware
app.use(helmet())

// Error handling middleware
app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")))

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});