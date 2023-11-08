//package JDBC;

// This is an explanation I wrote out for merge sort. Running it in the console will show step by step what happens as this algorithm breaks down the array and sorts it.

import java.util.Random;

class JDBC {
    
    public static void main(String[] args) {
        
        Random rand = new Random(); // for generating random numbers
        int[] numbers = new int[7]; // initializes an int array with capacity of 10
        
        for (int i = 0; i < numbers.length; i++){
            numbers[i] = rand.nextInt(100); // fills the array with random numbers
        }
        
        System.out.println("UNSORTED");
        printArray(numbers);
        System.out.println("\n");
        
        System.out.println("----BEGIN SPLIT----\n");
        mergeSort(numbers);
        
        System.out.println("\nSORTED");
        printArray(numbers);
        
        // Full diagram of merge sort algorithm. See below for more details
        //                                      DIVIDE
        //                   [65, 13, 12, 0, 32  <->  93, 83, 55, 27, 78]
        //                [65, 13 <-> 12, 0, 32]  |  [93, 83 <-> 55, 27, 78]
        //           [65 <-> 13], [12 <-> 0, 32]  |  [93 <-> 83], [55 <-> 27, 78]
        //          [65], [13], [12], [0 <-> 32]  |  [93], [83], [55], [27 <-> 78]
        //           [65], [13], [12], [0], [32]  |  [93], [83], [55], [27], [78]
        //                                     CONQUER
        // [*65*] >-< [13], [*12*] >-< [0], [32]  |  [*93*] >-< [83], [*55*] >-< [27], [78]
        //        [*13*, *65*] >-< [0, 12], [32]  |  [*83*, *93*] >-< [27, 55], [78]
        //            [0, 12, 13, *65*] >-< [32]  |  [27, 55, *83*, *93*] >-< [78]
        //                   [0, 12, 13, 32, 65] >-< [27, 55, *78*, *83*, *93*]
        //                      [0, 12, 13, 27, 32, 55, 65, 78, 83, 93]
        
    }
    
    private static void mergeSort(int[] inputArr){
        
        int inputLength = inputArr.length; // this value is used a lot, so it's best to save it to a variable for repeated use
        
        if (inputLength < 2){
            return; // if length of input array is less than two, it means that "arrToBeSplit" only has 1 element in it and nothing needs to be done for that array
        }
        
        int midIndex = inputLength / 2; // middle point of array (5). This works for odd numbers because int type will round down to the nearest integer upon division that would result in a decimal (11 / 2 == 5, 9 / 2 == 4, etc)
        int[] leftHalf = new int[midIndex]; // first half of the unsorted
        int[] rightHalf = new int[inputLength - midIndex]; // second half of the unsorted array
        
        // Fill left half
        for (int i = 0; i < midIndex; i++){
            leftHalf[i] = inputArr[i]; // copies the first 5 (half) elements from original array into the leftHalf array
        }
        
        // Fill right half
        for (int i = midIndex; i < inputLength; i++){ // i starts at midIndex (5)
            rightHalf[i - midIndex] = inputArr[i]; // rightHalf[i - midIndex] == rightHalf[0], this dynamically gets the 0th index of the rightHalf array, regardless of how large inputArr is
        }
        
        // Recursion. Calls the same method on the split array. This will be done until the length of each half is 1
        
        showSplit(leftHalf); // Prints the left half
        mergeSort(leftHalf); // Recursively calls mergeSort to split the left half if there is more than 1 elements
        
        showSplit(rightHalf); // prints the right half
        mergeSort(rightHalf); // Recursively calls mergeSort to split the right half if there is more than 1 elements
        
        // Visualization of this process:
        // <-> annotates an array being split into two halves; left and right
        // 									    DIVIDE
        //                   [65, 13, 12, 0, 32  <->  93, 83, 55, 27, 78]
        //                [65, 13 <-> 12, 0, 32]  |  [93, 83 <-> 55, 27, 78]
        //           [65 <-> 13], [12 <-> 0, 32]  |  [93 <-> 83], [55 <-> 27, 78]
        //          [65], [13], [12], [0 <-> 32]  |  [93], [83], [55], [27 <-> 78]
        //           [65], [13], [12], [0], [32]  |  [93], [83], [55], [27], [78]
        
        // Call the merge method to replace the elements of inputArr with the elements of leftHalf and rightHalf that will be sorted
        merge(inputArr, leftHalf, rightHalf);
        
    }
    
    private static void merge(int[] inputArr, int[] leftHalf, int[] rightHalf){
        
        // get the size of each half 
        int leftSize = leftHalf.length;
        int rightSize = rightHalf.length;
        
        // initialize increment values for each array. i -> leftHalf, j -> leftHalf, k -> inputArr
        int i = 0, j = 0, k = 0;
        
        while (i < leftSize && j < rightSize){ // Runs while both halves still have elements in them. If EITHER i OR j is greater than or equal to leftSize or rightSize respectively, that means there are no remaining elements in that array, and we move on to the while loops below to add the remaining elements
            if (leftHalf[i] <= rightHalf[j]){ // if leftHalf[i] is less than or equal to rightHalf[j]
                inputArr[k] = leftHalf[i]; // add the number from the leftHalf
                i++; // increment i to move on to the next element in the leftHalf that needs to be compared
            } else { // else, if rightHalf[j] is less than leftHalf[i]
                inputArr[k] = rightHalf[j]; // add the number from the right half
                j++; // increment j to move on the the next element in the rightHalf that needs to be compared
            }
            k++; // increment k regardless of which element is added because the next element of our sorted array needs to be populated
        }
     
        // When two arrays are being compared, there will ALWAYS be elements left over that can't be compared but still need to be placed in the new array
        // This number will ALWAYS be the highest number of the comparing arrays (see asterisks in below diagram)
        // The loops below handle this situation for scenarios when the last remaining number is in the leftHalf or rightHalf
        
        // Runs while leftHalf still has elements in it, but rightHalf does not
        while (i < leftSize){ // While i is less than leftHalf size
            inputArr[k] = leftHalf[i]; // add the remaining element
            i++; // increment i and repeat until all remaining elements have been added
            k++; // increment k to move on to the next element in the sorted array
        }
        
     // Runs while rightHalf still has elements in it, but leftHalf does not
        while (j < rightSize){ // while j is less than rightHalf size
            inputArr[k] = rightHalf[j]; // add the remaining element from rightSize
            j++; // increment j and repeat until all remaining elements have been added
            k++; // increment k to move on to the next element in the sorted array
        }
        
        // Visualization of this process:
        // *n* annotates numbers remaining in an array when all the numbers from the other half have already been added. These numbers are added using the while loops seen above
        // >-< annotates the arrays being merged
        
        // 								       CONQUER
        // [*65*] >-< [13], [*12*] >-< [0], [32]  |  [*93*] >-< [83], [*55*] >-< [27], [78]
        //        [*13*, *65*] >-< [0, 12], [32]  |  [*83*, *93*] >-< [27, 55], [78]
        //            [0, 12, 13, *65*] >-< [32]  |  [27, 55, *83*, *93*] >-< [78]
        //                   [0, 12, 13, 32, 65] >-< [27, 55, *78*, *83*, *93*]
        //                       [0, 12, 13, 27, 32, 55, 65, 78, 83, 93]
        
    }
    
    private static void showSplit(int[] arr){ // Shows the splitting process until all elements are split into their own array
    	
    		String s = "";
    	
        for (int i = 0; i < arr.length; i++){ 	
            s += arr[i] + ", ";           
        }
        
        if (s.length() <= 4) {	
        		System.out.println(s.substring(0, s.length() - 2) + " <-- mergeSort() split the previous array in half, resulting in this single element" + "\n");       	
        } else {
        		System.out.println(s.substring(0, s.length() - 2) + " <-- Needs to be split. mergeSort() will catch this and split it at it's midpoint" + "\n");
        }
        
    }
    
    private static void printArray(int[] arr) { // Prints the full array
    	
    	String s = "";
	    	
        for (int i = 0; i < arr.length; i++){    	
            s += arr[i] + ", ";          
        }
	        
    	System.out.println(s.substring(0, s.length() - 2)); // Substring removes final comma
        
    }
    
}