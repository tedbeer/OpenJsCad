function getParameterDefinitions() {
  return [
	{ name: 'radius', caption: 'Radius:', type: 'float', default: 10 },
	{ name: 'height', caption: 'Height:', type: 'float', default: 35 },
	{ name: 'twist', caption: 'Twist:', type: 'int', default: 90}
  ];
}

function main(params) {
	var thing = thingTwisted(params.radius, params.height, params.twist);
	return thing;
}

function thingTwisted(radius, height, twistangle) {
  twistangle = twistangle || 0;

	var flatBottom = CAG.fromPoints([
		[-radius, -radius, 0],
	[radius, -radius, 0],
	[radius, radius, 0]
	]).expand(2, CSG.defaultResolution2D);

  var thing = flatBottom.extrude({
	offset: [0, 0, height],  // direction for extrusion
	twistangle: twistangle,  // top surface is rotated
	numslices: 3
	,transform: function(poligon, t, angle) {
		var coef = 1 - t;
		if (coef < 0.01) coef = 0.01;//must not collapse polygon
		return CAG.fromPoints([
			[-radius, -radius, 0],
			[radius, -radius, 0],
	 		[radius * coef, radius, 0],
			[-radius * coef, radius, 0]
		]).expand(2, CSG.defaultResolution2D).rotate([0,0,0], [0,0,1], angle);
	}
  });
   return thing;
}