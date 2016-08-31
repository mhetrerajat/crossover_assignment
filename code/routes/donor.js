var mDonorModel = require('../models/donor.js');

module.exports = {
    nearByDonors: function(io) {
        // Get nearby donors GET /donor/near
        return function(req, res) {
            var params = {
                latitude: req.query.latitude,
                longitude: req.query.longitude,
                max_distance: 100000000
            }

            req.checkQuery('longitude', 'Please provide longitude.').notEmpty();
            req.checkQuery('latitude', 'Please provide latitude.').notEmpty();

            var errors = req.validationErrors();

            if (errors) {
                //io.emit('error', {'error' : errors[0].msg, 'result' : null});
                res.json({ 'error': errors[0].msg, 'result': null });
            } else {
                mDonorModel.findNearByDonors(params, function(error, result) {
                    if (error) {
                        //io.emit('error', {'error' : error, 'result' : null});
                        res.json({ 'error': error, 'result': result });
                    } else {
                        io.emit('nearby_success', { 'error': null, 'result': result });
                        res.json({ 'error': null, 'result': result });
                    }
                });
            }
        }
    },
    addDonor: function(io) {
        // Add Donor POST /donor
        return function(req, res) {
            var params = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                contact_number: req.body.contact_number,
                blood_group: req.body.blood_group,
                location: {
                    coordinates: [req.body.longitude, req.body.latitude]
                },
                address: req.body.address,
                ip_address: req.body.ip_address
            }

            //console.log(params);

            req.checkBody('first_name', 'Please provide first name.').notEmpty();
            req.checkBody('last_name', 'Please provide last name.').notEmpty();
            req.checkBody('email', 'Please provide valid email address.').notEmpty().isEmail();
            req.checkBody('contact_number', 'Please provide valid contact number.').notEmpty().isMobileValid();
            req.checkBody('blood_group', 'Please provide blood group.').notEmpty();
            req.checkBody('latitude', 'Please provide latitude of your location.').notEmpty();
            req.checkBody('longitude', 'Please provide longitude of your location.').notEmpty();
            req.checkBody('address', 'Please provide your address.').notEmpty();
            req.checkBody('ip_address', 'Please provide your ip address.').notEmpty();

            var errors = req.validationErrors();

            if (errors) {
                //io.emit('error', {'error' : errors[0].msg, 'result' : null});
                res.json({ 'error': errors[0].msg, 'result': null });
            } else {
                var donor = new mDonorModel(params);
                donor.save(function(error, result) {
                    if (error) {
                        //io.emit('error', {'error' : error, 'result' : null});
                        res.json({ 'error': error, 'result': null });
                    } else {
                        io.emit('donor_success', { 'error': null, 'result': result });
                        res.json({ 'error': null, 'result': result });
                    }
                })
            }
        }
    },
    updateDonor: function(io) {
        // Update user information
        return function(req, res) {
            var params = {
                condition: {
                    _id: req.params.donor_id
                },
                update: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    contact_number: req.body.contact_number,
                    blood_group: req.body.blood_group
                }
            }

            req.checkBody('first_name', 'Please provide first name.').notEmpty();
            req.checkBody('last_name', 'Please provide last name.').notEmpty();
            req.checkBody('email', 'Please provide valid email address.').notEmpty().isEmail();
            req.checkBody('contact_number', 'Please provide valid contact number.').notEmpty().isMobileValid();
            req.checkBody('blood_group', 'Please provide blood group.').notEmpty();
            req.checkParams('donor_id', 'Please provide donor_id').notEmpty();

            var errors = req.validationErrors();

            if (errors) {
                //io.emit('error', {'error' : errors[0].msg, 'result' : null});
                res.json({ 'error': errors[0].msg, 'result': null });
            } else {
                mDonorModel.update(params.condition, params.update, function(error, result) {
                    if (error) {
                        //io.emit('error', {'error' : error, 'result' : null});
                        res.json({ 'error': error, 'result': null });
                    } else {
                        console.log(result);
                        io.emit('donor_success', { 'error': null, 'result': result });
                        res.json({ 'error': null, 'result': result });
                    }
                })
            }
        }
    },
    deleteDonor : function(io){
    	// Delete user information
    	return function(req, res){
    		var params = {
    			condition: {
                    _id: req.params.donor_id
                }
    		}

    		req.checkParams('donor_id', 'Please provide donor_id.').notEmpty();

    		var errors = req.validationErrors();

            if (errors) {
                //io.emit('error', {'error' : errors[0].msg, 'result' : null});
                res.json({ 'error': errors[0].msg, 'result': null });
            } else {
                mDonorModel.findOneAndRemove(params.condition, function(error) {
                    if (error) {
                        //io.emit('error', {'error' : error, 'result' : null});
                        res.json({ 'error': error, 'result': null });
                        console.log(error);
                    } else {
                        io.emit('donor_success', { 'error': null, 'result': "Removed Successfully." });
                        res.json({ 'error': null, 'result': "Removed Successfully." });
                    }
                })
            }
    	}
    },
    getUpdateDonorForm : function(io, file_path){
    	// Get Update donor form
    	return function(req, res){
    		var params = {
    			condition : {
    				donor_id : req.params.donor_id
    			}
    		}

    		res.sendFile(file_path);
    	}
    }
}
