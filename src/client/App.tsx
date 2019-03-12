import * as React from "react";
import { Helmet } from "react-helmet";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
// import Error404 from './components/Errors/Error404'
// import RedirectWithStatus from './components/Errors/RedirectWithStatus'
/*
<RedirectWithStatus
  status={302}
  from="/about"
  to="/about-us"
/>
*/

export default class App extends React.Component {
	render() {
		return (
			<div id="wrapper">
				<Header />
				<Helmet>
					<title></title>
					<meta name="description" content="react typescript ssr with code split" />
				</Helmet>
				<main className="content">
					<Switch>{routes.map((val: any, i) => <Route {...val} key={i} />)}</Switch>
				</main>
				<Footer />
			</div>
		);
	}
}