import mongoose from "mongoose";

const Connection = async (username, password) => {
  //  const URL = `mongodb://${username}:${password}@blogweb-shard-00-00.ch1hk.mongodb.net:27017,blogweb-shard-00-01.ch1hk.mongodb.net:27017,blogweb-shard-00-02.ch1hk.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-lhtsci-shard-0&authSource=admin&retryWrites=true&w=majority`;

<<<<<<< HEAD
  //const URL = `mongodb+srv://${username}:${password}@blog-web-app.kfdmxqd.mongodb.net/?retryWrites=true&w=majority`;
  const URL = `mongodb+srv://touqeeransari:Ansari@cluster0.ucoo2jo.mongodb.net/?retryWrites=true&w=majority`;

=======
  const URL = `mongodb+srv://touqeeransari:Ansari@blog-web-app.kfdmxqd.mongodb.net/?retryWrites=true&w=majority`;
>>>>>>> 8f9c0c4ee79579faef9a85b5f3b7c8807b3d09d8
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database ", error);
  }
};

export default Connection;
