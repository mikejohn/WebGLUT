/**
 * Created with JetBrains WebStorm.
 * User: MikeZhang
 * Date: 12-12-5
 * Time: 上午11:02
 * To change this template use File | Settings | File Templates.
 */
/**
 * @class DS.BinarySearchTree
 * @param compare 比较方法
 * @param free  删除数据时，对数据的处理方法
 * @constructor DS.BinarySearchTree
 */
DS.BinarySearchTree = function (compare,destroy,free) {
    this.root = null;
    this.length = 0;
    this.compare = compare;
    this.freeMethod = free;
    this.destroyMethod = function () {
        this._destroy_left(this.root);
    };
    if(destroy != undefined) {
        this.destroyMethod = destroy;
    }
};
DS.BinarySearchTree.prototype = {
    constructor: DS.BinarySearchTree,
    free : function (data) {
      if(this.freeMethod != null) {
          this.freeMethod(data);
      }
    },
    destroy : function () {
        this.destroyMethod();
    },
    _destroy_left : function (node) {
        if(this.length==0) {
            return;
        }
        if(node == null) {
           if(this.root != null) {
               this._destroy_left(this.root);
               this._destroy_right(this.root);
               this.root.left = null;
               this.root.right = null;
               this.free(this.root);
               this.root.data = null;
               this.root = null;
               this.length--;
           }
        } else {
            if(node.left != null){
                this._destroy_left(node.left);
                this._destroy_right(node.left);
                node.left.left = null;
                node.left.right = null;
                this.free(node.left.data);
                node.left.data = null;
                node.left = null;
                this.length--;
            }
        }
    },
    _destroy_right : function (node) {
        if(this.length==0) {
            return;
        }
        if(node == null) {
            if(this.root != null) {
                this._destroy_left(this.root);
                this._destroy_right(this.root);
                this.root.left = null;
                this.root.right = null;
                this.free(this.root);
                this.root.data = null;
                this.root = null;
                this.length--;
            }
        } else {
            if(node.right != null){
                this._destroy_left(node.right);
                this._destroy_right(node.right);
                node.right.left = null;
                node.right.right = null;
                this.free(node.right.data);
                node.right.data = null;
                node.right = null;
                this.length--;
            }
        }
    },
    /**
     * insert
     * @param data
     * @return 0 if inserting the node is successful, 1 if the node is already in the tree, or -1 otherwise.
     * @description Inserts a node into the binary search tree specified by tree. The new node contains a pointer to data, so the memory referenced by data should remain valid as long as the node remains in the binary search tree. It is the responsibility of the caller to manage the storage associated with data.
     */
    insert : function (data) {
        this._insert(this.root,data);
    },
    _insert : function (node,data,balanced) {
        if(balanced == undefined) {
            balanced = {};
        }
        var AvlNode,cmpval,retval;
        if(node == null) {
            AvlNode = new DS.BinarySearchTree.Node();
            AvlNode.factor = DS.BinarySearchTree.AVL_BALANCED;
            AvlNode.hidden = 0;
            AvlNode.data = data;
            return this._ins_left(node,AvlNode)
        } else {
            cmpval = this.compare(data, node.data);
            if(cmpval < 0) {
                if(node.left == null) {
                    AvlNode = new DS.BinarySearchTree.Node();
                    AvlNode.factor = DS.BinarySearchTree.AVL_BALANCED;
                    AvlNode.hidden = 0;
                    AvlNode.data = data;
                    if(this._ins_left(node,AvlNode)!=0) {
                        return -1;
                    }
                    balanced.b = false;
                } else {
                    if(retval = this._insert(node.left,data,balanced) != 0) {
                        return retval;
                    }
                }
                if(!balanced.b) {
                    switch (node.factor) {
                        case DS.BinarySearchTree.AVL_LFT_HEAVY:
                            this._rotate_left(node);
                            balanced.b = true;
                            break;
                        case DS.BinarySearchTree.AVL_BALANCED:
                            node.factor = DS.BinarySearchTree.AVL_LFT_HEAVY;
                            break;
                        case DS.BinarySearchTree.AVL_RGT_HEAVY:
                            node.factor = DS.BinarySearchTree.AVL_BALANCED;
                            balanced.b = true;
                    }
                }
            } else if(cmpval > 0) {
                if(node.right == null) {
                    AvlNode = new DS.BinarySearchTree.Node();
                    AvlNode.factor = DS.BinarySearchTree.AVL_BALANCED;
                    AvlNode.hidden = 0;
                    AvlNode.data = data;
                    if(this._ins_right(node,AvlNode)!=0) {
                        return -1;
                    }
                    balanced.b = false;
                } else {
                    if(retval = this._insert(node.right,data,balanced)!=0) {
                        return retval;
                    }
                }
                if(!balanced.b) {
                    switch(node.factor) {
                        case DS.BinarySearchTree.AVL_LFT_HEAVY :
                            node.factor = DS.BinarySearchTree.AVL_BALANCED;
                            balanced.b = true;
                            break;
                        case DS.BinarySearchTree.AVL_BALANCED:
                            node.factor = DS.BinarySearchTree.AVL_RGT_HEAVY;
                            break;
                        case DS.BinarySearchTree.AVL_RGT_HEAVY:
                            this._rotate_right(node);
                            balanced.b = true;
                    }
                }
            } else {
                if(!node.hidden) {
                    return 1;
                } else {
                    this.free(node.data);
                    node.data = data;
                    node.hidden = 0;
                }
                balanced.b = true;
            }
        }
        return 0;
    },
    _ins_left : function (node,new_node) {
        if( node == null) {
            if(this.length > 0) {
                return -1;
            }
            this.root = new_node;
            new_node.parent = null;
        } else {
            if(node.left != null) {
                return -1;
            }
            node.left = new_node;
            new_node.parent = node;
        }
        this.length ++;
        return 0;
    },
    _ins_right : function (node,new_node) {
        if( node == null) {
            if(this.length > 0) {
                return -1;
            }
            this.root = new_node;
            new_node.parent = null;
        } else {
            if(node.right != null) {
                return -1;
            }
            node.right = new_node;
            new_node.parent = node;
        }
        this.length ++;
        return 0;
    },
    _rotate_left : function (node) {
        var left,grandchild;
        left = node.left;
        if(left.factor == DS.BinarySearchTree.AVL_LFT_HEAVY) {
            this._changePoint(node,left);
            node.left = left.right;
            if(left.right != null) left.right.parent = node;
            left.right = node;
            node.parent = left;
            node.factor = DS.BinarySearchTree.AVL_BALANCED;
            left.factor = DS.BinarySearchTree.AVL_BALANCED;
            node = left;
        } else {
            grandchild = left.right;
            this._changePoint(node,grandchild);
            left.right = grandchild.left;
            if(grandchild.left != null) grandchild.left.parent = left;
            grandchild.left = left;
            if(left!= null) left.parent = grandchild;
            node.left = grandchild.right;
            if(grandchild.right!=null) grandchild.right.parent = node;
            grandchild.right = node;

            switch (grandchild.factor) {
                case DS.BinarySearchTree.AVL_LFT_HEAVY:
                    node.factor = DS.BinarySearchTree.AVL_RGT_HEAVY;
                    left.factor = DS.BinarySearchTree.AVL_BALANCED;
                    break;

                case DS.BinarySearchTree.AVL_BALANCED:
                    node.factor = DS.BinarySearchTree.AVL_BALANCED;
                    left.factor = DS.BinarySearchTree.AVL_BALANCED;
                    break;

                case DS.BinarySearchTree.AVL_RGT_HEAVY:
                    node.factor = DS.BinarySearchTree.AVL_BALANCED;
                    left.factor = DS.BinarySearchTree.AVL_LFT_HEAVY;
                    break;

            }
            grandchild.factor = DS.BinarySearchTree.AVL_BALANCED;
            node = grandchild;
        }
    },
    _rotate_right :function (node) {
        var right,grandchild;
        right = node.right;
        if(right.factor == DS.BinarySearchTree.AVL_RGT_HEAVY) {
            this._changePoint(node,right);
            node.right = right.left;
            if(right.left != null) right.left.parent = node;
            right.left = node;
            node.parent = right;
            node.factor = DS.BinarySearchTree.AVL_BALANCED;
            right.factor = DS.BinarySearchTree.AVL_BALANCED;
            node = right
        } else {
            grandchild = right.left;
            this._changePoint(node,grandchild);
            right.left = grandchild.right;
            if(grandchild.right!=null) grandchild.right.parent = right;
            grandchild.right = right;
            if(right != null) right.parent = grandchild;
            node.right = grandchild.left;
            if(grandchild.left != null) grandchild.left.parent = node;
            grandchild.left = node;
            if(node != null) node.parent = grandchild;

            switch (grandchild.factor) {
                case DS.BinarySearchTree.AVL_LFT_HEAVY:
                    node.factor = DS.BinarySearchTree.AVL_BALANCED;
                    right.factor = DS.BinarySearchTree.AVL_RGT_HEAVY;
                    break;
                case DS.BinarySearchTree.AVL_BALANCED:
                    node.factor = DS.BinarySearchTree.AVL_BALANCED;
                    right.factor = DS.BinarySearchTree.AVL_BALANCED;
                    break;
                case DS.BinarySearchTree.AVL_RGT_HEAVY:
                    node.factor = DS.BinarySearchTree.AVL_LFT_HEAVY;
                    right.factor = DS.BinarySearchTree.AVL_BALANCED;
                    break;
            }
            grandchild.factor = DS.BinarySearchTree.AVL_BALANCED;
            node = grandchild;
        }
        return;
    },
    _changePoint : function (a,b) {
        if(a.parent == null) {
            this.root = b;
            b.parent = null;
            return;
        }
        if(a.parent.left === a ) {
            a.parent.left = b;
            b.parent = a.parent;
            return;
        } else if(a.parent.right ===a) {
            a.parent.right = b;
            b.parent = a.parent;
            return;
        }
    },
    /**
     * remove
     * @param data
     * @return 0if removing the node is successful, or -1 otherwise.
     * @description Removes the node matching data from the binary search tree specified by tree. In actuality, this operation only performs a lazy removal, in which the node is simply marked as hidden. Thus, no pointer is returned to the data matching data. The data in the tree must remain valid even after it has been removed. Consequently, the size of the binary search tree, as returned by bistree_size, does not decrease after removing a node. This approach is explained further in the implementation and analysis section.
     */
    remove : function (data) {
        this._hide(this.root,data);
    },
    _hide : function (node,data) {
        var cmpval,retval;
        if(node == null) {
            return -1;
        }
        cmpval = this.compare(data,node.data);
        if(cmpval < 0) {
            retval = this.hide(node.left,data);
        } else if(cmpval >0) {
            retval = this.hide(node.rigth,data);
        } else {
            this.free(node.data);
            node.data = data;
            node.hidden = 1;
            retval =0;
        }
        return retval;
    },
    /**
     * lookup
     * @param data
     * @return 0if the data is found in the binary search tree, or -1 otherwise.
     * @description Determines whether a node matches data in the binary search tree specified as tree. If a match is found, data points to the matching data in the binary search tree upon return.
     */
    lookup : function (data) {
        this._lookup(this.root,data);
    },
    _lookup : function (node,data) {
        var comval,retval;
        if(node == null) {
            return -1;
        }
        cmpval = this.compare(data,node,data);
        if(cmpval<0) {
            retval = this.lookup(node.left,data);
        } else if(cmpval >0) {
            retval = this.lookup(node.right.data);
        } else {
            if(!node.hidden){
                data = node.data;
                retval = 0;
            }else {
                return -1;
            }
        }
        return retval;
    },
    /**
     * size
     * @return Number of nodes in the tree.
     * @description Macro that evaluates to the number of nodes in the binary search tree specified by tree.
     */
    size : function () {
        return this.length;
    }
};
DS.BinarySearchTree.Node = function () {
    this.data = null;
    this.parent = null;
    this.left = null;
    this.right = null;
    this.factor = null;
    this.hidden = null;
};
DS.BinarySearchTree.Node.prototype = {
   constructor: DS.BinarySearchTree.Node
};
DS.BinarySearchTree.AVL_BALANCED = 0;
DS.BinarySearchTree.AVL_LFT_HEAVY = 1;
DS.BinarySearchTree.AVL_RGT_HEAVY = 2;


