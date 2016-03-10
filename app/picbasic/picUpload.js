var multer = require('multer');
var upload = multer({dest: 'img/uploads/', limits: {}, fileFilter: fileFilter});

var validFileExtensions = ['.jpg', '.png', '.png', '.bmp'];
function fileFilter(req, file, cb){
	if(validFileExtensions.indexOf(path.extension(file.originalname)) < 0){
		return cb(new Error('Please upload a valid picture!'));
	}

	cb(null, true);
};

exports.uploadSingle = function(pic){
	return upload.single(pic);
};

exports.uploadBunch = function(picArray, maxCount){
	if(typeof maxCount !== undefined) return upload.array(picArray, maxCount);
	else return upload.array(picArray);
};

exports.fileDetail = function(req, res, next){
	if(typeof req.file !== undefined){
		return JSON.stringify(req.file);
	}else{
		next('No file uploaded');
	}
};