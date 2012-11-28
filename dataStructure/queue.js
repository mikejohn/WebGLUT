/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-27
 * Time: 上午9:59
 * To change this template use File | Settings | File Templates.
 */
DS.Queue = function (destroy) {
    this.list = new DS.LinkdList(destroy);
};
DS.Queue.prototype = {
    constructor : DS.Queue,
    /**
     * destroy
     * @description Destroys the queue specified by queue. No other operations are permitted after calling queue_destroy unless queue_init is called again. The queue_destroy operation removes all elements from a queue and calls the function passed as destroy to queue_init once for each element as it is removed, provided destroy was not set to NULL.
     */
    destroy : function () {
        this.list.destroy();
    },
    /**
     * enqueue
     * @param data
     * @return 0if enqueuing the element is successful, or -1 otherwise.
     * @description Enqueues an element at the tail of the queue specified by queue. The new element contains a pointer to data, so the memory referenced by data should remain valid as long as the element remains in the queue. It is the responsibility of the caller to manage the storage associated with data.
     */
    enqueue : function (data) {
        return this.list.ins_next(this.list.tail,data);
    },
    /**
     * dequeue
     * @return Data stored in the element that was dequeued.
     * @description Dequeues an element from the head of the queue specified by queue. Upon return, data points to the data stored in the element that was dequeued. It is the responsibility of the caller to manage the storage associated with the data.
     */
    dequeue : function () {
        return this.list.rem_next(null);
    },
    /**
     * peek
     * @return Data stored in the element at the head of the queue, or NULL if the queue is empty.
     * @description Macro that evaluates to the data stored in the element at the head of the queue specified by queue.
     */
    peak : function () {
        return this.list.head.data;
    },
    /**
     * size
     * @return Number of elements in the queue.
     * @description Macro that evaluates to the number of elements in the queue specified by queue.
     */
    size : function () {
        return this.list.length;
    }
};
