'use strict';

// COUNTRIES API URL
// https://restcountries.com/v2/name/portugal

// REVERSE GEOCODING API URL
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderCountry = function(data, className = '') {

  const html = `
        <article class='country ${className}'>
          <img class='country__img' src='${data.flag}' />
          <div class='country__data'>
            <h3 class='country__name'>${data.name}</h3>
            <h4 class='country__region'>${data.region}</h4>
            <p class='country__row'><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
            <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

const renderError = function(msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = '1';
};

// const getCountryData = function(country) {
//
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//
//   request.addEventListener('load', function() {
//     console.log(this.responseText);
//
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//
//     const html = `
//         <article class='country'>
//           <img class='country__img' src='${data.flag}' />
//           <div class='country__data'>
//             <h3 class='country__name'>${data.name}</h3>
//             <h4 class='country__region'>${data.region}</h4>
//             <p class='country__row'><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//             <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
//             <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//   `;
//
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = '1';
//   });
// };
//
// getCountryData('georgia');
// getCountryData('usa');
// getCountryData('germany');


// const getCountryAndNeighbour = function(country) {
//
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//
//   request.addEventListener('load', function() {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//
//     // Render country 1
//     renderCountry(data)
//
//     // Get neighbour country 2
//     const neighbour = data.borders?.[0]
//
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//
//     request2.addEventListener('load', function() {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//
//       renderCountry(data2, 'neighbour');
//     })
//   });
// };
//
// getCountryAndNeighbour('georgia');


//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

// const getCountryData = function(country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function(response) {
//       console.log(response);
//       return response.json()
//     })
//     .then(function(data) {
//       console.log(data);
//       renderCountry(data[0]);
//     })
// };

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url)
    .then(
      response => {
        if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
        return response.json();
      });
};

const getCountryData = function(country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(err);
      console.error(`${err} 💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });
};

btn.addEventListener('click', function() {
  getCountryData('georgia');
});

// getCountryData('georgia');

// Challenge #1
const whereAmI = function(lat, lng) {

  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName} `);

      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message} 💥`));
};

whereAmI(41.697102, 44.773674);