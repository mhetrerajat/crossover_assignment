module.exports = {
	sayHi : function(io){
		return function(req, res){
			io.emit('say_hi', {'name' : 'Helpmap', 'description' : 'Blood Donation Management System'});
			res.json({'name' : 'Helpmap', 'description' : 'Blood Donation Management System'});
		}	
	},
	loadClientFile : function(io, file_path){
		return function(req, res){
			io.emit('client_file', {result : 'Client is live.'});
			res.sendFile(file_path);
		}
	}
}
