/*
	currently only used in popup modal
	need to refactor to be reusable between page tiles and popup modal
	customize what content should be visible using props
*/

import React, { Component } from 'react';
import RestaurantPhoto from './restaurantPhoto';
import InspectionDate from './inspectionDate';
import Grade from './grade';
import Address from './address';
import blueSeal from '../images/seals/Nyc-seal-blue.png';

export default class RestaurantMoreInfo extends Component {
	render() {
		var data = this.props.data;
		var inspection = data.inspections[0];
		var grade = inspection.grade === null ? 'Pending' : inspection.grade;

		// Styles needed for inspection grade inside modal
		var gradeStyle = {
			display: 'flex',
			alignSelf: 'center',
			justifySelf: 'center',
			width: '75%',
			maxWidth: '90px'
		};

		var containerStyle = {
			backgroundImage: 'url(' + blueSeal + ')',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			height: '120px',
			display: 'flex',
			justifyContent: 'center'
		};
		
		return (
			<div className="Restaurant-moreinfo">
				<RestaurantPhoto url={data.imageUrl}/>
				<div className="pad-20">
					<div className="Restaurant-info">
						<div className="Restaurant-contact">
							<div className="Restaurant-name">{data.name}</div>
							<div className="Restaurant-cuisine">{data.cuisine}-$$$$</div>
							<div className="Restaurant-address">
								<Address building={data.building} street={data.street} boro={data.boro} state={data.state} zip={data.state} phone={data.phone}/>
							</div>
						</div>
						<div className="Restaurant-inspection">
							<Grade inspection={inspection} gradeStyle={gradeStyle} containerStyle={containerStyle} className="mod_gradeLetter" showDate="false"/>
						</div>
					</div>
				</div>
				<div className="Restaurant-inspection-info">
					<div className="Inspection-heading">Inspections</div>
					<div className="Inspection-grade-date bold"><InspectionDate date={inspection.grade_date} display="true"/></div>
					<div className="Inspection-violation">
						<div className="Inspection-action">{inspection.action}</div>
						<span>Violation code: {inspection.violation_code}</span>
						<span>{inspection.violation_desc}</span>
					</div>
					<div className="Inspection-score">Score: {inspection.score}</div>
					<div className="Inspection-grade">Grade: {grade}</div>
					<div className="Inspection-grade-date">Grade Date: <InspectionDate date={inspection.grade_date} display="true"/></div>
					<div className="Inspection-type">{inspection.inspection_type}</div>
				</div>
			</div>
		)
	}
}