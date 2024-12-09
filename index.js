const timeComplexityMap = {
  bubbleSort: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  insertionSort: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  selectionSort: {
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  shellSort: {
    best: "O(n log n)",
    average: "O(n log² n)",
    worst: "O(n log² n)",
  },
  mergeSort: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
  },
  quickSort: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
  },
  heapSort: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
  },
  timSort: {
    best: "O(n)",
    average: "O(n log n)",
    worst: "O(n log n)",
  },
  radixSort: {
    best: "O(nk)",
    average: "O(nk)",
    worst: "O(nk)",
  },
  cocktailShakerSort: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
  },
};


// Select HTML elements
const canvas = document.getElementById('visualization');
const ctx = canvas.getContext('2d');
const arraySizeInput = document.getElementById('array-size');
const generateButton = document.getElementById('generate-data');
const sizeDisplay = document.getElementById('array-size-value');
const playButton = document.getElementById('play-pause');
const resetButton = document.getElementById('reset');
const algorithmSelector = document.getElementById('algorithm-selector');
const comparisonsDisplay = document.getElementById('comparisons');
const swapsDisplay = document.getElementById('swaps');

// Configuration
let array = [];
let isPlaying = false;
let comparisons = 0;
let swaps = 0;
let canvasWidth = canvas.width = canvas.offsetWidth;
let canvasHeight = canvas.height = canvas.offsetHeight;

// Generate a random array
function generateRandomArray(size) {
  const newArray = [];
  for (let i = 0; i < size; i++) {
    newArray.push(Math.floor(Math.random() * canvasHeight));
  }
  return newArray;
}

// Draw the array on the canvas
function drawArray(arr, compareIndex1 = null, compareIndex2 = null) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const barWidth = canvasWidth / arr.length;

  arr.forEach((value, index) => {
    const x = index * barWidth;
    const y = canvasHeight - value;

    if (index === compareIndex1 || index === compareIndex2) {
      ctx.fillStyle = '#ff6f61'; // Highlight compared bars
    } else {
      ctx.fillStyle = '#007acc'; // Default bar color
    }
    ctx.fillRect(x, y, barWidth - 2, value);
  });
}

// Sleep function for animation delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateTimeComplexity(selectedAlgorithm) {
  const timeComplexity = timeComplexityMap[selectedAlgorithm];

  // Find the display elements
  const bestCaseDisplay = document.getElementById("time-complexity-best");
  const averageCaseDisplay = document.getElementById("time-complexity-average");
  const worstCaseDisplay = document.getElementById("time-complexity-worst");

  // Update the text content
  if (timeComplexity) {
    bestCaseDisplay.textContent = `Best: ${timeComplexity.best}`;
    averageCaseDisplay.textContent = `Average: ${timeComplexity.average}`;
    worstCaseDisplay.textContent = `Worst: ${timeComplexity.worst}`;
  } else {
    bestCaseDisplay.textContent = "Best: -";
    averageCaseDisplay.textContent = "Average: -";
    worstCaseDisplay.textContent = "Worst: -";
  }
}

// Bubble Sort with Visualization
async function bubbleSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!isPlaying) return;

      drawArray(array, j, j + 1);
      await sleep(100);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
      }
      comparisons++;
      updateMetrics();
    }
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

// Merge Sort with Visualization
async function mergeSort(array, left, right) {
  if (left >= right || !isPlaying) return;

  const middle = Math.floor((left + right) / 2);

  await mergeSort(array, left, middle);
  await mergeSort(array, middle + 1, right);

  await merge(array, left, middle, right);
}

async function merge(array, left, middle, right) {
  const temp = [];
  let i = left, j = middle + 1;

  while (i <= middle && j <= right) {
    if (!isPlaying) return;

    drawArray(array, i, j);
    await sleep(100);

    if (array[i] <= array[j]) {
      temp.push(array[i++]);
    } else {
      temp.push(array[j++]);
    }
    comparisons++;
    updateMetrics();
  }

  while (i <= middle) {
    temp.push(array[i++]);
  }

  while (j <= right) {
    temp.push(array[j++]);
  }

  for (let k = 0; k < temp.length; k++) {
    array[left + k] = temp[k];
    drawArray(array, left + k);
    await sleep(100);
    swaps++;
    updateMetrics();
  }
}

async function startMergeSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  await mergeSort(array, 0, array.length - 1);

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

// Quick Sort with Visualization
async function quickSort(array, left, right) {
  if (left >= right || !isPlaying) return;

  const pivotIndex = await partition(array, left, right);

  await quickSort(array, left, pivotIndex - 1);
  await quickSort(array, pivotIndex + 1, right);
}

async function partition(array, left, right) {
  const pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (!isPlaying) return;

    drawArray(array, j, right);
    await sleep(100);

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      swaps++;
    }
    comparisons++;
    updateMetrics();
  }

  [array[i + 1], array[right]] = [array[right], array[i + 1]];
  swaps++;
  drawArray(array, i + 1, right);
  await sleep(100);
  updateMetrics();

  return i + 1;
}

async function startQuickSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  await quickSort(array, 0, array.length - 1);

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

// Update metrics display
function updateMetrics() {
  comparisonsDisplay.textContent = comparisons;
  swapsDisplay.textContent = swaps;
}

// Reset metrics and visualization
function reset() {
  isPlaying = false;
  comparisons = 0;
  swaps = 0;
  updateMetrics();
  array = generateRandomArray(arraySizeInput.value);
  drawArray(array);
}

async function insertionSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  const n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Highlight the current key bar
    drawArray(array, i);
    await sleep(100);

    // Move elements of the sorted segment that are greater than the key
    while (j >= 0 && array[j] > key) {
      if (!isPlaying) return;

      array[j + 1] = array[j]; // Shift larger element one position to the right
      drawArray(array, j, j + 1); // Highlight the shifting process
      await sleep(100);

      swaps++;
      comparisons++;
      updateMetrics();

      j--;
    }

    // Place the key at the correct position
    array[j + 1] = key;
    drawArray(array, j + 1);
    await sleep(100);

    swaps++;
    updateMetrics();
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

async function selectionSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Highlight the starting point
    drawArray(array, i);
    await sleep(100);

    for (let j = i + 1; j < n; j++) {
      if (!isPlaying) return;

      // Highlight the current element being compared
      drawArray(array, minIndex, j);
      await sleep(100);

      if (array[j] < array[minIndex]) {
        minIndex = j; // Update the index of the smallest element
      }
      comparisons++;
      updateMetrics();
    }

    // Swap the smallest element with the first element of the unsorted part
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      swaps++;
      updateMetrics();
    }

    // Draw the array after the swap
    drawArray(array, i, minIndex);
    await sleep(100);
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

async function shellSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  const n = array.length;

  // Start with a large gap, then reduce it
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Perform gapped insertion sort for the current gap
    for (let i = gap; i < n; i++) {
      let temp = array[i];
      let j = i;

      // Highlight the current element being inserted
      drawArray(array, i);
      await sleep(100);

      // Shift elements until the correct position for temp is found
      while (j >= gap && array[j - gap] > temp) {
        if (!isPlaying) return;

        array[j] = array[j - gap];
        j -= gap;

        // Highlight the shift process
        drawArray(array, j, j + gap);
        await sleep(100);

        comparisons++;
        swaps++;
        updateMetrics();
      }

      // Place temp in its correct position
      array[j] = temp;
      drawArray(array, j);
      await sleep(100);

      swaps++;
      updateMetrics();
    }
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

async function heapSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i);
  }

  // Extract elements from the heap
  for (let i = n - 1; i > 0; i--) {
    if (!isPlaying) return;

    // Swap the root (largest) with the last element
    [array[0], array[i]] = [array[i], array[0]];
    swaps++;
    updateMetrics();

    // Highlight the swapped elements
    drawArray(array, 0, i);
    await sleep(100);

    // Heapify the reduced heap
    await heapify(array, i, 0);
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

// Heapify a subtree rooted at index i
async function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare left child
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // Compare right child
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If the largest is not the root, swap and continue heapifying
  if (largest !== i) {
    if (!isPlaying) return;

    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    swaps++;
    updateMetrics();

    // Highlight the swapped elements
    drawArray(arr, i, largest);
    await sleep(100);

    await heapify(arr, n, largest);
  }

  comparisons++;
  updateMetrics();
}

async function timSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  const n = array.length;
  const RUN = 32; // Default run size for Tim Sort

  // Step 1: Sort small runs using Insertion Sort
  for (let i = 0; i < n; i += RUN) {
    await insertionSortForRun(array, i, Math.min(i + RUN - 1, n - 1));
  }

  // Step 2: Merge runs using Merge Sort
  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        await merge(array, left, mid, right);
      }
    }
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

// Helper function: Insertion Sort for a specific range
async function insertionSortForRun(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    let key = arr[i];
    let j = i - 1;

    // Highlight the current key being inserted
    drawArray(arr, i);
    await sleep(100);

    while (j >= left && arr[j] > key) {
      if (!isPlaying) return;

      arr[j + 1] = arr[j];
      drawArray(arr, j, j + 1); // Highlight shifting process
      await sleep(100);

      comparisons++;
      swaps++;
      updateMetrics();

      j--;
    }
    arr[j + 1] = key;

    swaps++;
    updateMetrics();
    drawArray(arr, j + 1); // Highlight where the key is placed
    await sleep(100);
  }
}

async function radixSort() {
  isPlaying = true;
  comparisons = 0; // Not applicable for Radix Sort but kept for consistency
  swaps = 0;

  const maxNum = Math.max(...array);
  const maxDigits = maxNum.toString().length;

  let divisor = 1; // Start with the least significant digit

  for (let d = 0; d < maxDigits; d++) {
    if (!isPlaying) return;

    // Create buckets for each digit (0-9)
    const buckets = Array.from({ length: 10 }, () => []);

    // Distribute array elements into buckets
    for (let i = 0; i < array.length; i++) {
      const digit = Math.floor((array[i] / divisor) % 10);
      buckets[digit].push(array[i]);

      // Highlight the element being placed in a bucket
      drawArray(array, i);
      await sleep(100);
    }

    // Reconstruct the array by concatenating buckets
    let index = 0;
    for (let bucket of buckets) {
      for (let value of bucket) {
        array[index++] = value;

        // Highlight the element being placed back into the array
        drawArray(array, index - 1);
        await sleep(100);
      }
    }

    swaps += array.length; // Count redistributions as swaps
    updateMetrics();

    divisor *= 10; // Move to the next significant digit
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}

async function cocktailShakerSort() {
  isPlaying = true;
  comparisons = 0;
  swaps = 0;

  let start = 0;
  let end = array.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
      if (!isPlaying) return;

      drawArray(array, i, i + 1); // Highlight comparison
      await sleep(100);

      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        swaps++;
        drawArray(array, i, i + 1); // Highlight the swap
        await sleep(100);
      }
      comparisons++;
      updateMetrics();
    }

    if (!swapped) break; // Exit if no swaps were made in the forward pass
    swapped = false;
    end--; // Reduce the unsorted range

    // Backward pass
    for (let i = end - 1; i >= start; i--) {
      if (!isPlaying) return;

      drawArray(array, i, i + 1); // Highlight comparison
      await sleep(100);

      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        swaps++;
        drawArray(array, i, i + 1); // Highlight the swap
        await sleep(100);
      }
      comparisons++;
      updateMetrics();
    }

    start++; // Increase the sorted range
  }

  isPlaying = false;
  drawArray(array);
  alert('Sorting Complete!');
}


// Event Listeners
generateButton.addEventListener('click', reset);

algorithmSelector.addEventListener("change", () => {
  const selectedAlgorithm = algorithmSelector.value;
  updateTimeComplexity(selectedAlgorithm);
});

playButton.addEventListener('click', async () => {
  if (isPlaying) return;

  const selectedAlgorithm = algorithmSelector.value;

  reset();

  if (selectedAlgorithm === 'bubbleSort') {
    await bubbleSort();
  } else if (selectedAlgorithm === 'mergeSort') {
    await startMergeSort();
  } else if (selectedAlgorithm === 'quickSort') {
    await startQuickSort();
  } else if (selectedAlgorithm === 'insertionSort') {
    await insertionSort();
  } else if (selectedAlgorithm === 'selectionSort') {
    await selectionSort();
  } else if (selectedAlgorithm === 'shellSort') {
    await shellSort();
  } else if (selectedAlgorithm === 'heapSort') {
    await heapSort();
  } else if (selectedAlgorithm === 'timSort') {
    await timSort();
  } else if (selectedAlgorithm === 'radixSort') {
    await radixSort();
  } else if (selectedAlgorithm === 'cocktailShakerSort') {
    await cocktailShakerSort();
  }
});
resetButton.addEventListener('click', reset);

arraySizeInput.addEventListener('input', (e) => {
  sizeDisplay.textContent = e.target.value;
  reset();
});

// Initial setup
array = generateRandomArray(arraySizeInput.value);
drawArray(array);
