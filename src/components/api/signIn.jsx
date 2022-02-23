import Url from '@/components/const'
import statisticsPut from '@/components/api/statisticsPut'
import statisticsGet from '@/components/api/statisticsGet'

async function signIn(email, password) {
  const urlString = `${Url}signin`
  const body = { email, password }
  const response = await fetch(urlString, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (response.ok) {
    const user = await response.json()
    const stat = await statisticsGet(user.userId, user.token)
    if (stat === 404) {
      await statisticsPut(user.userId, user.token, 0, [], [], [], [])
    }
    return user
  }
  if (response.status === 403 || response.status === 404) {
    const error = response.status
    return error
  }
  return response.status
}

export default signIn
