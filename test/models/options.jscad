function main (){
	CSG.parseOptionAsFloat({
		'fNumber': '2.2'
	}, 'fNumber', 3.3);

	CSG.parseOptionAsBool({
		'bool': 'true'
	}, 'bool');
	CSG.parseOptionAsBool({
		'bool': 'false'
	}, 'bool');
	CSG.parseOptionAsBool({
		'bool': '0'
	}, 'bool');

	CSG.parseOptionAsInt({
		'iNumber': '99'
	}, 'iNumber');

	CSG.parseOptionAs2DVector({
		'vector': [22,33]
	}, 'vector');

	//some test with exceptions
	try {
		CSG.parseOptionAsFloat({
			'fNumber': 'XXX'
		}, 'fNumber', 3.3);
		setTimeout(function(){
			throw new Error('CSG.parseOptionAsFloat: exception is not thrown');
		}, 1);
	} catch (e) {}
	try {
		CSG.parseOptionAsInt({
			'iNumber': 'XXX'
		}, 'iNumber');
		setTimeout(function(){
			throw new Error('CSG.parseOptionAsInt: exception is not thrown');
		}, 1);
	} catch (e) {}

	return CSG.cube();
}