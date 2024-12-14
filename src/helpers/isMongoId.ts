import mongoose from "mongoose"


export const isMongoId = (ID: string) => {
    return mongoose.Types.ObjectId.isValid(ID);
}