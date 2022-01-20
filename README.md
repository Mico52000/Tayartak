
# Tayartak Airlines Web Application Documentation

This is a web application built as a project for the Advanced Computer Lab Course CSEN704.

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)]()
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)]()

### :gem: Team Members :gem:

[![Mohamed Alaaser](https://img.shields.io/static/v1?label=Mohamed+Alaaser&message=+&color=grey&logo=github)
](https://github.com/mohamedalaaser)

[![Michael George](https://img.shields.io/static/v1?label=Michael+George&message=+&color=grey&logo=github)
](https://github.com/Mico52000)


[![Linah Hossam](https://img.shields.io/static/v1?label=Linah+Hossam&message=+&color=grey&logo=github)
](https://github.com/linah67)

[![Nerimane Mohamed](https://img.shields.io/static/v1?label=Nerimane+Mohamed&message=+&color=grey&logo=github)
](https://github.com/Nerimane107)




### Motivation

The project was built for a university project. We were asked to develop an airline reservation system. We chose Take Off as our website name and we developed both the frontend and backend of the web application.

### Build Status

[![works badge](https://cdn.jsdelivr.net/gh/nikku/works-on-my-machine@v0.2.0/badge.svg)]()

### Code Style

The React part of the code (front end) uses class components most of the time. Functional components were used sometimes to be able to use react router and pass props from component to another.

### Tech/Framework used

**BackEnd:**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


**FrontEnd:**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)

### Features
- Admin Features:

-- Create, update and delete flights.

- Guest Features:

-- Search for available flights and view them.

- Registered User Features:

-- Search for available flights and view them.

--Make, update and cancel reservations.

--View all his reservations.

--Edit his account information.


### Code Examples

**Frontend component example:**

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
      import './SignIn.css';
      import NavBar from '../../Components/public/NavBar.js'
      import Paper from '@mui/material/Paper';
      import Axios from 'axios';

      const theme = createTheme();





      export default class SignUp extends React.Component {

        constructor() {
          super();
          this.state = {
            username: "",
            password: "",
            submitError: "",
          }
          this.render = this.render.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);

        }

        handleSubmit(e) {
          e.preventDefault();

          const credentials = {
            username: this.state.username,
            password: this.state.password,
          }

          Axios.post("http://localhost:8000/login", credentials).then((resp) => {
            if (resp.data == "username does not exist") {
              this.setState({ submitError: "This username does not exist" })
            } else if (resp.data == "wrong password") {
              this.setState({ submitError: "Incorrect password" })
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

        usernameOnChange(e) {
          this.setState({ username: e.target.value });
        };

        passwordOnChange(e) {
          this.setState({ password: e.target.value });
        };



        render() {
          return (

            <ThemeProvider theme={theme} >
              <NavBar />

              <div className='background' >
              </div>

              <Container component="main" maxWidth="xs">
                <CssBaseline />

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
                  <Box
                    sx={{
                      width: '90%',
                      margin: 'auto',
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >


                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box component="form"
                      onSubmit={this.handleSubmit}
                      noValidate
                      sx={{
                        mt: 1,
                      }}>
                      <TextField
                        onChange={this.usernameOnChange.bind(this)}
                        margin="normal"
                        required
                        fullWidth
                        value={this.state.username}
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        sx={{
                          input: {
                            height: 50,
                          },
                        }}
                      />
                      <TextField
                        onChange={this.passwordOnChange.bind(this)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{
                          input: { height: 50 },
                        }}
                      />
                      <p />
                      <Typography component="body2" variant="body2" color="red">
                        {this.state.submitError}
                      </Typography>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>

                      <Grid container>




                        <Grid item>
                        <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                          <br/>
                          <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                          <br />
                          <Link href="/guest/bookflight" variant="body2">
                            {"Or continue as a guest"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>

                  </Box>
                </Paper>
              </Container>
            </ThemeProvider>
          );
        }
      }

**Backend API request example:**

      App.post('/login', async (req, res) => {
      

      const user= await UsersModel.findOne({ Username: req.body.username }).exec();
      if (user == null) {
        return res.send("username does not exist");
      }else{

      try {
        if (await bcrypt.compare(req.body.password, user.Password)) {
          const user2 = {
            _id: user._id,
            Username: user.Username,
          }
          const accessToken = generateAccessToken(user2)

          user.Password=req.body.password;
          res.json({accessToken:accessToken,user:user})

        } else {
          res.send("wrong password");
        }
      } catch {
        res.send("errorrr");
      }
    }
    })

### Installation
1. Clone the Repository
2. Navigate to the backend folder and run ``npm install`` to install the backend dependencies.
3. Run ``node index.js`` to start the backend side of the web application
4. Navigate to the frontend folder and run ``npm install`` to install the frontend dependencies.
5. Run ``npm start`` to start the frontend of the web application.
6. Go to http://localhost:3000/ and the website will be running!

### API reference


### How to Use?
- Admin

-- Login to your account.

-- From the navigation bar you can create ,edit, delete and search for flights.

- Guest

-- From the website homepage you can search for all the available flights depending on your search criteria.

-- From the navigation bar you can click on the logo button to go back and register for an account or login.

- Registered user

-- Login to your account.

-- From the navigation bar, you can choose to book a trip.

-- You can search for all the available flights and choose your desired flights.

-- After choosing the flights you will be asked to pay for the reservation and you will be redirected to stripe gateway to pay the requested amount.

-- When the payment is completed you will see a summary of your reservation with all the needed details.

-- You can also edit your chosen seats or change a different flight for your reservation from your reservations list. You can go there by choosing My Reservations button from the navigation bar.

### Credits
**Thanks to all the amazing TAs from the Advanced Computer Lab course**
we were offered a lot of guidance from each one of them.
The course was a great experience that made us gain a lot of experience in all web development fields!

### License

MIT License

Copyright (c) `2021` `Take Off AirLines Web Application`


Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
