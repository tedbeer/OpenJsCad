function main() {
	//normal tests
	var v1 = CSG.sphere({
			center: [0,0,0],
			radius: 4,
			resolution: 6
		}),
		v2 = CSG.cylinder({
			start: [0,0,-4],
			end: [0,0,-8],
			radius: 4,
			resolution: 3
		}),
		v3 = CSG.roundedCylinder({
			start: [4,4,8],
			end: [-4,-4,-8],
			radius: 3,
			resolution: 4
		}),
		v4 = CSG.roundedCylinder({
			start: [4,4,2],
			end: [8,4,4],
			radius: 4,
			resolution: 16
		});


		//very small cylinder will be a sphere line#249
		CSG.roundedCylinder({
			start: [444444444444/111111111110,4,2],
			end: [4,4,2],
			radius: 4,
			resolution: 4
		});
		CSG.cylinder({
			start: [-4,4,2],
			end: [4,-4,-2],
			radiusStart: 4,
			radiusEnd: 0,
			resolution: 8
		});
		CSG.cylinder({
			start: [4,-4,-2],
			end: [8,-8,-4],
			radiusStart: 0,
			radiusEnd: 4,
			resolution: 6
		});
		CSG.roundedCube({
			center: [0,0,2],
			radius: 4
		});
		CSG.sphere({
			axes: [new CSG.Vector3D(1,0,1),new CSG.Vector3D(0,1,1),new CSG.Vector3D(1,1,0)],
			radius: 3,
			resolution: 6
		});

		//test properties transformation
		var mx = CSG.Matrix4x4.rotationX(90);
		CSG.cube().transform(mx);

	//some test with exceptions
	try {
		CSG.cylinder({
			start: [0,0,-4],
			end: [0,0,-8],
			radiusStart: -2,
			radiusEnd: -3,
			resolution: 3
		});
	} catch (e) {}
	try {
		CSG.cylinder({
			start: [0,0,-4],
			end: [0,0,-8],
			radiusStart: 0,
			radiusEnd: 0,
			resolution: 3
		});
	} catch (e) {}

	return v1.union(v2).subtract(v3).intersect(v4);

	return CSG.cube({
		center: [0,0,1],
		radius: 6
	});
}