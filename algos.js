// Directions Reduction (5 Kyu)

// Once upon a time, on a way through the old wild mountainous west,…
// … a man was given directions to go from one point to another. 
// The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too.

// Going to one direction and coming back the opposite direction right away is a needless effort. 
// Since this is the wild west, with dreadful weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!

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

  const badDirections = [
    ['NORTH', 'SOUTH'],
    ['SOUTH', 'NORTH'],
    ['EAST', 'WEST'],
    ['WEST', 'EAST']
  ]

  for (let i = 0; i < arr.length - 1; i++){
    for (let j = 0; j < badDirections.length; j++){
      if (arr[i] + arr[i + 1] === badDirections[j].join('')){
        arr.splice(i, 2);
        dirReduc(arr);
      }
    }
  }

  return arr;

}

console.log(dirReduc(['NORTH', 'WEST', 'EAST', 'SOUTH']))

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

// https://www.codewars.com/kata/550f22f4d758534c1100025a (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

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

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

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

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Write Number in Expanded Form (6 Kyu)

// You will be given a number and you will need to return it as a string in Expanded Form. For example:

// expandedForm(12); // Should return '10 + 2'
// expandedForm(42); // Should return '40 + 2'
// expandedForm(70304); // Should return '70000 + 300 + 4'
// NOTE: All numbers will be whole numbers greater than 0.

function expandedForm(num) {
  num = num.toString();
  let nums = [];
  for (i = 0; i < num.length; i++){
    if (num[i] !== '0'){
      nums.push(`${num[i]}${'0'.repeat(num.length - i - 1)}`);
    } else {
      nums.push('0'); // optional
    }
  }
  return nums.join(" + ")
}

function expandedForm(num) {
  num = num.toString();
  let nums = [];
  let x = 0;
  for (i = num.length - 1; i >= 0; i--){
    if (num[x] !== 0){
      nums.push(`${num[x]}${'0'.repeat(i)}`);
    }
    x++;
  }
  return nums.join(" + ")
}

// https://www.codewars.com/kata/5842df8ccbd22792a4000245 (Belax8)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

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

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

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
  let result = 0; // numberOfBounces, bounceCount
  do {
    result++
    h *= bounce;
    if (h > window){
      result++
    } 
  } while (h > window);
  return result;
}

// https://www.codewars.com/kata/5544c7a5cb454edb3c000047 (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Multiple of Index (8 Kyu) (Despite it being an easy problem, I really liked it!)

// Return a new array consisting of elements which are multiple of their own index in input array (length > 1).

function multipleOfIndex(array) {
  return array.filter((number, index) => number % index === 0 || number === 0);
}

// https://www.codewars.com/kata/5a34b80155519e1a00000009 (Dmitry Kudla)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

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

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Kebabize (6 Kyu)

// Modify the kebabize function so that it converts a camel case string into a kebab case.

// "camelsHaveThreeHumps"  -->  "camels-have-three-humps"
// "camelsHave3Humps"  -->  "camels-have-humps"
// "CAMEL"  -->  "c-a-m-e-l"
// Notes:

// the returned string should only contain lowercase letters

function kebabize(str) {
  str = str[0].toLowerCase() + str.substring(1);
  return str.replace(/[^a-zA-Z]/g, "").split("").map((letter) => {
    if (letter === letter.toUpperCase()){
      return letter = `-${letter.toLowerCase()}`
    } else {
      return letter;
    }
  }).join("");
}

function kebabize(str) {
  return str.replace(/\d/g, '').replace(/\B[A-Z]/g, (letter) => `-${letter}`).toLowerCase();
}

function checkUpperCase(char){
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function checkLowerCase(char){
  return char === char.toLowerCase() && char !== char.toUpperCase();
}

function kebabize(str){
  let firstChar = str.match(/[a-zA-Z]/)
  let kebab = `${firstChar[0].toLowerCase()}`;
  for (let i = firstChar.index + 1; i < str.length; i++){
    let char = str[i];
    if (checkUpperCase(char)){
      kebab += `-${char.toLowerCase()}`
    } else if (checkLowerCase(char)){
      kebab += char;
    }
  }
  return kebab;
}

// https://www.codewars.com/kata/57f8ff867a28db569e000c4a (user4316848)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Count characters in your string (6 Kyu)

// The main idea is to count all the occurring characters in a string. 
// If you have a string like aba, then the result should be {'a': 2, 'b': 1}.
// What if the string is empty? Then the result should be empty object literal, {}.

function count (string) {  
  if (string){
    string = string.split('');
    let counts = {}
    for (const letter of string){
      counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
    }
    return counts;
  } else {
    return {};
  }
}

function count(string) {
  const obj = {};
  string.split("").forEach((char) => obj[char] = (obj[char] || 0) + 1);
  return obj;
}

// https://www.codewars.com/kata/52efefcbcdf57161d4000091 (riston)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Highest Rank Number in an Array (6 Kyu)

// Complete the method which returns the number which is most frequent in the given input array. 
// If there is a tie for most frequent number, return the largest number among them.

// Note: no empty arrays will be given.

function highestRank(arr){
  const accum = {}
  arr.forEach((num) => accum[num] = (accum[num] || 0) + 1);
  return parseInt(Object.keys(accum).reduce((a, b) => accum[a] > accum[b] ? a : b));
}

function highestRank(arr){
  const accum = {};
  for (let i = 0; i < arr.length; i++){
    let key = arr[i];
    if (accum[key]){
      accum[key]++
    } else {
      accum[key] = 1;
    }
  }
  return parseInt(Object.keys(accum).reduce((a, b) => accum[a] > accum[b] ? a : b));
}

// https://www.codewars.com/kata/5420fc9bb5b2c7fd57000004 (KK20994)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Alternate Case (7 Kyu)

// Write function alternateCase which switch every letter in string from upper to lower and from lower to upper. 
// E.g: Hello World -> hELLO wORLD

function alternateCase(s) {
  let alternateCaseString = "";
  for (let i = 0; i < s.length; i++){
    let char = s[i];
    if (char === char.toLowerCase() && char !== char.toUpperCase()){
      // This condition will return true if the character is lower case, and false for all other characters
      // E.g "=", "3", "-", etc will all return false
      // Alternatively, char === char.toLowerCase() alone would suffice for this problem
      alternateCaseString += char.toUpperCase();
      
    } else {
      alternateCaseString += char.toLowerCase();
    }
  }
  return alternateCaseString;
}

function alternateCase(s) {
  return s.split("")
    .map((c) => c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase())
    .join("");
}

// https://www.codewars.com/kata/57a62154cf1fa5b25200031e (wichu)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// How old will I be in 2099? (8 Kyu)

// Philip's just turned four and he wants to know how old he will be in various years in the future such as 2090 or 3044. 
// His parents can't keep up calculating this so they've begged you to help them out by writing a programme that can answer Philip's endless questions.

// Your task is to write a function that takes two parameters: the year of birth and the year to count years in relation to. 
// As Philip is getting more curious every day he may soon want to know how many years it was until he would be born, so your function needs to work with both dates in the future and in the past.

// Provide output in this format: For dates in the future: "You are ... year(s) old." 
// For dates in the past: "You will be born in ... year(s)." If the year of birth equals the year requested return: "You were born this very year!"

// "..." are to be replaced by the number, followed and proceeded by a single space. 
// Mind that you need to account for both "year" and "years", depending on the result.

function plural(x, y){
  if (y > x){
    return y - x === 1 ? '' : 's';  
  } else {
    return x - y === 1 ? '' : 's';  
  }
}

function  calculateAge(x, y) {
  if (x === y){
    return 'You were born this very year!'
  }
  return y > x ? `You are ${y - x} year${plural(x, y)} old.` : `You will be born in ${x - y} year${plural(x, y)}.`
}

// https://www.codewars.com/kata/5761a717780f8950ce001473 (ijelonek)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Alternate Capitalization (7 Kyu)

// Given a string, capitalize the letters that occupy even indexes and odd indexes separately, and return as shown below. Index 0 will be considered even.

// For example, capitalize("abcdef") = ['AbCdEf', 'aBcDeF']. See test cases for more examples.

// The input will be a lowercase string with no spaces.

function capitalize(s){
  return [
    [...s].map((letter, index) => index % 2 === 0 ? letter.toUpperCase() : letter).join(""),
    [...s].map((letter, index) => index % 2 !== 0 ? letter.toUpperCase() : letter).join("")
  ];
};

// https://www.codewars.com/kata/59cfc000aeb2844d16000075 (KenKamau)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Are they the "same"? (6 Kyu)

// Given two arrays a and b write a function comp(a, b) (orcompSame(a, b)) that checks whether the two arrays have the "same" elements, with the same multiplicities (the multiplicity of a member is the number of times it appears). 
// "Same" means, here, that the elements in b are the elements in a squared, regardless of the order.

function comp(array1, array2){
  if (array1 === null || array2 === null){
    return false;
  }
  array1.sort((x, y) => x - y);
  array2.sort((x, y) => x - y);
  for (let i = 0; i < array1.length; i++){
    if (array2[i] !== array1[i] * array1[i]){
      return false;
    }
  }
  return true;
}

// https://www.codewars.com/kata/550498447451fbbd7600041c (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// The Vowel Code (6 Kyu)

// Step 1: Create a function called encode() to replace all the lowercase vowels in a given string with numbers according to the following pattern:

// a -> 1
// e -> 2
// i -> 3
// o -> 4
// u -> 5

// For example, encode("hello") would return "h2ll4". There is no need to worry about uppercase vowels in this kata.

// Step 2: Now create a function called decode() to turn the numbers back into vowels according to the same pattern shown above.

// For example, decode("h3 th2r2") would return "hi there".

// For the sake of simplicity, you can assume that any numbers passed into the function will correspond to vowels.

function encode(string) {
  const code = {
    'a': '1',
    'e': '2',
    'i': '3',
    'o': '4',
    'u': '5'
  };
  let encodedStr = "";
  for (let i = 0; i < string.length; i++){
    let char = string[i];
    if (/[aeiou]/.test(char)){
      encodedStr += code[char];
    } else {
      encodedStr += char;
    }
  }
  return encodedStr;
}

function decode(string) {
    const code = {
    '1': 'a',
    '2': 'e',
    '3': 'i',
    '4': 'o',
    '5': 'u'
  };
  let decodedStr = "";
  for (let i = 0; i < string.length; i++){
    let char = string[i];
    if (/[1-5]/.test(char)){
      decodedStr += code[char];
    } else {
      decodedStr += char;
    }
  }
  return decodedStr;
}

// https://www.codewars.com/kata/53697be005f803751e0015aa (yaphi1)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Data Reverse (6 Kyu)

// A stream of data is received and needs to be reversed.

// Each segment is 8 bits long, meaning the order of these segments needs to be reversed, for example:

// 11111111  00000000  00001111  10101010
//  (byte1)   (byte2)   (byte3)   (byte4)
// should become:

// 10101010  00001111  00000000  11111111
//  (byte4)   (byte3)   (byte2)   (byte1)
// The total number of bits will always be a multiple of 8.

// The data is given in an array as such:

// [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,0]

function dataReverse(data) {
  const result = [];
  for (let i = data.length; i >= 0; i -= 8){
    result.push(data.slice(i - 8, i));
  }
  return result.flat();
}

function dataReverse(data) {
  let result = [];
  for (let i = 0; i < data.length; i += 8){
    result.push(data.slice(i, i + 8))
  }
  return result.reverse().flat();
}

// https://www.codewars.com/kata/569d488d61b812a0f7000015 (sataman)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Product of consecutive Fib numbers (5 Kyu)

// The Fibonacci numbers are the numbers in the following integer sequence (Fn):

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

// such as F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

// Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying F(n) * F(n+1) = prod.

// Your function productFib takes an integer (prod) and returns an array:

// [F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)
// depending on the language if F(n) * F(n+1) = prod.

// If you don't find two consecutive F(n) verifying F(n) * F(n+1) = prodyou will return [F(n), F(n+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)
// F(n) being the smallest one such as F(n) * F(n+1) > prod.

function productFib(prod){
  let x = 0;
  let y = 1;
  while (x * y <= prod){
    let tempx = x;
    let tempy = y;
    if (x * y === prod){
      return [x, y, true];
    } else {
      x = tempy;
      y = tempx + tempy;
    }
  }
  return [x, y, false];
}

// https://www.codewars.com/kata/5541f58a944b85ce6d00006a (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Unique In Order (6 Kyu)

// Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

function uniqueInOrder(iterable){
  let result = [];
  for (let i = 0; i < iterable.length; i++){
    if (iterable[i] !== iterable[i + 1]){
      result.push(iterable[i])
    }
  }
  return result;
}

// https://www.codewars.com/kata/54e6533c92449cc251001667 (pinelopi)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Multiplication Table (6 Kyu)

// Your task, is to create N×N multiplication table, of size provided in parameter.

// For example, when given size is 3:

// 1 2 3
// 2 4 6
// 3 6 9
// For the given example, the return value should be:

// [[1,2,3],[2,4,6],[3,6,9]]

function multiplicationTable(size) {
  const table = [];
  for (let i = 0; i < size; i++){
    const multiples = [];
    for (let j = 0; j < size; j++){
      multiples.push((i + 1) * (j + 1));
    }
    table.push(multiples);
  }
  return table;
}

// https://www.codewars.com/kata/534d2f5b5371ecf8d2000a08 (Bugari)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Reverse or rotate? (6 Kyu)

// The input is a string str of digits. 
// Cut the string into chunks (a chunk here is a substring of the initial string) of size sz (ignore the last chunk if its size is less than sz).

// If a chunk represents an integer such as the sum of the cubes of its digits is divisible by 2, reverse that chunk; otherwise rotate it to the left by one position. 
// Put together these modified chunks and return the result as a string.

// If:
// sz is <= 0 or if str is empty return ""
// sz is greater (>) than the length of str it is impossible to take a chunk of size sz hence return "".

// Examples:
// revrot("123456987654", 6) --> "234561876549"
// revrot("123456987653", 6) --> "234561356789"
// revrot("66443875", 4) --> "44668753"
// revrot("66443875", 8) --> "64438756"
// revrot("664438769", 8) --> "67834466"
// revrot("123456779", 8) --> "23456771"
// revrot("", 8) --> ""
// revrot("123456779", 0) --> "" 
// revrot("563000655734469485", 4) --> "0365065073456944"
// Example of a string rotated to the left by one position:
// s = "123456" gives "234561".

function revrot(str, sz) {
  if (sz <= 0 || !str || sz > str.length){
    return '';
  }
  let chunks = [];
  let strArr = str.split("")
  for (let i = 0; i < str.length; i += sz){
    let tempSum = 0;
    let currSegment = strArr.slice(i, i + sz)
    if (currSegment.length < sz){
      continue;
    }
    currSegment.map((int) => tempSum += Math.pow(int, 3));
    if (tempSum % 2 === 0){
      chunks.push(currSegment.reverse().join(""));
    } else {
      chunks.push(currSegment.slice(1).join("") + currSegment[0]);
    }
  }
  return chunks.join("");
}

// https://www.codewars.com/kata/56b5afb4ed1f6d5fb0000991 (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Digital Cypher (7 Kyu)

// Digital Cypher assigns to each letter of the alphabet unique number. For example:

//  a  b  c  d  e  f  g  h  i  j  k  l  m
//  1  2  3  4  5  6  7  8  9 10 11 12 13

//  n  o  p  q  r  s  t  u  v  w  x  y  z
// 14 15 16 17 18 19 20 21 22 23 24 25 26

// Instead of letters in encrypted word we write the corresponding number, eg. The word scout:

//  s  c  o  u  t
// 19  3 15 21 20

// Then we add to each obtained digit consecutive digits from the key. For example. In case of key equal to 1939 :

//    s  c  o  u  t
//   19  3 15 21 20
//  + 1  9  3  9  1
//  ---------------
//   20 12 18 30 21
  
//    m  a  s  t  e  r  p  i  e  c  e
//   13  1 19 20  5 18 16  9  5  3  5
// +  1  9  3  9  1  9  3  9  1  9  3
//   --------------------------------
//   14 10 22 29  6 27 19 18  6  12 8
// Task
// Write a function that accepts str string and key number and returns an array of integers representing encoded str.

// Input / Output
// The str input string consists of lowercase characters only.
// The key input number is a positive integer.

// Example
// Encode("scout",1939);  ==>  [ 20, 12, 18, 30, 21]
// Encode("masterpiece",1939);  ==>  [ 14, 10, 22, 29, 6, 27, 19, 18, 6, 12, 8]

function encode(str,  n){
  let alphaStr = 'abcdefghijklmnopqrstuvwxyz';
  let result = [];
  let nStr = n.toString();
  for (let i = 0; i < str.length; i++){
    result[i] = parseInt(alphaStr.indexOf(str[i]) + 1) + parseInt(nStr[i % nStr.length]);
  }
  return result;
}


let alphaStr = 'abcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < alphaStr.length; i++){
  console.log([i + 1, alphaStr[i]])
}

// https://www.codewars.com/kata/592e830e043b99888600002d (dcieslak)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// New Cashier Does Not Know About Space or Shift (6 Kyu)

// Some new cashiers started to work at your restaurant.
// They are good at taking orders, but they don't know how to capitalize words, or use a space bar!
// All the orders they create look something like this:

// "milkshakepizzachickenfriescokeburgerpizzasandwichmilkshakepizza"

// The kitchen staff are threatening to quit, because of how difficult it is to read the orders.
// Their preference is to get the orders as a nice clean string with spaces and capitals like so:

// "Burger Fries Chicken Pizza Pizza Pizza Sandwich Milkshake Milkshake Coke"

// The kitchen staff expect the items to be in the same order as they appear in the menu.
// The menu items are fairly simple, there is no overlap in the names of the items:

// 1. Burger
// 2. Fries
// 3. Chicken
// 4. Pizza
// 5. Sandwich
// 6. Onionrings
// 7. Milkshake
// 8. Coke

function countOccurences(string, substring){
  return string.split(substring).length - 1;
}

function getOrder(input) {
  let menu = {
    1: 'burger',
    2: 'fries',
    3: 'chicken',
    4: 'pizza',
    5: 'sandwich',
    6: 'onionrings',
    7: 'milkshake',
    8: 'coke'
  }
  
  let result = "";
  
  for (const menuItem in menu){
    if (input.includes(menu[menuItem])){
      result += `${menu[menuItem][0].toUpperCase() + menu[menuItem].substring(1)} `.repeat(countOccurences(input, menu[menuItem]))
    }
  }
  
  return result.trim();
  
}

// https://www.codewars.com/kata/5d23d89906f92a00267bb83d (jackdcasey)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// The old switcheroo (7 Kyu)

// Write a function vowel2index(str)
// that takes in a string and replaces all the vowels [a,e,i,o,u] with their respective positions within that string.
// E.g:

// vowel2index('this is my string') == 'th3s 6s my str15ng'
// vowel2index('Codewars is the best site in the world') == 'C2d4w6rs 10s th15 b18st s23t25 27n th32 w35rld'
// vowel2index('') == ''
// Your function should be case insensitive to the vowels.

function vowel2index(str) {
  let result = "";
  for (let i = 0; i < str.length; i++){
    if (/[aeiouAEIOU]/.test(str[i])){
      result += `${i + 1}`;
    } else {
      result += str[i];
    }
  }
  return result;
}

function vowel2index(str) {
  return str.split("").map((letter, i) => {
    if (/[aeiouAEIOU]/.test(letter)){
      return `${i + 1}`
    } else {
      return letter;
    }
  }).join("");
}

function vowel2index(str) {
  return str.replace(/[aeiouAEIOU]/g, (l, i) => i + 1);
}

// https://www.codewars.com/kata/55d410c492e6ed767000004f (joh_pot)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// for later:

// player moves associated die rolls (die1 and die2)
// if lands on ladder, move to associated location
// if lands on snake, move to associated location

// function SnakesLadders(die1, die2) {
//   return die1 + die2;
// };

// SnakesLadders.prototype.play = function(die1, die2) {
//   const ladders = {
//     1: 36,
//     6: 13,
//     7: 30,
//     14: 25,
//     20: 41,
//     27: 83,
//     35: 43,
//     50: 66,
//     70: 90,
//     77: 97,
//     86: 93
//   }
//   const snakes = {
//     15: 5,
//     45: 24,
//     48: 10,
//     61: 18,
//     63: 59,
//     73: 52,
//     88: 67,
//     91: 87,
//     94: 74,
//     98: 79
//   }
//   return SnakesLadders(die1, die2)
// }

// https://www.codewars.com/kata/587136ba2eefcb92a9000027

function checkDenoms(arr){
  return arr.every((int) => int === arr[0]);
}

function convertFrac(lst){
  const result = [];
  let numerators = [];
  let denominators = []; 
  
  for (let i = 0; i < lst.length; i++){
    numerators[i] = lst[i][0];
    denominators[i] = lst[i][1];
  }
  
  let i = 0;

  do {
      if (checkDenoms(denominators)){
          // done
          // for (let j = 0; j < denominators.length; j++){
          //     result[j] = [numerators[j], denominators[j]]
          // }
          break;
      }
      denominators = denominators.map((int) => int * 2);
      numerators = numerators.map((int) => int += 1);
      i++;
      console.log(numerators)
      console.log(denominators)
  } while (i < 3);
  
  return result;

}

var lst = [ [1, 2], [1, 3], [1, 4] ]

console.log(convertFrac(lst))