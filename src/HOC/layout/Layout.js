import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxilliary/Auxilliary';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {


	const [showSideDrawer, setShowSideDrawer ] = useState(false);

	const sideDrawerClosed = () => {
		setShowSideDrawer(false);
	};

	const toggleSideDrawer = () => {
		setShowSideDrawer(!showSideDrawer);
	};


		return(
			<Aux>
				<Toolbar 
					toggle={toggleSideDrawer}
					isAuth={props.isAuthenticated} 
				/>
				<SideDrawer 
					open={showSideDrawer} 
					closed={sideDrawerClosed} 
					isAuth={props.isAuthenticated}
				/>
				<main className={styles.Content}>
					{props.children}
				</main>
			</Aux>
		);
			
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.ar.token !== null
	};
};

export default connect(mapStateToProps)(Layout);
