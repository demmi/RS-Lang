import Url from '@/components/const'

async function signIn(email, password) {
  const urlString = `${Url}signin`
  const body = { 'email':email, 'password':password }
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
  } if (response.status === 403 || response.status === 404) {
    const error = response.status
    return error
  }
  return response.status
}

export default signIn
