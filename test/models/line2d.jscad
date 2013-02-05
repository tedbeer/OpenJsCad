function main (){

	var v1 = CSG.Line2D.fromPoints(
				[0, 0],
				[1, 1]
	);

	v1.reverse();
	v1.equals(CSG.Line2D.fromPoints(
				[0, 0],
				[5, 5]
	));
	v1.xAtY(100);
	v1.absDistanceToPoint([100, 0]);

	v1.intersectWithLine(CSG.Line2D.fromPoints(
		[1, 1],
		[-1, 1]
	));

	v1.transform(CSG.Matrix4x4.rotationX(90));

	return CSG.cube({//some simple
		radius: 6
	});
}