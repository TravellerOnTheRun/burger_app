import React from 'react';
import styles from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const Burger = (props) =>
	{
		let transformedIngredients = Object.keys(props.ingredients)
			.map(ingKey =>
				{
					return [...Array(props.ingredients[ingKey])].map((_, i)=>
						{
							return <Ingredient key={ingKey + i} type={ingKey}/>
						})
				})
			.reduce((arr, element) => 
				{
					return arr.concat(element);
				}, []);
		if(transformedIngredients.length === 0)
			{
				transformedIngredients = <p>Please, start adding ingredients!</p>
			}

		return(
			<div className={styles.Burger}>
				<Ingredient type='bread-top'/>
				{transformedIngredients}
				<Ingredient type='bread-bottom'/>
			</div>
			);
	}


export default Burger;