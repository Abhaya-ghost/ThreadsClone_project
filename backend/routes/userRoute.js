const express = require('express');
const {signupUser, loginUser, followUnfollowUser, updateUser, getUserProfile} = require('../controllers/userController')
const protectRoute = require('../middleware/protectRoute')

const router = express.Router();

router.get('/profile/:query', getUserProfile)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/follow/:id', protectRoute, followUnfollowUser)
router.put('/update/:id', protectRoute, updateUser)

module.exports = router;