import Url from '@/components/const'

async function statisticsGet(id, token) {
  const urlString = `${Url}users/${id}/statistics`
  const response = await fetch(urlString, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  if (response.ok) {
    const stat = await response.json()
    console.log(stat)
    return stat
  }
  return response.status
}

export default statisticsGet
