function main () {
	//execute some methods to be tested

	var v1 = CAG.rectangle().toCSG(), //polygons created in CSG are invalid
		str = JSON.stringify(v1.polygons[0]);
		//console.info(str);
	CSG.Polygon.fromObject(JSON.parse(str));
/*
		//some test with exceptions
		try {new CSG.Vector3D([1,2]);} catch (e) {}
*/
	return CSG.cube({//some simple
		radius: 6
	});
}