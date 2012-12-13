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
       var element,adjList,retval;
       for(element = this.adjLists.head;element != null;element = element.next) {
           if(this.match(data,element.data.vertex)) {
               return 1;
           }
       }
       adjList = new DS.Graph.AdjList(this.match);
       adjList.vertex = data;
       if((retval = this.adjLists.ins_next(this.adjLists.tail,adjList)) !=0) {
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
        if((retval = element.data.adjacent.insert(data2)) != 0) {
            return retval;
        }
        if(weight != undefined) {
            for(var member = element.data.adjacent.list.head;member!= null;member = member.next) {
                if(member.data === data2) {
                    member.weight = weight;
                }
            }
        }
        this.ecount++;
        return 0;
    },
    rem_vertex : function (data) {
        var element,temp,prev,adjList,found = false;
        prev = null;
        found = 0;
        for(element = this.adjLists.head;element != null;element = element.next) {
            if(element.data.adjacent.is_member(data)) {
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
            adjList = this.adjLists.rem_next(prev)
        }catch(Error) {
            return -1;
        }
        this.free(adjList);
        this.vcount--;
        return 0;
    },
    rem_edge : function (data1,data2) {
        var element;
        for(element = this.adjLists.head;element != null;element =element.next) {
            if(this.match(data1,element.data.vertex)) {
                break;
            }
        }
        if(element == null) {
            return -1;
        }
        if(element.data.adjacent.remove(data2)!=0) {
            return -1;
        }
        this.ecount--;
        return 0
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
        var element,prev;
        prev = null;
        for(element= this.adjLists.head;element != null;element = element.next){
            if(this.match(data1,element.data.vertex)) {
                break;
            }
            prev = element;
        }
        if(element == null) {
            return false;
        }
        return element.data.adjacent.is_member(data2);
    }
};
DS.Graph.AdjList = function (match) {
    this.vertex = null;
    this.adjacent = new DS.Set(match);
};
DS.Graph.AdjList.prototype = {
    constructor : DS.Graph.AdjList
};