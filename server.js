const path = require("path")
const express = require("express")
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("./webpack.config")

const app = express()
const publicPath = path.join(__dirname, ".")
const port = process.env.PORT || 8443

app.use(express.static(publicPath))
app.use(webpackMiddleware(webpack(webpackConfig)))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
