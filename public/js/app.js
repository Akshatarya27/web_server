console.log("HERE IS WEATHER APP!!")

// fetch("http://localhost:3000/weather?address=delhi").then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.forecast)
//             console.log(data.location)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#p1')
const messagetwo = document.querySelector("#p2")


weatherform.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageone.textContent = 'Loading...'
    messagetwo.textContent = ""

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageone.textContent = data.error

            } else {
                // console.log(data.forecast)
                // console.log(data.location)
                messageone.textContent = data.location
                messagetwo.textContent = data.forecast
            }
        })
    })
})