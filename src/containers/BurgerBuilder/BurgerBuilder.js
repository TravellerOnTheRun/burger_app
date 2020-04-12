import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../HOC/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';


export const BurgerBuilder = props => {
	const [ purchaseMode, setPurchaseMode ] = useState(false);

	const dispatch = useDispatch();

	//useSelector state
	const ings = useSelector(state => state.bbr.ingredients );
	const price = useSelector(state => state.bbr.totalPrice);
	const error = useSelector(state => state.bbr.error);
	const isAuthenticated = useSelector(state => state.ar.token !== null);

	//useDispatch functions
	const onAddIngredient = ingType => dispatch(actions.addIngredient(ingType));
	const onRemoveIngredient = ingType => dispatch(actions.removeIngredient(ingType));
	const onFetchIngredients = useCallback(
		() => dispatch(actions.fetchIngredients()),[ dispatch]);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

	useEffect(() => {
		onFetchIngredients();
	}, [ onFetchIngredients ]);

	const updatePurchase = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(ingKey => {
				return ingredients[ingKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};


	const purchase = () => {
		if(isAuthenticated) {
			setPurchaseMode(true);
		} else  {
			onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}		
	};

	const purchaseCancel = () => {
		setPurchaseMode(false);
	};

	const purchaseContinue = () => {
		onInitPurchase();
		props.history.push('/checkout');
	};

	const disabledInfo = {...ings};
	for(let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	};

	let orderSummary = null;
	let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
	if(ings) {
		burger = (
			<Aux>
				<Burger ingredients={ings}/>
				<BuildControls 
					moreIngredient={onAddIngredient} 
					lessIngredient={onRemoveIngredient}
					disabled={disabledInfo}
					price={price}
					purchasable={updatePurchase(ings)}
					inPurchaseMode={purchase}
					isAuth={isAuthenticated}/>
			</Aux>
		);
		orderSummary = <OrderSummary 
				ingredients={ings}
				purchaseCancel={purchaseCancel}
				purchaseContinue={purchaseContinue}
				price={price}/>

	};
	return (
		<Aux>
			<Modal show={purchaseMode} modalClosed={purchaseCancel}>
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);

};

export default withErrorHandler(BurgerBuilder, axios);