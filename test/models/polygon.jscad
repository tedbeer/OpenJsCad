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
			"normal": {"x": 0,"y": 0,"z": 1},
			"w": 0
		}
	};
	var v1 = CSG.Polygon.fromObject(obj);
	v1.checkIfConvex();
	v1.extrude(new CSG.Vector3D(1, 1, 1));
	//FIXME:
	//CSG.Polygon.prototype.translate line #78 is overriden by translate method from transformation-methods.js
	v1.translate([11,12,13]);
	v1.transform(
		CSG.Matrix4x4.mirroring(
			new CSG.Plane(new CSG.Vector3D(1, 1, 1), -2)
	));
	v1.toStlString();
	v1.toString();
	v1.projectToOrthoNormalBasis(CSG.OrthoNormalBasis.Z0Plane());

	//area < 0 line#177
	obj = {
		"vertices": [{
			"pos": {"x": 1,"y": 1,"z": 0}
		}, {
			"pos": {"x": -1,"y": 1,"z": 0}
		}, {
			"pos": {"x": -1,"y": -1,"z": 0}
		}, {
			"pos": {"x": 1,"y": -1,"z": 0}
		}],
		"shared": {
			"color": 0
		},
		"plane": {
			"normal": {"x": 0,"y": 0,"z": 1},
			"w": 0
		}
	};
	v1 = CSG.Polygon.fromObject(obj);
	var basis = new CSG.OrthoNormalBasis(
					new CSG.Plane(new CSG.Vector3D([-1, -5, -5]), 10),
		 			new CSG.Vector3D([1, 1, 1])
		 		);

	v1.projectToOrthoNormalBasis(basis);

	//empty
	var v2 = new CSG.Polygon([], v1.shared, v1.plane);
	v2.boundingBox();

	CSG.Polygon.createFromPoints(
		[],
		obj.shared,
		new CSG.Plane(
			new CSG.Vector3D([-1, -1, -1]), 1));

	//the method is never used
	CSG.Polygon.isStrictlyConvexPoint(
		v1.vertices[0].pos,
		v1.vertices[1].pos,
		v1.vertices[2].pos,
		v1.plane.normal);
	//some test with exceptions
	try {
		//non convex polygon
		obj = {
			"vertices": [{
				"pos": {"x": -1,"y": 1,"z": 0}
			}, {
				"pos": {"x": -1,"y": -1,"z": 0}
			}, {
				"pos": {"x": 0,"y": 0,"z": 0}
			}, {
				"pos": {"x": 1,"y": -1,"z": 0}
			}, {
				"pos": {"x": 1,"y": 1,"z": 0}
			}, {
				"pos": {"x": -1,"y": 1,"z": 0}
			}],
			"shared": {
				"color": 0
			},
			"plane": {
				"normal": {"x": 0,"y": 0,"z": 1},
				"w": 0
			}
		};
		CSG.Polygon.fromObject(obj).checkIfConvex();
	} catch (e) {}

	return CSG.cube({//some simple
		radius: 6
	});
}