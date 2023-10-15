const multer = require('multer')

const storage = multer.diskStorage({
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },//5MB file size
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jfif' ||
            file.mimetype === 'image/webp'
        ) {
            req.isFileValid = true;
            return cb(null, true);
        } else {
            req.isFileValid = false;
            req.isFileValidMessage =
                'Input must be an image with supported formats (png, jpg, jpeg, jfif, webp) and not more than 5 MB';
            return cb(null, false);
        }
    }
});

module.exports = upload