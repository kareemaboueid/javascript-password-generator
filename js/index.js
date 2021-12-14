'use strict';

// Password options
const passCharShort = document.querySelector('#passCharShort');
const passCharMedium = document.querySelector('#passCharMedium');
const passCharLong = document.querySelector('#passCharLong');

// operations buttons
const passGenerateBtn = document.querySelector('#passGenerateBtn');
const passGenerateResult = document.querySelector('#passGenerateResult');
const passCopyBtn = document.querySelector('#passCopyBtn');

// 1. Generate the ascii letters (a -> z) in both lowercase and uppercase:
function asciiLetters(transform) {
  let letters = [];
  for (let i = 97; i <= 122; i++) {
    if (transform == 'upper')
      letters.push(String.fromCharCode(i).toUpperCase());
    else if (transform == 'lower' || transform == null)
      letters.push(String.fromCharCode(i));
    else
      throw new Error(
        'please identify transform of ascii_letters (lower or upper)'
      );
  }
  return letters;
}

// 2. Generate the ascii digits (0 -> 9):
function asciiDigits() {
  let digits = [];
  for (let i = 0; i <= 9; i++) digits.push(i);
  return digits;
}

// shuffle arrays functions
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const r = Math.round(Math.random() * (i + 1));
    [arr[i], arr[r]] = [arr[r], arr[i]];
  }
  return arr;
}

// slice from array by percente
function sliceByPercente(object, percentage) {
  return Math.round((percentage / 100) * object);
}

// 3. store all characters shuffled in arrays:
const allLetterLowerCase = shuffle(asciiLetters());
const allLetterUpperCase = shuffle(asciiLetters('upper'));
const allDigits = shuffle(asciiDigits());

// 4. click on the generate button:
passGenerateBtn.addEventListener('click', e => {
  // prevent default
  e.preventDefault();

  // make an empty array to store password characters:
  let generatedPasswordArray = [];

  // get the shuffled parts from all letters and digits lists
  function generatPassword(length) {
    generatedPasswordArray.push(
      shuffle(allLetterUpperCase)
        .slice(0, sliceByPercente(length, 20))
        .join(''),
      shuffle(allLetterLowerCase)
        .slice(0, sliceByPercente(length, 60))
        .join(''),
      shuffle(allDigits).slice(0, sliceByPercente(length, 20)).join('')
    );
  }

  // Generate password according to password length aptions:

  // 1. if password length = 8 chars
  // Generate a 8 characters password
  if (passCharShort.checked) {
    generatPassword(8);
  }
  // 1. if password length = 10 chars
  // Generate a 10 characters password
  else if (passCharMedium.checked) {
    generatPassword(12);
  }
  // 1. if password length = 14 chars
  // Generate a 10 characters password
  else if (passCharLong.checked) {
    generatPassword(16);
  }

  // Generate the password:
  generatedPasswordArray = shuffle(generatedPasswordArray).join('').toString();

  setTimeout(() => {
    // print the password as a string
    passGenerateResult.innerHTML = `<span>${generatedPasswordArray}</span>`;
  }, 500);
});

// Copy the password to the clipboard
passCopyBtn.addEventListener('click', e => {
  // prevent default
  e.preventDefault();

  // make sure the password is generated
  if (passGenerateResult.textContent === 'your password here') {
    alert('Please generate a new password');
  } else {
    // Copy the text inside the password text field
    navigator.clipboard.writeText(passGenerateResult.textContent);
    document.querySelector('.ri-file-copy-line').classList.toggle('hidden');
    document.querySelector('.ri-check-line').classList.toggle('hidden');
    setTimeout(() => {
      document.querySelector('.ri-file-copy-line').classList.toggle('hidden');
      document.querySelector('.ri-check-line').classList.toggle('hidden');
    }, 1200);
  }
});
