function main () {
	var v1 = new CSG.Matrix4x4;
	var v2 = v1.clone();
	v1.plus(v1);
	v1.minus(v1);

	var v3 = new CSG.Matrix4x4([2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1]);
	v3.rightMultiply1x3Vector( new CSG.Vector3D(1,2,3));
	v3.leftMultiply1x3Vector(new CSG.Vector3D(4,5,6));
	v3.rightMultiply1x2Vector(new CSG.Vector2D(1,2));
	v3.leftMultiply1x2Vector(new CSG.Vector2D(1,2));

	CSG.Matrix4x4.unity();

	return CSG.cube({//some simple
		radius: 6
	});
}