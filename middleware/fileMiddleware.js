const multer = require('multer');
const moment = require('moment')

const storage = multer.diskStorage(
    {
        destination(req,file,cb){
            cb(null,'hotelimages/')
        },
        filename(req,file,cb) {
            cb(null, `${moment().format('DDMMYYYY-HHmmss SSS')}${file.originalname}`)
        }
    }
)

const types = ['image/png','image/jpeg','image/jpg']


const fileFilter = (req,file,cb) =>{
    if (types.includes(file.mimetype))
    {
        cb(null,true)
    }else{
        cb(null,false)
    }
}


module.exports = multer({storage,fileFilter})