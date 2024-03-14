const router = require("express").Router()
const controller= require("./controller")

router.post("/login",controller.authUser)
router.post("/register",controller.registerUser)
router.get("/verifyUser",controller.verifyUser)


module.exports=router