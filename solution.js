
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const giveMeTheSnafu = (number) => {
    let n = 0
    let done = false
    let fufu = []
    while (!done) {
        // number = multipla * power + modulo
        let power = Math.pow(5, n)
        let modulo = number % power
        let multipla = number / power 
        if (multipla > 2) {
            // if multipla > 0, it means I must write the snafu with a higher power so number = "multipla2 * power2 + multipla * power
            if (modulo == 0) {
                if (n != 0) { // I think i am always 1 n behind relative to my power thingy thus i don't want to push a zero "when n is -1"
                    fufu.push(0)
                }
            }
            if (modulo != 0) {
                let beforePower = Math.pow(5, n - 1)
                if (modulo > (2*beforePower)) {
                    let reste = modulo - power
                    fufu.push(reste/beforePower)
                    number = number - reste
                } else {
                    let reste = modulo
                    fufu.push(reste/beforePower)
                    number = number - reste
                }          
            }
            n++
        } else { // i guess if multipla <= 2 
            if (modulo == 0) { 
                fufu.push(0)
                fufu.push(multipla)
            }
            if (modulo != 0) {
                let beforePower = Math.pow(5, n - 1)
                if (modulo > (2 * beforePower)) {
                    let reste = (modulo - power) / beforePower
                    fufu.push(reste)
                    let multiplaPlus = Math.floor(multipla) + 1
                    fufu.push(multiplaPlus)
                } else {
                    let reste = modulo / beforePower
                    fufu.push(reste)
                    fufu.push(Math.floor(multipla))
                }
            }
            done = true
        }
    }
    let result = [...fufu]
    function formatArray(x) {
        var value;
        if (x == -1) {
            value = '-';
        } else if (x == -2) {
            value = '=';
        } else {
            value = x;
        }
        return value;
    }
    let addingMinusEqual = result.map(formatArray)
    let stringAnswer = addingMinusEqual.toString()
    let str=stringAnswer.replaceAll(',','');
    return(str)
}


const main = () => {
    const dataArray = []
    const fileStream = createReadStream('./input.txt');

    const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    rl.on('line', (line) => {
        dataArray.push(line)
    });

    rl.on('close', () => {
        console.log(solution(dataArray))
    });
    
}

const solution = (dataArray) => {
    let decimalDataArray = dataArray.map(x => {
        let stringLength = x.length
        let stringArray = x.split('')
        let reversedArray = stringArray.reverse()
        let n = 0;
        var result = 0
        while (n < stringLength) {
        let multiplier = Math.pow(5, n)
        let target = reversedArray[n]
        if (target === '=') {
            result = result + (-2 * multiplier)
        }
        if (target === '-') {
            result = result + (-1 * multiplier)
        }
        if (target === '1') {
            result = result + multiplier
        }
        if (target === '2') {
            result = result + (2 * multiplier)
        }
        n++;
    }
    return(result)    
  });
  let arrayLength = decimalDataArray.length
  let o = 0;
  var decimalResult = 0
  while (o < arrayLength) {
    decimalResult = decimalResult + decimalDataArray[o]
    o++
  }
  return(giveMeTheSnafu(decimalResult))
}

main();


