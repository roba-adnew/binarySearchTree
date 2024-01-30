function node(value, left = null, right = null) {
    if (!value) {
        throw new Error("No value provided");
    }

    return { value, left, right }
}

function mergeSort(unsortedArray) {
    if (unsortedArray.length === 1) {
        return unsortedArray;
    }
    
    const midPoint = Math.floor(unsortedArray.length/2)
    const leftHalf = unsortedArray.slice(0, midPoint);
    const rightHalf = unsortedArray.slice(midPoint, unsortedArray.length);

    const leftHalfSorted = mergeSort(leftHalf);
    const rightHalfSorted = mergeSort(rightHalf);

    const sortedArray = []

    do {
        if (leftHalfSorted.length === 0) {
            sortedArray.push(...rightHalfSorted);
            break;
        }

        if (rightHalfSorted.length === 0) {
            sortedArray.push(...leftHalfSorted);
            break;
        }

        if (leftHalfSorted[0] < rightHalfSorted[0]) {
            sortedArray.push(leftHalfSorted.shift());
        }
        else if (rightHalfSorted[0] < leftHalfSorted[0]) {
            sortedArray.push(rightHalfSorted.shift());
        }
        else {
            sortedArray.push(leftHalfSorted.shift());
            sortedArray.push(rightHalfSorted.shift());
        }
    } while (leftHalfSorted.length > 0 || rightHalfSorted.length > 0);

    return sortedArray;
}

function removeDuplicates(dedupedArray) {
    for (let i = 0; i < dedupedArray.length - 1; i++) {
        for (let j = i + 1; j < dedupedArray.length; j++) {
            if (dedupedArray[i] === dedupedArray[j]) {
                dedupedArray.splice(j,1);
                j--;
            }
        }
    }

    return dedupedArray;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function Tree(array) {

    const sortedArray = mergeSort(array);
    const cleanArray = removeDuplicates(sortedArray);
    const root = buildTree(cleanArray);

    function buildTree(cleanArray) {
        if (cleanArray.length === 0) {
            return null;
        }

        if (cleanArray.length === 1) {
            return node(cleanArray[0]);
        }
        
        const midPoint = Math.ceil(cleanArray.length / 2) - 1;
        const leftHalf = cleanArray.slice(0, midPoint);
        const rightHalf = cleanArray.slice(midPoint + 1, cleanArray.length);

        const rootNode = node(cleanArray[midPoint]);
        rootNode.left = buildTree(leftHalf);
        rootNode.right = buildTree(rightHalf);

        return rootNode;
    }

    function find(value) {
        if(!value) {
            return;
        }

        if (value === root.value) {
            return root;
        }
        else if (value < root.value) {
            return root.left.find(value);
        }
        else if (value > root.value) {
            return root.right.find(value);
        }
    }

    

    
    return { root, find } 
}

const a = Tree([4,1,2,3,4,4,1,2,5, 8, 6])

prettyPrint(a.root);
prettyPrint(a.find(4));