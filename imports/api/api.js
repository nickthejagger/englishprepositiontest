import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'englishprepositiontest1@gmail.com',
           pass: 'Th1sisatest'
       }
   });

Meteor.methods({
    "Get_Soal"(){
        const url = "https://api.myjson.com/bins/bzyt8"
        HTTP.get(url, (err, res)=>{
            console.log(res.data)
            return("res.data")
        })
    },
    "Get_training"(md){
        return Assets.getText(md)
    },
    "POST_Email"(subject, text){
        const mailOptions = {
            from: 'englishprepositiontest1@gmail.com', // sender address
            to: 'nichola.indra@gmail.com', // list of receivers
            subject: subject, // Subject line
            html: text// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
        });
    }
})