const fetch = require("cross-fetch");
const cron = require('node-cron');


async function AccessToken() {
    // Using basic Auth for authentication
    cron.schedule('* * * * *', async() => {
        console.log('running a task every second');
        let resAccess = await fetch("https://prod-federated-graphql-api.omnivoltaic.com/graphql", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
            mutation {
              signInUser(signInCredentials:{
                email:"zanderthuo@gmail.com"
                password:"Qwerty00"
              }){
                accessToken
              }
            }
              `
            })
        })
        let acc = await resAccess.json();
        let AccessToken = acc.data.signInUser.accessToken
        console.log(AccessToken)
    });
}
console.log(AccessToken())