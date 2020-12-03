import React, { useState } from "react"
import CheckBox from '../CheckBox'

const Filter = (props) => {
	const { options, initialValue, onChange } = props

	const [selected, select] = useState(initialValue)
	const [isCheckedAll, setCheckAll] = useState(false)

	const onChangeCheckboxAll = ({ checked }) => {
		if (checked) {
			const values = options.map((v) => v["value"])
			setCheckAll(true)
			select(values)
			onChange(values)
		} else {
			setCheckAll(false)
			select([])
			onChange([])
		}
	}

	const onChangeGroup = (values) => {
		console.log('In the filter change', values);
		setCheckAll(false)
		select(values)
		onChange(values)
	}

	return (
		<div className="filter__item">
			<div className="filter__heading">Количество пересадок</div>
			<div className="filter__content">
				<CheckBox
					label="Все"
					onChange={onChangeCheckboxAll}
					checked={isCheckedAll}
				/>
				<CheckBox.Group
					options={options}
					selected={selected}
					onChange={onChangeGroup}
				/>
			</div>
		</div>
	)
}

export default Filter
