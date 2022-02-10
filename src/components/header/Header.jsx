import React, { useContext, useState, useEffect } from 'react'
import logo from '@/assets/icon/favicon.png'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import LoginComponent from '@/components/login/LoginComponent'
import IsLogged, { PageRouter } from '../context'
import AvatarMenu from './AvatarMenu'
import getUser from '../api/getUser'
import { routingPages, CUR_PAGE } from '../const'


/* https://mui.com/components/app-bar/ */

/* For future use: Use user name and logging state */

// const pages = ['главная', 'учебник', 'игры', 'статистика']
const pages = Object.keys(routingPages)
// console.log(page2)


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { isLogged, setLogged } = useContext(IsLogged)
  const { setRouterPage } = useContext(PageRouter)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    const curTitle = event.target.innerText.toLowerCase();
    const curPage = routingPages[curTitle];
    sessionStorage.setItem(CUR_PAGE, curPage);
    setRouterPage(curPage)
    console.log('click, curTitle:', curTitle, 'curPage:', curPage)
    setAnchorElNav(null)
  }

  const checkLogged = async () => {
    if (localStorage.demmiUserId) {
      const response = await getUser(localStorage.demmiUserId, localStorage.demmiUserToken)
      if (typeof response === 'object') {
        return true
      }
    }
    return false
  }

  useEffect(() => checkLogged().then(n => setLogged(n)))

  const component = isLogged ? <AvatarMenu /> : <LoginComponent />

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={logo} alt="RS-Lang logo" width={50} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>{component}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
