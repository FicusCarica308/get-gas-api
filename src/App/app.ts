import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello');   
})

app.listen(5555, () => console.log('server is running'));
