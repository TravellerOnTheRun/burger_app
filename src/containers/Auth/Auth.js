import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
	const[ controls, setControls ] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type:'email',
				placeholder: 'E-mail'
			},
			value: '',
			validation: {
				required: true,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: 'input',
			elementConfig: {
					type:'password',
					placeholder: 'Password'
			},
			value: '',
			validation: {
					required: true,
					minLength: 8
			},
			valid: false,
			touched: false
		}
});
	
	const[ isSignUp, setIsSignUp ] = useState(true);

	const { building, authRedirectPath, OnSetAuthRedirectPath } = props;


	useEffect(() => {
		if(!building && authRedirectPath !== '/') {
			OnSetAuthRedirectPath();
		};
	}, [ building, authRedirectPath, OnSetAuthRedirectPath ]);
	
	const inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(controls,{
			[controlName]: updateObject(controls[controlName], {
				value:event.target.value,
				valid: checkValidity(event.target.value, controls[controlName].validation),
				touched: true
			})
		})
		setControls(updatedControls);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onAuth(controls.email.value, controls.password.value, isSignUp);
	};

	const switchAuthModeHandler = () => {
		setIsSignUp(!isSignUp);
	};

		let formElementsArray = [];
		for(let key in controls) {
			formElementsArray.push({
				id: key,
				config: controls[key]
			})
		};
		let form = formElementsArray.map(formElement =>(
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(event)=> inputChangedHandler(event, formElement.id)}
				invalid={!formElement.config.valid}
				touched={formElement.config.touched}
				shouldValidate={formElement.config.validation}
				valueType={formElement.config.elementConfig.type}/>

		));

		if(props.loading) {
			form = <Spinner />
		};

		let errorMessage = null;

		if(props.error) {
			errorMessage = (
				<p>{props.error.message}</p>
			);
		};
		let authRedirect = null;

		if(props.isAuthenticated) {
			authRedirect = <Redirect to={props.authRedirectPath}/>
		};

		return (
			<div className={styles.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={submitHandler}>
					{form}
					<Button buttonType='Success'>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
				</form>
				<Button 
					buttonType='Danger'
					clicked={switchAuthModeHandler}> Switch To {isSignUp ? 'Sign In' : 'Sign Up'}
				</Button>
			</div>
		);
};

const mapStateToProps = state => {
	return {
		loading: state.ar.loading,
		error: state.ar.error,
		isAuthenticated: state.ar.token !== null,
		building: state.bbr.building,
		authRedirectPath: state.ar.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		OnSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);