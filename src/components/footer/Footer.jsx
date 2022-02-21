import React from 'react'

import GitHubLogo from '@/assets/svg/github.svg'
import RsSchoolLogo from '@/assets/svg/rss.svg'
import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'

function Footer() {
  return (
    <AppBar position="static" elevation={0} component="footer">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Box>
          <Link
            href="https://github.com/demmi"
            target="_blank"
            rel="noreferrer"
            underline="none"
            display="flex"
            gap="10px"
            style={{ alignItems: 'center' }}
          >
            <GitHubLogo fill="#ffffff" height={20} width={20} viewBox="0 0 400 400" />
            <Typography variant="h6" color="white" sx={{ flexGrow: 1 }}>
              demmi
            </Typography>
          </Link>
          <Link
            href="https://github.com/sergioivanov008"
            target="_blank"
            rel="noreferrer"
            underline="none"
            display="flex"
            gap="10px"
            style={{ alignItems: 'center' }}
          >
            <GitHubLogo fill="#ffffff" height={20} width={20} viewBox="0 0 400 400" />
            <Typography variant="h6" color="white" sx={{ flexGrow: 1 }}>
              sergioivanov008
            </Typography>
          </Link>
        </Box>
        <Typography variant="h6">© 2022</Typography>
        <Link href="https://rs.school/js/" underline="none" target="_blank" rel="noreferrer">
          <RsSchoolLogo fill="#ffffff" width={150} height={55} viewBox="0 0 242 90" />
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
