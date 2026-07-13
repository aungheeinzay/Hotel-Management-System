import mongoose from "mongoose";
export default class ApiFilters {
    model;
    constructor(model) {
        this.model = model.find();
    }
    search(query) {
        const searchById = {
            _id: query
        };
        const searchByKeyword = {
            title: {
                $regex: query,
                $options: "i"
            }
        };
        const searchQuery = query ? mongoose.isValidObjectId(query) ? searchById : searchByKeyword : {};
        this.model = this.model.find(searchQuery);
        return this;
    }
    filter(filter) {
        if (!filter)
            return this;
        const formattedObj = {};
        for (const [key, value] of Object.entries(filter)) {
            const opreatorObj = {};
            if (value && typeof value === "object") {
                for (const [opKey, opValue] of Object.entries(value)) {
                    if (["gt", "lt", "lte", "lte"].includes(opKey)) {
                        opreatorObj[`$${opKey}`] = opValue;
                    }
                    formattedObj[key] = opreatorObj;
                }
            }
            else {
                formattedObj[key] = value;
            }
            if (!(!!value)) {
                Reflect.deleteProperty(formattedObj, key);
            }
        }
        this.model = this.model.find(formattedObj);
        return this;
    }
    pagination(page, perPage) {
        const currentPage = +page || 1;
        const showItem = +perPage || 10;
        const skipItem = showItem * (currentPage - 1);
        this.model = this.model.limit(showItem).skip(skipItem);
        return this;
    }
    count() {
        const count = this.model.clone().countDocuments();
        return count;
    }
}
