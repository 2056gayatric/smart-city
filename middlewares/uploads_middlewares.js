const multer = require("multer");
const path = require("path");
const fs = require("fs");

const BASE_UPLOAD_PATH = "uploads/complaints";

const storage = multer.diskStorage(
{
    destination:(req, file, cb) =>
    {
        let folder = BASE_UPLOAD_PATH;

        if(req.originalUrl.includes("water"))
        {
            folder = `${BASE_UPLOAD_PATH}/water`;
        }
        else if(req.originalUrl.includes("garbage"))
        {
            folder = `${BASE_UPLOAD_PATH}/garbage`;
        }
        else if(req.originalUrl.includes("electricity"))
        {
            folder = `${BASE_UPLOAD_PATH}/electricity`;
        }
        else if(req.originalUrl.includes("road"))
        {
            folder = `${BASE_UPLOAD_PATH}/road`;
        }

        if(!fs.existsSync(folder))
        {
            fs.mkdirSync(folder, { recursive:true });
        }

        cb(null, folder);
    },

    filename:(req, file, cb) =>
    {
        const uniqueName =
            Date.now() + "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) =>
{
    const allowedTypes = /jpeg|jpg|png|mp4|mov/;
    const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mime = allowedTypes.test(file.mimetype);

    if(ext && mime)
    {
        cb(null, true);
    }
    else
    {
        cb(new Error("Only images and videos are allowed"));
    }
};

module.exports = multer(
{
    storage: storage,
    fileFilter: fileFilter,
    limits:
    {
        fileSize: 10 * 1024 * 1024
    }
});
