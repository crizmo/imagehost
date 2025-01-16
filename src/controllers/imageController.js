const gridFsService = require('../services/gridFsService');

exports.uploadImage = async (req, res) => {
    try {
        const file = await gridFsService.uploadFile(req, res);
        res.status(201).json({ url: `/api/images/${file.filename}` });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading image' });
    }
};

exports.getImage = async (req, res) => {
    try {
        const file = await gridFsService.getFile(req.params.filename);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.set('Content-Type', file.contentType);
        file.stream.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving image' });
    }
};

exports.listImages = async (req, res) => {
    try {
        const files = await gridFsService.listFiles();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: 'Error listing images' });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        await gridFsService.deleteFile(req.params.filename);
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting image' });
    }
};