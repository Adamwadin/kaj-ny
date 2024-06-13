import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';



import path from 'path';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors( {origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(bodyParser.json());


app.get('/movies', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../backend/movies.json'));
});


app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ubaldo61@ethereal.email',
        pass: '6NNEjtwWjme8ecAExw'
    }
});

  
  const mailOptions = {
    from: email,
    to: 'ubaldo61@ethereal.email', 
    subject: 'ubaldo61@ethereal.email',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
