const express = require('express');
const cookie_parser = require('cookie-parser');

const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: path.join(__dirname, 'temp'),
        createParentPath: true,
        limits: { fileSize: 1024 * 1024 }
    }
))
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index')
});

app.get('/set-cookie', (req, res) => {
    res.cookie('foo','bar');
    res.cookie('hoo','jioo');
    res.send('hii cookie is set')
})

app.get('/delete-cookie', (req, res) => {
    res.clearCookie('foo');
    res.send('hii cookie is delete')
})



app.post('/single', (req, res, next) => {
    try {

        const file = req.files.mFile;
        const fileName = new Date().getTime().toString() + path.extname(file.name);
        const savepath = path.join(__dirname, 'public', 'uploads', fileName)
        if (file.truncated) {
            throw new Error('file size is too big')
        }
        if (file.mimetype !== image / jpeg) {
            throw new Error('only jpeg allowed')

        }
        file.mv(savepath)
        res.redirect('/')
    } catch (err) {
        res.render('error')
    }
})

app.post('/multiple', (req, res, next) => {
    try {
        const files = req.files.mFiles;
        let arrfiles = [];

/*******another method for uploading multiple files 
 *files.map((file)=>{
    const pathSave = path.join(__dirname,'public','uploads',file.name)
return file.mv(pathSave)
 })
 * 
 * 
*/

        files.forEach((file) => {
            const savePath = path.join(__dirname, 'public', 'uploads', file.name);
            arrfiles.push(file.mv(savePath))

        })

        Promise.all(arrfiles)
        res.redirect('/');
    } catch (err) {
        console.log(err)
        res.render('error')
    }
})

app.listen(3400, () => {
    console.log(`server is running on http://localhost:3400`);
})
