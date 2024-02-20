import mongoose from 'mongoose';
import colors from 'colors';

export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(colors.cyan(`MongoDB se conectó correctamente: ${db.connection.host}:${db.connection.port}`));    
        mongoose.set('debug', true);    
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};