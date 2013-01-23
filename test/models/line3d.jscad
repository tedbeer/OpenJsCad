function main (){

	//x direction
	var v1 = CSG.Line3D.fromPlanes(
		CSG.Plane.fromPoints(
			[0, 0, 0],
			[0, 1, 0],
			[1, 0, 0]
		),
		CSG.Plane.fromPoints(
			[0, 0, 0],
			[1, 0, 0],
			[0, 0, 1]
		)
	);

	//z direction
	var v2 = CSG.Line3D.fromPlanes(
		CSG.Plane.fromPoints(
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		),
		CSG.Plane.fromPoints(
			[0, 0, 0],
			[1, 0, 0],
			[0, 0, 1]
		)
	);

	v1.clone();
	v1.reverse();
	v1.transform(CSG.Matrix4x4.rotationX(90));
	v1.closestPointOnLine([3,3,3]);
	v1.distanceToPoint([3,3,3]);
	v1.equals(v2);
	v1.equals( new CSG.Line3D([1,1,1], v1.direction));
	v1.equals(v1);


	try {
		//parallel planes
		CSG.Line3D.fromPlanes(
			CSG.Plane.fromPoints(
				[1, 0, 0],
				[0, 1, 0],
				[1, 1, 0]
			),
			CSG.Plane.fromPoints(
				[1, 0, 1],
				[0, 1, 1],
				[1, 1, 1]
			)
		);
		setTimeout(function(){
			//property z is immutable
			throw new Error('CSG.Line3D.fromPlanes: exception is not thrown');
		}, 1);
	} catch (e) {}

	return CSG.cube({//some simple
		radius: 6
	});
}