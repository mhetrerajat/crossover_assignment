var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donorSchema = new Schema({
	first_name : {
		type : String,
		lowercase : true,
		trim : true
	},
	last_name : {
		type : String,
		lowercase : true,
		trim : true
	},
	contact_number : {
		type : String
	},
	email : {
		type : String
	},
	blood_group : {
		type : String,
		enum : ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
	},
	location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    },
    address : {
    	type : String,
    	lowercase : true,
		trim : true
    },
    ip_address : {
    	type : String
    }
})

donorSchema.index({
    location: '2dsphere'
});



// Find nearby donors
donorSchema.statics.findNearByDonors = function(params, callback) {
    return this.find({
            'location': {
                '$near': {
                    '$geometry': {
                        type: 'Point',
                        coordinates: [params.longitude, params.latitude]
                    },
                    '$maxDistance': params.max_distance
                }
            }
    }).exec(callback);
}


var Donor = mongoose.model('donor', donorSchema);

module.exports = Donor;