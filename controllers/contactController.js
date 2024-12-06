
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


//============get contact form=============//
exports.contactForm = (req, res) => {
    try {
        res.render('user/contact');
    } catch (error) {
        console.error('Error rendering contact form:', error);
        res.status(500).send('An error occurred while loading the contact form.');
    }
};



//-----------------  Sending mail using contact page ----------------- //
exports.sendMessage =  async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    let mailOptions = {
      from: `"${name}" <ausiemass@gmail.com>`, // Display name + authenticated email
      to: "ausiemass@gmail.com",
      subject: `New message from ${name}`,
      text: `Message from: ${name} (${email})\n\n${message}`, // Include user's email in the message
      replyTo: email // Set the user's email as the reply-to address
    };

    let info = await transporter.sendMail(mailOptions);
    res.redirect("contact");
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send("Error sending email.");
  }
};