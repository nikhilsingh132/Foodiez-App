const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const mongoUrl = "mongodb://nikhil:nikhil@ac-sdi4gpt-shard-00-00.fe8pa2l.mongodb.net:27017,ac-sdi4gpt-shard-00-01.fe8pa2l.mongodb.net:27017,ac-sdi4gpt-shard-00-02.fe8pa2l.mongodb.net:27017/foodiezmern?ssl=true&replicaSet=atlas-28e5t5-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
    await mongoose.connect(mongoUrl, async (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("connected successfully");
            const fetched_data = await mongoose.connection.db.collection("foodData2");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(async function (err, catData){
                    if (err) {
                        console.log(err);
                    }
                    else {
                        global.food_items = data;
                        global.foodCategory=catData;
                    }
                })
            // if(err)
            // {
            //     console.log(err);
            // }
            // else
            // {
            //     global.food_items=data;
            // } 
        });
}
    });
}

module.exports = mongoDB;

