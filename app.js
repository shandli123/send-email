require('dotenv').config()
const express = require('express')
//Body Parser has been deprecated:
//Use : express.urlencoded 
// const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
const nodemailer = require('nodemailer')
const port = process.env.PORT || 3000

const app = express();





//registration of static data
const curr_path = path.join(__dirname , "/public")
app.use(express.static(curr_path))

//Registing the path for hbs
app.set('view engine' , 'hbs')
app.set('views' , path.join(__dirname , "/public/views"))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/send' , (req, res) =>{
    // console.log(req.body)

    //Sending an Email :
    const output = `
            <p>New Email From the Portfolio Website </p>
            <h3>Contact Details </h3>
            <ul>
                <li> Name : ${req.body.name}</li>
                <li> Email : ${req.body.emailaddress}</li>
                <li> Subject : ${req.body.subject}</li>
            </ul> `
    


async function main() {  
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        service : 'gmail',
        secure: false, 
        auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD, 
        },
    });
    
    let info = await transporter.sendMail({
        from: process.env.SENDER, 
        to:   process.env.RECIVER,
        subject: "Mail from the portfolio",
        // text: "Hello world?", // plain text body
        html: output
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }

    main().catch(console.error);
    
    res.render('contact' , {msg : "Email has been sent"})
})


app.use('/' ,(req,res) =>{
    res.render('contact')
})




app.listen(port , () => console.log("Listening on port :" , port))