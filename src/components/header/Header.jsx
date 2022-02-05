import React from 'react'
import logo from '@/assets/icon/favicon.png'
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box, Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import createUser from '@/components/api/createUser'
// import signIn from '@/components/api/signIn'
import LoginComponent from '@/components/login/LoginComponent';

/* https://mui.com/components/app-bar/ */


/* For future use: Use user name and logging state */
// const isLogged = false;
const userName = 'Pablo'

const pages = ['Главная', 'Учебник', 'Игры', 'Статистика'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [isLogin, setLogin] = React.useState(true);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = async () => {
    setAnchorElNav(null);
    console.log(await createUser('Andrew', 'a@aa.ru', 'andrew123'))
  };

  // const handleLogin = async () => {
  //   console.log(await signIn('a@aa.ru', 'andrew123'))
  // }

  const handleLogout = () => {
    setLogin(false);
  }

  // const component = isLogged ?
  const component = isLogin ?
    <Tooltip title="Logout">
      <Avatar onClick={handleLogout}>{userName[0]}</Avatar>
    </Tooltip> :
    // <Button
    //   color="inherit"
    //   variant="h6"
    //   sx={{
    //     fontSize: 16,
    //     color: 'common.white',
    //     ml: 3,
    //   }}
    //   onClick={handleLogin}
    // >Login</Button>
    <LoginComponent />

  return (

    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={logo} alt="RS-Lang logo" width={50}/>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {component}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
