console.log('coucou');

// axios.get('https://rickandmortyapi.com/api/character')
// .then((response) => {
//     console.log(response.data.results)

//     const divPlop = document.getElementById('plop');

//     response.data.results.forEach((character) => {
//         const title = document.createElement('h2');
//         title.innerText = character.name;

//         divPlop.appendChild(title);
//     })
// })

// fetch('https://rickandmortyapi.com/api/character')
// .then((response) => {
//     return response.json()
// }).then((json) => {
//     console.log(json.results)

//     const divPlop = document.getElementById('plop');

//     json.results.forEach((character) => {
//         const title = document.createElement('h2');
//         title.innerText = character.name;

//         divPlop.appendChild(title);
//     })
// });

console.log(document.querySelector('#plop'))
