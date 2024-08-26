// merge sort
// this algo breaks down a list recursively until it reaches single items
// the list is split in two repeatedly until we get to 1 item
// then that 1 is merged to the right/left
// this process is repeated recursively until the whole list is sorted
// first establish how merge works

function merge(a, b) {
    let m = a.length - 1
    let n = b.length - 1
    let c = [] // our target list
  
    let i = 0,
      j = 0,
      k = 0; // indexes: a -> i, b -> j, c -> k
  
    // go through each array item by item and compare vals while adding the current lowest to the c list
    while (i <= m && j <= n) {
      if (a[i] < b[j]) {
        c[k] = a[i];
        k++;
        i++;
      } else {
        c[k] = b[j];
        k++;
        j++;
      }
    }
  
    // if there are any vals left over, add them to the c list directly
    // we aren't re-initializing i,j,k because the values they're currently at are important
    for (; i <= m; i++) {
      c[k] = a[i]
      k++;
    }
  
    for (; j <= n; j++) {
      c[k] = b[j];
      k += 1;
    }
  
  
    return c;
  
  }
  
  /* let t1 = [2,4,6,8];
  let t2 = [1,3,5,7];
  
  let test = merge(t1, t2);
  console.log(test); */
  
  // now comes the sorting part
  // we need to recursively go through a list and split it into left and right and then merge it after
  // we need a middle value -> (left + right) / 2
  // left = start to middle
  // right = middle + 1 to end
  
  function mergeSort(a) {
    if (a.length <= 0 || a.length == 1) {
      return a;
    } 
      
    let n = a.length - 1;
   
  
    if (a.length > 1) {
      let middle = Math.floor(n / 2);
      let left = mergeSort(a.slice(0, middle + 1));
      let right = mergeSort(a.slice(middle + 1, n + 1));
      return merge(left, right);
    }
  
  }
  
  let t1 = [9, 3, 7, 5, 6, 4, 8, 2];
  let t2 = [3, 2, 1, 13, 8, 5, 0, 1];
  let t3 = [105, 79, 100, 110];
  
  let test = mergeSort(t1);
  let test2 = mergeSort(t2);
  let test3 = mergeSort(t3);
  
  console.log(test);
  console.log(test2);
  console.log(test3);
  