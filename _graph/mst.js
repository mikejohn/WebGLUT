/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-13
 * Time: 下午12:46
 * To change this template use File | Settings | File Templates.
 */
/**
 * @description Computes a minimum spanning tree for an undirected, weighted graph specified by graph. The minimum spanning tree is computed starting from the vertex specified by start. The operation modifies graph, so a copy should be made before calling the operation, if necessary. Each vertex in graph must contain data of type MstVertex. Assign a weight to each edge by setting the weight member of the MstVertex structure passed as data2 to graph_ins_edge. Use the data member of each MstVertex structure to store data associated with the vertex, such as an identifier. The match function for graph, which is set by the caller when initializing the graph with graph_init, should compare only the data members of MstVertex structures. This is the same function that should be passed as the match argument to mst. Once computed, information about the minimum spanning tree is returned in span, which is a list of MstVertex structures. In span, the vertex whose parent is set to NULL is the vertex at the root of the minimum spanning tree. The parent member of every other vertex points to the vertex that precedes it in the span. The vertices in span point to actual vertices in graph, so the caller must ensure that the storage in graph remains valid as long as span is being accessed. Use list_destroy to destroy span once it is no longer needed.
 * @param graph
 * @param start
 * @param match
 * @return {*}
 */
var mst = function (graph,start) {
    var adjlist;
    var mst_vertex,adj_vertex;
    var element,member;
    var minimum;
    var found,i;
    var match = graph.match;
    found = false;
    for(element = graph.adjLists.head;element != null;element= element.next) {
        mst_vertex = element.data;
        if(match(mst_vertex.vertex,start)) {
            mst_vertex.color = 'white';
            mst_vertex.key = 0;
            mst_vertex.parent = null;
            found =true;
        } else {
            mst_vertex.color = 'white';
            mst_vertex.key = Number.POSITIVE_INFINITY;
            mst_vertex.parent = null;
        }
    }
    if(!found) {
        return -1;
    }
    i=0;
    while(i < graph.vcount) {
        minimum = Number.POSITIVE_INFINITY;
        for ( element = graph.adjLists.head;element != null;element = element.next) {
            mst_vertex = element.data;
            if(mst_vertex.color == 'white' && mst_vertex.key < minimum) {
                minimum = mst_vertex.key;
                adjlist = element.data;
            }
        }
        adjlist.color = 'black';
        for (member = adjlist.adjacent.list.head;member != null;member = member.next) {
            adj_vertex = member;
            for(element = graph.adjLists.head;element != null;element = element.next){
                mst_vertex = element.data;
                if(match (mst_vertex.vertex,adj_vertex.data)){
                    if(mst_vertex.color == 'white' && adj_vertex.weight < mst_vertex.key) {
                        mst_vertex.key = member.weight;
                        mst_vertex.parent = adjlist;
                    }
                    break;
                }
            }
        }
        i++;
    }
    var span = new DS.LinkedList();
    for(element = graph.adjLists.head;element != null;element = element.next){
        mst_vertex = element.data;
        if(mst_vertex.color =='black') {
            if(span.ins_next(span.tail,mst_vertex)!=0){
                return -1;
            }
        }
    }
    return span;
};