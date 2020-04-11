import path from 'path';
import dotenv from 'dotenv';
import express from 'express';


const app = express();
const distDir = __dirname;
const htmlFilePath = path.join(distDir, 'index.html');

dotenv.config();

app.use(express.static(distDir));

app.get('/', (req, res, next) => {
    res.sendFile(htmlFilePath)
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening to ${port} ....`);
    console.log('Press Ctrl+C to quit.');
});