const axios = require('axios');
const qs = require('querystring');

let username = 'sv805388@gmail.com';
let url = "http://40.121.182.221:3000/auth/signIn";
// console.log(username);
let password = 'abc';

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
}

let body = {
    username: (username),
    password: encodeURIComponent(password)
};


console.log(body.username);
axios.post(url, qs.stringify(body), config)
    .then((result) => {
        console.log('then', result);
    })
    .catch((err) => {
        // Do somthing
        console.log('errr', err);
    })