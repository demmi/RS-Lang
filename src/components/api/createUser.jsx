import Url from '@/components/const'

async function createUser(name, email, password) {
  const urlString = `${Url}users`
  const body = { 'name':name, 'email':email, 'password':password }
  const response = await fetch(urlString, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  })
  if (response.ok) {
    const user = await response.json()
    return user
  } if (response.status === 417) {
    const error = await response.text()
    return error
  } if (response.status === 422) {
    const error = await response.json()
    return error.error.errors
  }
  return response.status
}

export default createUser
