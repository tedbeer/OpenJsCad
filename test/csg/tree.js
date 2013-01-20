// # class Tree
// This is the root of a BSP tree
// We are using this separate class for the root of the tree, to hold the PolygonTreeNode root
// The actual tree is kept in this.rootnode
CSG.Tree = function(polygons) {
	this.polygonTree = new CSG.PolygonTreeNode();
	this.rootnode = new CSG.Node(null);
	if(polygons) this.addPolygons(polygons);
};

CSG.Tree.prototype = {
	invert: function() {
		this.polygonTree.invert();
		this.rootnode.invert();
	},

	// Remove all polygons in this BSP tree that are inside the other BSP tree
	// `tree`.
	clipTo: function(tree, alsoRemovecoplanarFront) {
		alsoRemovecoplanarFront = alsoRemovecoplanarFront ? true : false;
		this.rootnode.clipTo(tree, alsoRemovecoplanarFront);
	},

	allPolygons: function() {
		var result = [];
		this.polygonTree.getPolygons(result);
		return result;
	},

	addPolygons: function(polygons) {
		var _this = this;
		var polygontreenodes = polygons.map(function(p) {
			return _this.polygonTree.addChild(p);
		});
		this.rootnode.addPolygonTreeNodes(polygontreenodes);
	}
};
