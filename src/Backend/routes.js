const router = require("express").Router()
const controller= require("./controller")

router.get("/login",controller.authUser)

module.exports=router