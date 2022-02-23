import statisticsGet from '@/components/api/statisticsGet'
import statisticsPut from '@/components/api/statisticsPut'

const addWordStat = async id => {
  const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)
  const callStr = JSON.parse(data.optional.callgame)
  const sprint = JSON.parse(data.optional.sprintgame)
  const learn = JSON.parse(data.optional.learned)
  const newLen = learn.push({ id, date: Date.now() })
  const word = JSON.parse(data.optional.word)
  await statisticsPut(localStorage.demmiUserId, localStorage.demmiUserToken, newLen, callStr, sprint, learn, word)
}

export default addWordStat
