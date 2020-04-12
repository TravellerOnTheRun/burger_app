import React from 'react';
import Aux from '../../../HOC/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
//This could be functional component, doesn't have to be a class
		const ingredientSummary = Object.keys(props.ingredients)
			.map(ingKey => {
				return <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
			})
		return(
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients: </p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
				<p>Continue to Checkout?</p>
				<Button buttonType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
				<Button buttonType="Success" clicked={props.purchaseContinue}>Continue</Button>

			</Aux>
		);
};

export default OrderSummary;
