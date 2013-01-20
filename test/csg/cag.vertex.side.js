CAG.Vertex = function(pos) {
	this.pos = pos;
};

CAG.Vertex.prototype = {
	toString: function() {
		return "("+this.pos.x.toFixed(2)+","+this.pos.y.toFixed(2)+")";
	},
	getTag: function() {
		var result = this.tag;
		if(!result) {
			result = CSG.getTag();
			this.tag = result;
		}
		return result;
	}
};

CAG.Side = function(vertex0, vertex1) {
	if(!(vertex0 instanceof CAG.Vertex)) throw new Error("Assertion failed");
	if(!(vertex1 instanceof CAG.Vertex)) throw new Error("Assertion failed");
	this.vertex0 = vertex0;
	this.vertex1 = vertex1;
};

CAG.Side.fromFakePolygon = function(polygon) {
	if(polygon.vertices.length != 4) throw new Error("Assertion failed");
	var pointsZeroZ = [];
	var indicesZeroZ = [];
	for(var i = 0; i < 4; i++) {
		var pos = polygon.vertices[i].pos;
		if((pos.z >= -1.001) && (pos.z < -0.999)) {
		} else if((pos.z >= 0.999) && (pos.z < 1.001)) {
		} else {
			throw new Error("Assertion failed");
		}
		if(pos.z > 0) {
			pointsZeroZ.push(new CSG.Vector2D(pos.x, pos.y));
			indicesZeroZ.push(i);
		}
	}
	if(pointsZeroZ.length != 2) throw new Error("Assertion failed");
	var d = indicesZeroZ[1] - indicesZeroZ[0];
	var p1, p2;
	if(d == 1) {
		p1 = pointsZeroZ[1];
		p2 = pointsZeroZ[0];
	} else if(d == 3) {
		p1 = pointsZeroZ[0];
		p2 = pointsZeroZ[1];
	} else throw new Error("Assertion failed");
	var result = new CAG.Side(new CAG.Vertex(p1), new CAG.Vertex(p2));
	return result;
};

CAG.Side.prototype = {
	toString: function() {
		return this.vertex0 + " -> "+ this.vertex1;
	},

	toPolygon3D: function(z0, z1) {
		var vertices = [
			new CSG.Vertex(this.vertex0.pos.toVector3D(z0)),
			new CSG.Vertex(this.vertex1.pos.toVector3D(z0)),
			new CSG.Vertex(this.vertex1.pos.toVector3D(z1)),
			new CSG.Vertex(this.vertex0.pos.toVector3D(z1))
		];
		return new CSG.Polygon(vertices);
	},

	transform: function(matrix4x4) {
		var newp1 = this.vertex0.pos.transform(matrix4x4);
		var newp2 = this.vertex1.pos.transform(matrix4x4);
		return new CAG.Side(new CAG.Vertex(newp1), new CAG.Vertex(newp2));
	},

	flipped: function() {
		return new CAG.Side(this.vertex1, this.vertex0);
	},

	direction: function() {
		return this.vertex1.pos.minus(this.vertex0.pos);
	},

	getTag: function() {
		var result = this.tag;
		if(!result) {
			result = CSG.getTag();
			this.tag = result;
		}
		return result;
	},

	lengthSquared: function() {
		var x = this.vertex1.pos.x - this.vertex0.pos.x,
		y = this.vertex1.pos.y - this.vertex0.pos.y;
		return x*x + y*y;
	},

	length: function() {
		return Math.sqrt(this.lengthSquared());
	}
};

//////////////////////////////////////
CAG.fuzzyCAGFactory = function() {
	this.vertexfactory = new CSG.fuzzyFactory(2, 1e-5);
};

CAG.fuzzyCAGFactory.prototype = {
	getVertex: function(sourcevertex) {
		var elements = [sourcevertex.pos._x, sourcevertex.pos._y];
		var result = this.vertexfactory.lookupOrCreate(elements, function(els) {
			return sourcevertex;
		});
		return result;
	},

	getSide: function(sourceside) {
		var vertex0 = this.getVertex(sourceside.vertex0);
		var vertex1 = this.getVertex(sourceside.vertex1);
		return new CAG.Side(vertex0, vertex1);
	},

	getCAG: function(sourcecag) {
		var _this = this;
		var newsides = sourcecag.sides.map(function(side) {
			return _this.getSide(side);
		});
		return CAG.fromSides(newsides);
	}
};
