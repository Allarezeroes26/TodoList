const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connection.on("connected",  () => {
            console.log("Connected to the DB!")
        })

        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        console.error('Failed connecting to the DB!', err)
    }
}

module.exports = connectDB