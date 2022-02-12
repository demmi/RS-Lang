import Url from '@/components/const'

async function getWord(id) {
  const urlString = `${Url}words/${id}`
  const response = await fetch(urlString)
  const word = await response.json()
  return word
}

export default getWord
