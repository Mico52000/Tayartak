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
//import './Edit2.css';
import Axios from 'axios';
import Paper from '@mui/material/Paper';

const theme = createTheme();




export default class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {

            disabled: 1,
            verify: 0,

            loggedUser: JSON.parse(sessionStorage.getItem("loggedUser")),

            firstname: JSON.parse(sessionStorage.getItem("loggedUser")).FirstName,
            firstnameError: "",

            lastname: JSON.parse(sessionStorage.getItem("loggedUser")).LastName,
            lastnameError: "",

            email: JSON.parse(sessionStorage.getItem("loggedUser")).Email,
            emailError: "",

            passport: JSON.parse(sessionStorage.getItem("loggedUser")).Passport,
            passportError: "",



            newpassword: "",
            newpasswordError: "",

            confirmnewpassword: "",
            confirmnewpasswordError: "",

            oldpassword: "",
            oldpasswordError: "",

            responseMessage: "",


        }
        this.render = this.render.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleContinue2 = this.handleContinue2.bind(this);
        this.handleEditBtn = this.handleEditBtn.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleBack2 = this.handleBack2.bind(this);
    }

    handleEditBtn(e) {
        e.preventDefault();
        this.setState({ disabled: 0 })

    };
    handleBack(e) {
        e.preventDefault();
        this.setState({
            disabled: 1,
            firstname: JSON.parse(sessionStorage.getItem("loggedUser")).FirstName,
            lastname: JSON.parse(sessionStorage.getItem("loggedUser")).LastName,
            email: JSON.parse(sessionStorage.getItem("loggedUser")).Email,
            passport: JSON.parse(sessionStorage.getItem("loggedUser")).Passport,
            newpassword: "",
            newpasswordError: "",
            confirmnewpassword: "",
            confirmnewpasswordError: "",
            responseMessage: "",
        })
    };
    handleContinue(e) {
        e.preventDefault();

        if (this.state.newpassword !== "" && (this.state.confirmnewpassword === "" || this.state.confirmnewpasswordError !== "")) {
            this.setState({ confirmnewpasswordError: "Passwords do not match" });
        } else {
            this.setState({
                verify: 1,
            })
        }

    }
    handleBack2(e) {
        e.preventDefault();
        this.setState({
            verify: 0,
            responseMessage: "",
        })
    }

    handleContinue2(e) {
        e.preventDefault();

        if(this.state.oldpassword===this.state.loggedUser.Password){
            const user = {
                FirstName: this.state.firstname, LastName: this.state.lastname,
                Email: this.state.email, Passport: this.state.passport, Password: this.state.newpassword
            }
    
            Axios.put("http://localhost:8000/updateuser", user).then(res => {
                this.setState({
                    responseMessage: "information edited successfuly!",
                })
            });
        }else{
            this.setState({
                responseMessage: "You have entered a wrong old password",
            })
        }
       

    }


    firstNameOnChange(e) {
        this.setState({ firstname: e.target.value });
        if (e.target.value.length > 0) {
            this.setState({ firstnameError: "" });
        } else {
            this.setState({ firstnameError: "Enter your first name" });
        }
    };

    lastNameOnChange(e) {
        this.setState({ lastname: e.target.value });
        if (e.target.value.length > 0) {
            this.setState({ lastnameError: "" });
        } else {
            this.setState({ lastnameError: "Enter your last name" });
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

    passportNumberOnChange(e) {
        this.setState({ passport: e.target.value });
        if (e.target.value.length === 9) {
            this.setState({ passportError: "" });
        } else {
            this.setState({ passportError: "Enter your 9 digits passport number" });
        }
    };

    passwordOnChange(e) {
        this.setState({ newpassword: e.target.value });
        var pass = e.target.value;
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        var test = regex.test(pass);
        if (test) {
            this.setState({ newpasswordError: "" });
        } else {
            this.setState({ newpasswordError: "Your password must be atleast 8 characters and must contain atleast 1 numeric character, 1 lowercase alphabetical character and 1 uppercase alphabetical character" });
        }
    };

    confirmPasswordOnChange(e) {
        this.setState({ confirmnewpassword: e.target.value });

        if (e.target.value === this.state.newpassword) {
            this.setState({ confirmnewpasswordError: "" });
        } else {
            this.setState({ confirmnewpasswordError: "Passwords do not match" });
        }
    };

    oldPasswordOnChange(e) {
        this.setState({ oldpassword: e.target.value });

        if (e.target.value !== "") {
            this.setState({ oldpasswordError: "" });
        } else {
            this.setState({ oldpasswordError: "Enter your old password" });
        }
    };

    render() {
        return (

            <ThemeProvider theme={theme}>
                <CssBaseline />

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
                        borderRadius: '14px'
                    }}>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>



                        {this.state.verify === 1 ? (
                            <React.Fragment>

                                <Typography component="h1" variant="h5">
                                    Confirm Old Password
                                </Typography>

                            </React.Fragment>
                        ) :
                            this.state.disabled === 1 ? (
                                <React.Fragment>

                                    <Typography component="h1" variant="h5">
                                        Profile
                                    </Typography>

                                </React.Fragment>

                            ) : (<React.Fragment>
                                <Typography component="h1" variant="h5">
                                    Edit Profile
                                </Typography>



                            </React.Fragment>)}

                        {this.state.verify === 0 ? (
                            <Grid container spacing={2} marginTop={3}>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        value={this.state.loggedUser.Username}
                                        disabled={true}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth

                                        label="First Name"
                                        value={this.state.disabled == 1 ? this.state.loggedUser.FirstName : this.state.firstname}
                                        disabled={this.state.disabled}
                                        error={this.state.disabled === 1 || this.state.firstnameError.length === 0 ? false : true}
                                        helperText={this.state.disabled === 1 ? "" : this.state.firstnameError}
                                        onChange={this.firstNameOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth

                                        label="Last Name"
                                        value={this.state.disabled == 1 ? this.state.loggedUser.LastName : this.state.lastname}
                                        disabled={this.state.disabled}
                                        error={this.state.disabled === 1 || this.state.lastnameError.length === 0 ? false : true}
                                        helperText={this.state.disabled === 1 ? "" : this.state.lastnameError}
                                        onChange={this.lastNameOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth

                                        label="Email"
                                        value={this.state.disabled == 1 ? this.state.loggedUser.Email : this.state.email}
                                        disabled={this.state.disabled}
                                        error={this.state.disabled === 1 || this.state.emailError.length === 0 ? false : true}
                                        helperText={this.state.disabled === 1 ? "" : this.state.emailError}
                                        onChange={this.emailOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth

                                        label="Passport"
                                        value={this.state.disabled == 1 ? this.state.loggedUser.Passport : this.state.passport}
                                        disabled={this.state.disabled}
                                        error={this.state.disabled === 1 || this.state.passportError.length === 0 ? false : true}
                                        helperText={this.state.disabled === 1 ? "" : this.state.passportError}
                                        onChange={this.passportNumberOnChange.bind(this)}
                                        sx={{
                                            input: { height: 50 },
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        ) : ("")}




                        {this.state.verify === 1 ? (
                            <React.Fragment>

                                <Grid container spacing={2} marginTop={0.5}>

                                    <Grid item xs={12} >
                                        <TextField
                                            fullWidth

                                            label="Old Password"
                                            value={this.state.oldpassword}
                                            error={this.state.oldpasswordError.length === 0 ? false : true}
                                            helperText={this.state.oldpasswordError}
                                            onChange={this.oldPasswordOnChange.bind(this)}
                                            sx={{
                                                input: { height: 50 },
                                            }}
                                        />
                                    </Grid>


                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                    <Button
                                        variant="contained"
                                        onClick={this.handleBack2}
                                        sx={{ mt: 2, ml: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={this.handleContinue2}
                                        sx={{ mt: 2, ml: 1 }}
                                    >
                                        Confirm change
                                    </Button>
                                </Box>

                            </React.Fragment>
                        ) :
                            this.state.disabled === 1 ?
                                (
                                    <Button
                                        variant="contained"
                                        onClick={this.handleEditBtn}
                                        sx={{ mt: 2, ml: 1 }}
                                    >
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <React.Fragment>

                                        <Grid container spacing={2} marginTop={0.5}>

                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth

                                                    label="New Password"
                                                    value={this.state.disabled == 1 ? "" : this.state.newpassword}
                                                    disabled={this.state.disabled}
                                                    error={this.state.disabled === 1 || this.state.newpasswordError.length === 0 ? false : true}
                                                    helperText={this.state.disabled === 1 ? "" : this.state.newpasswordError}
                                                    onChange={this.passwordOnChange.bind(this)}
                                                    sx={{
                                                        input: { height: 50 },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth

                                                    label="Confirm New Password"
                                                    value={this.state.disabled == 1 ? "" : this.state.confirmnewpassword}
                                                    disabled={this.state.disabled}
                                                    error={this.state.disabled === 1 || this.state.confirmnewpasswordError.length === 0 ? false : true}
                                                    helperText={this.state.disabled === 1 ? "" : this.state.confirmnewpasswordError}
                                                    onChange={this.confirmPasswordOnChange.bind(this)}
                                                    sx={{
                                                        input: { height: 50 },
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                            <Button
                                                variant="contained"
                                                onClick={this.handleBack}
                                                sx={{ mt: 2, ml: 1 }}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={this.handleContinue}
                                                sx={{ mt: 2, ml: 1 }}
                                            >
                                                Continue
                                            </Button>
                                        </Box>

                                    </React.Fragment>

                                )}

                        <Typography component="body2" variant="body2" color="red" marginTop={5}>
                            {this.state.responseMessage}
                        </Typography>


                    </Paper>
                </Container>

            </ThemeProvider>
        )
    }

}
