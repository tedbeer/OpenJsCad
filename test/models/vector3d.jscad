function main () {
	//execute some methods to be tested
	var v1 = new CSG.Vector3D({
			x: 222,
			y: 333
		}),
		v2 = new CSG.Vector3D({
			x: 222,
			y: 333,
			z: 444
		}),
		mx = CSG.Matrix4x4.rotationX(90),
		str = v1 + ' -> ' + v2;

		v1 = new CSG.Vector3D(19,69);
		v2 = v1.clone();
		v1 = v1.lerp(v2, 3);
		v1.distanceTo(v2);
		v2 = v1.multiply4x4(mx);
		v2 = v1.transform(mx);
		str = v1.toStlString();

		//additional tests of transformations
		v1.rotateX(33);
		v1.rotateY(33);
		v1.rotateZ(33);
		v1.rotate([0,0,0], [1,1,1], 33);
		v1.scale(0.5);
		v1.mirroredX();
		v1.mirroredY();
		v1.mirroredZ();

		//some test with exceptions
		try {new CSG.Vector3D([1,2]);} catch (e) {}
		try {new CSG.Vector3D([1,2,3,4]);} catch (e) {}
		try {new CSG.Vector3D(new String(''));} catch (e) {}
		try {new CSG.Vector3D(1, 2, 3, 4, 5);} catch (e) {}
		try {v2.x = 99;} catch (e) {}
		try {v2.y = 99;} catch (e) {}
		try {v2.z = 99;} catch (e) {}

	return CSG.cube({//some simple
		radius: 6
	});
}