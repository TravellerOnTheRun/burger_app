import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './HOC/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(()=> {
		return import('./containers/Checkout/Checkout');
	});
const Orders = React.lazy(()=> {
		return import('./containers/Orders/Orders');
	});
const Auth = React.lazy(()=> {
		return import('./containers/Auth/Auth');
	});

const App = props => {

	const { onCheckSignIn } = props;

	useEffect(()=> {
		onCheckSignIn();
	}, [ onCheckSignIn ])
	

	let routes = (
		<Switch>
			<Route path='/' exact component={BurgerBuilder}/>
			<Route path='/auth' render={(props)=> <Auth {...props}/>}/>
		</Switch>
	);


	if(props.isAuthenticated) {
		routes =(
			<Switch>
				<Route path='/auth' render={(props) => <Auth {...props}/>}/>
				<Route path='/checkout' render={(props)=> <Checkout {...props}/>}/>
				<Route path='/' exact component={BurgerBuilder}/>
				<Route path='/logout' component={Logout}/>
				<Route path='/orders' render={(props)=> <Orders {...props}/>}/>
			</Switch>
		);
			
	};

	return (
		<Layout>
			<Suspense fallback={<p>...Loading</p>}>
				{routes}
			</Suspense>
		</Layout>
	);
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.ar.token !== null
	};
};


const mapDispathToProps = dispatch => {
	return {
		onCheckSignIn: () => dispatch(actions.authCheckState())
	}
};

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
