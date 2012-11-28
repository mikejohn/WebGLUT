/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-27
 * Time: 上午10:11
 * To change this template use File | Settings | File Templates.
 */
DS.Set = function (match,destroy) {
    this.list = new DS.LinkdList(destroy);
    this.matcn = match;
};
DS.Set.prototype = {
    constructor : DS.Set,
    /**
     * destroy
     * @description Destroys the set specified by set. No other operations are permitted after calling set_destroy unless set_init is called again. The set_destroy operation removes all members from a set and calls the function passed as destroy to set_init once for each member as it is removed, provided destroy was not set to NULL.
     */
    destroy : function () {
       this.list.destroy();
    },
    /**
     * insert
     * @param data
     * @return 0if inserting the member is successful, 1 if the member is already in the set, or -1 otherwise.
     * @description Inserts a member into the set specified by set. The new member contains a pointer to data, so the memory referenced by data should remain valid as long as the member remains in the set. It is the responsibility of the caller to manage the storage associated with data.
     */
    insert : function (data) {
        if(this.is_member(data)) {
            return 1;
        }
        return this.list.ins_next(this.list.tail,data);
    },
    /**
     * remove
     * @param data
     * @return Data stored in the member that was removed.
     * @throws Error
     * @description Removes the member matching data from the set specified by set. Upon return, data points to the data stored in the member that was removed. It is the responsibility of the caller to manage the storage associated with the data.
     */
    remove : function (data) {
        var prev = null,member = null;
        for(member = list.head;member != null;member = member.next) {
            if(this.match(member.data ,data)) {
                break;
            }
            prev = member;
        }
        if(member == null) {
            return -1;
        }
        return this.list.rem_next(prev);
    },
    /**
     * union
     * @param set
     * @param setu
     * @return 0if computing the union is successful, or -1 otherwise.
     * @description Builds a set that is the union of this own set,set1 and gavin set,set2. Upon return, setu contains the union. Because setu points to data in set1 and set2, the data in set1 and set2 must remain valid until setu is destroyed with set_destroy.
     */
    union : function (set,setu) {
        var swap = false;
        if(setu == null) {
            setu = new DS.Set(this.list.destroyMethod);
            swap = true;
        }
        for(var member = this.list.head;member != null;member = member.next) {
            if(setu.insert(member.data) != 0) {
                setu.destroy();
                return -1;
            }
        }

        for(var member = set.head;member != null;member = member.next) {
            if(setu.is_member(data)) {
                continue;
            } else {
                if(setu.insert(member.data) != 0) {
                    setu.destroy();
                    return -1;
                }
            }
        }
        if(swap) {
            this.list.destroy();
            this.list = setu.list;
            setu = null;
        }
        return 0;
    },
    /**
     * intersection
     * @param set
     * @param setu
     * @return 0if computing the intersection is successful, or -1 otherwise.
     * @description Builds a set that is the intersection of set1 and set2. Upon return, seti contains the intersection. Because seti points to data in set1, the data in set1 must remain valid until seti is destroyed with set_destroy.
     */
    intersection : function (set,setu) {
        var swap = false;
        if(setu == null) {
            swap = true;
            setu = new DS.Set();
        }
        for(var member = this.list.head;member != null;member = member.next) {
            if(set.is_member(member)) {
                if(setu.insert(member.data) !=0) {
                    setu.destroy();
                    return -1;
                }
            }
        }
        if(swap) {
            this.list.destroy();
            this.list = setu.list;
            setu = null;
        }
        return 0;

    },
    /**
     * difference
     * @param set
     * @param setu
     * @return 0if computing the difference is successful, or -1 otherwise.
     * @description Builds a set that is the difference of set1 and set2. Upon return, setd contains the difference. Because setd points to data in set1, the data in set1 must remain valid until setd is destroyed with set_destroy.
     */
    difference : function (set,setu) {
        var swap = false;
        if(setu == null) {
            swap = true;
            setu = new DS.Set();
        }
        for(var member = this.list.head;member != null;member = member.next) {
            if(!set.is_member(member.data)) {
                if(setu.insert(member.data) != 0) {
                    return -1;
                }
            }
        }
        if(swap) {
            this.list.destroy();
            this.list = setu.list;
            setu = null;
        }
        return 0;
    },
    /**
     * is_member
     * @param data
     * @return true if the member is found, or otherwise.
     * @description Determines whether the data specified by data matches that of a member in the set specified by set.
     */
    is_member : function (data) {
        for(var member = this.list.head;member != null;member = member.next) {
            if(this.matcn(data ,member.data)) {
                return true;
            }
        }
        return false;
    },
    /**
     * is_subset
     * @param set
     * @return true if the set is a subset, or otherwise.
     * @description Determines whether the set specified by set1 is a subset of the set specified by set2.
     */
    is_subset : function (set) {
        if(set.size() > this.list.length) {
            return false;
        }
        for(var member = set.list.head;member != null;member = member.next) {
            if(!this.is_member(member.data)) {
                return false;
            }
        }
        return true;
    },
    /**
     * is_equal
     * @param set
     * @return 1 if the two sets are equal, or otherwise.
     * @description Determines whether the set specified by set1 is equal to the set specified by set2.
     */
    is_equal : function (set) {
        if(set.size() != this.list.length){
            return false;
        }
        return this.is_subset(set);
    },
    /**
     * size
     * @return Number of members in the set.
     * @description Macro that evaluates to the number of members in the set specified by set.
     */
    size : function () {
        return this.list.length;
    }
};