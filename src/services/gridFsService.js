const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'uploads',
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

const upload = multer({ storage }).single('image');

let gfsBucket;
mongoose.connection.once('open', () => {
    gfsBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
});

exports.uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(req.file);
        });
    });
};

exports.getFile = (filename) => {
    return new Promise((resolve, reject) => {
        gfsBucket.find({ filename }).toArray((err, files) => {
            if (err || !files || files.length === 0) {
                return reject(err || 'File not found');
            }
            const file = files[0];
            const readstream = gfsBucket.openDownloadStreamByName(file.filename);
            resolve({ ...file, stream: readstream });
        });
    });
};

exports.listFiles = () => {
    return new Promise((resolve, reject) => {
        gfsBucket.find().toArray((err, files) => {
            if (err) {
                return reject(err);
            }
            resolve(files);
        });
    });
};

exports.deleteFile = (filename) => {
    return new Promise((resolve, reject) => {
        gfsBucket.find({ filename }).toArray((err, files) => {
            if (err || !files || files.length === 0) {
                return reject(err || 'File not found');
            }
            const file = files[0];
            gfsBucket.delete(file._id, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
};