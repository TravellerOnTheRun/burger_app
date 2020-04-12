import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';
import { withRouter } from 'react-router-dom';


const CheckoutSummary = (props) =>
	{
		return (
			<div className={styles.CheckoutSummary}>
				<h1>We hope it tastes well!</h1>
				<div style={{width: '100%', margin: 'auto'}}>
					<Burger ingredients={props.ingredients}/>
				</div>
				<Button buttonType='Danger'clicked={props.checkoutCancelled}>Cancel</Button>
				<Button buttonType='Success' clicked={props.checkoutContinued}>Continue</Button>
			</div>
			);
	}

export default withRouter(CheckoutSummary);