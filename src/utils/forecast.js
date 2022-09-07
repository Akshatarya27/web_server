const request = require('postman-request')
const response = require('express')

const forecast = (latitude,longitude,callback) =>{
    
    const url = "http://api.weatherstack.com/current?access_key=914c4324a500483221dc4160bd5a576f&query="+latitude+","+longitude+"&units=s"
    request({url,json:true},(error,{body}={}) =>{
        if(error){
                callback('Unable to connect to weather services',undefined)
        }
        else if(body.error){
                callback("Location is not defined",undefined)
        }
        else{
                callback(undefined,body.current.weather_descriptions[0]+ " The Temp is "+body.current.temperature+" but it feels like "+body.current.feelslike)
        }
    })
}

module.exports = forecast

// const url = "http://api.weatherstack.com/current?access_key=914c4324a500483221dc4160bd5a576f&query=30.686529409119498, 76.66229761784999&units=s"

// request({url:url,json:true},(error,response) =>{
//     if(error){
//         console.log('unable to Connect to Weather Services')
//     }
//     else if(response.body.error){
//         console.log('Unable to find location')
//     }
//     // const data = JSON.parse(response.body)
//     // console.log(response.body.current)
//     else{
//     console.log( response.body.current.weather_descriptions[0]+ " The Temp is "+response.body.current.temperature+" but it feels like "+response.body.current.feelslike)}
// })