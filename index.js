const express=require('express');
const ytdl = require("ytdl-core");


const app=express();
app.set("view engine", "ejs");
//routes
app.get("/", (req, res) => {
	return res.render("index");
});

app.get("/download", async (req, res) => {
	const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
	return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
	});
});

//running server
const port=process.env.PORT|| 3000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})