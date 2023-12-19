const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {

        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(!!dic, true);
        });

        it('set отрабатывает корректно', () => {
            const dic = new core.Dictionary();

            const word = 'developer'
            const definition = 'a person who solves a problem you didn\'t know you had,' + 
                ' in a way that you don\'t uderstand';

            dic.set(word, definition);

            assert.strictEqual(dic.get(word), definition);
        });

        it('проверка на <string, string> в set', () => {
            const dic = new core.Dictionary();

            const word = 'meaning of life'
            const definition = 42;

            dic.set(word, definition);
            assert.strictEqual(dic[word], undefined);
        });
    });
});