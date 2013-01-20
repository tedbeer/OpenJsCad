// Add several convenience methods to the classes that support a transform() method:
CSG.addTransformationMethodsToPrototype = function(prot) {
	prot.mirrored = function(plane) {
		return this.transform(CSG.Matrix4x4.mirroring(plane));
	};

	prot.mirroredX = function() {
		var plane = new CSG.Plane(new CSG.Vector3D(1, 0, 0), 0);
		return this.mirrored(plane);
	};

	prot.mirroredY = function() {
		var plane = new CSG.Plane(new CSG.Vector3D(0, 1, 0), 0);
		return this.mirrored(plane);
	};

	prot.mirroredZ = function() {
		var plane = new CSG.Plane(new CSG.Vector3D(0, 0, 1), 0);
		return this.mirrored(plane);
	};

	prot.translate = function(v) {
		return this.transform(CSG.Matrix4x4.translation(v));
	};

	prot.scale = function(f) {
		return this.transform(CSG.Matrix4x4.scaling(f));
	};

	prot.rotateX = function(deg) {
		return this.transform(CSG.Matrix4x4.rotationX(deg));
	};

	prot.rotateY = function(deg) {
		return this.transform(CSG.Matrix4x4.rotationY(deg));
	};

	prot.rotateZ = function(deg) {
		return this.transform(CSG.Matrix4x4.rotationZ(deg));
	};

	prot.rotate = function(rotationCenter, rotationAxis, degrees) {
		return this.transform(CSG.Matrix4x4.rotation(rotationCenter, rotationAxis, degrees));
	};
};

//////////////////////////////////////
CSG.addTransformationMethodsToPrototype(CSG.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Vector2D.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Vector3D.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Vertex.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Plane.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Polygon.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Line3D.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Connector.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Path2D.prototype);
CSG.addTransformationMethodsToPrototype(CSG.Line2D.prototype);
CSG.addTransformationMethodsToPrototype(CAG.prototype);
CSG.addTransformationMethodsToPrototype(CAG.Side.prototype);
