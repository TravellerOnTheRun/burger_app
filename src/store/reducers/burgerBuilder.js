import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = 
	{
		ingredients: null,
		totalPrice: 1,
		error: false,
		building: false
	}

const INGREDIENT_PRICES = 
	{
		salad: 0.2,
		bacon: 1,
		cheese: 0.8,
		meat: 1.2
	}


const addIngredient = (state, action) =>
	{
		const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
		const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
		const updatedState = 
			{
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				building: true
			}
		return updateObject(state,updatedState);
	};


const removeIngredient = (state, action) =>
	{
		const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
		const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
		const updatedState = 
			{
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building: true
			}
		return updateObject(state,updatedState);
	};

const setIngredients = (state, action) =>
	{
		return updateObject(state,
			{
				ingredients:
					{
						salad: action.ingredients.salad,
						meat: action.ingredients.meat,
						cheese: action.ingredients.cheese,
						bacon: action.ingredients.bacon
					},
				totalPrice: 1,
				error: false,
				building: false
			});
	};


const fetchIngsFailed = (state, action) => { return updateObject(state, { error: true })};


const burgerBuilderReducer = (state = initialState, action) =>
	{
		switch(action.type)
			{
				case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
				case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
				case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
				case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngsFailed(state, action)
				default: return state;
			}
	} 
export default burgerBuilderReducer;