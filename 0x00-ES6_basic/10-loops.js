export default function appendToEachArrayValue(array, appendString) {
  const res = [...array]

  for (const value of res) {
    res[res.indexOf(value)] = appendString + value;
  }

  return res;
}
