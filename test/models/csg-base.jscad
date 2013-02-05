function main (){

	var cube = CSG.cube({radius: 6})

	var cubeString = JSON.stringify(cube).replace(/_(x|y|z)/g, '$1');
	CSG.fromObject( JSON.parse(cubeString));

	var cubeBin = cube.toCompactBinary();
	CSG.fromCompactBinary(cubeBin);

	cube.union([CSG.sphere()]);

	cube.intersect([CSG.sphere()]);

	cube.transform1(CSG.Matrix4x4.rotationX(90));

	cube.toStlString();
	cube.setColor(0.1, 0.5, 1.0).toX3D();

	cube.toString();

	cube.expand(1, 6);

	cube.contract(1, 6);

	cube.expandedShell(1, 6, false);

	cube.expandedShell(1, 6, true);

	cube.reTesselated().reTesselated();

	(new CSG).cutByPlane();
	cube.cutByPlane(CSG.Plane.fromPoints(
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1]
	));

	cube.toPointCloud(0.5);
	cube.lieFlat();

	var ob = CSG.OrthoNormalBasis.Z0Plane();
	cube.projectToOrthoNormalBasis(ob);
	cube.sectionCut(ob);

	return CSG.cube({//some simple
		radius: 6
	});
}