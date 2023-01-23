import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Avatar, Button, Grid, Paper, Typography } from '@mui/material'
import {LockOpenOutlined} from '@mui/icons-material'
import authStyles from './style'
import Input from './Input'
import Icon from './icon' 
//Google O-Auth : 
import { GoogleLogin } from 'react-google-login'
import {gapi} from 'gapi-script'
//dispatch 
import {useDispatch} from 'react-redux'
import { createUser, login, putUser } from '../../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

import {clientId} from './secret'

const Auth = () => {
  const initForm = {firstName:'', lastName:'', email:'', password:'', confirmPassword : ''}
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initForm)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const classes = authStyles()
  //Id Client Google : 
  

/*   const start = () => {
    gapi.client.init({
      clientId : clientId,
      scope : ''
    })
  } 

   useEffect(()=>{
    gapi.load('client:auth2', start)
  }, []) */

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignUp){
      try {
        console.log('formData in Auth :', formData)
        dispatch(createUser(formData))
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }else{
      dispatch(login(formData))
      navigate('/')
    }
  }
  const handleChange = (e) => {
    setFormData({ ... formData, [e.target.name]: e.target.value })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    try {
      console.log('Google Success ! current user : ', res)
      dispatch(putUser({profile : res.profileObj, token : res.tokenId}))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = async (error) => {
    console.log('Google Failure !', error)
  }

  return (
    <Container maxWidth="xs" component='main'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined></LockOpenOutlined>
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form onSubmit={handleSubmit} className={`${classes.form} ${classes.root}`}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half={true} type='text'/>
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half={true} type='text'/>
                </>
              )
            }
            <Input name='email' label='Email Adress' handleChange={handleChange} half={false} type='email'/>
            <Input name='password' label='Password' handleChange={handleChange} half={false} type={showPassword?'text' : 'password'} handleShowPassword={handleShowPassword}/>
            {
              isSignUp && (
                <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} half={false} type='password'/>
              )
            }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {
              isSignUp ? 'Sign Up' : 'Sign In'
            }
          </Button>
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <Button className={classes.googleButton} variant='contained' fullWidth color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon></Icon>}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
          />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {
                  isSignUp ? 'Already Have An Account ? Sign In ' : 'Dont have an Account Sign Up' 
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>        
    </Container>
  )
}

export default Auth