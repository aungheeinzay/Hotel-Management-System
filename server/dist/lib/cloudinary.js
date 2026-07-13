import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({
    path: ".env.local"
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadSingleImage = async (image, folder) => {
    const result = await cloudinary.uploader.upload(image, {
        asset_folder: folder,
        use_asset_folder_as_public_id_prefix: true
    });
    return {
        url: result.secure_url,
        public_id: result.public_id
    };
};
export const uploadMultipleImages = async (images, folder) => {
    const promise = images.map((img) => cloudinary.uploader.upload(img, {
        asset_folder: folder,
        use_asset_folder_as_public_id_prefix: true
    }));
    const res = await Promise.all(promise);
    const imagesArr = res.map((img) => {
        return {
            url: img.secure_url,
            public_id: img.public_id
        };
    });
    return imagesArr;
};
export const deleteImage = async (public_id) => {
    const response = await cloudinary.uploader.destroy(public_id);
    return response?.result === "ok";
};
