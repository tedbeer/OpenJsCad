// # class Node
// Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
// by picking a polygon to split along.
// Polygons are not stored directly in the tree, but in PolygonTreeNodes, stored in
// this.polygontreenodes. Those PolygonTreeNodes are children of the owning
// CSG.Tree.polygonTree
// This is not a leafy BSP tree since there is
// no distinction between internal and leaf nodes.
CSG.Node = function(parent) {
	this.plane = null;
	this.front = null;
	this.back = null;
	this.polygontreenodes = [];
	this.parent = parent;
};

CSG.Node.prototype = {
	// Convert solid space to empty space and empty space to solid space.
	invert: function() {
		if(this.plane) this.plane = this.plane.flipped();
		if(this.front) this.front.invert();
		if(this.back) this.back.invert();
		var temp = this.front;
		this.front = this.back;
		this.back = temp;
	},

	// clip polygontreenodes to our plane
	// calls remove() for all clipped PolygonTreeNodes
	clipPolygons: function(polygontreenodes, alsoRemovecoplanarFront) {
		if(this.plane) {
			var backnodes = [];
			var frontnodes = [];
			var coplanarfrontnodes = alsoRemovecoplanarFront ? backnodes : frontnodes;
			var plane = this.plane;
			var numpolygontreenodes = polygontreenodes.length;
			for(var i = 0; i < numpolygontreenodes; i++) {
				var node = polygontreenodes[i];
				if(!node.isRemoved()) {
					node.splitByPlane(plane, coplanarfrontnodes, backnodes, frontnodes, backnodes);
				}
			}
			if(this.front && (frontnodes.length > 0)) {
				this.front.clipPolygons(frontnodes, alsoRemovecoplanarFront);
			}
			var numbacknodes = backnodes.length;
			if(this.back && (numbacknodes > 0)) {
				this.back.clipPolygons(backnodes, alsoRemovecoplanarFront);
			} else {
				// there's nothing behind this plane. Delete the nodes behind this plane:
				for(var i = 0; i < numbacknodes; i++) {
					backnodes[i].remove();
				}
			}
		}
	},

	// Remove all polygons in this BSP tree that are inside the other BSP tree
	// `tree`.
	clipTo: function(tree, alsoRemovecoplanarFront) {
		if(this.polygontreenodes.length > 0) {
			tree.rootnode.clipPolygons(this.polygontreenodes, alsoRemovecoplanarFront);
		}
		if(this.front) this.front.clipTo(tree, alsoRemovecoplanarFront);
		if(this.back) this.back.clipTo(tree, alsoRemovecoplanarFront);
	},

	addPolygonTreeNodes: function(polygontreenodes) {
		if(polygontreenodes.length === 0) return;
		var _this = this;
		if(!this.plane) {
			var bestplane = polygontreenodes[0].getPolygon().plane;
			/*
      var parentnormals = [];
      this.getParentPlaneNormals(parentnormals, 6);
//parentnormals = [];
      var numparentnormals = parentnormals.length;
      var minmaxnormal = 1.0;
      polygontreenodes.map(function(polygontreenode){
        var plane = polygontreenodes[0].getPolygon().plane;
        var planenormal = plane.normal;
        var maxnormaldot = -1.0;
        parentnormals.map(function(parentnormal){
          var dot = parentnormal.dot(planenormal);
          if(dot > maxnormaldot) maxnormaldot = dot;
        });
        if(maxnormaldot < minmaxnormal)
        {
          minmaxnormal = maxnormaldot;
          bestplane = plane;
        }
      });
*/
			this.plane = bestplane;
		}
		var frontnodes = [];
		var backnodes = [];
		polygontreenodes.map(function(polygontreenode) {
			polygontreenode.splitByPlane(_this.plane, _this.polygontreenodes, backnodes, frontnodes, backnodes);
		});
		if(frontnodes.length > 0) {
			if(!this.front) this.front = new CSG.Node(this);
			this.front.addPolygonTreeNodes(frontnodes);
		}
		if(backnodes.length > 0) {
			if(!this.back) this.back = new CSG.Node(this);
			this.back.addPolygonTreeNodes(backnodes);
		}
	},
	//never used - code in .addPolygonTreeNodes is commented out
	getParentPlaneNormals: function(normals, maxdepth) {
		if(maxdepth > 0) {
			if(this.parent) {
				normals.push(this.parent.plane.normal);
				this.parent.getParentPlaneNormals(normals, maxdepth - 1);
			}
		}
	}
};
