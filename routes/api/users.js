const express = require('express');
const upload = require('../../middlewares/upload'); // Import upload middleware
const { updateAvatar } = require('../../controllers/users'); // Funkcja kontrolera

const router = express.Router();

router.patch('/avatars', upload.single('avatar'), updateAvatar);

module.exports = router;
