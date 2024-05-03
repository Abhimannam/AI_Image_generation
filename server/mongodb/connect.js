// // import mongoose from 'mongoose';
// // const { MongoClient } = require('mongodb');

// // const connectDB = (url) => {
// //   mongoose.set('strictQuery', true);
// //   console.log(url)
// //   mongoose.connect('mongodb+srv://temp:temp@cluster0.rwubrtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// //     .then(() => console.log('connected to mongo'))
// //     .catch((err) => {
// //       console.error('failed to connect with mongo');
// //       console.error(err);
// //     });
// // };

// // export default connectDB;

// import { MongoClient } from "mongodb";

// const uri = 'mongodb+srv://temp:temp@cluster0.rwubrtz.mongodb.net/se_project?retryWrites=true&w=majority&appName=Cluster0';

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB Atlas');
//   } catch (error) {
//     console.error('Error connecting to MongoDB Atlas:', error);
//   }
// }

// export default connectDB;

import mongoose from 'mongoose';

async function connectToMongoDB(url) {
  try {
    // Set mongoose option to disable strict query mode
    mongoose.set('strictQuery', false);

    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/SE_project');

    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect to MongoDB
// connectToMongoDB();
export default connectToMongoDB;

