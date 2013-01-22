function main() {

	var ob = CSG.OrthoNormalBasis.Z0Plane();

	ob.line3Dto2D(CSG.Line3D.fromPoints([1,-1,1], [1,2,-1]));

	ob.line2Dto3D(CSG.Line2D.fromPoints([1,-1], [1,1]));

	ob.transform(CSG.Matrix4x4.rotationX(90));

	return new CSG.cube();
}