import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const sendMail = async(email, mailSubject, content) => {
    try{
        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "ecovoyageromania@gmail.com",
              pass: "kbgpvwesfiwifrmh"
            }
          });

      const mailOptions ={
        from : "biancagabriela.asavoaei@gmail.com",
        to: email,
        subject: mailSubject,
        html: content
      }

      await transport.sendMail(mailOptions, function(error, info) {
          if(error){
            console.log("eroare trimitere mail?")
            console.log(error);
          }
          else
          {
            console.log('Mail sent succesfully:-', info.response);
          }
      });

    } catch(error) {
        console.log("eroare catch");
        console.log(error)
    }
}

export default sendMail;