const multer = require('multer');
const path = require('path');

// Setup multer storage to handle different directories based on entity type
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/general'; // Default directory if no entity is specified

    // Determine the folder based on the entity (e.g., doctor, hospital, patient)
    if (req.baseUrl.includes('doctors')) {
      folder = 'uploads/doctors';
    } else if (req.baseUrl.includes('hospitals')) {
      folder = 'uploads/hospitals';
    } else if (req.baseUrl.includes('patients')) {
      folder = 'uploads/patients';
    }

    // Create directories dynamically if they don't exist
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({ storage: fileStorage, fileFilter: fileFilter });
