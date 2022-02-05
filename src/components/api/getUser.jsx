import Url from '@/components/const'

async function createUser(id) {
  const urlString = `${Url}users/${id}`
  const response = await fetch(urlString)
  if (response.ok) {
    const user = await response.json()
    return user
  } if (response.status === 401 || response.status === 404) {
    const error = await response.text()
    return error
  }
  return response.status
}

export default createUser
