import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
dotenv.config();
const username=process.env.DB.USERNAME;
const password=process.env.DB.PASSWORD;


const storage = new GridFsStorage({
    //url: `mongodb://user:codeforinterview@blogweb-shard-00-00.ch1hk.mongodb.net:27017,blogweb-shard-00-01.ch1hk.mongodb.net:27017,blogweb-shard-00-02.ch1hk.mongodb.net:27017/BLOG?ssl=true&replicaSet=atlas-lhtsci-shard-0&authSource=admin&retryWrites=true&w=majority`,
    url:`mongodb+srv://touqeeransari:Ansari@blog-web-app.kfdmxqd.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 

// const storage=new GridFsStorage({
//     url:'mongodb+srv://touqeeransari:Ansari@blog-web-app.kfdmxqd.mongodb.net/?retryWrites=true&w=majority',
//     // url:`mongodb+srv:/${username}:${password}@blog-web-app.kfdmxqd.mongodb.net/?retryWrites=true&w=majority`,
//     options: {useNewUrlParser: true},
//     file:(request,file)=>{
//         const match=["image/png","image=/jpg"];
//         if(match.indexOf(file.memeType)===-1){
//             return `${Date.now()}-blob-${file.originalname}`;
//         }
//         return{
//             bucketName:"photos",
//             filename:`${Date.now()}-blob-${file.originalname}`
//         }
//     }

    
// })
// export default multer({storage});