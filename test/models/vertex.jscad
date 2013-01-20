function main (){
	//execute some methods to be tested
	var v1 = CSG.Vertex.fromObject({
			pos : {
				x: 222,
				y: 333,
				z: 444
			}
		}),
		v2 = v1.interpolate(
			new CSG.Vertex(new CSG.Vector3D(222,333,444)),
			99
		),
		mx = CSG.Matrix4x4.rotationX(90),
		str = v1.toString();

		v1.transform(mx);
		str = v1.toStlString();
	return CSG.cube({//some simple
		radius: 6
	});
}