/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-26
 * Time: 下午4:45
 * To change this template use File | Settings | File Templates.
 */
DS.CircularList = function (destroy) {
    this.head = null;
    this.length = 0;
    this.destroyMethod = function () {
        var iterator = this.head;
        while(iterator != null){
            var curElmt = iterator;
            iterator = iterator.next;
            curElmt.data = null;
            curElmt.next = null;
        }
        this.head = null;
        this.length = 0;
    };
    if(destroy instanceof  Function) {
        this.destroyMethod = destroy;
    }
};
DS.CircularList.prototype = {
    constructor : DS.CircularList,
    /**
     * destroy
     * @description Destroys the linked list specified by list. No other operations are permitted after calling list_destroy unless list_init is called again. The list_destroy operation removes all elements from a linked list and calls the function passed as destroy to list_init once for each element as it is removed, provided destroy was not set to NULL.
     */
    destroy : function () {
        this.destroyMethod();
    },
    /**
     * ins_next
     * @param element
     * @param data
     * @return 0if inserting the element is successful, or -1 otherwise.
     * @description Inserts an element just after element in the circular list specified by list. When inserting into an empty list, element may point anywhere but should be NULL to avoid confusion. The new element contains a pointer to data, so the memory referenced by data should remain valid as long as the element remains in the list. It is the responsibility of the caller to manage the storage associated with data.
     */
    ins_next : function (element,data) {
        var node = new DS.CircularList.Node();
        node.data = data;
        if(this.length == 0) {
            node.next = node;
            this.head = node
        } else {
            node.next = element.next;
            element.next=  node;
        }
        this.length++;
        return 0;
    },
    /**
     * rem_next
     * @param element
     * @return Data stored in the remove element
     * @throws Error
     * @description Removes the element just after element from the circular list specified by list. Upon return, data points to the data stored in the element that was removed. It is the responsibility of the caller to manage the storage associated with the data.
     */
    rem_next : function (element) {
        if(this.length == 0) {
             throw new Error('the list is empty.');
        }
        var data = element.next.data;
        if(element.next = element) {
            this.head = null;
        } else {
            if(element.next == this.head) {
                this.head = element.next.next;
            }
            element.next = element.next.next;
        }
        this.length--;
        return data;
    },
    /**
     * size
     * @return Number of elements in the list.
     * @description Macro that evaluates to the number of elements in the circular list specified by list.
     */
    size : function () {
        return this.length;
    }
};
DS.CircularList.Node = function () {
    this.next = null;
    this.data = null;
};
DS.CircularList.Node.prototype = {
    constructor: DS.CircularList.Node
};
