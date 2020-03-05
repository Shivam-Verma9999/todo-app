const axios = require('axios');

axios.post('http://40.121.182.221:3000/auth/signin', {
    username: 'sv805388@gmail.com',
    password: 'abc'
},
    {
        maxRedirects: 0,
        withCredentials: true
    })
    .then(data => {
        console.log(data);
        console.log('ddddd');
    }).catch(er => {
        console.log(er);
        console.log(er.response.headers['set-cookie'][0]);
        console.log('errrrrr');
        axios.get('http://40.121.182.221:3000/profile', {
            headers: { cookie: er.response.headers['set-cookie'][0] }
        }).then(res => {
            console.log(res);
        }).catch(er => {
            console.log(er);
            console.log('ddddd');
        })
    })

