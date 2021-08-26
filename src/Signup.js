import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        root2: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    },
}));

export default function Signup() {

    const getUserData = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setValues({...values, [name]:value });
    }

    const postData = async(e) =>
    {
        e.preventDefault();
       const {email,password,confirmPassword}=values;
       const res = await fetch('https://react-firbase-signup-default-rtdb.firebaseio.com/signup.json',
       {
           method:"POST",
           headers:{
               "Content-Type":"application/json",

           },
           body: JSON.stringify({
               email,
               password,
               confirmPassword

           })
       })
       if(res)
       {
           setValues({
               email:"",
               password:"",
               confirmPassword:""
           })
       }
    

    }
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        confirmPassword: ''

    });




    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Typography variant="h4">Sign Up</Typography>


            <form method = "POST" className={classes.root}>
              
              
                <TextField name="email" onChange={getUserData} value={values.email} id="standard-basic" label="Standard" /><br />
                {/*  */}


                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                    
                        name="password"
                        onChange={getUserData}
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                {/*  */}
                <br />

                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input
                    
                        name="confirmPassword"
                        onChange={getUserData}
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br />
                <Button onClick={postData} variant="contained" color="primary">Signup</Button>
            </form>
        </Box>
    );
}
