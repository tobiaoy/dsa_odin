// set up node class 
class Node {
    constructor() {
        this.value = null;
        this.next = null;
    }

    get value() { 
        return this._value; 
    }

    set value(val) {
        if (val != null) {
            this._value = val;
        }
    }

    get next() {
        return this._next;
    }

    set next(node) {
        if (node != null) {
            this._next = node;
        }
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // add a method to see if there's anything in the list already
    hasNodes() {
        return this.head !== null;
    }

    // append method
    // add value -> node to the end of the list
    // head -> node -> ... -> [new node] -> null
    append(val) {
        let node = new Node();
        node.value = val;

        if (!this.hasNodes()) {
            this.head = node;
        } else {
            // go to the end of our list and add our new node there
            let tmp = this.head;
            while (tmp.next != null) {
                tmp = tmp.next;
            }
            tmp.next = node;
        }
    }

    // prepend method
    // add value -> node to the front of the list
    // the new node will point to the head node and become the new head node
    // [new node] -> head -> rest of nodes -> ... -> null
    prepend(val) {
        let node = new Node();
        node.value = val;

        if (!this.hasNodes()) {
            this.head = node;
        } else {
            let tmp = this.head;
            node.next = tmp;
            this.head = node;
        }
    }

    // size method
    // should tell us how many nodes are in the list 
    // run the sequence until we hit null
    size() {
        if (!this.hasNodes()) {
            return 0;
        } else {
            let curr = this.head;
            let count = 1;
            while (curr != null) {
                curr = curr.next;
                count++;
            }
            return count;
        }
    }

    head() {
        if (this.hasNodes()) {
            return this.head;
        } else {
            return;
        }
    }

    // tail method
    // return the very last node value
    tail() {
        if (!this.hasNodes()) {
            return;
        } else {
            let curr = this.head;
            while (curr.next != null) {
                curr = curr.next;
            }
            return curr;
        }
    }

    // at index method
    // return node at the particular index point
    // should be zero indexed 
    // the loop needs to stop at the index # or if there are no more nodes left
    atIndex(index) {
        if (index < 0) {
            return null;
        }

        if (!this.hasNodes()) {
            return null;
        } else {
            let curr = this.head;
            let i = 0;
            while (curr.next != null && i != index) {
                curr = curr.next;
                i++;
            }
            if (i == index) {
                return curr;
            } else {
                return null;
            }
        }
    }

    // pop method
    // removes the last node from the list
    // have the second to last item point to null
    // we can use prev and curr 
    pop() {
        if (!this.hasNodes()) {
            return;
        } else {
            let prev = null;
            let curr = this.head;

            // if there's only 1 node in the list
            if (curr.next == null) {
                this._head = null;
                return;
            }

            while (curr.next != null) {
                prev = curr;
                curr = curr.next;
            }
            prev.next = null;
        }
    }

    // contains method
    // will go through the list and see if a value exists
    // return true or false
    contains(val) {
        if (!this.hasNodes()) {
            return false;
        } else {
            let curr = this.head;
            while (curr != null) {
                if (curr.value == val) {
                    return true;
                }
                curr = curr.next;
            }
            return false;
        }
    }

    // find value method
    // return the index of the value if it's found otherwise return null
    // keep a count throughout the run
    findValue(val) {
        if (!this.hasNodes()) {
            return null;
        } else {
            let curr = this.head;
            let count = 0;
            while (curr != null) {
                if (curr.value == val) {
                    return count;
                }
                curr = curr.next;
                count++;
            }
            return null;
        }
    }

    // to string method
    // represent the list as a string
    // format: ( value ) -> ( value ) -> ( value ) -> ( null )
    toString() {
        if (!this.hasNodes()) {
            return `( null )`;
        } else {
            let string = ``;
            let curr = this.head;
            let tmp = `( ${curr.value} )`;
            string += tmp;
            while (curr.next != null) {
                curr = curr.next;
                tmp = ` -> ( ${curr.value} )`;
                string += tmp;
            }
            string += ' -> ( null )';
            return string;
        }
    }
}

// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
