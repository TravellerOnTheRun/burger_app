import React from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
		<header className={styles.Toolbar}>
			<DrawerToggle clicked={props.toggle} />
			<div className={styles.Logo}>
				<Logo />
			</div>
			<nav className={styles.DesktopOnly}>
				<Navigationitems isAuthenticated={props.isAuth} />
			</nav>

		</header>
	);
	
export default Toolbar;