const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');
const User = require('../models/user'); // Model użytkownika

const avatarsDir = path.join(__dirname, '../public/avatars');

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;

    const uniqueName = `${_id}-${Date.now()}${path.extname(originalname)}`;
    const resultUpload = path.join(avatarsDir, uniqueName);

    // Obróbka zdjęcia przy użyciu jimp
    const image = await jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(resultUpload);

    // Usuwanie pliku tymczasowego
    await fs.unlink(tempUpload);

    const avatarURL = `/avatars/${uniqueName}`;

    // Aktualizacja w bazie danych
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas aktualizacji awatara.' });
  }
};

module.exports = { updateAvatar };
