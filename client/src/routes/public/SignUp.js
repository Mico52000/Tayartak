import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignUp.css';
import NavBar from '../../Components/public/NavBar.js';
import MuiPhoneNumber from "material-ui-phone-number";
import Axios from 'axios';
import Paper from '@mui/material/Paper';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

const steps = ['General Info', 'Credentials'];

const theme = createTheme();

export default class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {

            activeStep: 0,

            firstName: "",
            firstNameError: "",
            lastName: "",
            lastNameError: "",
            email: "",
            emailError: "",
            username: "",
            usernameError: "",
            password: "",
            passwordError: "",
            confirmPassword: "",
            confirmPasswordError: "",
            address: "",
            addressError: "",
            phoneNumber: "",
            phoneNumberError: "",
            passportNumber: "",
            passportNumberError: "",

            submitError: "",
            submitResponse: "",
        }
        this.render = this.render.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }


    handleNext(e) {
        e.preventDefault();
        if (this.state.activeStep === 0) {
            this.handleFirstNext(e);
        }
        if (this.state.activeStep === 1) {
            this.handleSubmit(e);
        }
        // this.setState({ activeStep: this.state.activeStep + 1 })

    };
    handleBack() {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    firstNameOnChange(e) {
        this.setState({ firstName: e.target.value });
        if (e.target.value.length > 0) {
            this.setState({ firstNameError: "" });
        } else {
            this.setState({ firstNameError: "Enter your first name" });
        }
    };

    lastNameOnChange(e) {
        this.setState({ lastName: e.target.value });
        if (e.target.value.length > 0) {
            this.setState({ lastNameError: "" });
        } else {
            this.setState({ lastNameError: "Enter your last name" });
        }
    };

    emailOnChange(e) {
        this.setState({ email: e.target.value });
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        var test = regex.test(e.target.value);
        if (test) {
            this.setState({ emailError: "" });
        } else {
            this.setState({ emailError: "Enter a valid email address" });
        }
    };
    usernameOnChange(e) {
        this.setState({ username: e.target.value });
        const regex = /^\S*$/;
        var test = regex.test(e.target.value);
        if (test & e.target.value.length >= 6) {
            this.setState({ usernameError: "" });
        } else {
            this.setState({ usernameError: "Your username must be atleast 6 characters and it cannot contain spaces" });
        }
    };
    passwordOnChange(e) {
        this.setState({ password: e.target.value });
        var pass = e.target.value;
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        var test = regex.test(pass);
        if (test) {
            this.setState({ passwordError: "" });
        } else {
            this.setState({ passwordError: "Your password must be atleast 8 characters and must contain atleast 1 numeric character, 1 lowercase alphabetical character and 1 uppercase alphabetical character" });
        }
    };

    confirmPasswordOnChange(e) {
        this.setState({ confirmPassword: e.target.value });

        if (e.target.value === this.state.password) {
            this.setState({ confirmPasswordError: "" });
        } else {
            this.setState({ confirmPasswordError: "Passwords do not match" });
        }
    };

    addressOnChange(e) {
        this.setState({ address: e.target.value });
        if (e.target.value.length > 0) {
            this.setState({ addressError: "" });
        } else {
            this.setState({ addressError: "Enter your home address" });
        }
    };
    phoneNumberOnChange(e) {
        this.setState({ phoneNumber: e });
        if (e.length > 4) {
            this.setState({ phoneNumberError: "" });
        } else {
            this.setState({ phoneNumberError: "Enter your phone number" });
        }
    };
    passportNumberOnChange(e) {
        this.setState({ passportNumber: e.target.value });
        if (e.target.value.length === 9) {
            this.setState({ passportNumberError: "" });
        } else {
            this.setState({ passportNumberError: "Enter your 9 digits passport number" });
        }
    };

    handleFirstNext(e) {

        e.preventDefault();

        var flag = 0;

        if (this.state.firstName.length === 0) {
            this.setState({ firstNameError: "Enter your first name" });
            flag = 1;
        }
        if (this.state.lastName.length === 0) {
            this.setState({ lastNameError: "Enter your last name" });
            flag = 1;
        }
        if (this.state.email.length === 0) {
            this.setState({ emailError: "Enter a valid email address" });
            flag = 1;
        }
        if (this.state.address.length === 0) {
            this.setState({ addressError: "Enter your home address" });
            flag = 1;
        }
        if (this.state.phoneNumber.length === 0) {
            this.setState({ phoneNumberError: "Enter your phone number" });
            flag = 1;
        }
        if (this.state.passportNumber.length === 0) {
            this.setState({ passportNumberError: "Enter your 9 digits passport number" });
            flag = 1;
        }

        if ((this.state.firstNameError + this.state.lastNameError + this.state.emailError +
            this.state.addressError + this.state.phoneNumberError + this.state.passportNumberError).length !== 0 || flag === 1) {
            this.setState({ submitError: "Please complete/correct the required fields" })
        } else {

            Axios.post("http://localhost:8000/emailExist",{email:this.state.email}).then((resp) => {
                if(resp.data=="email is used before"){
                    this.setState({ submitError: "This email address is already used before" })

                }else{
                   
                    this.setState({ activeStep: this.state.activeStep + 1 })
                    this.setState({ submitError: "" })
                }
               
            }).catch((err) => alert(err));
            
        }

    }

    handleContinue(e){
        e.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password,
          }
      
          Axios.post("http://localhost:8000/login", credentials).then((resp) => {
            if (resp.data == "username does not exist") {
            //   this.setState({ submitError: "This username does not exist" })
            } else if (resp.data == "wrong password") {
            //   this.setState({ submitError: "Incorrect password" })
            }
            else {
              sessionStorage.setItem("accessToken", resp.data.accessToken)
              const loggedUser = resp.data.user;
              sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser))
      
              if(loggedUser.Type==="user"){
                window.location.href = '/user/home'
              }else{
                window.location.href = '/admin/home'
              }
              
            }
      
          }).catch((err) => alert(err));
    }

    handleSubmit(e) {
        e.preventDefault();

        var flag = 0;
        if (this.state.username.length === 0) {
            this.setState({ usernameError: "Your username must be atleast 6 characters and it cannot contain spaces" });
            flag = 1;
        }
        if (this.state.password.length === 0) {
            this.setState({ passwordError: "Your password must be atleast 8 characters and must contain atleast 1 numeric character, 1 lowercase alphabetical character and 1 uppercase alphabetical character" });
            flag = 1;
        }
        if (this.state.confirmPassword.length === 0) {
            this.setState({ confirmPasswordError: "Passwords do not match" });
            flag = 1;
        }


        if ((this.state.usernameError + this.state.passwordError + this.state.confirmPasswordError).length === 0 && flag === 0) {

            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                passportNumber: this.state.passportNumber,
                type:"user",
            }
            Axios.post("http://localhost:8000/register", user).then((resp) => {
                if(resp.data=="username exists"){
                    this.setState({ submitError: "This username is already used before" })

                }else{
                    this.setState({ submitResponse: resp.data })
                    this.setState({ activeStep: this.state.activeStep + 1 })
                    this.setState({ submitError: "" })
                }
               
            }).catch((err) => alert(err));

        } else {
            this.setState({ submitError: "Please complete/correct the required fields" })
        }
    }

    render() {
        return (

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavBar />

                <div className='background' >
                </div>

                <Container component="main" maxWidth="xs">
                    <Paper variant="outlined" sx={{
                        bgcolor: "rgba(255,255,255,0.6)",
                        paddingX: 6,
                        paddingY: 7,
                        marginBottom: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>



                        <Stepper activeStep={this.state.activeStep} sx={{ pt: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {this.state.activeStep === 0 ? (
                            <Grid container spacing={2} marginTop={3}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="first-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        value={this.state.firstName}
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        error={this.state.firstNameError.length === 0 ? false : true}
                                        helperText={this.state.firstNameError}
                                        onChange={this.firstNameOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={this.state.lastName}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        error={this.state.lastNameError.length === 0 ? false : true}
                                        helperText={this.state.lastNameError}
                                        onChange={this.lastNameOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={this.state.email}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        error={this.state.emailError.length === 0 ? false : true}
                                        helperText={this.state.emailError}
                                        onChange={this.emailOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={this.state.address}
                                        id="address"
                                        label="Home Address"
                                        name="address"
                                        autoComplete="address"
                                        error={this.state.addressError.length === 0 ? false : true}
                                        helperText={this.state.addressError}
                                        onChange={this.addressOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    {/* <MuiPhoneNumber
                                        required
                                        fullWidth
                                        value={this.state.phoneNumber}
                                        name="phone"
                                        label="Phone Number"
                                        data-cy="user-phone"
                                        defaultCountry={"eg"}
                                        disableAreaCodes
                                        variant="outlined"
                                        error={this.state.phoneNumberError.length === 0 ? false : true}
                                        helperText={this.state.phoneNumberError}
                                        onChange={this.phoneNumberOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    /> */}
                                    <PhoneInput
                                        required
                                        fullWidth
                                        country={'eg'}
                                        disableAreaCodes
                                        inputStyle={{
                                            height: 50,
                                            background: "transparent"
                                        }}
                                        value={this.state.phoneNumber}
                                        error={this.state.phoneNumberError.length === 0 ? false : true}
                                        helperText={this.state.phoneNumberError}
                                        onChange={this.phoneNumberOnChange.bind(this)}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={this.state.passportNumber}
                                        id="passport"
                                        label="Passport Number"
                                        name="passport"
                                        autoComplete="passport"
                                        error={this.state.passportNumberError.length === 0 ? false : true}
                                        helperText={this.state.passportNumberError}
                                        onChange={this.passportNumberOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        ) : this.state.activeStep === 1 ? (
                            <Grid container spacing={2} marginTop={3}>

                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        required
                                        fullWidth
                                        value={this.state.username}
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        error={this.state.usernameError.length === 0 ? false : true}
                                        helperText={this.state.usernameError}
                                        onChange={this.usernameOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={this.state.password}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        error={this.state.passwordError.length === 0 ? false : true}
                                        helperText={this.state.passwordError}
                                        onChange={this.passwordOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        value={this.state.confirmPassword}

                                        error={this.state.confirmPasswordError.length === 0 ? false : true}
                                        helperText={this.state.confirmPasswordError}
                                        onChange={this.confirmPasswordOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>


                            </Grid>
                        ) : (

                                <React.Fragment>
                                <Typography component="body2" variant="body2" marginTop={5}>
                                    {this.state.submitResponse}
                                </Typography>

                                <Button
                                //  href="/user/home"
                                onClick={this.handleContinue}
                                 variant="contained"
                                  sx={{ mt: 5, ml: 1 }}
                                  >
                                    Continue
                                </Button>
                                </React.Fragment>

                        )
                        }

                       {this.state.activeStep!==2?(
                           <React.Fragment>
                           <Typography component="body2" variant="body2" color="red" marginTop={5}>
                            {this.state.submitError}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>

                            {this.state.activeStep !== 0 && (
                                <Button onClick={this.handleBack} sx={{ mt: 2, ml: 1 }}>
                                    Back
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                onClick={this.handleNext}
                                sx={{ mt: 2, ml: 1 }}
                            >
                                {this.state.activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                            </Button>
                        </Box>


                        <Link href="/signin" variant="body2" marginTop={3}>
                            Already have an account? Sign in
                        </Link>
                        </React.Fragment>
                        ):(
                            <div>

                            </div>
                        )}



                    </Paper>
                </Container>

            </ThemeProvider>

        );
    }
}