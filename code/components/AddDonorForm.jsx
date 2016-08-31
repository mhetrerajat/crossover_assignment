import React from 'react';

class AddDonorForm extends React.Component{
	handleSubmit(e){
		e.preventDefault();
		const id_modal = this.props.id_modal;
		var params = {
			latitude : this.refs.latitude.value,
			longitude : this.refs.longitude.value,
			address : this.refs.address.value,
			first_name : this.refs.first_name.value,
			last_name : this.refs.last_name.value,
			email : this.refs.email.value,
			contact_number : this.refs.contact_number.value,
			blood_group : this.refs.blood_group.value,
			ip_address : this.refs.ip_address.value
		}

		$.ajax({
			url : "http://localhost:8081/api/donor",
			type : 'POST',
			data : params,
			cache : false,
			success : function(data){
				if(data.error){
					console.log(data.error);
					this.props.setErrorState(data.error);
					this.refs.latitude.value = params.latitude;
					this.refs.longitude.value = params.longitude;
					this.refs.address.value = params.address;
					this.refs.ip_address.value = params.ip_address;
					//this.setState({ error : data.error});
				}else{
					this.setState({	latest_donor : data.result	});
					if(data.result){
						$(id_modal).modal('toggle');
						$('#success_donor_modal').modal('toggle');
					}
				}
			}.bind(this),
			error: function(xhr, status, error){
				this.props.setErrorState(error);
				//this.setState({ error : error});
			}.bind(this)
		});
	}
	render(){
		return(
			<div className="add_donor_form">
				<h3>Become a Donor</h3>
				<form onSubmit={this.handleSubmit.bind(this)}>
				<p id="error" className="bg-danger"> { this.props.error } </p>
				<input type="hidden" ref="latitude" id="latitude" value=""/>
				<input type="hidden" ref="longitude" id="longitude" value=""/>
				<input type="hidden" ref="address" id="address" value=""/>
				<input type="hidden" ref="ip_address" id="ip_address" value=""/>
 				  <div className="form-group">
				    <label htmlFor="first_name">First Name</label>
				    <input type="text" className="form-control" id="first_name" ref="first_name" placeholder="First Name"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="last_name">Last Name</label>
				    <input type="text" className="form-control" id="last_name" ref="last_name" placeholder="Last Name"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="email">Email address</label>
				    <input type="email" className="form-control" id="email" ref="email" placeholder="Email"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="contact_number">Contact Number</label>
				    <input type="text" className="form-control" id="contact_number" ref="contact_number" placeholder="+XX XXX XXXX XXX"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="blood_group">Select your blood group :</label>
				    <select className="form-control" ref='blood_group' id="blood_group">
					  	<option value='0' disabled='disabled'>Choose your option</option>
					    <option value='O-'>O -</option>
					    <option value='O+'>O +</option>
					    <option value='AB-'>AB -</option>
					    <option value='AB+'>AB +</option>
					    <option value='A-'>A -</option>
					    <option value='A+'>A +</option>
					    <option value='B-'>B -</option>
					    <option value='B+'>B +</option>
					</select>
				  </div>
				  <button type="submit" className="btn btn-default">Become a Donor</button>
				</form>

			</div>
				
			);
	}
}

export default AddDonorForm;