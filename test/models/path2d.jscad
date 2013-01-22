function main(){
	var v1 = new CSG.Path2D(
		[[5,0], [0, 5], [-5, 0], [0, -5], [5, 0]], true
	);
	var v2 = CSG.Path2D.arc();
	var v3 = CSG.Path2D.arc({
		startangle: 0,
		endangle: 999
	});
	var v4 = CSG.Path2D.arc({
		startangle: 0,
		endangle: -999,
		maketangent: true
	});
	CSG.Path2D.arc({
		startangle: 0,
		endangle: 0.000001
	});
	v3.concat(v4);
	v4.appendPoint([1,1]);

	CSG.Path2D.arc().close().innerToCAG();

	var v5 = CSG.Path2D.arc({
		startangle: 0,
		endangle: 45
	});
	v5.transform(CSG.Matrix4x4.rotationX(90));

	//some test with exceptions
	try {v1.concat(v2);} catch (e) {}
	try {v1.appendPoint([1,1]);} catch (e) {}
	try {v5.innerToCAG();} catch (e) {}


	return v3.rectangularExtrude(6, 6, 6);
}
