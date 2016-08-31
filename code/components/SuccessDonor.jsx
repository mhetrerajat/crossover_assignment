import React from 'react';


class SuccessDonor extends React.Component{
	render(){
		var update_link = "http://localhost:8081/donor/" + this.props.data._id;
		return(
			<div className="success_donor">
				
				<h3>You have been added as donor successfully.</h3>
				<p>If you want to update your details, click on this link <a id="sd_update_link" href={update_link}>{update_link}</a></p>
				<ul>
					<h4>Current Details</h4>
					<li><p id="sd_update_name">Name : {this.props.data.first_name} {this.props.data.last_name}</p></li>
					<li><p id="sd_update_email">Email : {this.props.data.email}</p></li>
					<li><p id="sd_update_contact_number">Contact Number : {this.props.data.contact_number}</p></li>
					<li><p id="sd_update_blood_group">Blood Group : {this.props.data.blood_group}</p></li>
					<li><p id="sd_update_address">Address : {this.props.data.address}</p></li>
					<li><p id="sd_update_ip_address">IP : {this.props.data.ip_address}</p></li>
				</ul>
			</div>
			);
	}
}


export default SuccessDonor;