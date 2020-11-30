import React from 'react'

import Button from '../Button/Button.component'
import './SortButtons.styles.scss'

class SortButtons extends React.Component {
	state = {
		selectBtn: "low price",
	}

	paramSorting = [
		{ value: "Самый дешевый", id: "low price" },
		{ value: "Самый быстрый", id: "fastest" },
	]

	checkTub = (id) => {
		const { sorts } = this.props
		if (id === this.state.selectBtn) {
			return
		}
		this.setState({selectBtn: id})
		sorts(id)
	}

	render() {
		const { selectBtn } = this.state
		
		return (
			<div className="button-sorted">
				{this.paramSorting.map((el) => (
					<Button
						id={el.id}
						key={el.id}
						text={el.value}
						active={selectBtn === el.id}
						clickHandler={this.checkTub}
					/>
				))}
			</div>
		)
	}
}

export default SortButtons