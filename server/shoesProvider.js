const mongoose = require("mongoose");

const MongoDB_URL = "mongodb+srv://admin:patel@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority";


const connectDB = async () => {
    await mongoose.connect(MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

connectDB();

const addShoesSchema = new mongoose.Schema({
    providerEmail: String,
    brandName: String,
    shoeName: String,
    shoeSize: String,
    shoePicURL: Buffer,
    price: Number,
    quantity: Number,
    color: String,
});

const ShoesCreation = mongoose.model("Shoes", addShoesSchema);

const ShoesCreator = class {

    async checkShoeExists(providerEmail, brandName, shoeName, shoeSize, shoePicURL, price, quantity, color) {
        let result;

        result = await ShoesCreation.count({
            providerEmail: providerEmail,
            brandName: brandName,
            shoeName: shoeName,
            shoeSize: shoeSize,
            shoePicURL: shoePicURL,
            price: price,
            quantity: quantity,
            color: color
        });

        return result;
    }

    //    async updateShoe(brandName, shoeName, shoeSize,quantity){
    //         shoe = await ShoesCreation.find({
    //             brandName: brandName,
    //             shoeName: shoeName,
    //             shoeSize: shoeSize,
    //             quantity: quantity
    //         });
    //     }

    addShoe(providerEmail, brandName, shoeName, shoeSize, shoePicURL, price, quantity, color) {
        const newShoe = new ShoesCreation({
            providerEmail: providerEmail,
            brandName: brandName,
            shoeName: shoeName,
            shoeSize: shoeSize,
            shoePicURL: shoePicURL,
            price: price,
            quantity: quantity,
            color: color
        });
        newShoe.save();
    }

    async getShoes() {
        const data = await ShoesCreation.find();
        const count = await ShoesCreation.count();
        var shoes = new Array();
        var shoeSizes = new Array();

        for (let i = 0; i < count; i++) {

            var sizes = data[i].shoeSize;
            shoeSizes = sizes.split(" ");
            for (let j = 0; j < shoeSizes.length; j++) {
                shoeSizes[j] += " ";
            }
            shoes[i] = { brand: data[i].brandName, name: data[i].shoeName, price: data[i].price, color: data[i].color, image: data[i].shoePicURL, sizes: shoeSizes, quantity: data[i].quantity };
        }

        return shoes;
    }
}
module.exports = { ShoesCreator };