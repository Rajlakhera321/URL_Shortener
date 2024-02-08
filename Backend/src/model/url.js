import { Schema,model } from "mongoose";

const urlSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId
    },
    originalUrl: {
        type: Schema.Types.String
    },
    shortUrl:{
        type: Schema.Types.String
    },
    visitHistory: [{
        time: {
            type: Schema.Types.Date
        }
    }]
});

export default model('shortURL', urlSchema);