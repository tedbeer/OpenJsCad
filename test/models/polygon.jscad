function main () {
	//execute some methods to be tested

	new CSG.Polygon2D([
		{"x": -1, "y": 1,"z": 0},
		{"x": -1, "y": -1,"z": 0},
		{"x": 1,"y": -1,"z": 0},
		{"x": 1,"y": 1,"z": 0}
	]);

	var obj = {
		"vertices": [{
			"pos": {"x": -1,"y": 1,"z": 0}
		}, {
			"pos": {"x": -1,"y": -1,"z": 0}
		}, {
			"pos": {"x": -1,"y": -1,"z": 0}
		}, {
			"pos": {"x": -1,"y": 1,"z": 0}
		}],
		"shared": {
			"color": 0
		},
		"plane": {
			"normal": {"x": 0,"y": 1,"z": 0},
			"w": 0
		}
	};
	CSG.Polygon.fromObject(obj);
/*
		//some test with exceptions
		try {new CSG.Vector3D([1,2]);} catch (e) {}
*/
	return CSG.cube({//some simple
		radius: 6
	});
}