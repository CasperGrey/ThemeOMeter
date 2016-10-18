import React from 'react'
import App from './App/App.js'
import ContentPageContainer from './ContentPage/ContentPageContainer'
import SongEntryPage from './SongEntryPage'
import ThemeScoringPage from './ThemeScoringPage'
import AdminPage from './AdminPage'
import ReportsPage from './ReportsPage/ReportsPage.js'
import SummaryPage from './SummaryPage/SummaryPage.js'
import { Route, IndexRoute } from 'react-router'


export default (
	<Route path="/" component={App}>
    <IndexRoute component={ContentPageContainer} />
		<Route path="/score" component={ThemeScoringPage}/>
		<Route path="/home" component={ContentPageContainer}/>
		<Route path="/entry" component={SongEntryPage}/>
		<Route path="/admin" component={AdminPage}/>
		<Route path="/reports" component={ReportsPage}/>
		<Route path="/summary" component={SummaryPage}/>
	</Route>
)
