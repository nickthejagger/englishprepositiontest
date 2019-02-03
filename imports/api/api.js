import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
    "Get_Soal"(){
        const url = "https://api.myjson.com/bins/bzyt8"
        HTTP.get(url, (err, res)=>{
            console.log(res.data)
            return("res.data")
        })
    }
})