
var helper = require('./helper');

var template = "search index=_internal sourcetype={{sourcetype}} | head 1";
var searchParams = {
    exec_mode: "normal",
    output_mode:"json",
    earliest_time: "@m-10m",
    latest_time: "@m"
};

var query = helper.apply(template,{
    sourcetype: "splunkd"
});

helper.search(query,searchParams)
.then(function(output){
    console.log(output.results);
})
.catch(function(err){
    console.error(err);
});