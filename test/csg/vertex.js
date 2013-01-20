// # class Vertex
// Represents a vertex of a polygon. Use your own vertex class instead of this
// one to provide additional features like texture coordinates and vertex
// colors. Custom vertex classes need to provide a `pos` property
// `flipped()`, and `interpolate()` methods that behave analogous to the ones
// defined by `CSG.Vertex`.
CSG.Vertex = function(pos) {
	this.pos = pos;
};

// create from an untyped object with identical property names:
CSG.Vertex.fromObject = function(obj) {
	var pos = new CSG.Vector3D(obj.pos);
	return new CSG.Vertex(pos);
};

CSG.Vertex.prototype = {
	// Return a vertex with all orientation-specific data (e.g. vertex normal) flipped. Called when the
	// orientation of a polygon is flipped.
	flipped: function() {
		return this;
	},

	getTag: function() {
		var result = this.tag;
		if(!result) {
			result = CSG.getTag();
			this.tag = result;
		}
		return result;
	},

	// Create a new vertex between this vertex and `other` by linearly
	// interpolating all properties using a parameter of `t`. Subclasses should
	// override this to interpolate additional properties.
	interpolate: function(other, t) {
		var newpos = this.pos.lerp(other.pos, t);
		return new CSG.Vertex(newpos);
	},

	// Affine transformation of vertex. Returns a new CSG.Vertex
	transform: function(matrix4x4) {
		var newpos = this.pos.multiply4x4(matrix4x4);
		return new CSG.Vertex(newpos);
	},

	toStlString: function() {
		return "vertex " + this.pos.toStlString() + "\n";
	},

	toString: function() {
		return this.pos.toString();
	}
};
