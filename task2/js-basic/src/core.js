//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return ~~n === n
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    const iMax = 20;

    let aiEven = [];
    for (let i = 2; i <= iMax; ++i){
        if (!(i % 2)){
            aiEven.push(i);
        }
    }
    return aiEven;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let iSum = 0;

    for (let i = 0; i < n + 1; ++i){
        iSum += i;
    }

    return iSum;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    let iSum = 0;

    if(n > 1){
        iSum = recSumTo(n-1);
    }
    iSum += n;
    
    return iSum;
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let iFactorial = 1;

    for (let i = 1; i <= n; ++i){
        iFactorial *= i;
    }

    return iFactorial;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {

    let isBin = true;

    if (n < 1){
        isBin = false;
    }

    while(isBin !== false && n > 1){
        isBin = !(n % 2);
        n /= 2;
    }

    return isBin;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {

    let n0 = 0;
    let n1 = 1;
    let buf = 0;

    for (let i = 1; i < n; ++i){
        buf = n1
        n1 += n0;
        n0 = buf;
    }

    return n === 0 ? n0 : n1;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let result = initialValue;

    return function(n) {
        if (operatorFn){
            result = operatorFn(result, n);
        }
        return result;
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    let iCurrentValue = start ?? 0;
    const iStep = step ?? 1;

    return function() {
        let result = iCurrentValue;
        iCurrentValue += iStep;
        return result;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    let isEqual = firstObject === secondObject;

    // Исключение: NaN
    // Не уверен, что deepEqual должен отрабатывать таким образом, если сам js так не отрабатывает
    if(typeof firstObject === 'number' && typeof secondObject === 'number' && isNaN(firstObject) && isNaN(secondObject)){
        isEqual = true;
    }
    
    if (isEqual != true && typeof firstObject === 'object' && typeof secondObject === 'object') {
        isEqual = true;

        const asFirstObjectKeys = Object.keys(firstObject);
        const asSecondObjectKeys = Object.keys(secondObject);

        if (asFirstObjectKeys.length === asSecondObjectKeys.length) {
            for (const sKey of asFirstObjectKeys){
                if (!deepEqual(firstObject[sKey], secondObject[sKey])){
                    isEqual = false;
                    break;
                }
            }
        } else {
            isEqual = false;
        }
    }
    
    return isEqual;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
