const nodemailer = require('nodemailer');

// Create a transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'doubledecker2024@gmail.com', // Replace with your Gmail address
    pass: 'rzml cfzw mbaf ophy', // Replace with your Gmail password or app password
  },
});

// Create an email message
const mailOptions = {
  from: 'doubledecker2024@gmail.com', // Replace with your Gmail address
  to: 'siva@sparkouttech.com', // Replace with the recipient's email address
  subject: 'Hello from Nodemailer',
  text: 'Hello, this is a test email from Nodemailer!',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
