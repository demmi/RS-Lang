import React, { useContext, useEffect, useRef, useState } from 'react'
import '@/components/forms/StylesForms.css'
import IsLogged, { FormStatus, ResultsArray, PageRouter, SourceRoute, SelectedGame } from '@/components/context'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material'
import URL, { DT_DISABLED, DT_GAME_RESULTS } from '@/components/const'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import getAllUserWords from '@/components/api/getAllUserWords'
// import getAllUserAggWords from '@/components/api/getAllUserAggWords'
import deleteUserWord from '@/components/api/deleteUserWord'
import statisticsGet from '@/components/api/statisticsGet'
import statisticsPut from '@/components/api/statisticsPut'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function FormGameRusults() {
  const [audioSrc, setAudio] = useState(null)
  const { dialogType, setDialogType } = useContext(FormStatus)
  const { resultsArray } = useContext(ResultsArray)
  const { setRouterPage } = useContext(PageRouter)
  const { gameRoute } = useContext(SourceRoute)
  const { isLogged } = useContext(IsLogged)
  const { game } = useContext(SelectedGame)
  const audioRef = useRef(new Audio(audioSrc))
  const isOpen = dialogType === DT_GAME_RESULTS
  const catched = resultsArray.filter(el => el.isCatch).length
  const notCathed = resultsArray.length - catched

  useEffect(async () => {
    if (isLogged) {
      const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)
      const callStr = JSON.parse(data.optional.callgame)
      const sprint = JSON.parse(data.optional.sprintgame)
      const learn = JSON.parse(data.optional.learned)

      const usedWords = JSON.parse(data.optional.word)
      const temp = resultsArray.filter((element) => element.isCatch === true || element.isCatch === false )
        .map((elem) => ({id: elem.id, isCatch: elem.isCatch}))
      let tempCount = 0
      temp.forEach((elem) => {
        if(!usedWords.map(el => el.id).includes(elem.id)) {
          usedWords.push({id: elem.id, count: 1, errors: elem.isCatch ? 0 : 1})
          tempCount += 1
        } else {
          usedWords.find((elm) => elm.id === elem.id).count += 1
          usedWords.find((elm) => elm.id === elem.id).errors = elem.isCatch
            ? usedWords.find((elm) => elm.id === elem.id).errors
            : usedWords.find((elm) => elm.id === elem.id).errors + 1
        }
      })
      console.log('temp:', temp, 'usedWords:', usedWords)

      const newLearn = learn.filter(
        elem =>
          !resultsArray
            .filter(el => el.isCatch === false)
            .map(e => e.id)
            .includes(elem.id)
      )
      await statisticsPut(
        localStorage.demmiUserId,
        localStorage.demmiUserToken,
        newLearn.length,
        callStr,
        sprint,
        newLearn,
        usedWords
      )
      const userWords = await getAllUserWords(localStorage.demmiUserId, localStorage.demmiUserToken)
      const learnedWords = userWords.filter(elem => elem.difficulty === 'learned')
      resultsArray
        .filter(elem => learnedWords.map(e => e.wordId).includes(elem.id) && elem.isCatch === false)
        .forEach(elem => deleteUserWord(localStorage.demmiUserId, localStorage.demmiUserToken, elem.id))
    }
  })

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(audioSrc)
    audioRef.current.play()
  }, [audioSrc])

  const setStatistic = async () => {
    const curDate = Date.now() // date: Date.now()
    const totalWord = resultsArray.length
    const numRightAnswers = resultsArray.filter((el) => el.isCatch === true).length
    const numWrongAnswers = resultsArray.filter((el) => typeof el.isCatch === 'boolean' && el.isCatch === false).length

    let maxCatch = 0
    let curMaxCatch = 0

    resultsArray.forEach((el) => {
      if(el.isCatch) {
        curMaxCatch += 1
      } else {
        if(curMaxCatch > maxCatch) {
          maxCatch = curMaxCatch
        }
        curMaxCatch = 0
      }
    })

    if(curMaxCatch > maxCatch) {
      maxCatch = curMaxCatch
    }

    const curObj = {'game': game, 'curDate': curDate, 'totalWord': totalWord, 'numRightAnswers': numRightAnswers, 'numWrongAnswers': numWrongAnswers, 'maxCatch': maxCatch}

    console.log('curObj:', curObj)

    const setStatisticData = async () => {
      const data = await statisticsGet(localStorage.demmiUserId, localStorage.demmiUserToken)
      const count = JSON.parse(data.learnedWords)
      const callStr = JSON.parse(data.optional.callgame)
      const sprint = JSON.parse(data.optional.sprintgame)
      const usedWords = JSON.parse(data.optional.word)
      if (curObj.game === 'Call') {
        console.log('Call')
        callStr.push(curObj)
      } else {
        console.log('Sprint')
        sprint.push(curObj)
      }
      // const callStr = curObj.game === 'Call' ? JSON.parse(data.optional.callgame).push(curObj) : JSON.parse(data.optional.callgame)
      // const sprint = curObj.game === 'Sprint' ? JSON.parse(data.optional.callgame).push(curObj) : JSON.parse(data.optional.sprintgame)
      const learn = JSON.parse(data.optional.learned)

      console.log('data:', data, 'len:', count, 'callStr+:', callStr, 'sprint+:', sprint, 'learn:', learn)
      console.log('resultsArray:', resultsArray, 'maxCatch:', maxCatch)
      await statisticsPut(localStorage.demmiUserId, localStorage.demmiUserToken, count, callStr, sprint, learn, usedWords)// !!!
    }
    setStatisticData()
  }

  const handleClose = () => {
    setStatistic()
    setDialogType(DT_DISABLED)
    setRouterPage(gameRoute)
  }

  const speakWord = event => {
    const elAudioSrc = event.currentTarget.dataset.audio
    setAudio(`${URL}${elAudioSrc}`)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-regok-title">
        Результаты игры: верно {catched}, неверно {notCathed}
      </DialogTitle>
      <DialogContent>
        <Paper>
          <TableContainer sx={{ marginTop: '10px', marginBottom: '10px' }}>
            <Table size="small" aria-label="simple table">
              <TableBody>
                {resultsArray.map(el => (
                  <StyledTableRow key={el.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell align="center">{el.word}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton aria-label="play/pause" onClick={speakWord} data-audio={el.audio}>
                        <RecordVoiceOverIcon sx={{ height: 25, width: 25 }} />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center">{el.transcription}</StyledTableCell>
                    <StyledTableCell align="center">{el.wordTranslate}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton aria-label="check-icon">
                        {el.isCatch ? (
                          <CheckIcon sx={{ height: 25, width: 25, color: 'green' }} />
                        ) : (
                          <CloseIcon sx={{ height: 25, width: 25, color: 'red' }} />
                        )}
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      <DialogActions className="btn-center">
        <Button onClick={handleClose} color="primary" variant="outlined">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormGameRusults
