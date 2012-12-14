/**
 * Created with JetBrains WebStorm.
 * User: Mikejohn
 * Date: 12-12-14
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */
var shortest = function (graph,start) {
    var match = graph.match;
    var adjList;
    var pth_vertex,adj_vertex;
    var element,member;
    var minimum;
    var fount,i;
    fount = false;
    for(element = graph.adjLists.head;element!= null;element = element.next) {
        pth_vertex = element.data;
        if(match (pth_vertex.vertex,start)) {
            pth_vertex.color = 'white';
            pth_vertex.d = 0;
            pth_vertex.parent = null;
            found = true;
        } else {
            pth_vertex.color = 'white';
            pth_vertex.d = Number.POSITIVE_INFINITY;
            pth_vertex.parent = null;
        }
    }
    if(!found) {
        return -1;
    }
    i=0;
    while (i < graph.vcount) {
        minimum = Number.POSITIVE_INFINITY;
        for(element = graph.adjLists.head;element != null;element = element.next){
            pth_vertex  = element.data;
            if(pth_vertex.color == 'white' && pth_vertex.d < minimum) {
                minumum = pth_vertex.d;
                adjList = pth_vertex;
            }
        }
        adjList.color = 'black';
        for(member = adjList.adjacent.list.head;member != null;member = member.next){
            adj_vertex = member.data;
            for(element = graph.adjLists.head;element!=null;element = element.next) {
                pth_vertex = element.data;
                if(match(pth_vertex.vertex,adj_vertex.vertex)) {
                    relax(adjList,pth_vertex,adj_vertex.weight);
                }
            }
        }
        i++;
    }
    var paths = new DS.LinkedList();
    for(element = graph.adjLists.head;element!=null;element=element.next){
        pth_vertex = element.data;
        if(pth_vertex.color == 'black') {
            if(paths.ins_next(paths.tail,pth_vertex)!=0) {
                return -1;
            }
        }
    }
    return paths;

    function relax (u, v ,w) {
        if(v.d > u.d + w) {
            v.d = u.d +w;
            v.parent = u;
        }
        return;
    }
};
