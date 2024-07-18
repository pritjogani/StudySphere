const express = require('express');
const router = express.Router();
const adminControlller = require('../controllers/admin-controller');
const authMiddleware = require("../middlewares/auth-middleware")
const adminMiddleware = require("../middlewares/admin-middleware")


router.route('/users').get(authMiddleware,adminMiddleware,adminControlller.getAllusers)
router.route('/contacts').get(authMiddleware,adminControlller.getAllContacts)
router.route('/contacts/delete/:id').delete(authMiddleware,adminControlller.deletecontactbyId)



 

//update user
router.route("/users/:id").get(authMiddleware,adminMiddleware,adminControlller.getsingleuserbyId)

router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminControlller.updateuserbyId)

//delete user
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminControlller.deleteuserbyId)



module.exports = router;