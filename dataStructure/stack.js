/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-26
 * Time: 下午5:08
 * To change this template use File | Settings | File Templates.
 */
DS.Stack = function (destroy) {
    this.list = new DS.DoublyLinkedList(destroy);
};
DS.Stack.prototype = {
    constructor : DS.Stack,
    /**
     * destroy
     * @description Destroys the stack specified by stack. No other operations are permitted after calling stack_destroy unless stack_init is called again. The stack_destroy operation removes all elements from a stack and calls the function passed as destroy to stack_init once for each element as it is removed, provided destroy was not set to NULL.
     */
    destroy : function () {
        this.list.destroy();
    },
    /**
     * push
     * @param data
     * @return 0 if pushing the element is successful, or -1 otherwise.
     * @description Pushes an element onto the stack specified by stack. The new element contains a pointer to data, so the memory referenced by data should remain valid as long as the element remains in the stack. It is the responsibility of the caller to manage the storage associated with data.
     */
    push : function (data) {
        return this.list.ins_next(this.list.tail,data);
    },
    /**
     * pop
     * @return data stored in the element that was popped
     * @description Pops an element off the stack specified by stack. Upon return, data points to the data stored in the element that was popped. It is the responsibility of the caller to manage the storage associated with the data.
     */
    pop : function () {
        return this.list.remove(this.list.tail);
    },
    /**
     * peek
     * @return Data stored in the element at the top of the stack, or NULL if the stack is empty.
     * @description Macro that evaluates to the data stored in the element at the top of the stack specified by stack.
     */
    peek : function () {
        return this.list.tail.data;
    },
    /**
     * size
     * @return Number of elements in the stack.
     * @description Macro that evaluates to the number of elements in the stack specified by stack.
     */
    size : function () {
        return this.list.length;
    }
};