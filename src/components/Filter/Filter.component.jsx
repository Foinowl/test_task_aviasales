import { render } from '@testing-library/react'
import React from 'react'

import CheckBox from '../../components/CheckBox/CheckBox.component'
import './Filter.styles.scss'

class Filter extends React.Component {

	state = {
		value: [
			{ value: "Все", id: "checkedAll", isChecked: true },
			{ value: "Без пересадок", id: "nonStop", isChecked: true },
			{ value: "1 пересадка", id: 1, isChecked: true },
			{ value: "2 пересадки", id: 2, isChecked: true },
			{ value: "3 пересадки", id: 3, isChecked: true },
		],
	}

	checkID = (id, isChecked) => {
		const values = this.state.value
    if (isChecked) {
      const newChecked = values.map((item) =>
				item.id === id ? { ...item, isChecked: true } : { ...item }
			)
			this.setState({value: newChecked})
    } else {
      const newChecked = values.map((item) => {
				if (item.id === id || item.id === "checkedAll") {
					return { ...item, isChecked: false }
				} else {
					return { ...item }
				}
			})
			this.setState({ value: newChecked })
    }
  };

	changeIsChecked = (id, isChecked) => {
		const { hideTickets, sortNonStop, sortByStops } = this.props
		// если выбраны "все" билеты, меняем их isChecked
		if (id === "checkedAll") {
			const newChecked = this.state.value.map((item) => ({
				...item,
				isChecked: isChecked ? true : false,
			}))

			this.setState({ value: newChecked })
			hideTickets(isChecked)
		} else if (id === "nonStop") {
			this.checkID(id, isChecked)
			sortNonStop(isChecked)
		}
		// все остальные варианты пересадок
		else {
			this.checkID(id, isChecked)
			sortByStops(id, isChecked)
		}
	}

	render() {
		return (
			<div className="filter">
				<div className="wrapper">
					<h3 className="title">Количество пересадок</h3>
					<ul>
						{this.state.value.map((val) => (
							<CheckBox
								key={val.id}
								id={val.id}
								text={val.value}
								checked={val.isChecked}
								clickHandler={this.changeIsChecked}
							/>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

export default Filter