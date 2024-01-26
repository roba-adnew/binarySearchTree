function Node(value, left, right) {
    return (value, left, right)
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

    const length = Math.max(leftHalfSorted.length, rightHalfSorted.length)
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

function removeDuplicates(undupedArray) {
    for (let i = 0; i < undupedArray.length - 1; i++) {
        for (let j = i + 1; j < undupedArray.length; j++) {
            if (undupedArray[i] === undupedArray[j]) {
                undupedArray.splice(j,1);
                j--;
            }
        }
    }

    return undupedArray;
}
function Tree(array) {


    function buildTree(array) {
        const sortedArray = mergeSort(array);
        const undupedSortedArray = removeDuplicates(sortedArray);

        if (array.length === 1) {
            return;
        }

        const rootNode = 0;
    }

    const root = buildTree(array);
    return { root } 
}

console.log(removeDuplicates([1,2,3,4,4,1,2]))