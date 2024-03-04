const router = require("express").Router()
const controller= require("./controller")

router.get("/login",controller.authUser)
router.post("/register",controller.registerUser)


module.exports=router