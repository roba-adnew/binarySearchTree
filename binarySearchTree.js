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
        if (!value) {
            return;
        }

        let searchNode = root;

        do {
            if (value === searchNode.value) {
                return searchNode;
            }
            else if (value < searchNode.value) {
                if (searchNode.left) {
                    searchNode = searchNode.left;
                }
                else {
                    return false;
                }
            }
            else if (value > searchNode.value) {
                if (searchNode.right) {
                    searchNode = searchNode.right;
                }
                else {
                    return false;
                }
            }
        }
        while (searchNode);
        
}

    function insert(value) {
        if (!value) {
            return false;
        }

        const newNode = node(value);
        let searchNode = root;

        do {
            if (value === searchNode.value) {
                return false;
            }
            else if (value < searchNode.value) {
                if (!searchNode.left) {
                    searchNode.left = newNode;
                    break;
                } 
                else {
                    searchNode = searchNode.left;
                }
            }
            else if (value > searchNode.value) {
                if (!searchNode.right) {
                    searchNode.right = newNode;
                    break;
                }
                else {
                    searchNode = searchNode.right;
                }
            }
        }
        while (searchNode)
        
        return true;
    }

    function findNextSmallest(value) {
        if (!value || value === root.value ) {
            return;
        }

        const node = find(value);
        let searchNode;
        if (node.right) {
            searchNode = node.right;
            while (searchNode.left) {
                searchNode = searchNode.left;
            }
            return searchNode;
        }
        else if (node.left) {
            searchNode = node.left;
            while (searchNode.right) {
                searchNode = searchNode.right;
            }
            return searchNode;
        }
        else {
            return false;
        }
    }

    function findParent(value) {
        if (!value || value === root.value ) {
            return;
        }

        let parentNode = root;

        do {
            if (value < parentNode.value) {
                if (value === parentNode.left.value) {
                    return parentNode;
                }
                else {
                    parentNode = parentNode.left;
                    continue;
                }
                
            }
            
            if (value > parentNode.value) {
                if (value === parentNode.right.value) {
                    return parentNode;
                }
                else {
                    parentNode = parentNode.right;
                    continue;
                }
            }   
        }
        while (parentNode);

        return false;
    } 

    function deleteNode(value) {
        if (!value || !find(value)) {
            return;
        }

        const targetNode = find(value);
        const targetParentNode = findParent(value);
        const directionToTarget = 
            targetParentNode.left.value === targetNode.value ? 'left' : 'right';
        
        if (!targetNode.left && !targetNode.right) {
            targetParentNode[directionToTarget] = null;
            return;
        }
        
        const replacementNode = findNextSmallest(value);
        deleteNode(replacementNode.value);
        targetNode.value = replacementNode.value;
        
        return;
    }

    function levelOrder() {
        if (!root) {
            return false;
        }

        const levelOrdered = [];
        const toCheck = [root];

        do {
            levelOrdered.push(toCheck[0].value);
            if (toCheck[0].left) {
                toCheck.push(toCheck[0].left)
            }
            if (toCheck[0].right) {
                toCheck.push(toCheck[0].right)
            }
            toCheck.shift();
        }
        while (toCheck[0]);

        return levelOrdered;
    } 

    
    return { root, find, insert, deleteNode, levelOrder } 
}

const a = Tree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
console.log(a.levelOrder());


// prettyPrint(a.root);

// a.deleteNode(12);
// prettyPrint(a.root);
