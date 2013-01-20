// # class CSG.Polygon.Shared
// Holds the shared properties for each polygon (currently only color)
CSG.Polygon.Shared = function(color) {
	this.color = color;
};

CSG.Polygon.Shared.fromObject = function(obj) {
	return new CSG.Polygon.Shared(obj.color);
};

CSG.Polygon.Shared.prototype = {
	getTag: function() {
		var result = this.tag;
		if(!result) {
			result = CSG.getTag();
			this.tag = result;
		}
		return result;
	},
	// get a string uniquely identifying this object
	getHash: function() {
		if(!this.color) return "null";
		return "" + this.color[0] + "/" + this.color[1] + "/" + this.color[2];
	}
};

CSG.Polygon.defaultShared = new CSG.Polygon.Shared(null);
