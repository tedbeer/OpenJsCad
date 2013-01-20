function main (){
	//execute some methods to be tested
	var v1 = new CSG.Vector2D({
			x: [10, 6, 19],
			y: [69, 7, 50]
		}),
		v2 = new CSG.Vector2D(777),
		v3 = CSG.Vector2D.fromAngle(Math.PI / 3),
		v4 = v1.clone(),
		v5 = v1.lerp(v2, 3),
		d1 = v1.distanceToSquared(v2),
		l1 = v1.lengthSquared(),
		mx = CSG.Matrix4x4.rotationX(90),
		v6 = v1.multiply4x4(mx),
		a1 = v1.angle(),
		str = v1 + ' -> ' + v2;

		v1.negated();
		v1.distanceTo(v2);

		//some test with exceptions
		try {v1 = new CSG.Vector2D(1,2,3);} catch (e) {}
		try {v1 = new CSG.Vector2D(new String());} catch (e) {}
		try {v2.x = 99;} catch (e) {}
		try {v2.y = 99;} catch (e) {}

	return CSG.cube({//some simple
		radius: 6
	});
}