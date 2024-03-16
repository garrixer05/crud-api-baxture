import express from 'express';
import { config } from 'dotenv';
import routes from './routes/routes.js';
import { connectDb } from './db/database.js';

config();

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    connectDb()
    console.log(`Server started on port ${PORT}`);
});
