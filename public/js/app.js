console.log("Client side javascript loaded")

fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then(data => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form');
const addressValue = document.querySelector('input');
const messageOne = document.querySelector('#p1');
const messageTwo = document.querySelector('#p2');


weatherForm.addEventListener('submit', (e) => {
  
    e.preventDefault();
    messageOne.textContent = "Loading....." ;
    fetch('http://localhost:3000/weather?address=' + addressValue.value).then((response, error) =>
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error;
                messageTwo.textContent = '';

            } else {
                // console.log(data)
                messageOne.textContent = data.location ;
                messageTwo.textContent = data.forecast ;
            }
        })
    )
})


