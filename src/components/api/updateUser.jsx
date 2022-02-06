import Url from '@/components/const'

async function updateUser(id, name, pass) {
  const urlString = `${Url}users/${id}`
  const body = {'name': name, 'password': pass}
  const response = await fetch(urlString, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.demmiUserToken}`,
      Accept: 'application/json',
    },
    body: JSON.stringify(body)
  })
  if (response.ok) {
    const user = await response.json()
    return user
  } if (response.status === 401 || response.status === 400) {
    const error = await response.text()
    return error
  }
  return response.status
}

export default updateUser
