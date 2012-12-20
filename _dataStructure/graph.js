/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-6
 * Time: 下午12:23
 * To change this template use File | Settings | File Templates.
 */
DS.Graph = function (match,destroy,free) {
    this.vcount = 0;
    this.ecount = 0;
    this.match = match;
    this.free = function () {};
    if(free != undefined) {
        this.freeMethod = free;
    }

    this.destroyMethod = destroy;
    this.adjLists = new DS.LinkedList();
};
DS.Graph.prototype = {
    constructor : DS.Graph,
    free : function (data) {
        if(this.freeMethod != undefined) {
            this.freeMethod(data);
        }
    },
    ins_vertex : function (data) {
       var element,adjListNode,retval;
       for(element = this.adjLists.head;element != null;element = element.next) {
           if(this.match(data,element.data.vertex)) {
               return -1;
           }
       }
       adjListNode = new DS.Graph.AdjListNode(this.match);
       adjListNode.vertex = data;
       if((retval = this.adjLists.ins_next(this.adjLists.tail,adjListNode)) !=0) {
           return retval;
       }
       this.vcount++;
       return 0;
    },
    ins_edge : function (data1,data2,weight) {
        var element,retval;
        for(element = this.adjLists.head;element != null;element = element.next) {
            if(this.match(data2,element.data.vertex)) {
                break;
            }
        }
        if(element == null) {
            return -1;
        }
        for(element = this.adjLists.head;element != null;element = element.next) {
            if(this.match(data1,element.data.vertex)) {
                break;
            }
        }
        if(element == null) {
            return -1;
        }
        var edgeNode = new DS.Graph.AdjacentNode(data2,weight);
        if((retval = element.data.adjacent.insert(edgeNode)) != 0) {
            return retval;
        }
        this.ecount++;
        return 0;
    },
    rem_vertex : function (data) {
        var element,temp,prev,adjListNode,found = false;
        prev = null;
        found = 0;
        for(element = this.adjLists.head;element != null;element = element.next) {
            var adjacentNode = new DS.AdjacentNode(data,0);
            if(element.data.adjacent.is_member(adjacentNode)) {
                return -1;
            }
            if(this.match(data,element.data.vertex)){
                temp = element;
                found = true;
            }
            if(!found) {
                prev = element;
            }
        }
        if(!found) {
            return -1;
        }
        if(temp.data.adjacent.size() > 0) {
            return -1;
        }
        try {
            adjListNode = this.adjLists.rem_next(prev);
        }catch(Error) {
            return -1;
        }
        this.free(adjListNode);
        this.vcount--;
        return 0;
    },
    rem_edge : function (data1,data2) {
        var element,member;
        for(element = this.adjLists.head;element != null;element =element.next) {
            if(this.match(data1,element.data.vertex)) {
                break;
            }
        }
        if(element == null) {
            return -1;
        }
        var adjacentNode = new DS.Graph.AdjacentNode(data2,0);
        if(element.data.adjacent.remove(adjacentNode)!=0){
            return -1;
        }
        this.ecount--;
        return -0;
    },
    adjList : function (data) {
        var element;
        for(element = this.adjLists.head;element!=null;element=element.next){
            if(this.match(data,element.data.vertex)) {
                break;
            }
        }
        if(element == null) {
            return -1;
        }
        return element.data.adjacent;
    },
    is_adjacent : function (data1,data2) {
        var element,member;
        for(element= this.adjLists.head;element != null;element = element.next){
            if(this.match(data1,element.data.vertex)) {
                break;
            }
        }
        if(element == null) {
            return false;
        }
        var adjacentNode = new DS.Graph.AdjacentNode(data2,0);
        return element.adjacent.is_member(adjacentNode);
    }
};
DS.Graph.AdjListNode = function (match) {
    this.vertex = null;
    var setMatch = function (a,b) {
        return match(a.vertex, b.vertex);
    };
    this.adjacent = new DS.Set(setMatch);
};
DS.Graph.AdjListNode.prototype = {
    constructor : DS.Graph.AdjList
};
DS.Graph.AdjacentNode = function (vertex,weight) {
    this.vertex = vertex;
    this.weight = weight;
};
DS.Graph.AdjacentNode.prototype = {
    constructor: DS.Graph.AdjacentNode
}