const possibleValues = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];
export default function generateRandomHexCode() {
  let hexCode = '';
  for (let i = 0; i < 6; i++) {
    hexCode += possibleValues[generateRandomNumber(possibleValues.length - 1)];
  }
  // console.log('#' + hexCode);
  return '#' + hexCode;
}

export function generateRandomRGBCode() {
  let r = generateRandomNumber(255);
  let g = generateRandomNumber(255);
  let b = generateRandomNumber(255);
  // console.log('#' + hexCode);
  return `rgb(${r},${g},${b})`;
}

function generateRandomNumber(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}
