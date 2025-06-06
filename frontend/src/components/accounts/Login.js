import React, { useState, useContext } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Title2 from "../clubDisplayHelpers/Title2";
import { makeStyles, } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from '../../context/AuthContext';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor:  '#643513',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function LoginPage() {
	let {setAuthTokens, setUser} = useContext(AuthContext)
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post(`/token/obtain/`, {
				username: formData.username,
				password: formData.password,
			})
			.then(
				result => {
					axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
					setAuthTokens(result.data.access)
					setUser(jwt_decode(result.data.access))
					localStorage.setItem('access_token', result.data.access);
					localStorage.setItem('refresh_token', result.data.refresh);
					navigate('/dashboard')

				}
		).catch (error => {
			throw error;
		})
	}

	const classes = useStyles();
	
	return (
		<>
		<div className='image' style={{
			backgroundImage: `url(https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?cs=srgb&dl=pexels-min-an-694740.jpg&fm=jpg)`,
			margin:0,
			minWidth: '100%',
			minHeight: '100%',
			height: '940px',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundFilter: 'brightness(50%)',
			}}>
		<Container component="main"  maxWidth='sm' margin='100'>
			<CssBaseline />
			<div className={classes.paper}>
			<Card style={{
				marginTop: '50px',
				marginBottom: '50px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '35px',
			}}>
				<Avatar className={classes.avatar}></Avatar>
				<Title2>
					Log in
				</Title2>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						//autoComplete="username"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						style={{backgroundColor: '#643513',}}
					>
						Log In
					</Button>
					<Grid container>
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</Card>
			</div>
		</Container>
		</div>
		</>
	);
}






















// import React, { useState } from 'react';
// import axiosInstance from '../axios';
// import Navbar from './templateHelpers/Navbar'
// import { useNavigate } from 'react-router-dom';
// //MaterialUI
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		marginTop: theme.spacing(8),
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// 	avatar: {
// 		margin: theme.spacing(1),
// 		backgroundColor: theme.palette.secondary.main,
// 	},
// 	form: {
// 		width: '100%', // Fix IE 11 issue.
// 		marginTop: theme.spacing(1),
// 	},
// 	submit: {
// 		margin: theme.spacing(3, 0, 2),
// 	},
// }));

// export default function LoginPage() {
// 	const navigate = useNavigate();
// 	const initialFormData = Object.freeze({
// 		username: '',
// 		password: '',
// 	});

// 	const [formData, updateFormData] = useState(initialFormData);

// 	const handleChange = (e) => {
// 		updateFormData({
// 			...formData,
// 			[e.target.name]: e.target.value.trim(),
// 		});
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		axiosInstance
// 			.post(`/token/obtain`, {
// 				username: formData.username,
// 				password: formData.password,
// 			})
// 			.then((
			//	result => {
// 				localStorage.setItem('access_token', res.data.access);
// 				localStorage.setItem('refresh_token', res.data.refresh);
// 				axiosInstance.defaults.headers['Authorization'] =
// 					'Bearer ' + localStorage.getItem('access_token');
// 				navigate('/');
// 				//console.log(res);
// 				//console.log(res.data);
// 			});
// 	};

// 	const classes = useStyles();

// 	return (
// 		<>
// 		<Navbar/>
// 		<Container component="main" maxWidth="xs">
// 			<CssBaseline />
// 			<div className={classes.paper}>
// 				<Avatar className={classes.avatar}></Avatar>
// 				<Typography component="h1" variant="h5">
// 					Sign in
// 				</Typography>
// 				<form className={classes.form} noValidate>
// 					<TextField
// 						variant="outlined"
// 						margin="normal"
// 						required
// 						fullWidth
// 						id="username"
// 						label="Username"
// 						name="username"
// 						autoComplete="username"
// 						autoFocus
// 						onChange={handleChange}
// 					/>
// 					<TextField
// 						variant="outlined"
// 						margin="normal"
// 						required
// 						fullWidth
// 						name="password"
// 						label="Password"
// 						type="password"
// 						id="password"
// 						autoComplete="current-password"
// 						onChange={handleChange}
// 					/>
// 					<FormControlLabel
// 						control={<Checkbox value="remember" color="primary" />}
// 						label="Remember me"
// 					/>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="primary"
// 						className={classes.submit}
// 						onClick={handleSubmit}
// 					>
// 						Sign In
// 					</Button>
// 					<Grid container>
// 						<Grid item xs>
// 							<Link href="" variant="body2">
// 								Forgot password?
// 							</Link>
// 						</Grid>
// 						<Grid item>
// 							<Link href="/signup" variant="body2">
// 								{"Don't have an account? Sign Up"}
// 							</Link>
// 						</Grid>
// 					</Grid>
// 				</form>
// 			</div>
// 		</Container>
// 		</>
// 	);
// }