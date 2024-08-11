import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:8080";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = (request, response) => {
  if (!request.file) return response.status(404).json("File not found");

  const imageUrl = `${url}/file/${request.file.filename}`;

  response.status(200).json(imageUrl);
};

// export const getImage = async (request, response) => {
//   try {
//     const filename = request.params.filename;
//     console.log("Filename requested:", filename);
    
//     const file = await gfs.files.findOne({ filename: filename });
    
//     if (!file) {
//       return response.status(404).json({ msg: "File not found" });
//     }

//     const readStream = gridfsBucket.openDownloadStream(file._id);
//     readStream.pipe(response);
//   } catch (error) {
//     response.status(500).json({ msg: error.message });
//   }
// };

export const getImage = async (request, response) => {
  try {
    const filename = "1723308868450-blog-My profile photo.jpeg";
    console.log("Attempting to retrieve file:", filename);

    const file = await gfs.files.findOne({ filename: filename });
    console.log("File found:", file);

    if (!file) {
      return response.status(404).json({ msg: "File not found" });
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};


