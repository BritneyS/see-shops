const express = require("express")
const helmet = require("helmet")
const fetchAllShops = require("./scripts/fetchAllShops")
const PORT = process.env.PORT || 4567;
const app = express()

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});

// GET /shops
app.get("/shops", async (req, res, next) => {
  try {
    const limit = req.query.limit
    const offset = req.query.offset
    const data = await fetchAllShops(limit, offset)
    const shops = data.results.map(shop => ({
      shop_id: shop.shop_id,
      shop_name: shop.shop_name,
      user_id: shop.user_id
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