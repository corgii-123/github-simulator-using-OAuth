import client from '../../OAuth'

const rootURL = 'https://api.github.com'

export function getAuthToken(code) {
  return new Promise((resolve) => {
    const url = 'https://github.com/login/oauth/access_token'
    let myRequest = new Request(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: client.client_id,
        client_secret: client.client_secrets,
        code
      })
    })
    fetch(myRequest).then(res => res.json()).then(data => {
      resolve(data)
    })
  })
}

export function getGithubUser(token) {
  return new Promise((resolve) => {
    let myRequest = new Request(`${rootURL}/user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8;',
        'Accept': 'application/json',
        'Authorization': `${token.token_type} ${token.access_token}`
      },
    })
    fetch(myRequest).then(res => res.json()).then(data => {
      resolve(data)
    })
  })
}