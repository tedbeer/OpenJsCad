// # class Polygon
// Represents a convex polygon. The vertices used to initialize a polygon must
// be coplanar and form a convex loop. They do not have to be `CSG.Vertex`
// instances but they must behave similarly (duck typing can be used for
// customization).
//
// Each convex polygon has a `shared` property, which is shared between all
// polygons that are clones of each other or were split from the same polygon.
// This can be used to define per-polygon properties (such as surface color).
//
// The plane of the polygon is calculated from the vertex coordinates
// To avoid unnecessary recalculation, the plane can alternatively be
// passed as the third argument
CSG.Polygon = function(vertices, shared, plane) {
	this.vertices = vertices;
	if(!shared) shared = CSG.Polygon.defaultShared;
	this.shared = shared;
	//var numvertices = vertices.length;

	if(arguments.length >= 3) {
		this.plane = plane;
	} else {
		this.plane = CSG.Plane.fromVector3Ds(vertices[0].pos, vertices[1].pos, vertices[2].pos);
	}

	if(CSG._CSGDEBUG) {
		this.checkIfConvex();
	}
};

// create from an untyped object with identical property names:
CSG.Polygon.fromObject = function(obj) {
	var vertices = obj.vertices.map(function(v) {
		return CSG.Vertex.fromObject(v);
	});
	var shared = CSG.Polygon.Shared.fromObject(obj.shared);
	var plane = CSG.Plane.fromObject(obj.plane);
	return new CSG.Polygon(vertices, shared, plane);
};

CSG.Polygon.prototype = {
	// check whether the polygon is convex (it should be, otherwise we will get unexpected results)
	checkIfConvex: function() {
		if(!CSG.Polygon.verticesConvex(this.vertices, this.plane.normal)) {
			CSG.Polygon.verticesConvex(this.vertices, this.plane.normal);
			throw new Error("Not convex!");
		}
	},

	// Extrude a polygon into the direction offsetvector
	// Returns a CSG object
	extrude: function(offsetvector) {
		var newpolygons = [];

		var polygon1 = this;
		var direction = polygon1.plane.normal.dot(offsetvector);
		if(direction > 0) {
			polygon1 = polygon1.flipped();
		}
		newpolygons.push(polygon1);
		var polygon2 = polygon1.translate(offsetvector);
		var numvertices = this.vertices.length;
		for(var i = 0; i < numvertices; i++) {
			var sidefacepoints = [];
			var nexti = (i < (numvertices - 1)) ? i + 1 : 0;
			sidefacepoints.push(polygon1.vertices[i].pos);
			sidefacepoints.push(polygon2.vertices[i].pos);
			sidefacepoints.push(polygon2.vertices[nexti].pos);
			sidefacepoints.push(polygon1.vertices[nexti].pos);
			var sidefacepolygon = CSG.Polygon.createFromPoints(sidefacepoints, this.shared);
			newpolygons.push(sidefacepolygon);
		}
		polygon2 = polygon2.flipped();
		newpolygons.push(polygon2);
		return CSG.fromPolygons(newpolygons);
	},

	translate: function(offset) {
		return this.transform(CSG.Matrix4x4.translation(offset));
	},

	// returns an array with a CSG.Vector3D (center point) and a radius
	boundingSphere: function() {
		if(!this.cachedBoundingSphere) {
			var box = this.boundingBox();
			var middle = box[0].plus(box[1]).times(0.5);
			var radius3 = box[1].minus(middle);
			var radius = radius3.length();
			this.cachedBoundingSphere = [middle, radius];
		}
		return this.cachedBoundingSphere;
	},

	// returns an array of two CSG.Vector3Ds (minimum coordinates and maximum coordinates)
	boundingBox: function() {
		if(!this.cachedBoundingBox) {
			var minpoint, maxpoint;
			var vertices = this.vertices;
			var numvertices = vertices.length;
			if(numvertices === 0) {
				minpoint = new CSG.Vector3D(0, 0, 0);
			} else {
				minpoint = vertices[0].pos;
			}
			maxpoint = minpoint;
			for(var i = 1; i < numvertices; i++) {
				var point = vertices[i].pos;
				minpoint = minpoint.min(point);
				maxpoint = maxpoint.max(point);
			}
			this.cachedBoundingBox = [minpoint, maxpoint];
		}
		return this.cachedBoundingBox;
	},

	flipped: function() {
		var newvertices = this.vertices.map(function(v) {
			return v.flipped();
		});
		newvertices.reverse();
		var newplane = this.plane.flipped();
		return new CSG.Polygon(newvertices, this.shared, newplane);
	},

	// Affine transformation of polygon. Returns a new CSG.Polygon
	transform: function(matrix4x4) {
		var newvertices = this.vertices.map(function(v) {
			return v.transform(matrix4x4);
		});
		var newplane = this.plane.transform(matrix4x4);
		var scalefactor = matrix4x4.elements[0] * matrix4x4.elements[5] * matrix4x4.elements[10];
		if(scalefactor < 0) {
			// the transformation includes mirroring. We need to reverse the vertex order
			// in order to preserve the inside/outside orientation:
			newvertices.reverse();
		}
		return new CSG.Polygon(newvertices, this.shared, newplane);
	},

	toStlString: function() {
		var result = "";
		if(this.vertices.length >= 3) // should be!
		{
			// STL requires triangular polygons. If our polygon has more vertices, create
			// multiple triangles:
			var firstVertexStl = this.vertices[0].toStlString();
			for(var i = 0; i < this.vertices.length - 2; i++) {
				result += "facet normal " + this.plane.normal.toStlString() + "\nouter loop\n";
				result += firstVertexStl;
				result += this.vertices[i + 1].toStlString();
				result += this.vertices[i + 2].toStlString();
				result += "endloop\nendfacet\n";
			}
		}
		return result;
	},

	toString: function() {
		var result = "Polygon plane: " + this.plane.toString() + "\n";
		this.vertices.map(function(vertex) {
			result += "  " + vertex.toString() + "\n";
		});
		return result;
	},

	// project the 3D polygon onto a plane
	projectToOrthoNormalBasis: function(orthobasis) {
		var points2d = this.vertices.map(function(vertex) {
			return orthobasis.to2D(vertex.pos);
		});
		var result = CAG.fromPointsNoCheck(points2d);
		var area = result.area();
		if(Math.abs(area) < 1e-5) {
			// the polygon was perpendicular to the orthnormal plane. The resulting 2D polygon would be degenerate
			// return an empty area instead:
			result = new CAG();
		} else if(area < 0) {
			result = result.flipped();
		}
		return result;
	}
};

CSG.Polygon.verticesConvex = function(vertices, planenormal) {
	var numvertices = vertices.length;
	if(numvertices > 2) {
		var prevprevpos = vertices[numvertices - 2].pos;
		var prevpos = vertices[numvertices - 1].pos;
		for(var i = 0; i < numvertices; i++) {
			var pos = vertices[i].pos;
			if(!CSG.Polygon.isConvexPoint(prevprevpos, prevpos, pos, planenormal)) {
				return false;
			}
			prevprevpos = prevpos;
			prevpos = pos;
		}
	}
	return true;
};

// Create a polygon from the given points
CSG.Polygon.createFromPoints = function(points, shared, plane) {
	var normal;
	if(arguments.length < 3) {
		// initially set a dummy vertex normal:
		normal = new CSG.Vector3D(0, 0, 0);
	} else {
		normal = plane.normal;
	}
	var vertices = [];
	points.map(function(p) {
		var vec = new CSG.Vector3D(p);
		var vertex = new CSG.Vertex(vec);
		vertices.push(vertex);
	});
	var polygon;
	if(arguments.length < 3) {
		polygon = new CSG.Polygon(vertices, shared);
	} else {
		polygon = new CSG.Polygon(vertices, shared, plane);
	}
	return polygon;
};

// calculate whether three points form a convex corner
//  prevpoint, point, nextpoint: the 3 coordinates (CSG.Vector3D instances)
//  normal: the normal vector of the plane
CSG.Polygon.isConvexPoint = function(prevpoint, point, nextpoint, normal) {
	var crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point));
	var crossdotnormal = crossproduct.dot(normal);
	return(crossdotnormal >= 0);
};

CSG.Polygon.isStrictlyConvexPoint = function(prevpoint, point, nextpoint, normal) {
	var crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point));
	var crossdotnormal = crossproduct.dot(normal);
	return(crossdotnormal >= 1e-5);
};
