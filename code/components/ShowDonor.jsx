import React from 'react';

class ShowDonor extends React.Component{
	render(){
		return(
			<div className="show_donor">
				
				<h1 id="sdc_name"></h1>
			<p id="sdc_email"></p>
			<p id="sdc_contact_number"></p>
			<p id="sdc_blood_group"></p>
			<p id="sdc_location"></p>
			<p id="sdc_address"></p>
			<p id="sdc_ip_address"></p>
			</div>
			);
	}
}

export default ShowDonor;