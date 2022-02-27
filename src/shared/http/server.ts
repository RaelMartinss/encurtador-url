import express from 'express';
import { URLcontroller } from 'src/controller/URLcontroller';
import { MongoConnection } from 'src/database/MongoConnection';
const app = express()

app.use(express.json())
const database = new MongoConnection()
database.connect()

const urlController = new URLcontroller()

app.get('/:hash', urlController.redirect)
app.post('/shorten', urlController.shorten)


app.listen(5000, () => console.log('Express listening'))