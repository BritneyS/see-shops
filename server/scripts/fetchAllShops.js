require('dotenv').config()
const axios = require("axios")

const webClient = axios.create({
  baseURL: "https://openapi.etsy.com/v2",
  params: {
    api_key: process.env.API_KEY
  },
})

function fetchAvatar(id) {
  return webClient.get(`/users/${id}/avatar/src`)
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return { errorStatus: err.response.status, data: err.response.data }
    } else if (err.request) {
      // The request was made but no response was received
      return { error: `No response for request: ${err.request}` }
    } else {
      // Something happened in setting up the request that triggered an Error
     return { error: err.message }
    }
  })
}

function fetchShops(limit, offset) {
  return webClient.get(`/shops/?limit=${limit}&offset=${offset}`)
  .then(res => res.data)
  .catch(err => {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return { errorStatus: err.response.status, data: err.response.data }
    } else if (err.request) {
      // The request was made but no response was received
      return { error: `No response for request: ${err.request}` }
    } else {
      // Something happened in setting up the request that triggered an Error
      return { error: err.message }
    }
  })
}

async function fetchAllShops(limit, offset) {
  try {
    const shopData = await fetchShops(limit, offset)
    .then(data => data.results)

    const shops = await Promise.all(shopData.map((shop) => {
      return fetchAvatar(shop.user_id)
      .then(avatarData => ({ avatar_src: avatarData.results.src, ...shop }))
    }))

    return shops
  } catch(err) {
    throw new Error(err.message) // TODO: handle error better
  }
}

module.exports = fetchAllShops