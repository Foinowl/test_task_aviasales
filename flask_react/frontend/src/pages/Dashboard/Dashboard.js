import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startSagashDashboard } from "../../redux/dashboard/dashboard.actions"
import { pushUrlParams } from "../../redux/dashboard/dashboard.actions"

import Tabs from "../../components/Tabs/Tabs"
import Indicator from "../../components/Indicator/Indicator"
import ValueBar from "../../components/ValueBar/ValueBar"
import Icon from "../../components/Icon/Icon" 
import SearchesCard from "../../components/SearchesCard/SearchesCard"
import ClicksCard from "../../components/ClicksCard/ClicksCard"
import BookingsCard from "../../components/BookingsCard/BookingsCard"

import "./Dashboard.scss"


const typeCards = {
	searches: (state, stateColors) => (
		<SearchesCard state={state} stateColors={stateColors} />
	),
	clicks: (state, stateColors) => (
		<ClicksCard state={state} stateColors={stateColors} />
	),
	bookings: (state, stateColors) => (
		<BookingsCard state={state} stateColors={stateColors} />
	),
}

const Board = (props) => {
	const { data, changeUrl, param } = props
	const top_errors = Object.values(data[param]["top_errors"])


	const generateCards = () => {
		const paramOfContent = data[param]['content']

		const searches = paramOfContent["searches"]
		const clicks = paramOfContent["clicks"]
		const bookings = paramOfContent["bookings"]

		const dataContents = { "searches": searches, "clicks":clicks, "bookings":bookings }

		return (
			<>
				{Object.keys(dataContents).map((key, index) => {
					const state = dataContents[key].diff < 0 ? 'bad' : 'good'
					const card = typeCards[key]
					return (
						<>
							<div className="card-row">
								<Icon state={state} type={key} />
								{card(dataContents[key], state)}
							</div>
							<hr />
						</>
					)
				})}
			</>
		)
	}


	return (
		<div className="dashboard">
			<h2>Main metrics</h2>
			<div className="tabs">
				{Object.keys(data).map((val) => {
					return (
						<Tabs
							key={val}
							keyPage={param}
							id={val}
							tabs={val}
							onNavigate={changeUrl}
						/>
					)
				})}
			</div>
			<div className="indicators-wrapper">
				{Object.values(data[param]["top_statistics"]).map((value) => (
					<Indicator data={value} />
				))}
			</div>
			<ValueBar values={top_errors} />

			{generateCards()}
		</div>
	)
}

const Dashboard = (props) => {
	const dispatch = useDispatch()
	const data = useSelector((state) => state.dashboard.data)
	const fetcing = useSelector((state) => state.dashboard.isFetching)
	const param = useSelector((state) => state.dashboard.param)

	useEffect(() => {
		if (!data) dispatch(startSagashDashboard())
	}, [dispatch])

	const changeUrl = useCallback(
		(e) => {
			dispatch(pushUrlParams(e.target.id))
		},
		[dispatch, param]
	)

	if (!!!data) {
		return null
	}

	return fetcing ? <div>Loading...</div> : <Board data={data} changeUrl={changeUrl} param={param} />
}

export default Dashboard