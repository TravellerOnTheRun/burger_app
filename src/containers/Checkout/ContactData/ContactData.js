import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
	const [ orderForm, setOrderForm ] = useState({
		name: {
			elementType: 'input',
			elementConfig:{
				type:'text',
				placeholder: 'Your Name'
			},
			value: '',
			validation:{
				required: true,
			},
			valid: false,
			touched: false
		},
		street:{
			elementType: 'input',
			elementConfig:{
				type:'text',
				placeholder: 'Street Address'
			},
			value: '',
			validation:{
				required: true,
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: 'input',
			elementConfig:{
				type:'text',
				placeholder: 'Zip Code'
			},
			value: '',
			validation:{
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: 'input',
			elementConfig:{
				type:'text',
				placeholder: 'Country'
			},
			value: '',
			validation:{
				required: true,
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: 'input',
			elementConfig:{
				type:'email',
				placeholder: 'Your Email Address'
			},
			value: '',
			validation:{
				required: true,
			},
			valid: false,
			touched: false

		},		
		deliveryMethod: {
			elementType: 'select',
			elementConfig:{
				options: [
					{value: 'fastest', displayValue: 'Fastest'},
					{value: 'cheapest', displayValue: 'Cheapest'}
				]
			},
			value: 'fastest',
			validation: {},
			valid: true
		}
	});

	const [ formIsValid, setFormIsValid ] = useState(false);

	const orderHandler = (event) => {
			event.preventDefault();
			const formData = {};
			for (let formElemIdentifier in orderForm) {
					formData[formElemIdentifier] = orderForm[formElemIdentifier].value;
			};
			//alert('You pushed continue!');
			const newOrder =  {
				ingredients: props.ings, 
				price: props.tP,
				orderData: formData,
				userId: props.userId
					
			};
			props.onOrderBurger(newOrder, props.token);

			
	};

	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(orderForm[inputIdentifier],  {
			value: event.target.value,
			valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
			touched: true
		});

		const updatedOrderForm = updateObject(orderForm, {
			[inputIdentifier]: updatedFormElement
		}); 

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {	
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		};
		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);
	};

		let formElementsArray = [];
		for(let key in orderForm){
			formElementsArray.push({
					id: key,
					config: orderForm[key]
			})
		};

	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map(formElement => {
				return <Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					changed={(event)=> inputChangedHandler(event, formElement.id)}
					invalid={!formElement.config.valid}
					touched={formElement.config.touched}
					shouldValidate={formElement.config.validation}
					valueType={formElement.config.elementConfig.type}/>
			})}
			
			<Button 
				buttonType='Success' 
				clicked={orderHandler}
				disabled={!formIsValid}>Order</Button>
		</form>
	);
	if(props.loading) { form = <Spinner />};

	return(
		<div className={styles.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
		</div>
	);

};


const mapStateToProps = state => {
	return {
		ings: state.bbr.ingredients,
		tP: state.bbr.totalPrice,
		loading: state.or.loading,
		token: state.ar.token, 
		userId: state.ar.userId
	};
};
const mapDispatchToProps = dispatch => 	{
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	};		
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));