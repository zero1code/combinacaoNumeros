function printCombinations(array: Array<number>, qtdPorArray: number): Array[] {

  const combination: Array<number> = [];
  const myArray: Array<string> = [];
  let counter = 0;

  function run(level: number, start: number): void {
    for (let i = start; i < array.length - qtdPorArray + level + 1; i++) {
      combination[level] = array[i];

      if (level < qtdPorArray - 1) {
        run(level + 1, i + 1);
      } else {

        if (counter < 2000) {
          myArray.push(combination.join(', '));

          // setCombinations(myArray);
        }
        counter++;
      }
    }
  }
  run(0, 0);
  // setCombinationsQuantity(counter);
  return [ myArray, counter ];
};

export default printCombinations;
