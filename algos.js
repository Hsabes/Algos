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

// Integers: Recreation One (5 Kyu)

// 1, 246, 2, 123, 3, 82, 6, 41 are the divisors of number 246. Squaring these divisors we get: 1, 60516, 4, 15129, 9, 6724, 36, 1681. The sum of these squares is 84100 which is 290 * 290.

// Task
// Find all integers between m and n (m and n integers with 1 <= m <= n) such that the sum of their squared divisors is itself a square.

// We will return an array of subarrays or of tuples (in C an array of Pair) or a string. The subarrays (or tuples or Pairs) will have two elements: first the number the squared divisors of which is a square and then the sum of the squared divisors.

// Example:
// list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
// list_squared(42, 250) --> [[42, 2500], [246, 84100]]

function areDivisorsSquare(num) {
  const divisorsSquared = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      divisorsSquared.push(Math.pow(i, 2));
      if (i !== num / i) {
        divisorsSquared.push(Math.pow(num / i, 2));
      }
    }
  }
  let sum = divisorsSquared.reduce((a, b) => a + b, 0) || 1;
  if (Math.sqrt(sum) % 1 === 0){
    return [num, sum]
  }
}

function listSquared(m, n) {
  const result = [];
  for (let i = m; i <= n; i++) {
    const divisors = areDivisorsSquare(i);
    if (divisors) {
      result.push(divisors);
    }
  }
  return result;
}

// https://www.codewars.com/kata/55aa075506463dac6600010d (g964)

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

// Generate All Permutations

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

console.log(permute([1, 2, 3, 4, 5, 0]));

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

console.log(vowel2index("cAps and lOwErcasE"))

// https://www.codewars.com/kata/55d410c492e6ed767000004f (joh_pot)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// String incrementer (5 Kyu)

// Your job is to write a function which increments a string, to create a new string.

// If the string already ends with a number, the number should be incremented by 1.
// If the string does not end with a number. the number 1 should be appended to the new string.
// Examples:

// foo -> foo1
// foobar23 -> foobar24
// foo0042 -> foo0043
// foo9 -> foo10
// foo099 -> foo100

// Attention: If the number has leading zeros the amount of digits should be considered.

function incrementString (strng) {
  let result = "";
  if ((/[0-9]/).test(strng[strng.length - 1])){
    let match = strng.match(/(\d+)(?!.*\d)/);
    let num = match[0];
    result = strng.slice(0, match.index) + ((parseInt(num)) + 1).toString().padStart(num.length, '0');
  } else {
    result = strng + '1';
  }
  return result;
}

// https://www.codewars.com/kata/54a91a4883a7de5d7800009c (parceval)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// English Beggars (6 Kyu)

// Born a misinterpretation of this kata, your task here is pretty simple: 
// Given an array of values and an amount of beggars, you are supposed to return an array with the sum of what each beggar brings home, assuming they all take regular turns, from the first to the last.

// For example: [1,2,3,4,5] for 2 beggars will return a result of [9,6], as the first one takes [1,3,5], the second collects [2,4].

// The same array with 3 beggars would have in turn have produced a better out come for the second beggar: [5,7,3], as they will respectively take [1,4], [2,5] and [3].

// Also note that not all beggars have to take the same amount of "offers", meaning that the length of the array is not necessarily a multiple of n; length can be even shorter, in which case the last beggars will of course take nothing (0).

function beggars(values, n){
  let result = [...new Array(n)].map(x => 0);
  for (let i = 0; i < values.length; i++){
    result[i%n] += values[i];
  }
  return result;
}

// https://www.codewars.com/kata/59590976838112bfea0000fa (GiacomoSorbi)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// longest_palindrome (6 Kyu)

// Find the length of the longest substring in the given string s that is the same in reverse.
// As an example, if the input was “I like racecars that go fast”, the substring (racecar) length would be 7.
// If the length of the input string is 0, the return value must be 0.

// Example:
// "a" -> 1 
// "aab" -> 2  
// "abcde" -> 1
// "zzbaabcd" -> 4
// "" -> 0

// BRUTE FORCE

function isPalindrome(subStr){
  let revStr = ""
  for (let i = subStr.length - 1; i >= 0; i--){
    revStr += subStr[i];
  }
  return revStr === subStr;
}

function longestPalindrome(s){
  if (s.length < 2){
      return s.length;
  }
  let longest = "";
  for (let i = 0; i < s.length; i++){
    for (let j = 1; j < s.length; j++){
      let subStr = s.slice(i, j + 1);
      if (isPalindrome(subStr) && subStr.length > longest.length){
        longest = subStr;
      }
    }
  }
  return longest.length;
}

// https://www.codewars.com/kata/54bb6f887e5a80180900046b (kgashok)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// If you can read this... (6 Kyu)

// Convert a string to it's phonetic translation, separated by white space. 

function to_nato(words) {
  words = words.replace(/\s/g, "").toLowerCase();
  let result = "";
	for (let i = 0; i < words.length; i++){
    if (/[a-z]/.test(words[i])){
      result += `${NATO[words[i]]} `
    } else {
      result += `${words[i]} `
    }
  }
  return result.trim();
}

// https://www.codewars.com/kata/586538146b56991861000293 (henryhamon)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Reverse every other word in the string (6 Kyu)

// Reverse every other word in a given string, then return the string. 
// Throw away any leading or trailing whitespace, while ensuring there is exactly one space between each word. 
// Punctuation marks should be treated as if they are a part of the word in this kata.

function reverseStringByIndex(word, index){
  if (index % 2 !== 0){
    let reversedWord = "";
    for (let i = word.length - 1; i >= 0; i--){
      reversedWord += word[i];
    }
    return reversedWord;
  }
  return word;
}

function reverse(str){
  return str.split(" ").map((word, index) => reverseStringByIndex(word, index)).join(" ").trim();
}

// https://www.codewars.com/kata/58d76854024c72c3e20000de (Confettimaker)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

function deleteNth(arr,n){
  let result = [];
  let counts = {};
  for (let i = 0; i < arr.length; i++){
    let number = arr[i];
    counts[number] = counts[number] ? counts[number] + 1 : 1;
    if (counts[number] <= n){
      result.push(number)
    }
  }
  return result;
}

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Lottery Ticket (6 Kyu)

// Given a lottery ticket (ticket), represented by an array of 2-value arrays, you must find out if you've won the jackpot.

// Example ticket:

// [ [ 'ABC', 65 ], [ 'HGR', 74 ], [ 'BYHT', 74 ] ]
// To do this, you must first count the 'mini-wins' on your ticket. Each subarray has both a string and a number within it. If the character code of any of the characters in the string matches the number, you get a mini win. Note you can only have one mini win per sub array.

// Once you have counted all of your mini wins, compare that number to the other input provided (win). If your total is more than or equal to (win), return 'Winner!'. Else return 'Loser!'.

// All inputs will be in the correct format. Strings on tickets are not always the same length.

function bingo(ticket, win){
  let count = 0;
  for (let i = 0; i < ticket.length; i++){
    let subArr = ticket[i];
    let str = subArr[0];
    for (let j = 0; j < str.length; j++){
      if (str.charCodeAt(j) === subArr[1]){
        count++;
      }
    }
  }
  return count >= win ? 'Winner!' : 'Loser!';
}

// https://www.codewars.com/kata/57f625992f4d53c24200070e (PG1)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// ATM money counter (6 Kyu)

// Imagine that we have ATM with multiple currencies. The users can withdraw money of in any currency that the ATM has.

// Our function must analyze the currency and value of what the users wants, and give money to the user starting from bigger values to smaller. The ATM gives the least amount of notes possible.

// This kata has a preloaded dictionary of possible bank note values for different currencies (RUB, EUR, UAH, USD, CUP, SOS):

// const VALUES = { "EUR": [5, 10, 20, 50, 100, 200, 500], "USD": ... }
// // Note: VALUES and its internal arrays are frozen, don't try to mutate them
// The function should return a string containing how many bank notes of each value the ATM will give out, for example:

// "8 * 100 USD, 2 * 20 USD, 1 * 2 USD"
// If it can't do that because there are no notes for this value, it should return:

// "Can't do *value* *currency*. Value must be divisible by *amount*!"
// (replace *value*, *currency* and *amount* with the relevant details)

// If it doesn't have the requested currency at all, it should return:

// "Sorry, have no *currency*."

function atm(value) {
  
  let amount = parseInt(value.match(/[0-9]+/g)[0]);
  const currency = value.match(/[a-zA-Z]+/g).join("").toUpperCase();
  const notes = CURRENCIES[currency];
    
  if (!notes){
    return `Sorry, have no ${currency}.`
  } else if (amount % notes[0] !== 0){
    return `Can't do ${amount} ${currency}. Value must be divisible by ${notes[0]}!`;
  }
  
  let result = "";
  
  for (let i = notes.length - 1; i >= 0; i--){
    if (amount >= notes[i]){
      result += `${Math.floor(amount / notes[i])} * ${notes[i]} ${currency}, `
      amount -= (Math.floor(amount / notes[i]) * notes[i]);
    } else {
      continue;
    }
  }
  
  return result.substring(0, result.length - 2);
  
}

// https://www.codewars.com/kata/5665a6a07b5afe0aba00003a (ost-k)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Consecutive Strings (6 Kyu)

// You are given an array(list) strarr of strings and an integer k. Your task is to return the first longest string consisting of k consecutive strings taken in the array.

// Examples:
// strarr = ["tree", "foling", "trashy", "blue", "abcdef", "uvwxyz"], k = 2

// Concatenate the consecutive strings of strarr by 2, we get:

// treefoling   (length 10)  concatenation of strarr[0] and strarr[1]
// folingtrashy ("      12)  concatenation of strarr[1] and strarr[2]
// trashyblue   ("      10)  concatenation of strarr[2] and strarr[3]
// blueabcdef   ("      10)  concatenation of strarr[3] and strarr[4]
// abcdefuvwxyz ("      12)  concatenation of strarr[4] and strarr[5]

// Two strings are the longest: "folingtrashy" and "abcdefuvwxyz".
// The first that came is "folingtrashy" so 
// longest_consec(strarr, 2) should return "folingtrashy".

// In the same way:
// longest_consec(["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"], 2) --> "abigailtheta"
// n being the length of the string array, if n = 0 or k > n or k <= 0 return "" (return Nothing in Elm, "nothing" in Erlang).

// Note
// consecutive strings : follow one after another without an interruption

function longestConsec(strarr, k) {
  if (k <= 0){
    return "";
  }
  let result = "";
  for (let i = 0; i <= strarr.length - k; i++){
    let tempStr = strarr.slice(i, i + k).join("");
    if (tempStr.length > result.length){
      result = tempStr;
    }
  }
  return result;
}

// https://www.codewars.com/kata/56a5d994ac971f1ac500003e (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Clean up after your dog (7 Kyu)

// You have stumbled across the divine pleasure that is owning a dog and a garden. Now time to pick up all the cr@p! :D

// Given a 2D array to represent your garden, you must find and collect all of the dog cr@p - represented by '@'.

// You will also be given the number of bags you have access to (bags), and the capactity of a bag (cap). If there are no bags then you can't pick anything up, so you can ignore cap.

// You need to find out if you have enough capacity to collect all the cr@p and make your garden clean again.

// If you do, return 'Clean', else return 'Cr@p'.

// Watch out though - if your dog is out there ('D'), he gets very touchy about being watched. If he is there you need to return 'Dog!!'.

// For example:

// x=
// [[_,_,_,_,_,_]
// [_,_,_,_,@,_]
// [@,_,_,_,_,_]]

// bags = 2, cap = 2

// return --> 'Clean'

function crp(x, bags, cap){
  let count = 0;
  let flatArr = x.flat().filter((x) => x === '@' || x === 'D');
  for (let i = 0; i < flatArr.length; i++){
    if (flatArr[i] === 'D'){
      return 'Dog!!';
    }
    count++;
  }
  return count > cap * bags ? 'Crp' : 'Clean';
}

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

function updateInventory(curStock, newStock) {
  const stock = {};
  const result = [];
  
  for (let i = 0; i < curStock.length; i++){
    let item = curStock[i];
    stock[item[1]] = item[0]
  }
  
  for (let i = 0; i < newStock.length; i++){
    let item = newStock[i];
    let name = item[1];
    let count = item[0];
    if (stock[name]){
      stock[name] += count;
    } else {
      stock[name] = count;
    }
  }
  
  for (const item in stock){
    result.push([stock[item], item])
  }
  
  return result.sort((x, y) => x[1].localeCompare(y[1]));
}

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

function isPrime(num) {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

function gap(g, m, n) {
  let prevPrime = 0;
  for (let i = m; i <= n; i++){
    if (isPrime(i)){
      if (i - prevPrime === g){
        return [prevPrime, i];
      } else {
        prevPrime = i;
      }
    }
  }
  return null;
}

console.log(gap(2,100,110))

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// **AUTHORED KATA**

// Yahtzee: Did You Make the Upper Section? (7 Kyu)

// In the game of Yahtzee, there are two sections: The upper section and the lower section. Players roll 5 dice each turn and fill in various fields with the appropriate scores. Finally, they total up the score in each section and whoever has the highest cumulative score wins the game.

// In this Kata we are only focusing on calculating the total score of the upper section. The upper section is comprised of six fields for each side of the dice (1 through 6). Every turn you score a field by summing the values of the dice that show the corresponding field. For example, if you were to roll 3 twos you would have a score of 6 in the twos field (2 * 3 = 6). If the total sum of each field in the upper section is greater than or equal to 63, the player receives a bonus of 35 points.

// Assume the game has already been played and you are now adding up your scores. Suppose each field in the upper section doesn’t contain the total score of each field, but rather the amount of dice you rolled for that specific field.

// For input [2, 3, 3, 4, 2, 3, 2]:
// Ones:   2 => (1 * 2 = 2)
// Twos:   3 => (2 * 3 = 6)
// Threes: 3 => (3 * 3 = 9)
// Fours:  4 => (4 * 4 = 16)
// Fives:  2 => (5 * 2 = 10)
// Sixes:  3 => (6 * 3 = 18)
// Total:  2 + 6 + 9 + 16 + 10 + 18 = 63/63
// Result: Pass
// Given the number of dice rolled per field where 0 <= diceRolledPerField <= 5, determine whether or not you receive the 35 points bonus. Return true if you do, false otherwise. You can assume that the array will always be in order such that ones are first and sixes are last.

// Examples:

// [3, 3, 3, 3, 3, 3] => true (total score is 63/63)
// [2, 3, 4, 3, 3, 3] => true (total score is 66/63)
// [3, 4, 2, 2, 3, 2] => false (total score is 52/63)
// Optional bonus: Can you do it without calculating the total score for the upper section (in other words, checking if the total score >= 63)?

// SOLUTION

function isPassingUpper(arr){
  let count = 0
  for (let i = 0; i < arr.length; i++){
    count += (arr[i] - 3) * (i + 1);
  }
  return count >= 0;
}

// TESTING

const chai = require("chai"),
      assert = chai.assert;

describe("isPassingUpper",function() {
  it("Randomized Tests",function() {  
    
    function isPassingUpperTester(arr){
      let count = 0
      for (let i = 0; i < arr.length; i++){
        count += (arr[i] - 3) * (i + 1);
      }
      return count >= 0;
    }
    
    function permute(array) {
      var length = array.length,
          result = [array.slice()],
          c = new Array(length).fill(0),
          i = 1, k, p;

      while (i < length) {
        if (c[i] < i) {
          k = i % 2 && c[i];
          p = array[i];
          array[i] = array[k];
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
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    let rolls = permute(shuffleArray([0,1,2,3,4,5]))
    
    for (const roll of rolls){
      assert.deepEqual(isPassingUpper([...roll]), isPassingUpperTester(roll), `Roll ${JSON.stringify(roll)}`);               
    }
    
})});

// Things learned from this experience:
// Input mutation is a thing. This can be avoided by passing a copy of the input to the user, and passing the actual input into the tester functions.
// If your iterator involves writing a lot of el = arr[i], just do a for...of loop.
// Be VERY attentative to the description...
// Never close an issue unless you're sure your fix is correct.
// Prepend tester functions with something to make it stand out more that it's a tester function, ie testIsPassingUpper or refIsPassingUpper
// JSON.stringify() will show the array with brackets instead of wrapping them yourself

// https://www.codewars.com/kata/6596c9a292fe7904dd3e5dfb (Authored by me: Hsabes)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================\

// Valid Phone Number (6 Kyu)

// Write a function that accepts a string, and returns true if it is in the form of a phone number.
// Assume that any integer from 0-9 in any of the spots will produce a valid phone number.

// Only worry about the following format:
// (123) 456-7890 (don't forget the space after the close parentheses)

// Examples:

// "(123) 456-7890"  => true
// "(1111)555 2345"  => false
// "(098) 123 4567"  => false

function validPhoneNumber(phoneNumber){
  return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(phoneNumber);
}

validPhoneNumber();

// https://www.codewars.com/kata/525f47c79f2f25a4db000025 (xDranik)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Help the bookseller! (6 Kyu)

// A bookseller has lots of books classified in 26 categories labeled A, B, ... Z. Each book has a code c of 3, 4, 5 or more characters. The 1st character of a code is a capital letter which defines the book category.

// In the bookseller's stocklist each code c is followed by a space and by a positive integer n (int n >= 0) which indicates the quantity of books of this code in stock.

// For example an extract of a stocklist could be:

// L = {"ABART 20", "CDXEF 50", "BKWRK 25", "BTSQZ 89", "DRTYM 60"}.
// or
// L = ["ABART 20", "CDXEF 50", "BKWRK 25", "BTSQZ 89", "DRTYM 60"] or ....
// You will be given a stocklist (e.g. : L) and a list of categories in capital letters e.g :

// M = {"A", "B", "C", "W"} 
// or
// M = ["A", "B", "C", "W"] or ...
// and your task is to find all the books of L with codes belonging to each category of M and to sum their quantity according to each category.

// For the lists L and M of example you have to return the string (in Haskell/Clojure/Racket/Prolog a list of pairs):

// (A : 20) - (B : 114) - (C : 50) - (W : 0)
// where A, B, C, W are the categories, 20 is the sum of the unique book of category A, 114 the sum corresponding to "BKWRK" and "BTSQZ", 50 corresponding to "CDXEF" and 0 to category 'W' since there are no code beginning with W.

// If L or M are empty return string is "" (Clojure/Racket/Prolog should return an empty array/list instead).



function stockList(listOfArt, listOfCat){
  let res = "";
  if (!listOfArt.length || !listOfCat.length){
    return res;
  }
  for (let i = 0; i < listOfCat.length; i++){
    let total = 0;
    let category = listOfCat[i];;
    for (let j = 0; j < listOfArt.length; j++){
      let arr = listOfArt[j].split(" ");
      let code = arr[0];
      let quantity = parseInt(arr[1])
      if (code[0] === category){
        total += quantity;
      }
    }
    res += `(${category} : ${total}) - `
  }
  return res.slice(0, -3);
}

stockList()

// https://www.codewars.com/kata/54dc6f5a224c26032800005c (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Reverse Linked List (6 Kyu)

// Let's say we have a singly linked list.
// Empty list is represented by null or equivalent (nil in Ruby).
// Non-empty list is represented by 2-element array [value, tail].

// So for example list with values 1, 2, 3 would be represented as [1, [2, [3, null]]].

// Your job is to develop function reverseList which returns elements of given list in reverse order without modification of the original list.

// P.S. Make sure your solution works on huge lists.

function reverseLinkedList(list){
  let result = null;
  while (list){
    result = [list[0], result];
    list = list[1]
  }
  return result;
}

reverseLinkedList()

// https://www.codewars.com/kata/52f6be83172a8ba0be000342 (vgrichina)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Linked Lists - Length and Count (6 Kyu)

// Linked Lists - Length & Count

// Implement Length() to count the number of nodes in a linked list.

// length(null) => 0
// length(1 -> 2 -> 3 -> null) => 3
// Implement Count() to count the occurrences of an integer in a linked list.

// count(null, 1) => 0
// count(1 -> 2 -> 3 -> null, 1) => 1
// count(1 -> 1 -> 1 -> 2 -> 2 -> 2 -> 2 -> 3 -> 3 -> null, 2) => 4
// I've decided to bundle these two functions within the same Kata since they are both very similar.

function Node(data) {
  console.log(data)
  this.data = data;
  this.next = null;
}

function length(head) {
  let length = 0;
  while (head){
    length++
    head = head.next;
  }
  return length;
}

function count(head, data) {
  let count = 0;
  while (head){
    if (head.data === data){
      count++
    }
    head = head.next;
  }
  return count;
}

function length(head, num = 0) {
  if (head){
    return length(head.next, num + 1);
  }
  return num;
}

function count(head, data, num = 0) {
  if (head){
    return head.data === data ? 
      count(head.next, data, num + 1) : 
      count(head.next, data, num);
  }
  return num;
}

length()
count()

// https://www.codewars.com/kata/55beec7dd347078289000021 (JDeBolt)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

function tribonacci(signature,n){
  let length = signature.length;
  for (let i = 0; i < n - length; i++){
    signature.push(signature.slice(i, i + 3).reduce((a, b) => a + b, 0));
  }
  return signature.slice(0, n);
}

tribonacci();

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

function stringTransformer(str) {
  let strArr = str.split(" ").reverse().join(" ");
  let res = "";
  for (let i = 0; i < strArr.length; i++){
    let char = strArr[i];
    if (char === char.toUpperCase() && char !== char.toLowerCase()){
      res += char.toLowerCase();
    } else {
      res += char.toUpperCase();
    }
  }
  return res;
}

stringTransformer();

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// LeetCode 459.Repeated Substring Pattern

var repeatedSubstringPattern = function(s) {
  for (let i = 0; i < Math.floor(s.length / 2); i++){
      let len = i + 1;
      if (s.length % len){
          continue;
      }
      let substr = s.substring(0, len);
      let regex = new RegExp(substr, 'g');
      if (s.match(regex).join('') === s){
          return true;
      }
  }
  return false;
};

repeatedSubstringPattern()


// ================================================================================================
// ************************************************************************************************
// ================================================================================================

var isValid = function(s) {
  if (s.length % 2){
      return false;
  }
  while (s.includes('()') || s.includes('{}') || s.includes('[]')){
      s = s.replaceAll('()', '');
      s = s.replaceAll('{}', '');
      s = s.replaceAll('[]', '');
  }
  return !s.length
};

isValid()

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Search Insert Position (EASY)

// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [1,3,5,6], target = 5
// Output: 2
// Example 2:

// Input: nums = [1,3,5,6], target = 2
// Output: 1
// Example 3:

// Input: nums = [1,3,5,6], target = 7
// Output: 4
 
// Constraints:

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums contains distinct values sorted in ascending order.
// -104 <= target <= 104

var searchInsert = function(nums, target) {
  if (nums[nums.length - 1] < target){
      return nums.length;
  }
  for (let i = 0; i <= nums.length; i++){
      if (nums[i] >= target){
          return i;
      }
  }
};

searchInsert();

// 35. Search Insert Position (LeetCode)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Search a 2D Matrix (MEDIUM)

// You are given an m x n integer matrix matrix with the following two properties:

// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.

// You must write a solution in O(log(m * n)) time complexity.

var searchMatrix = function(matrix, target) {
  let lastRow = matrix[matrix.length - 1]
  if (matrix[0][0] > target || lastRow[lastRow.length - 1] < target){
      return false;
  }
  for (let i = 0; i < matrix.length; i++){
      let subArr = matrix[i];
      if (subArr.includes(target)){
          return true;
      }
      if (target < subArr[subArr.length - 1]){
          return false;
      }
  }
};

searchMatrix();

// 74. Search a 2D Matrix (LeetCode)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// extract portion of file name (6 Kyu)

// You have to extract a portion of the file name as follows:

// Assume it will start with date represented as long number
// Followed by an underscore
// You'll have then a filename with an extension
// it will always have an extra extension at the end
// Inputs:
// 1231231223123131_FILE_NAME.EXTENSION.OTHEREXTENSION

// 1_This_is_an_otherExample.mpg.OTHEREXTENSIONadasdassdassds34

// 1231231223123131_myFile.tar.gz2
// Outputs
// FILE_NAME.EXTENSION

// This_is_an_otherExample.mpg

// myFile.tar
// Acceptable characters for random tests:

// abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789

class FileNameExtractor {
  static extractFileName (s) {
      s = s.slice(s.match('_').index + 1);
      return s.split('.').slice(0, 2).join('.')
  }
}

class FileNameExtractor {
  static extractFileName (s) {
      return s.slice(s.indexOf('_') + 1, s.lastIndexOf('.'));
  }
}

function extractFileName(s){
  return s.slice(s.indexOf('_') + 1, s.lastIndexOf('.'));
}

extractFileName()

// https://www.codewars.com/kata/597770e98b4b340e5b000071 (Javatlacati)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Split In Parts (7 Kyu)

// The aim of this kata is to split a given string into different strings of equal size (note size of strings is passed to the method)

// Example:

// Split the below string into other strings of size #3

// 'supercalifragilisticexpialidocious'

// Will return a new string
// 'sup erc ali fra gil ist ice xpi ali doc iou s'
// Assumptions:

// String length is always greater than 0
// String has no spaces
// Size is always positive

var splitInParts = function(s, partLength){
  const res = [];
  for (let i = 0; i < s.length; i += partLength){
    res.push(s.substring(i, i + partLength));
  }
  return res.join(' ');
}

splitInParts()

// https://www.codewars.com/kata/5650ab06d11d675371000003 (bmw318mt)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Array Deep Count (6 Kyu)

// You are given an array. Complete the function that returns the number of ALL elements within an array, including any nested arrays.

// Examples
// []                   -->  0
// [1, 2, 3]            -->  3
// ["x", "y", ["z"]]    -->  4
// [1, 2, [3, 4, [5]]]  -->  7
// The input will always be an array.

function deepCount(arr){
  let count = arr?.length;
  for (let i = 0; i < count; i++){
    if (Array.isArray(arr[i])){
      count += deepCount(arr[i]);
    }
  }
  return count;
}

function deepCount(arr){
  let count = 0;
  for (let i = 0; i < arr.length; i++){
    count++;
    if (Array.isArray(arr[i])){
      count += deepCount(arr[i]);
    }
  }
  return count;
}

deepCount();

// https://www.codewars.com/kata/596f72bbe7cd7296d1000029 (hannahcmtucker)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Prize Draw (6 Kyu)

// To participate in a prize draw each one gives his/her firstname.
// Each letter of a firstname has a value which is its rank in the English alphabet. A and a have rank 1, B and b rank 2 and so on.
// The length of the firstname is added to the sum of these ranks hence a number som.
// An array of random weights is linked to the firstnames and each som is multiplied by its corresponding weight to get what they call a winning number.

// Example:
// names: "COLIN,AMANDBA,AMANDAB,CAROL,PauL,JOSEPH"
// weights: [1, 4, 4, 5, 2, 1]

// PauL -> som = length of firstname + 16 + 1 + 21 + 12 = 4 + 50 -> 54
// The *weight* associated with PauL is 2 so PauL's *winning number* is 54 * 2 = 108.
// Now one can sort the firstnames in decreasing order of the winning numbers. When two people have the same winning number sort them alphabetically by their firstnames.

// Task:
// parameters: st a string of firstnames, we an array of weights, n a rank

// return: the firstname of the participant whose rank is n (ranks are numbered from 1)

// Example:
// names: "COLIN,AMANDBA,AMANDAB,CAROL,PauL,JOSEPH"
// weights: [1, 4, 4, 5, 2, 1]
// n: 4
// The function should return: "PauL"

// Notes:
// The weight array is at least as long as the number of names, it may be longer.
// If st is empty return "No participants".
// If n is greater than the number of participants then return "Not enough participants".

function calculateRank(name, length){
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  let result = length;
  for (let i = 0; i < name.length; i++){
    result += alpha.indexOf(name[i]) + 1;
  }
  return result;
}

function rank(st, we, n) {
  if (!st) return "No participants";
  if (we.length < n) return "Not enough participants";
  const winningNums = [];
  const names = st.split(',');
  for (let i = 0; i < names.length; i++){
    let name = names[i];
    winningNums.push({name: name, score: (calculateRank(name.toLowerCase(), name.length)) * we[i]})
  }
  const sorted = winningNums.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return sorted[n - 1].name;
}

rank();

// https://www.codewars.com/kata/5616868c81a0f281e500005c (g964)

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// 5. Longest Palindromic Substring (MEDIUM)

// Given a string s, return the longest palindromic substring

// PERFORMANT SOLUTION

function getLongest(s, left, right){
  while (left >= 0 && right < s.length && s[left] === s[right]){ // while left is in bounds and right is in bounds
      left--;
      right++;
  }
  return right - left - 1; // return length of longest, from which you can get start and end indeces
}

function longestPalindrome(s){
  if (!s){
      return "";
  }
  let startPoint = 0;
  let endPoint = 0;
  for (let i = 0; i < s.length; i++){
      let even = getLongest(s, i, i + 1); // get longest even length palindrome
      let odd = getLongest(s, i, i); // get longest odd length palindrome
      // odd starts at i and i + 1 otherwise we miss potential palindromes
      let longest = Math.max(even, odd); // longest length between longest even and longest odd
          console.log('-')
          console.log('longest: ' + longest)

      if (longest > endPoint - startPoint){ // if longest > current longest (end - start)
          startPoint = i - Math.floor((longest - 1) / 2); 
          // subtract length of first half of palindrome from i to get start index
              console.log('start pointer: ' + startPoint)
              console.log('index: ' + i)
          endPoint = i + Math.floor(longest / 2); 
          // add length of second half of palindrome to i to get
              console.log('end pointer: ' + endPoint)
              console.log('current longest palindrome length: ' + (endPoint - startPoint))
      } else {
          console.log('palindrome is not longest')
      }
  }
  return s.substring(startPoint, endPoint + 1);
}

function getLongest(s, left, right){
  while (left >= 0 && right < s.length && s[left] === s[right]){
      left--;
      right++;
  }
  return right - left - 1;
}

function longestPalindrome(s){
  if (!s){
      return "";
  }
  let startPoint = 0;
  let endPoint = 0;
  for (let i = 0; i < s.length; i++){
      let evenLongest = getLongest(s, i, i + 1);
      let oddLongest = getLongest(s, i, i);
      let longest = Math.max(evenLongest, oddLongest); 

      if (longest > endPoint - startPoint){
          startPoint = i - Math.floor((longest - 1) / 2); 
          endPoint = i + Math.floor(longest / 2); 
      }
  }
  return s.substring(startPoint, endPoint + 1);
}

longestPalindrome()

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

function travel(r, zipcode) {
  const ads = r.split(',');
  let streetNums = [];
  let streets = [];
  for (let i = 0; i < ads.length; i++){
    let ad = ads[i];
    if (ad.substring(ad.length - 8) === zipcode){
      streetNums.push(ad.substring(ad.indexOf(" "), -1))
      streets.push(ad.substring(ad.indexOf(" ") + 1, ad.length - 9));
    }
  }
  return `${zipcode}:${streets.join(",")}/${streetNums.join().trim()}`
}

travel();

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

var findWordsContaining = function(words, x) {
  const result = [];
  for (let i = 0; i < words.length ; i++){
      let word = words[i];
      if (word.includes(x)){
          result.push(i);
          continue;
      }
  }
  return result;
};

findWordsContaining();

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

var shuffle = function(nums, n) {
  let result = [];
  for (let i = 0; i < n; i++){
      result.push(nums[i], nums[i + n]);
  }
  return result;
};

shuffle();

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// Sum of Cubes (7 Kyu)

// Write a function that takes a positive integer n, sums all the cubed values from 1 to n (inclusive), and returns that sum.

// Assume that the input n will always be a positive integer.

// Examples: (Input --> output)

// 2 --> 9 (sum of the cubes of 1 and 2 is 1 + 8)
// 3 --> 36 (sum of the cubes of 1, 2, and 3 is 1 + 8 + 27)

function sumCubes(n){
  let range = [...Array(n + 1).keys()];
  return range.map((x) => x*x*x).reduce((a, b) => a + b);
}

function sumCubes(n){
  return n <= 1 ? n**3 : sumCubes(n - 1) + n**3;
}

function sumCubes(n){
  return (n * (n + 1) / 2) ** 2;
}

sumCubes();

// https://www.codewars.com/kata/59a8570b570190d313000037 (MementoMori)

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

// ================================================================================================
// ************************************************************************************************
// ================================================================================================

// 1437. Check If All 1's Are at Least Length K Places Away (LeetCode)

// Given an binary array nums and an integer k, return true if all 1's are at least k places away from each other, otherwise return false.

// Input: nums = [1,0,0,0,1,0,0,1], k = 2
// Output: true
// Explanation: Each of the 1s are at least 2 places away from each other.

var kLengthApart = function(nums, k) {
    let counter = 0;
    let found = false;
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (num || found){
            if (num && found) {
                if (counter < k){
                    return false;
                }
                counter = 0;
            }
            if (!found){
                found = true;
            }
            if (!num && found) {
                counter++;
            }
        }
    }
    return true;
};

