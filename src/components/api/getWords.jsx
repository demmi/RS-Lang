import Url from '@/components/const'

async function getWords(group = 0, page= 0) {
  const urlString = `${Url}words?group=${group}&page=${page}`
  const response = await fetch(urlString)
  const words = await response.json()
  return words
}

export default getWords
