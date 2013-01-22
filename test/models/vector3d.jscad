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

	new CSG.Vector3D([1,2]);
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
	try {new CSG.Vector3D([1]);
		setTimeout(function() {
			//Array must have exactly 2 or 3 elements
			throw new Error('CSG.Vector3D: exception #1 is not thrown');
		}, 1);
	} catch (e) {}

	try {new CSG.Vector3D([1,2,3,4]);
		setTimeout(function(){
			//Array must have exactly 2 or 3 elements
			throw new Error('CSG.Vector3D: exception #2 is not thrown');
		}, 1);
	} catch (e) {}

	try {new CSG.Vector3D(new String(''));
		setTimeout(function(){
			//Object must have 'x' & 'y' properties
			throw new Error('CSG.Vector3D: exception #3 is not thrown');
		}, 1);
	} catch (e) {}

	try {new CSG.Vector3D(1, 2, 3, 4, 5);
		setTimeout(function(){
			//must be 3 arguments or less
			throw new Error('CSG.Vector3D: exception #4 is not thrown');
		}, 1);
	} catch (e) {}

	try {v2.x = 99;
		setTimeout(function(){
			//property x is immutable
			throw new Error('CSG.Vector3D: exception #5 is not thrown');
		}, 1);
	} catch (e) {}

	try {v2.y = 99;
		setTimeout(function(){
			//property y is immutable
			throw new Error('CSG.Vector3D: exception #6 is not thrown');
		}, 1);
	} catch (e) {}

	try {v2.z = 99;
		setTimeout(function(){
			//property z is immutable
			throw new Error('CSG.Vector3D: exception #7 is not thrown');
		}, 1);
	} catch (e) {}

	return CSG.cube({//some simple
		radius: 6
	});
}