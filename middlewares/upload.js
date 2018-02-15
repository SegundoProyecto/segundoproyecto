const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

module.exports = {
    UploadFile: upload.single('file')
  };