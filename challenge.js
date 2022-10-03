const validChars = ['(', ')', '{', '}', '[', ']'];

const currentString = '()][{}[]';

function isValid(string) {

  try {
    const array = string.split('');
    const validateStringType = array.every(char => validChars.includes(char));
    if (!validateStringType) throw new Error('Invalid string type');

    array.forEach((char) => {
      const filterCharIndexes = array.reduce((acc, curr, index) => {
        if (char === curr) {
          acc.push(index);
        }
        return acc;
      }, []);

      const verifyCases = (pairChar) => {
        const filterPairIndexes = array.reduce((acc, curr, index) => {
          if (curr === pairChar) {
              acc.push(index);
          }
          return acc;
        }, []);
        const verifyGreater = filterPairIndexes.every((current, index) => current > filterCharIndexes[index]);
        if (filterPairIndexes.length !== filterCharIndexes.length || !verifyGreater) throw new Error('Invalid string');
      }

      const possibleCases = () => {
        const cases = {
            '(': () => verifyCases(')'),
            '{': () => verifyCases('}'),
            '[': () => verifyCases(']'),
        };
        const isCaseValid = cases[char] && cases[char]();
        return isCaseValid || null;
      };
      possibleCases();
    });

    console.log('Valid string');

  } catch (error) {
    console.log(error);
  }
}

isValid(currentString);