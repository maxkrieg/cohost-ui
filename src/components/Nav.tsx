import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { logoutUser } from '../api'

import { useUserContext } from '../state'

const deLinkify = {
  textDecoration: 'none',
  color: 'inherit',
  '&:focus, &:hover, &:visited, &:link, &:active': {
    textDecoration: 'none',
  },
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: deLinkify,
    titleWrapper: {
      flexGrow: 1,
    },
    loginButton: deLinkify,
  }),
)

export const Nav: React.FC = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { user, setUser } = useUserContext()
  const location = useLocation()
  const onLoginPage = location.pathname.includes('login')

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (e) {
      console.log('Error loggin out (Nav)')
      return
    }
    setUser(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {user && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" className={classes.titleWrapper}>
            <RouterLink to="/" className={classes.title}>
              cohost
            </RouterLink>
          </Typography>

          {user ? (
            <div>
              {user.firstName}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            !onLoginPage && (
              <RouterLink to="/login" className={classes.loginButton}>
                <Button color="inherit">Login</Button>
              </RouterLink>
            )
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
