import React from 'react'
import App from './App/App.js'
import Dogs from './Dogs/Dogs.js'
import Cats from './Cats/Cats.js'
import ContentPage from './ContentPage/ContentPage.js'
import SongEntryPage from './SongEntryPage/SongEntryPage.js'
import ThemeScoringPage from './ThemeScoringPage/ThemeScoringPage'
import { Route, IndexRoute } from 'react-router'


export default (
	<Route path="/" component={App}>
    <IndexRoute component={ContentPage} />
		<Route path="/score" component={ThemeScoringPage}/>
		<Route path="/report" component={Dogs}/>
		<Route path="/home" component={ContentPage}/>
		<Route path="/entry" component={SongEntryPage}/>
	</Route>
)