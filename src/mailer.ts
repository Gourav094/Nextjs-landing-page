import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import crypto from 'crypto';

function generateToken(userId:any,length:number) {
  const hash = crypto.createHash('sha256').update(userId.toString()).digest('base64');

  const alphanumericHash = hash.replace(/[^a-zA-Z0-9]/g, '');

  return alphanumericHash.slice(0, length);
}

export const sendEmail = async ({email,emailType,userId}:any) => {

    try{
        const hashedToken = generateToken(userId,10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate({_id:userId},{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate({userId},{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
    
        var transport = nodemailer.createTransport({
            // host: "sandbox.smtp.mailtrap.io",
            // port: 2525,
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.MAIL_ID,
              pass: process.env.GOOGLE_APP_PASS
            }
          });
        
        const mailOptions = {
            from:"gouravgarg0203@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`
        }
        const mail = await transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          })
        return mail;
    }catch(err){
        console.log(err)
    }

}