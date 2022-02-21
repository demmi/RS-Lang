import Url from '@/components/const'

async function statisticsGet(id) {
  const urlString = `${Url}users/${id}/statistics`
  const response = await fetch(urlString, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.demmiUserToken}`,
      Accept: 'application/json',
    },
  })
  if (response.ok) {
    const user = await response.json()
    console.log(user)
    return user
  }
  return response.status
}

export default statisticsGet
