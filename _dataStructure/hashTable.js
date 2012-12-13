/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-27
 * Time: 下午12:42
 * To change this template use File | Settings | File Templates.
 */
DS.HashTable = function (h,buckets,match,destroy) {
    this.h = h;
    this.table = [];
    this.buckets = buckets;
    for(var i=0;i<buckets;i++) {
        this.table[i] = new DS.LinkedList(destroy);
    }
    this.match = match;
    this.length = 0;
};
DS.HashTable.prototype = {
    constructor : DS.HashTable,
    /**
     * destroy
     * @description Destroys the chained hash table specified by htbl. No other operations are permitted after calling chtbl_destroy unless chtbl_init is called again. The chtbl_destroy operation removes all elements from a hash table and calls the function passed as destroy to chtbl_init once for each element as it is removed, provided destroy was not set to NULL.
     */
    destroy : function () {
        var table = this.table;
        for(var i=0;i<this.buckets;i++) {
            table[i].destroy();
            table[i] = null;
        }
        this.table = [];
    },
    /**
     * insert
     * @param data
     * @return 0if inserting the element is successful, 1 if the element is already in the hash table, or -1 otherwise.
     * @description Inserts an element into the chained hash table specified by htbl. The new element contains a pointer to data, so the memory referenced by data should remain valid as long as the element remains in the hash table. It is the responsibility of the caller to manage the storage associated with data.
     */
    insert : function (data) {
        var bucket,retval,table = this.table;
        if(this.lookup(data) != false) {
            return 1;
        }
        bucket = this.h(data) % this.buckets;
        if(retval = table[bucket].ins_next(null,data) == 0) {
            this.length++;
        }
        return retval;
    },
    /**
     *  remove
     * @param data
     * @return Data stored in the element that was removed.
     * @throws Error
     * @description Removes the element matching data from the chained hash table specified by htbl. Upon return, data points to the data stored in the element that was removed. It is the responsibility of the caller to manage the storage associated with the data.
     */
    remove : function (data) {
        var bucket = this.h(data) % this.buckets,
            prev = null,
            table = this.table,
            match = this.match;
        for(var element = table[bucket].head;element != null;element = element.next) {
            if(match (data,element.data)) {
                this.length--;
                return table[bucket].rem_next(prev);
            }
            prev = element;
        }
        throw new Error('Data is not found in the hash table.');
    },
    /**
     * lookup
     * @param data
     * @return false if the element is not found in the hash table, an pointer to the element if found in the hash table
     * @description Determines whether an element matches data in the chained hash table specified by htbl. If a match is found, data points to the matching data in the hash table upon return.
     */
    lookup : function (data) {
        var bucket = this.h(data) % this.buckets,
            table = this.table,
            match = this.match;
        for(var element = table[bucket].head;element!= null;element = element.next){
            if(match(data,element.data)) {
                return element;
            }
        }
        return false;
    },
    /**
     * size
     * @return Number of elements in the hash table.
     * @description Macro that evaluates to the number of elements in the chained hash table specified by htbl.
     */
    size : function () {
        return this.length;
    }
};
DS.HashTable.hashpjw = function (key) {
    var val = 0;
    var i = 0;
    while (i < key.length) {
        var tmp;
        if((val & 0x8000000) == 0x8000000) {
            val = val & 0xF7FFFFFF;
        }
        val = (val << 4) + key.charCodeAt(i);
        if(tmp = (val & 0xf0000000)) {
            val = val^ (tmp >> 24);
            val = val^ tmp;
        }
        i++;
    }
    return val;
};