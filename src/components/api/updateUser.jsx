import Url from '@/components/const'

async function updateUser(id, mail, pass, token) {
  const urlString = `${Url}users/${id}`
  const body = { email: mail, password: pass }
  const response = await fetch(urlString, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (response.ok) {
    const user = await response.json()
    return user
  }
  if (response.status === 401 || response.status === 400) {
    const error = await response.text()
    return error
  }
  return response.status
}

export default updateUser
