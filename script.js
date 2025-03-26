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

// btn.addEventListener('click', function() {
//   getCountryData('georgia');
// });

// getCountryData('georgia');

// Challenge #1
// const whereAmI = function(lat, lng) {
//
//   fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName} `);
//
//       return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => console.error(`${err.message} 💥`));
// };
//
// whereAmI(41.697102, 44.773674);
// Challenge #1 Done

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
//
// Promise.resolve('Resolved promise 2').then(res => {
// for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// })
// console.log('Test end');

// const lotteryPromise = new Promise(function(resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function() {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your monet 💩'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
//
// // Promisifying setTimeout
// const wait = function(seconds) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
//
// wait(1).then(() => {
//   console.log('I waited for 1 second');
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 2 seconds');
//   return wait(2);
// }).then(() => {
//   console.log('I waited for 3 seconds');
//   return wait(3);
// });
// // callback hell
// // setTimeout(() => {
// //   console.log('1 second passed');
// //   setTimeout(() => {
// //     console.log('2 seconds passed');
// //     setTimeout(() => {
// //       console.log('3 seconds passed');
// //     }, 1000);
// //   }, 1000);
// // }, 1000);
//
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.log(x));

// callback based
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );
// console.log('Getting position...');

// // promise based
// const getPosition = function() {
//   return new Promise(function(resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   });
// };
//
// // getPosition().then(pos => console.log(pos));
//
//
// const whereAmI = function(lat, lng) {
//   getPosition().then(pos => {
//     const {latitude, longtitude} = pos.coords
//     return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longtitude}`);
//   }).then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName} `);
//
//       return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => console.error(`${err.message} 💥`));
// };
//
// btn.addEventListener('click', whereAmI);

//Challenge #2
// const imagesContainer = document.querySelector('.images');
//
// const wait = function(seconds) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
//
// const createImage = function(imgPath) {
//
//   return new Promise(function(resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//
//     img.addEventListener('load', function() {
//       imagesContainer.append(img);
//       resolve(img);
//     });
//
//     img.addEventListener('error', function() {
//       reject(new Error('Image not found'));
//     });
//   });
// };
//
// let currentImage;
// createImage('./img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   }).then(() => {
//   currentImage.style.display = 'none';
//   return createImage('./img/img-2.jpg');
// }).then(img => {
//   currentImage = img;
//   console.log('Image 2 loaded');
//   return wait(2);
// }).then(() => currentImage.style.display = 'none')
//   .catch(err => console.error(err));

const getPosition = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function(country) {
  // Geolocation
  const position = await getPosition();
  console.log(position);
  const { latitude, longitude } = position.coords;

  // Reverse geocoding
  const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`);
  const dataGeo = resGeo.json();
  console.log(dataGeo);

  // Country data
  // fetch(`https://restcountries.com/v2/name/${country}`)
  //   .then(res => res.json()).then(data => console.log(data));
  const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI('');
console.log('FIRST');