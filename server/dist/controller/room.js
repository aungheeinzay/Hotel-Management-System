import { Room } from "../model/room.js";
import errorHandler from "../lib/errorHandler.js";
import { NotFoundError } from "../lib/notFound.js";
import ApiFilters from "../lib/apiFilters.js";
import { deleteImage, uploadMultipleImages } from "../lib/cloudinary.js";
export const getAllRooms = errorHandler(async (query, filters, page, perPage) => {
    const apiFilter = new ApiFilters(Room).search(query).filter(filters);
    const totalRooms = await apiFilter.count();
    const rooms = await apiFilter.pagination(page, perPage).model.populate("reviews");
    if (rooms.length == 0) {
        throw new NotFoundError("Rooms are empty");
    }
    return { rooms, totalRooms };
});
export const createNewRoom = errorHandler(async (inputRoom) => {
    let images = [];
    try {
        images = await uploadMultipleImages(inputRoom.images, "GolenCompass/room");
        const newRoom = await Room.create({
            ...inputRoom,
            images
        });
        if (!newRoom) {
            throw new Error("fail to create room");
        }
        return { message: "added new room successfully" };
    }
    catch (error) {
        if (images.length > 1) {
            const deletingBack = images.map(async ({ public_id }) => {
                await deleteImage(public_id);
            });
            await Promise.all(deletingBack);
            throw new Error(error);
        }
    }
});
export const getRoomById = errorHandler(async (id) => {
    const room = await Room.findById(id)
        .populate({
        path: "reviews",
        populate: {
            path: "user",
            model: "User"
        }
    });
    if (!room) {
        throw new NotFoundError("Room not found");
    }
    return room;
});
export const updateRoom = errorHandler(async (roomId, inputRoom, removeImage) => {
    const room = await Room.findById(roomId);
    if (!room)
        throw new NotFoundError("Room not found");
    let currentImages = room.images.toObject();
    if (removeImage.length > 0) {
        const deleteCloudImg = removeImage.map(async (publicId) => await deleteImage(publicId));
        await Promise.all(deleteCloudImg);
        currentImages = currentImages.filter((img) => !removeImage.includes(img.public_id));
    }
    if (inputRoom?.images && inputRoom.images.length > 0) {
        const returnImg = await uploadMultipleImages(inputRoom.images, "GolenCompass/room");
        currentImages.push(...returnImg);
    }
    const { images, ...updateData } = inputRoom;
    await room.set({
        ...updateData,
        images: currentImages
    }).save();
    return { message: "updated room successfully" };
});
export const deleteRoom = errorHandler(async (id) => {
    const room = await Room.findById(id);
    if (!room)
        throw new NotFoundError("Room not found");
    room.images.forEach(async (img) => await deleteImage(img.public_id));
    await room.deleteOne();
    return true;
});
export const filterMetaInfo = errorHandler(async () => {
    const [Location, Type, Capacity] = await Promise.all([
        Room.distinct("location"),
        Room.distinct("type"),
        Room.distinct("capacity")
    ]);
    return {
        Location,
        Type,
        Capacity,
    };
});
