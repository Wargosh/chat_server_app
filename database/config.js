const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        // .then((db) => console.log("DB is connected!"))
        // .catch((error) => console.log('Error db' + error.message));

        console.log("DB is connected!");
    } catch (error) {
        console.log(error);
        throw Error('Error DB' + error);
    }
}

module.exports = { dbConnection }