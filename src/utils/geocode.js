const request = require('postman-request')

const geocode = (address,call) =>{

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYWtzaGF0LWFyeWEiLCJhIjoiY2w3Nmpia3ltMWgzbDN1b2dvNjU1ZnduZyJ9.NGYwFt9IPtTPU9kThLHfxA"

    request({url,json:true},(error,{body}) =>{
        if(error){
            call("unable to connect location services",undefined)
        }
        else if(body.features.length === 0){
            call("Unable to find location.Try another location",undefined)
        }
        else{
            call(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode