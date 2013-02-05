function main (){

	var vertex = new CAG.Vertex({x: 222, y: 333, z: 444});

	vertex.toString();

	vertex.getTag();//generate

	try {
		CAG.Side.fromFakePolygon({
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
				"color": [128,128,128]
			},
			"plane": {
				"normal": {"x": 0,"y": 0,"z": 1},
				"w": 0
			}
		});
		setTimeout(function(){
			throw new Error('CAG.Side.fromFakePolygon: exception is not thrown');
		}, 1);
	} catch(e) {

	}

	var side = CAG.Side.fromFakePolygon({
		"vertices": [{
			"pos": {"x": -1,"y": 1,"z": 1.0}
		}, {
			"pos": {"x": -1,"y": -1,"z": -1.0}
		}, {
			"pos": {"x": -1,"y": -1,"z": -1.0}
		}, {
			"pos": {"x": -1,"y": 1,"z": 1.0}
		}],
		"shared": {
			"color": [128,128,128]
		},
		"plane": {
			"normal": {"x": 0,"y": 0,"z": 1},
			"w": 0
		}
	});
	side.toString();

	try {// line#51
		CAG.Side.fromFakePolygon({
			"vertices": [{
				"pos": {"x": -1,"y": 1,"z": 1.0}
			}, {
				"pos": {"x": -1,"y": -1,"z": -1.0}
			}, {
				"pos": {"x": -1,"y": -1,"z": 1.0}
			}, {
				"pos": {"x": -1,"y": 1,"z": -1.0}
			}],
			"shared": {
				"color": [128,128,128]
			},
			"plane": {
				"normal": {"x": 0,"y": 0,"z": 1},
				"w": 0
			}
		});
		setTimeout(function(){
			throw new Error('CAG.Side.fromFakePolygon #2: exception is not thrown');
		}, 1);
	} catch(e) {

	}

	side.direction();
	side.getTag();
	side.lengthSquared();
	side.length();

	return CSG.cube({//some simple
		radius: 6
	});
}