const nodemailer = require('nodemailer');


const sendForgotmail= async (email,callback)=>{
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
        subject: "Reset password", // Subject line
        html: `<h1>Click below to reset password</h1> <a href="http://localhost:3000/resetPass/${email}"> Click here</a>`, // html body
      });
      console.log(info);
      callback(null,info);
}
module.exports=sendForgotmail;