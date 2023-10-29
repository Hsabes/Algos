// Word a10n (abbreviation)

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

// Encrypt this!

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

// Write Number in Expanded Form

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