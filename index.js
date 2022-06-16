const express=require('express')
const fs = require('fs')
const path = require('path')
const axios = require('axios').default;

const app=express();

// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (fileUrl, downloadFolder) => {
  // Get the file name
  const fileName = path.basename(fileUrl);

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file!');
    });
  } catch (err) { 
    throw new Error(err);
  }
}; 

// Testing
const IMAGE_URL ='https://www.kindacode.com/wp-content/uploads/2021/01/test.jpg';
downloadFile(IMAGE_URL, 'downloads');

const VIDEO_URL ='https://www.kindacode.com/wp-content/uploads/2021/01/example.mp4';
downloadFile(VIDEO_URL, 'downloads');

//running server
const port=process.env.PORT|| 3000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})