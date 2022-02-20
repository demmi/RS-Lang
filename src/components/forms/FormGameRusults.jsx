import React, { useContext, useEffect, useRef, useState } from 'react'
import '@/components/forms/StylesForms.css'
import { FormStatus, ResultsArray, PageRouter } from '@/components/context'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableContainer, TableRow,
} from '@mui/material'
import URL, { DT_DISABLED, DT_GAME_RESULTS, GAMES_PAGE } from '@/components/const';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function FormGameRusults() {
    const [audioSrc, setAudio] = useState(null)
    const { dialogType, setDialogType } = useContext(FormStatus)
    const { resultsArray } = useContext(ResultsArray)
    const { routerPage, setRouterPage } = useContext(PageRouter)
    const audioRef = useRef(new Audio(audioSrc))

    const isOpen = dialogType === DT_GAME_RESULTS;

    const catched = resultsArray.filter((el) => el.isCatch).length
    const notCathed = resultsArray.length - catched

    useEffect(() => {
        audioRef.current.pause()
        audioRef.current = new Audio(audioSrc)
        audioRef.current.play()
      }, [audioSrc])

    const handleClose = () => {

        setDialogType(DT_DISABLED)
        setRouterPage(GAMES_PAGE)
    }

    const speakWord = (event) => {
        const elAudioSrc = event.currentTarget.dataset.audio
        setAudio(`${URL}${elAudioSrc}`)
      }

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>

            <DialogTitle id='form-regok-title'>Результаты игры: верно {catched}, неверно {notCathed}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ height: '600px'}}>
                  <Grid container direction="column" justifyContent="center" alignItems="center" >
                      <TableContainer component={Paper} sx={{ marginTop: '10px', marginBottom: '10px'}} >
                            <Table size="small" aria-label="simple table">
                                <TableBody>
                                    {resultsArray.map((el) => (
                                        <StyledTableRow key={el.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            <StyledTableCell align="center">{el.word}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton aria-label="play/pause" onClick={speakWord} data-audio={el.audio} >
                                                    <RecordVoiceOverIcon sx={{ height: 25, width: 25 }} />
                                                </IconButton>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{el.transcription}</StyledTableCell>
                                            <StyledTableCell align="center">{el.wordTranslate}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton aria-label="check-icon" >
                                                    {el.isCatch
                                                        ? <CheckIcon sx={{ height: 25, width: 25, color: 'green' }} />
                                                        : <CloseIcon sx={{ height: 25, width: 25, color: 'red' }} /> }
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                      </TableContainer>
                  </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions className="btn-center">
                <Button onClick={handleClose} color='primary' variant='outlined'>OK</Button>
            </DialogActions>

        </Dialog>
    );
};

export default FormGameRusults;
