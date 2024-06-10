import { getClasses } from "./getClasses";

getClasses();

const obj = {
  a: "Alpha",
  b: "Beta",
};

const newObg = { ...obj, c: "Charlie" };
/**
 * Происходит транспиляция. Разница между транспиляцией и компиляцией в том,
 * что компиляция - перевод на другой язык. А транспиляция - перевод на тот же язык, но более старую версию
 */
console.log(newObg);
