import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

const Input = ({half, name, label, autoFocus, type, handleChange, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={
                name==='password' ? {
                    endAdornment : (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type ==='password' ?<Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null
            }
        >
        </TextField>          
    </Grid>
  )
}

export default Input