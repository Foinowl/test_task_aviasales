import React from 'react'

import CheckBox from '../../components/CheckBox/CheckBox.component'
import './Filter.styles.scss'

const Filter = () => {
  return (
		<div className="filter">
			<div className="wrapper">
				<h3 className="title">Количество пересадок</h3>
        <ul>
          <CheckBox />
				</ul>
			</div>
		</div>
	)
}

export default Filter