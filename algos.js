// Directions Reduction (5 Kyu)

// Once upon a time, on a way through the old wild mountainous west,…
// … a man was given directions to go from one point to another. The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too.

// Going to one direction and coming back the opposite direction right away is a needless effort. Since this is the wild west, with dreadful weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!

// How I crossed a mountainous desert the smart way.
// The directions given to the man are, for example, the following (depending on the language):

// ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"].
// or
// { "NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST" };
// or
// [North, South, South, East, West, North, West]
// You can immediately see that going "NORTH" and immediately "SOUTH" is not reasonable, better stay to the same place! So the task is to give to the man a simplified version of the plan. A better plan in this case is simply:

// ["WEST"]
// or
// { "WEST" }
// or
// [West]
// Other examples:
// In ["NORTH", "SOUTH", "EAST", "WEST"], the direction "NORTH" + "SOUTH" is going north and coming back right away.

// The path becomes ["EAST", "WEST"], now "EAST" and "WEST" annihilate each other, therefore, the final result is [] (nil in Clojure).

// In ["NORTH", "EAST", "WEST", "SOUTH", "WEST", "WEST"], "NORTH" and "SOUTH" are not directly opposite but they become directly opposite after the reduction of "EAST" and "WEST" so the whole path is reducible to ["WEST", "WEST"].

// Task
// Write a function dirReduc which will take an array of strings and returns an array of strings with the needless directions removed (W<->E or S<->N side by side).

function dirReduc(arr){

    const BAD_DIRECTIONS = [
      ['NORTH', 'SOUTH'],
      ['SOUTH', 'NORTH'],
      ['EAST', 'WEST'],
      ['WEST', 'EAST']
    ]
  
    for (let i = 0; i < arr.length; i++){
      if (arr[i] + arr[i + 1] === BAD_DIRECTIONS[0].join('') || arr[i] + arr[i + 1] === BAD_DIRECTIONS[1].join('') || arr[i] + arr[i + 1] === BAD_DIRECTIONS[2].join('') || arr[i] + arr[i + 1] === BAD_DIRECTIONS[3].join('')){
        arr.splice(i, 2)
        dirReduc(arr)
      }
    }
  
    return arr;
  
}

function dirReduc(arr){

    const BAD_DIRECTIONS = [
      ['NORTH', 'SOUTH'],
      ['SOUTH', 'NORTH'],
      ['EAST', 'WEST'],
      ['WEST', 'EAST']
    ]
  
    for (let i = 0; i < arr.length; i++){
      for (let j = 0; j < BAD_DIRECTIONS.length; j++){
        if (arr[i] + arr[i + 1] === BAD_DIRECTIONS[j].join('')){
          arr.splice(i, 2);
          dirReduc(arr);
        }
      }
    }
  
    return arr;
  
}

// https://www.codewars.com/kata/550f22f4d758534c1100025a (g964)

// ================================================
// ************************************************
// ================================================

// Word a10n (abbreviation) (6 Kyu)

// The word i18n is a common abbreviation of internationalization in the developer community, used instead of typing the whole word and trying to spell it correctly. Similarly, a11y is an abbreviation of accessibility.
// Write a function that takes a string and turns any and all "words" (see below) within that string of length 4 or greater into an abbreviation, following these rules:
// - A "word" is a sequence of alphabetical characters. By this definition, any other character like a space or hyphen (eg. "elephant-ride") will split up a series of letters into two words (eg. "elephant" and "ride").
// - The abbreviated version of the word should have the first letter, then the number of removed characters, then the last letter (eg. "elephant ride" => "e6t r2e").
// Example:
// abbreviate("elephant-rides are really fun!")
//          ^^^^^^^^*^^^^^*^^^*^^^^^^*^^^*
// words (^):   "elephant" "rides" "are" "really" "fun"
//                123456     123     1     1234     1
// ignore short words:               X              X

// abbreviate:    "e6t"     "r3s"  "are"  "r4y"   "fun"
// all non-word characters (*) remain in place
//                     "-"      " "    " "     " "     "!"
// === "e6t-r3s are r4y fun!"

function handleDashes(word){
    if (word.includes(",")){
      return word.split("-").map((word) => word[0] + word.substring(1, word.length - 2).length + word.substring(word.length - 2, word.length)).join("-");
    } else {
      return word.split("-").map((word) => word[0] + word.substring(1, word.length - 1).length + word[word.length - 1]).join("-");
    }
  }
  
  function handleSpaces(word){
    if (word.includes(",")){
      return word[0] + word.substring(1, word.length - 2).length + word.substring(word.length - 2, word.length);
    } else {
      return word[0] + word.substring(1, word.length - 1).length + word[word.length - 1];
    }
  }
  
  function abbreviate(string) {
    return string.split(" ")
      .map((word) => word.length >= 4 ? word.includes("-") ? handleDashes(word) : handleSpaces(word) : word)
      .join(" ");
  }

// https://www.codewars.com/kata/5375f921003bf62192000746 (wthit56)

// ================================================
// ************************************************
// ================================================

// Encrypt this! (6 Kyu)

// You want to create secret messages which can be deciphered by the Decipher this! kata. Here are the conditions:
// Your message is a string containing space separated words.
// You need to encrypt each word in the message using the following rules:
// The first letter must be converted to its ASCII code.
// The second letter must be switched with the last letter
// Keepin' it simple: There are no special characters in the input.
// Examples:
// encryptThis("Hello") === "72olle"
// encryptThis("good") === "103doo"
// encryptThis("hello world") === "104olle 119drlo"

var encryptThis = function(text) {
    const textArr = text.split(" ");
    for (i = 0; i < textArr.length; i++){
      if (textArr[i].length > 2){
          textArr[i] = textArr[i][0].charCodeAt(0) + textArr[i][textArr[i].length - 1] + textArr[i].substring(2, textArr[i].length - 1) + textArr[i][1];  
      } else if (textArr[i].length > 1) {
          textArr[i] = textArr[i][0].charCodeAt(0) + textArr[i][textArr[i].length - 1];  
      } else {
          textArr[i] = textArr[i][0].charCodeAt(0)
      }
    }
    return textArr.join(" ");
}

// https://www.codewars.com/kata/5848565e273af816fb000449 (suic)

// ================================================
// ************************************************
// ================================================

// Write Number in Expanded Form (6 Kyu)

// You will be given a number and you will need to return it as a string in Expanded Form. For example:

// expandedForm(12); // Should return '10 + 2'
// expandedForm(42); // Should return '40 + 2'
// expandedForm(70304); // Should return '70000 + 300 + 4'
// NOTE: All numbers will be whole numbers greater than 0.

function expandedForm(num) {
    num = num.toString();
    let zero = "0";
    let nums = [];
    let x = 0;
    for (i = num.length - 1; i >= 0; i--){
      if (num[x] !== zero){
        nums.push(`${num[x]}${zero.repeat(i)}`);
      }
      x++;
    }
    return nums.join(" + ")
}

// https://www.codewars.com/kata/5842df8ccbd22792a4000245 (Belax8)

// ================================================
// ************************************************
// ================================================

// Maximum Product (7 Kyu)

// Given an array of integers, find the maximum product obtained from multiplying 2 adjacent numbers in the array
// Array/list size is at least 2
// Array/list numbers could be a mixture of positives, negatives also zeroes
// adjacentElementsProduct([1, 2, 3]); ==> return 6
// adjacentElementsProduct([9, 5, 10, 2, 24, -1, -48]); ==> return 50

function adjacentElementsProduct(array) {
    let result = -1000000000000000
    for (let i = 0; i < array.length - 1; i++){
      if (result < array[i] * array[i + 1]){
        result = array[i] * array[i + 1]
      }
    }
    return result;
}

function adjacentElementsProduct(array) {
    let result = array[0] * array[1]
    for (let i = 1; i < array.length - 1; i++){
      if (result < array[i] * array[i + 1]){
        result = array[i] * array[i + 1]
      }
    }
    return result;
}

// https://www.codewars.com/kata/5a4138acf28b82aa43000117 (MrZizoScream)

// ================================================
// ************************************************
// ================================================

// Bouncing Balls (6 Kyu)

// A child is playing with a ball on the nth floor of a tall building. The height of this floor above ground level, h, is known.
// He drops the ball out of the window. The ball bounces (for example), to two-thirds of its height (a bounce of 0.66).
// His mother looks out of a window 1.5 meters from the ground.
// How many times will the mother see the ball pass in front of her window (including when it's falling and bouncing)?

// Three conditions must be met for a valid experiment:
// Float parameter "h" in meters must be greater than 0
// Float parameter "bounce" must be greater than 0 and less than 1
// Float parameter "window" must be less than h.
// If all three conditions above are fulfilled, return a positive integer, otherwise return -1.

// Note:
// The ball can only be seen if the height of the rebounding ball is strictly greater than the window parameter.

// Examples:
// - h = 3, bounce = 0.66, window = 1.5, result is 3

// - h = 3, bounce = 1, window = 1.5, result is -1 

// (Condition 2) not fulfilled).

function bouncingBall(h,  bounce,  window) {
  if (h <= 0 || (bounce <= 0 || bounce >= 1) || window >= h){
    return -1;
  }
  let result = 0;
  do {
    result++
    h = h * bounce;
    if (h > window){
      result++
    } 
  } while (h > window);
  return result;
}

// https://www.codewars.com/kata/5544c7a5cb454edb3c000047 (g964)

// ================================================
// ************************************************
// ================================================

// Multiple of Index (8 Kyu) (Despite it being an easy problem, I really liked it!)

// Return a new array consisting of elements which are multiple of their own index in input array (length > 1).

function multipleOfIndex(array) {
  return array.filter((number, index) => number % index === 0 || number === 0);
}

// https://www.codewars.com/kata/5a34b80155519e1a00000009 (Dmitry Kudla)

// ================================================
// ************************************************
// ================================================

// Consecutive Strings (6 Kyu)

function permute(array) {
  var length = array.length, // length of array
      result = [array.slice()], // nests original array inside a new array
      c = new Array(length).fill(0), // fills a new array with N 0's
      i = 1, k, p; // initializes 3 variables. i = 0, k = undefined, p = undefined

  while (i < length) { // while i < length
    if (c[i] < i) { // if array filled with 0's at index of [i] (initially 0) is less than i (intially 1) (guaranteed to run the first time)
      k = i % 2 && c[i]; // if i is even, set value of k to 0. If it is odd, set it to the value of c[i]
      p = array[i]; // temporarily saves the value of array[i]
      array[i] = array[k]; // changes the value of array[i] () to array[k]
      array[k] = p;
      c[i]++;
      i = 1;
      result.push(array.slice());
    } else {
      c[i] = 0;
      i++;
    }
  }
  return result;
}

console.log(permute([1, 2, 3]));