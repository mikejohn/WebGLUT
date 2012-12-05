/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-26
 * Time: 下午3:55
 * To change this template use File | Settings | File Templates.
 */
DS.DoublyLinkedList = function (destroy) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.destroyMethod = function () {
        var iterator = this.head;
        while(!this.is_tail(iterator)){
            var curElmt = iterator;
            iterator = iterator.next;
            curElmt.data = null;
            curElmt.next = null;
            curElmt.prev = null;
        }
        this.tail.data = null;
        this.tail.prev = null;
        this.tail = null;
        this.head = null;
        this.length = 0;
    };
    if(destroy instanceof  Function) {
        this.destroyMethod = destroy;
    }
};
DS.DoublyLinkedList.prototype = {
    constructor : DS.DoublyLinkedList,
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
     * @return 0 if inserting the element is successful, or -1 otherwise.
     * @description Inserts an element just after element in the doubly-linked list specified by list. When inserting into an empty list, element may point anywhere, but should be NULL to avoid confusion. The new element contains a pointer to data, so the memory referenced by data should remain valid as long as the element remains in the list. It is the responsibility of the caller to manage the storage associated with data.
     */
    ins_next : function (element,data) {
        var node = new DS.DoublyLinkedList.Node();
        node.data = data;
        // Do not allow a NULL element unless the list is empty.
        if(element == null && this.length != 0) {
            return -1;
        }
        if(this.length == 0 ) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = element.next;
            node.prev = element;
            element.next = node;
            if(node.next == null) {
                this.tail = node;
            } else {
                node.next.prev = node;
            }
        }
        this.length ++;
        return 0;
    },
    /**
     * ins_prev
     * @param element
     * @param data
     * @return 0 if inserting the element is successful, or -1 otherwise.
     * @description Inserts an element just before element in the doubly-linked list specified by list. When inserting into an empty list, element may point anywhere, but should be NULL to avoid confusion. The new element contains a pointer to data, so the memory referenced by data should remain valid as long as the element remains in the list. It is the responsibility of the caller to manage the storage associated with data.
     */
    ins_prev : function (element,data) {
        var node = new DS.DoublyLinkedList.Node();
        node.data = data;
        if(element == null && this.length != 0) {
            return -1;
        }
        if(this.length == 0) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = element;
            node.prev = element.prev;
            element.prev = node;
            if(node.prev == null) {
                this.head = node;
            } else {
                node.prev.next = node;
            }
        }
        this.length ++;
        return 0;
    },
    /**
     * remove
     * @param element
     * @return Data stored in the remove element
     * @description Removes the element specified as element from the doubly-linked list specified by list. Upon return, data points to the data stored in the element that was removed. It is the responsibility of the caller to manage the storage associated with the data.
     */
    remove : function (element) {
        if(element == null || this.length == 0) {
            throw new Error("element is null or list is empty");
        }
        var data = element.data;
        if(element == this.head) {
            this.head = element.next;
            if(this.head == null) {
                this.tail = null;
            } else {
                element.next.prev = null;
            }
        } else {
            element.prev.next = element.next;
            if(element.next == null) {
                this.tail = element.prev;
            } else {
                element.next.prev = element.prev;
            }
        }
        this.length--;
        return data;
    },
    /**
     * size
     * @return Number of elements in the list.
     * @description Macro that evaluates to the number of elements in the doubly-linked list specified by list.
     */
    size : function () {
        return this.length;
    },
    /**
     * is_head
     * @param element
     * @return true if the element is at the head of the list, or false otherwise.
     */
    is_head : function (element) {
        return this.head == element;
    },
    /**
     * is_tail
     * @param element
     * @return true if the element is at the tail of the list, or otherwise.
     */
    is_tail : function (element) {
        return this.tail == element;
    }
};
DS.DoublyLinkedList.Node = function () {
    this.prev = null;
    this.next = null;
    this.data = null;
};
DS.DoublyLinkedList.Node.prototype = {
    constructor:DS.DoublyLinkedList.Node
};
