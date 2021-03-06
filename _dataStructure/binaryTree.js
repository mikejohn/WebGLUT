/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-11-27
 * Time: 下午2:34
 * To change this template use File | Settings | File Templates.
 */
DS.BinaryTree = function (destroy,free) {
    this.root = null;
    this.length = 0;
    this.destroyMethod = function () {
        if(this.root == null) {
            return;
        }
        this.rem_left(this.root)
        this.rem_right(this.root);
        this.root.data = null;
        this.root = null
        this.length = 0;
    };
    if(destroy != undefined) {
        this.destroyMethod = destroy;
    }
    this.freeMethod = null;
    if(free != undefined) {
        this.freeMethod = free;
    }
};
DS.BinaryTree.prototype = {
    constructor: DS.BinaryTree,
    /**
     * destroy
     * @description Destroys the binary tree specified by tree. No other operations are permitted after calling bitree_destroy unless bitree_init is called again. The bitree_destroy operation removes all nodes from a binary tree and calls the function passed as destroy to bitree_init once for each node as it is removed, provided destroy was not set to NULL.
     */
    destroy : function () {
        this.destroyMethod()
    },
    /**
     * free
     */
    free : function (data) {
        if(this.freeMethod != null) {
            this.freeMethod(data);
        }
    },
    /**
     * ins_left
     * @param node
     * @param data
     * @return 0if inserting the node is successful, or -1 otherwise.
     * @description Inserts a node as the left child of node in the binary tree specified by tree. If node already has a left child, bitree_ins_left returns -1. If node is NULL, the new node is inserted as the root node. The tree must be empty to insert a node as the root node; otherwise, bitree_ins_left returns -1. When successful, the new node contains a pointer to data, so the memory referenced by data should remain valid as long as the node remains in the binary tree. It is the responsibility of the caller to manage the storage associated with data.
     */
    ins_left : function (node,data) {
        var new_node = new DS.BinaryTree.Node();
        new_node.data = data;
        if( node == null) {
            if(this.length > 0) {
                return -1;
            }
            this.root = new_node;
        } else {
            if(node.left != null) {
                return -1;
            }
            node.left = new_node;
        }
        this.length ++;
        return 0;
    },
    /**
     * ins_right
     * @param node
     * @param data
     * @return 0if inserting the node is successful, or -1 otherwise.
     * @description This operation is similar to bitree_ins_left, except that it inserts a node as the right child of node in the binary tree specified by tree.
     */
    ins_right : function (node,data) {
        var new_node = new DS.BinaryTree.Node();
        new_node.data = data;
        if( node == null) {
            if(this.length > 0) {
                return -1;
            }
            this.root = new_node;
        } else {
            if(node.right != null) {
                return -1;
            }
            node.right = new_node;
        }
        this.length ++;
        return 0;
    },
    /**
     * rem_left
     * @param node
     * @description Removes the subtree rooted at the left child of node from the binary tree specified by tree. If node is NULL, all nodes in the tree are removed. The function passed as destroy to bitree_init is called once for each node as it is removed, provided destroy was not set to NULL.
     */
    rem_left : function (node) {
        if(this.length == 0) {
            return;
        }
        if(node == null) {
            if(this.root != null) {
                this.rem_left(this.root);
                this.rem_right(this.root);
                this.free(this.root.data);
                this.root.data = null;
                this.root.left = null;
                this.root.right = null;
                this.root = null;
                this.length --;
            }
        } else {
            if(node.left != null) {
                this.rem_left(node.left);
                this.rem_right(node.left);
                this.free(node.left.data);
                node.left.data = null;
                node.left.left = null;
                node.left.right = null;
                node.left = null;
                this.length --;
            }
        }
        return;
    },
    /**
     * rem_right
     * @param node
     * @description This operation is similar to bitree_rem_left, except that it removes the subtree rooted at the right child of node from the binary tree specified by tree.
     */
    rem_right : function (node) {
        var position = null;
        if(this.length == 0) {
            return;
        }
        if(node == null) {
            if(this.root != null) {
                this.rem_left(this.root);
                this.rem_right(this.root);
                this.free(this.root.data);
                this.root.data = null;
                this.root.left = null;
                this.root.right = null;
                this.root = null;
                this.length --;
            }
        } else {
            if(node.right != null) {
                this.rem_left(node.right);
                this.rem_right(node.right);
                this.free(node.right.data);
                node.right.data = null;
                node.right.left = null;
                node.right.right = null;
                node.right = null;
                this.length --;
            }
        }
        return;
    },
    /**
     * merge
     * @param node
     * @param left
     * @param right
     * @param data
     * @return 0if merging the trees is successful, or -1 otherwise.
     * @description Merges the two binary trees specified by left and right into the single binary tree merge. After merging is complete, merge contains data in its root node, and left and right are the left and right subtrees of its root. Once the trees have been merged, left and right are as if bitree_destroy had been called on them.
     */
    merge : function (left,right,data) {
        if(this.length > 0) {
            return -1;
        }
        if(this.ins_left(this.root,data) != 0) {
            return -1;
        }
        this.root.left = left.root;
        this.root.right = right.root;
        this.length = this.length+left.length +right.length;
        return 0;
    },
    /**
     * size
     * @return Number of nodes in the tree.
     * @description Macro that evaluates to the number of nodes in the binary tree specified by tree.
     */
    size : function () {
        return this.length;
    },
    /**
     * is_leaf
     * @return true if the node is a leaf node, or false otherwise.
     * @description Macro that determines whether the node specified as node is a leaf node in a binary tree.
     */
    is_leaf : function (node) {
        if(node.left == null && node.right == null) {
            return true;
        } else {
            return false;
        }
    }
};
DS.BinaryTree.Node = function () {
    this.data = null;
    this.left = null;
    this.right = null;
};
DS.BinaryTree.Node.prototype = {
    constructor: DS.BinaryTree.Node
};