import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxilliary/Auxilliary';

const SideDrawer = (props) => {
	let attachedClasses = [styles.SideDrawer, styles.Close];
	if(props.open) {
		attachedClasses = [styles.SideDrawer, styles.Open]
	};
	return(
		<React.Fragment>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth}/>
				</nav>
			</div>
		</React.Fragment>
	);
}

export default SideDrawer;

// class=" SideDrawer Close/Open"