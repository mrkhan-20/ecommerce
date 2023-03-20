const nodemailer = require('nodemailer');


const sendEmail= async (email,token,callback)=>{
    let testAccount =await nodemailer.createTestAccount();

    const transporter =await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'quinten60@ethereal.email',
            pass: 'Bh6VPDgBTQ5fq4xYqq'
        }
    });

    let info =await transporter.sendMail({
        from: '"Ecommerce" <taha65641@gmail.com.com>', // sender address
        to: email, // list of receivers
        subject: "Email verification", // Subject line
        html: `<h1>Please verify mail</h1> <a href="http://localhost:3000/verifyMail/${token}"> Click here</a>`, // html body
      });
      console.log(info);
      callback(null,info);
}
module.exports=sendEmail;