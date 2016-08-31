import React from 'react';

import AddDonorForm from './AddDonorForm.jsx';
import SuccessDonor from './SuccessDonor.jsx';
import ShowDonor from './ShowDonor.jsx';

class App extends React.Component{
	constructor(){
		super()
		this.state = {
			error : '',
			result : [],
			latest_donor : {},
			hello : ''
		};
	}

	componentDidMount() {
	    socket.on('hello', this._setHello.bind(this));
	    //socket.on('error', this._setError.bind(this));
	    socket.on('nearby_success', this._setSuccessNearBy.bind(this));
	    socket.on('donor_success', this._setSuccessDonor.bind(this));
	    this._fetchNearByDonors(22.22, 22.22); 
	}

	_fetchNearByDonors(latitude, longitude){
		$.ajax({
			url : "http://localhost:8081/api/donor/near",
			type : "GET",
			dataType : 'json',
			data : {
				latitude : latitude,
				longitude : longitude
			},
			success : function(data){
				this.setState({result : data.result})
			}.bind(this),
			error: function(xhr, status, error){
				this.setState({ error : error});
			}.bind(this)
		});
	}

	_setHello(data){
		this.setState({ hello : data});
	}

	_setError(data){
		this.setState({ error : data});
	}

	_setSuccessNearBy(data){
		this.setState({ result : data.result });
	}

	_setSuccessDonor(data){
		this._fetchNearByDonors(22.22, 22.22); 
		this.setState({ latest_donor : data.result });
	}


	render(){
		return(
				<div className="content">

					<nav className="navbar navbar-default">
					  <div className="container-fluid">
					    <div className="navbar-header">
					      <a className="navbar-brand" href="/">{this.state.hello.name}</a>
					    </div>
					  </div>
					</nav>

					<div id="search"></div>
				  <div id="map"></div>

		        	

					<div className="modal fade bs-example-modal-sm" id="add_donor_modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
					  <div className="modal-dialog modal-sm" role="document">
					    <div className="modal-content">
					      <AddDonorForm error={this.state.error} id_modal = "#add_donor_modal" setErrorState={this._setError.bind(this)}/>
					    </div>
					  </div>
					</div>


					<div className="modal fade bs-example-modal-sm" id="show_donor_modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
					  <div className="modal-dialog modal-sm" role="document">
					    <div className="modal-content">
					    	<ShowDonor/>
					  </div>
					</div>
					</div>


					<div className="modal fade bs-example-modal-sm" id="success_donor_modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
					  <div className="modal-dialog modal-sm" role="document">
					    <div className="modal-content">
					    	<SuccessDonor data={this.state.latest_donor}/>
					  </div>
					</div>
					</div>

				</div>
			);
	}
}

export default App;