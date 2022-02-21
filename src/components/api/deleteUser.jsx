import Url from '@/components/const'

async function deleteUser(id) {
  const urlString = `${Url}users/${id}`
  const response = await fetch(urlString, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.demmiUserToken}`,
      Accept: 'application/json',
    },
  })
  if (response.ok) {
    const user = await response.json()
    return user
  } if (response.status === 401) {
    const error = await response.text()
    return error
  }
  return response.status
}

export default deleteUser
