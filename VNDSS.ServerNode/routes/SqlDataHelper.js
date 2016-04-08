msssql = require("mssql");
var connection = new sql.Connection({
	user: 'hieutm',
	password: 'hieu@123a',
	server: '192.168.1.111',
	database: 'VnLakeV3_tctl',
	options: {
		encrypt: true
	}
});

var connect = msssql.connect(config);

var ExecuteQueryDataTable = function (querysql, funsuccess, funerr) {
	connect.then(function (param) {
		var request = new msssql.Request();
		request.query(querysql).then(funsuccess).catch(funerr);
	}).catch(function (err) {
		console.log(err);
	});
}

var ExecuteStoredDataTable = function (storedname, param, funsuccess, funerr) {
	connect.then(function (param) {
		var request = new msssql.Request();
		param.forEach(function (item, index) {
			request.input(item.name, item.datatype, item.value);
		});
		request.execute(storedname).then(function (recordsets, returnValue) {
			funsuccess(recordsets, returnValue);
		}).catch(function (err) {
			funerr(err);
		});
	}).catch(function (err) {
		console.log(err);
	});
}

module.exports = {
	msssql: connect,
	datatype: msssql,
	ExecuteQueryDataTable: as
}