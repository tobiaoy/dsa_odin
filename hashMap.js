// creating hashmap data structure in js
// creates an array of fixed size of buckets (starting with 16) -> double after reaching the load factors
// an array of linked lists (ignoring collisions for right now)
// set load factor in 0.75
// include a condition to constraining the num of buckets
// how to deal with collisions?

class HashMap {
    constructor(buckets = 16, loadFactor = 0.75) {
        this.buckets = Array(buckets).fill(null).map(() => []);
        this.loadFactor = loadFactor;
        this.size = 0; // will keep track of filled buckets
    }

    isOutOfBounds(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        return false;
    }

    hash(key) {
        let hashCode = 0;
        const primeNum = 37;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNum * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.buckets.length;
        }

        return hashCode;
    }

    // resize function
    // make a new array of double what the current num of buckets is
    // take the values in your current buckets and copy them into the new array buckets
    // seq -> take a key, hash the key [using the length of this array] and then store it in a bucket
    // -> reassign the buckets to the new array
    resize() {
        const newBuckets = Array(this.buckets.length * 2).fill(null).map(() => []);
        const oldBuckets = this.buckets;
        this.buckets = newBuckets;
        this.size = 0;

        oldBuckets.forEach(bucket => {
            bucket.forEach(({ key, value }) => {
                this.set(key, value);
            });
        });
    }

    // set method
    // seq: get key,value -> hash key -> check if there's a value there
    // if value -> deal with collision
    // else -> just add the value to the bucket
    // check our load factor to know if we should resize or not
    // increment the size
    set(key, value) {
        let item = {
            key: key,
            value: value
        }
        let index = this.hash(key);
        let bucket = this.buckets[index]; //takes us to the bucket (js_arr) to see if the key is already there
        // if key is already there then we overrite the value
        // else we add the value to this bucket
        if (bucket.some(item => item.key === key)) {
            bucket.forEach(item => {if (item.key === key){
                item.value = value;
            }})
        } else {
            bucket.push(item);
        }
        this.size++;
        // check load factor
        if (this.size / this.buckets.length >= this.loadFactor) {
            this.resize();
        }
    }

    // get method
    // takes a key and returns its value
    // if key not found then return null
    get(key) {
        let index = this.hash(key);
        let bucket = this.buckets[index];
        const item = bucket.find(item => item.key === key);
        return item ? item.value : null;
    }

    // has method
    // takes a key and returns true or false if the key is in the hash map  
    has(key) {
        let index = this.hash(key);
        let bucket = this.buckets[index];
        return bucket.some(item => item.key === key);
    }

    // remove method
    // takes a key as an argument 
    // if it's there -> remove the entry and return true
    // else -> return false
    // reduce size
    remove(key) {
        // find the index
        let hashIndex = this.hash(key);
        let bucket = this.buckets[hashIndex];
        let index = bucket.findIndex(item => item.key === key);
        if (this.has(key)){
            bucket.splice(index, 1);
            this.size--;
            return true;
        } else {
            return false;
        }
    }

    // length method
    // returns the number of stored keys
    length() {
        return this.size;
    }

    // clear method
    // removes all entries in the hash map
    clear() {
        this.buckets = Array(this.buckets.length).fill(null).map(() => []);
        this.size = 0;
    }

    // keys method
    // return an array with all keys in the map
    // iterate through all the buckets and return all the keys within
    keys() {
        let keys = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(item => {
                keys.push(item.key);
            });
        });
        return keys;
    }

    // values method
    // similar to the keys method but the values this time
    values() {
        let values = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(item => {
                values.push(item.value);
            });
        });
        return values;
    }


    entries() {
        let entries = [];
        this.buckets.forEach(bucket => {
            let temp = bucket.map(item => Object.values(item));
            entries.push(temp);
        })
        return entries;
    }
}

const test = new HashMap() // or HashMap() if using a factory
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.entries());