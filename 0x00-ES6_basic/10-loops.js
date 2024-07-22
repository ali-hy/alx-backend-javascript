export default function appendToEachArrayValue(array, appendString) {
  const res = [...array];

  for (const [i, value] of res.entries()) {
    res[i] = appendString + value;
  }

  return res;
}
