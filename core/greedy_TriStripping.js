var PrimitiveTriangle = function (v1Index,v2Index,v3Index) {
    this.vertex3 = [v1Index,v2Index,v3Index];
    this.edge3 = [];
    this.edge3.push(new PrimitiveEdge(v1Index,v2Index));
    this.edge3.push(new PrimitiveEdge(v2Index,v3Index));
    this.edge3.push(new PrimitiveEdge(v3Index,v1Index));
    this.inStrip = false;
};
var PrimitiveEdge = function (vertexA,vertexB) {
    this.vertexA = vertexA;
    this.vertexB = vertexB;
};
/**
 * 求一个三角形是否包含一条边，如果包含则返回不在边上的那个点；如果不包含返回-1
 * @param edge
 * @param triangle
 * @return {*}
 */
function shareEdge (edge,triangle) {
    var vertexA = edge.vertexA;
    var vertexB = edge.vertexB;
    var vertexC,share = 0;
    for(var i=0;i<3;i++) {
        if(vertexA == triangle.vertex3[i] || vertexB == triangle.vertex3[i]) {
            share++;
        } else {
            vertexC = triangle.vertex3[i];
        }
    }
    if(share == 2) {
        triangle.inStrip = true;
        return vertexC;
    }
    return -1;
}
/**
 *
 */
function greedy_triangle_stripping (primitives) {
    var edge, size = primitives.length,strips = [];
    for(var i=0;i<size;i++) {
        var primitive = primitives[i];
        if(primitive.inStrip) {
            continue;
        }
        var strip = [],found = false;
        primitive.inStrip = true;
        for(var e=0;e<3;e++) {
            edge = primitive.edge3[e];
            for(var j=0;j<size;j++) {
                var next = primitives[j];
                if(next.inStrip) {
                    continue;
                }
                var vertexNext = shareEdge(edge,next);
                if(vertexNext!= -1) {
                    if(strip.length == 0) {
                        strip.push(edge.vertexA);
                        strip.push(edge.vertexB);
                    }
                    strip.push(vertexNext);

                    edge = new PrimitiveEdge(strip[strip.length-2],strip[strip.length-1]);
                    found = true;
                    break;
                } else {

                }
            }
            if(found) {
                break;
            }
        }
        if(found) {
            for(var v=0;v<3;v++) {
                if (primitive.vertex3[v] != primitive.edge3[e].vertexA
                    && primitive.vertex3[v] != primitive.edge3[e].vertexB){
                    strip.unshift(primitive.vertex3[v]);
                }
            }
        } else {
            strip.push(primitive.vertex3[0]);
            strip.push(primitive.vertex3[1]);
            strip.push(primitive.vertex3[2]);
        }
        strips.push(strip);
    }
}