import mongoose, { model, Schema } from "mongoose";
const roomSchema = new Schema({
    roomNumber: {
        type: String,
        required: [true, 'please enter room number']
    },
    type: {
        type: String,
        required: [true, 'please enter room type']
    },
    pricePerNight: {
        type: Number,
        required: [true, "please enter price per night"]
    },
    title: String,
    description: String,
    capacity: {
        type: Number,
        required: [true, 'please enter room capacity']
    },
    location: {
        type: String,
        required: [true, 'please enter room location']
    },
    isAvailable: {
        type: Boolean,
        required: [true, 'please enter room isAvailable']
    },
    images: [
        {
            url: String,
            public_id: String
        }
    ],
    reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }]
}, { timestamps: true });
roomSchema.virtual("ratings").get(function () {
    const numberOfReviews = this.reviews.length;
    if (numberOfReviews == 0) {
        return {
            value: 5,
            count: 0
        };
    }
    const totalRating = this.reviews.reduce((sum, rev) => sum += rev.rating, 0);
    const value = totalRating > 0 ? totalRating / numberOfReviews : 0;
    return {
        value,
        count: numberOfReviews
    };
});
roomSchema.set('toJSON', { virtuals: true });
roomSchema.set('toObject', { virtuals: true });
export const Room = model("Room", roomSchema);
