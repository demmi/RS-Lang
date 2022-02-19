import React, { useContext, useState } from 'react'
import Cell from '@/assets/images/cell.jpg'
import Sprint from '@/assets/images/sprint.jpg'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import IsLogged, { PageRouter, Category, Page, SelectedGame } from '@/components/context'
import { LOAD_GAME } from '@/components/const'
import { getRandomNumber } from '@/components/games/gameUtils'

function SelectGame() {
  const { setGame } = useContext(SelectedGame)
  const { setRouterPage } = useContext(PageRouter)
  const { isLogged } = useContext(IsLogged)
  const { setCategory } = useContext(Category)
  const { setPage } = useContext(Page)
  const [callLevel, setCallLevel] = useState(0)
  const [sprintLevel, setSprintLevel] = useState(0)

  const handleChangeCall = event => {
    setCallLevel(event.target.value)
  }

  const handleChangeSprint = event => {
    setSprintLevel(event.target.value)
  }

  const handleClickCall = () => {
    setGame('Call')
    setCategory(callLevel)
    setPage(getRandomNumber(0, 29))
    setRouterPage(LOAD_GAME)
  }

  const handleClickSprint = () => {
    setGame('Sprint')
    setCategory(sprintLevel)
    setPage(getRandomNumber(0, 29))
    setRouterPage(LOAD_GAME)
  }

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid item>
        <Paper elevation={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={Cell} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Аудиовызов
              </Typography>
              <Typography variant="body2" color="text.secondary">
                «Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух. Вы должны выбрать перевод
                услышанного слова.
              </Typography>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="select-call-level">Выберите уровень</InputLabel>
                <Select
                  labelId="select-call-level"
                  id="select-call-level"
                  defaultValue={0}
                  value={callLevel}
                  onChange={handleChangeCall}
                  label="Выберите уровень"
                >
                  <MenuItem value={0}>Первый</MenuItem>
                  <MenuItem value={1}>Второй</MenuItem>
                  <MenuItem value={2}>Третий</MenuItem>
                  <MenuItem value={3}>Четвертый</MenuItem>
                  <MenuItem value={4}>Пятый</MenuItem>
                  <MenuItem value={5}>Шестой</MenuItem>
                  <MenuItem value={6} disabled={!isLogged}>
                    Седьмой
                  </MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleClickCall}>
                Начать
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item>
        <Paper elevation={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={Sprint} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Спринт
              </Typography>
              <Typography variant="body2" color="text.secondary">
                «Спринт» - это тренировка для повторения заученных слов из вашего словаря. Выберите соответсвует ли
                перевод предложенному слову
              </Typography>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="select-sprint-level">Выберите уровень</InputLabel>
                <Select
                  labelId="select-sprint-level"
                  id="select-sprint-level"
                  defaultValue={0}
                  value={sprintLevel}
                  onChange={handleChangeSprint}
                  label="Выберите уровень"
                >
                  <MenuItem value={0}>Первый</MenuItem>
                  <MenuItem value={1}>Второй</MenuItem>
                  <MenuItem value={2}>Третий</MenuItem>
                  <MenuItem value={3}>Четвертый</MenuItem>
                  <MenuItem value={4}>Пятый</MenuItem>
                  <MenuItem value={5}>Шестой</MenuItem>
                  <MenuItem value={6} disabled={!isLogged}>
                    Седьмой
                  </MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleClickSprint}>
                Начать
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SelectGame
