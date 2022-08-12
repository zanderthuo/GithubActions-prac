const fetch = require("cross-fetch");
const fs = require("fs");
// const AccessToken = require("./accessToken")

async function acl() {
    // Using basic Auth for authentication
    // console.log(AccessToken)
    let AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphbmRlcnRodW9AZ21haWwuY29tIiwicm9sZUlkIjoiNjE3NjY4Y2FmNzRlZWIwODliMzRlZTgzIiwicm9sZU5hbWUiOiJTVVBFUl9BRE1JTiIsInNlcnZpY2UiOm51bGwsImF1dGhJbnN0YW5jZSI6IjYxNzY2OGEwZjc0ZWViMTk0NjM0ZWU4MiIsImRpc3RyaWJ1dG9yUGVybSI6bnVsbCwic3ViUm9sZUlkIjpudWxsLCJkZWZhdWx0SW5zdGFuY2UiOiI2MTc2NjhhMGY3NGVlYjE5NDYzNGVlODIiLCJpYXQiOjE2NTk5NDY2OTIsImV4cCI6MTY2MDAzMzA5Mn0.gIFq1jyQDp6tKaqpNYhlVuntqlUlBxTGRZLHL4HfJdg"
        // query endpoint from graphql
        // let Token = AccessToken
    let res = await fetch("https://prod-federated-graphql-api.omnivoltaic.com/graphql", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AccessToken}`
        },
        body: JSON.stringify({
            query: `
                {
                  getAllDistributors(first:100){
                    page {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                  }
                }
              `
        })
    })
    let dist = await res.json();
    let allDist = dist.data.getAllDistributors.page.edges
        // let allDist2 = dist.data.getAllDistributors.page.edges.node.itemFleet
        // console.log(allDist)
        // loop through the results
    const data = []
    for (let index = 0; index < allDist.length; index++) {
        const element = allDist[index];
        if (element.node != null) {
            if (element.node.name !== null) {
                data.push("name" + " " + element.node.name)
                data.push("topic" + " " + element.node.itemFleet.name)
                data.push("")
            }
        }
    }
    console.log(data)
        // append result to a txt file
    const newFile = await fs.writeFileSync('acl.txt', data.join('\n'));
    console.log(newFile)
}
console.log(acl())