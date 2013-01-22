function main() {

	CSG.Plane.anyPlaneFromVector3Ds(
		new CSG.Vector3D(1, 0, 0),
		new CSG.Vector3D(0, 1, 0),
		new CSG.Vector3D(0, 0, 1)
	);
	//some edge cases
	CSG.Plane.anyPlaneFromVector3Ds(
		new CSG.Vector3D(1, 0, 0),
		new CSG.Vector3D(0.9999991, 0, 0),
		new CSG.Vector3D(0.9999992, 0, 0)
	);
	CSG.Plane.anyPlaneFromVector3Ds(
		new CSG.Vector3D(1, 0, 0),
		new CSG.Vector3D(0.99, 0, 0),
		new CSG.Vector3D(1.01, 0, 0)
	);


	var v1 = CSG.Plane.fromPoints(
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1]
	);

	v1.intersectWithLine(CSG.Line3D.fromPoints([1,1,1], [1,1,-1]));

	v1.intersectWithPlane(CSG.Plane.fromPoints(
		[0, 2, 0],
		[0, 1, 1],
		[1, 0, 3]
	));

	v1.signedDistanceToPoint(
		new CSG.Vector3D([3,3,3])
	);

	v1.mirrorPoint(
		new CSG.Vector3D([3,3,3])
	);

	return new CSG.cube();
}