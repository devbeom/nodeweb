var DATABASE = 'test';
var TABLE = 'Board';
var Client = require('mysql').Client;
var client = new Client();


client.user = 'root';
client.password = '1234';
client.useDatabase('test');

var mysqlUtil = module.exports = {
	
	BoardList : function(param, callback) {
		client.query(
			"select * From Board where Board_idx = '" + param.idx + "' and Title like '%" + param.title + "'"
			,callback
		);
	}
};
