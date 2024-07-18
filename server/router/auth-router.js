const express = require('express')
const router = express.Router();
const authcontroller = require('../controllers/auth-controller')
const authschema = require('../validators/auth-validator')
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require('../middlewares/auth-middleware')

router.route("/").get(authcontroller.home);
router.route("/register").post(validate(authschema.signupSchema), authcontroller.register);
// router.route("/register").get(datashow);
router.route("/login").post(validate(authschema.loginSchema),authcontroller.login)
router.route("/user").get(authMiddleware,authcontroller.user);
 
module.exports = router;
