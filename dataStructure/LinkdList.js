/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-26
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */
/**
 * Class DS.SingleLink
 * @constructor DS.SingleLink
 * @param destroy  The destroy argument provides a way to free dynamically allocated data when list_destroy is called.
 */
DS.LinkdList = function (destroy) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.destroyMethod = function (){
        var iterator = this.head;
        while(!this.is_tail(iterator)){
            var curElmt = iterator;
            iterator = iterator.next;
            curElmt.data = null;
            curElmt.next = null;
        }
        this.tail.data = null;
        this.tail = null;
        this.head = null;
        this.length = 0;
    };
    if(destroy instanceof  Function) {
        this.destroyMethod = destroy;
    }
};
DS.LinkdList.prototype = {
    constructor:DS.LinkdList,
    /**
     * destroy
     * @description Destroys the linked list specified by list. No other operations are permitted after calling list_destroy unless list_init is called again. The list_destroy operation removes all elements from a linked list and calls the function passed as destroy to list_init once for each element as it is removed, provided destroy was not set to NULL.
     */
    destroy:function () {
        this.destroyMethod();
    },
    /**
     * ins_next
     * @param element 指定链表内元素
     * @param data 插入数据
     * @return 0 if inserting the element is successful, or -1 otherwise.
     * @description Inserts an element just after element in the linked list specified by list. If element is NULL, the new element is inserted at the head of the list. The new element contains a pointer to data, so the memory referenced by data should remain valid as long as the element remains in the list. It is the responsibility of the caller to manage the storage associated with data.
     */
    ins_next:function (element, data) {
        var node = new DS.LinkdList.Node;
        node.data = data;
        if(element == null) {
            if( this.length ==0) {
                this.tail = node;
            }
            node.next = this.head;
            this.head = node;
        } else {
            if(element.next == null) {
                this.tail = node;
            }
            node.next = element.next;
            element.next = node;
        }
        this.length++;
        return 0;
    },
    /**
     * rem_next
     * @param element
     * @return Data stored in the remove element.
     * @throws Error element.next is null.
     * @description Removes the element just after element from the linked list specified by list. If element is NULL, the element at the head of the list is removed. Upon return, data points to the data stored in the element that was removed. It is the responsibility of the caller to manage the storage associated with the data.
     */
    rem_next:function (element) {
        if(this.length == 0) {
            throw new Error('list is empty');
        }
        var data;
        if(element == null) {
            data = this.head.data;
            this.head = this.head.next;
            if(this.length == 1) {
                this.tail = null;
            }
        } else {
            if(element.next == null) {
                throw new Error('element is the tail fo the list.');
            }
            data = element.next.data;
            element.next = element.next.next;
            if(element.next == null) {
                this.tail = element;
            }
        }
        this.length--;
        return data;
    },
    /**
     * size
     * @return Number of elements in the list.
     * @description Macro that evaluates to the number of elements in the linked list specified by list.
     */
    size:function () {
        return this.length;
    },
    /**
     * is_head
     * @param element
     * @return true if the element is at the head of the list, or otherwise.
     * @description Macro that determines whether the element specified as element is at the head of a linked list.
     */
    is_head:function (element) {
        return this.head == element;
    },
    /**
     * is_tail
     * @param element
     * @return 1 if the element is at the tail of the list, or otherwise.
     * @desciption Macro that determines whether the element specified as element is at the tail of a linked list.
     */
    is_tail:function (element) {
        return this.tail == element;
    }
};
/**
 * Class SingleLink.LinkNode
 * @constructor DS.SingleLink.LinkNode
 */
DS.LinkdList.Node = function () {
    this.next = null;
    this.data = null;
};
DS.LinkdList.Node.prototype = {
    constructor:DS.LinkdList.Node
};