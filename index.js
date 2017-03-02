var splunkjs = require('splunk-sdk');
var config = require('config');
var handlebars = require('handlebars');
var util = require("util");

var splunkConfig = config.get('splunk');
// console.log("Loaded conf", process.env.NODE_ENV);
 
var service = new splunkjs.Service(splunkConfig);
// console.log("Splunk service", service);

// simply applies 
var apply = function (template, parms) {
	var compiled = handlebars.compile(template);
	var result = compiled(parms);
	return result;
}

// Allows easy setting of namespace
var namespace = {
	owner: "-",
	app: "-",
	sharing: "global"
}
var owner = function (owner) {
	namespace.owner = owner;
	return this;
}
var app = function (app) {
	namespace.app = app;
	return this;
}
var sharing = function (sharing) {
	namespace.sharing = sharing;
	return this;
}

// given a result object, returns a more usable json
// (probably not great for large results)
function mapToJson (results) {

	var newResults = [];

	var fields = results.fields;
	var rows = results.rows;

	for(var i = 0; rows && i < rows.length; i++) {
		var values = rows[i];
		var newRow = {};

		for(var j = 0; j < values.length; j++) {
			var field = fields[j];
			var value = values[j];
			newRow[field] = value;
		}

		newResults.push(newRow);
	}

	return newResults;
}

// run search, poll job, return results
var search = function (query, parms) {
	
	var promise = new Promise(function (resolve, reject) {

		service.search( query, parms, namespace, function(err, job) {

			// error scenarios
			if (err) return reject(err);
			if (job === undefined) return reject('Unable to create job');
			
			// Poll the status of the search job
			job.track({period: 200}, {
				done: function(job) {
					
					// Get the results and return
					job.results({}, function(err,results,job){
						
						// error
						if (err) return reject(err);
						
						// success
						return resolve({job:job,results:results});
					});
				},
				failed: function(job) {
					return reject('failed');
				},
				error: function(err) {
					return reject(err);
				}
			});

		});
	});

	return promise;
};

var exports = module.exports = {
	service: service,
	apply: apply,
	search: search,
	toJson: mapToJson,
	owner: owner,
	app: app,
	sharing: sharing
};