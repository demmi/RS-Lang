import Url from '@/components/const'

async function getAllUserAggWords(userId, userToken, page, filter) {
  // const filter = { "userWord.difficulty": "hard" }
  // const filterJSON = JSON.stringify(filter)
  const urlString = `${Url}users/${userId}/aggregatedWords?page=${page}&wordsPerPage=20&filter=${JSON.stringify(
    filter
  )}`
  // const urlString = `${Url}users/${userId}/aggregatedWords?filter=${JSON.stringify(filter)}`
  const response = await fetch(urlString, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
    },
  })
  const words = await response.json()
  return words
}

export default getAllUserAggWords
