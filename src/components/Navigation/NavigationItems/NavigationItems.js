import React from 'react';
import styles from './NavigationItems.css';
import NavItem from './NavigationItem/NavItem';

const NavigationItems = (props) => (
		<ul className={styles.NavigationItems}>
			<NavItem link='/' exact>Burger Builder</NavItem>
			{props.isAuthenticated ? <NavItem link='/orders'>Orders</NavItem> : null}
			{ !props.isAuthenticated
				? <NavItem link='/auth'>Authenticate</NavItem>
				: <NavItem link='/logout'>Logout</NavItem>}
		</ul>
	);

export default NavigationItems; 