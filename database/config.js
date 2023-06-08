const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            //useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
        })
            .then((db) => console.log("DB is connected!"))
            .catch((error) => console.log(error.message));
    } catch (error) {
        console.log(error);
        throw new Error('Error DB');
    }
}

module.exports = { dbConnection }