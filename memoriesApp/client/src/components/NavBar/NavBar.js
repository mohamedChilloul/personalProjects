import React from 'react'
import {AppBar, Avatar, Button, Toolbar, Typography} from '@mui/material'
import memoriesImage from '../../images/memories.png'
import navStyles from './style'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux' 
import { logOut } from '../../reducers/userReducer'

const NavBar = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const classes = navStyles()
  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/auth')
  }  
  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' variant='h2' className={classes.heading}>Memories</Typography>
        <img src={memoriesImage} alt="imageAvatar" height='60' className={classes.image}/>
      </div>
      <Toolbar className={classes.toolbar}>
        {
          user ? (                                                                        
            <div className={classes.profile}>
               <Avatar alt='profileAvatar' src={user.profile.imageUrl}>{user.profile.name.charAt(0)}</Avatar>
               <Typography className={classes.userName} variant='h6' >{user.profile.name}</Typography>
               <Button className='' variant='contained' color='secondary' onClick={handleLogOut}>Logout</Button> 
            </div>
          ) :
          (
            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar