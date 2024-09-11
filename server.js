const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { department, name, age, email, date, time } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'enter_your_email',
            pass: 'enter_your_password',
        },
    });

    let mailOptions = {
        from: 'enter_your_email',
        to: email,
        subject: 'Appointment Confirmation',
        text: `Dear ${name},\n\nYour appointment is confirmed for ${department} on ${date} at ${time}.\n\nThank you!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
