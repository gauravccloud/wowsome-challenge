/*
    Written By Gaurav Sharma
    Test Data: Provide your test data in test data js
    Run: npm run test
    Comment: In case of division make sure to 
    provide number which are perfectly dividing each other;
*/


function compute_operation(str1, str2, operator) {
    var num1 = convert_roman_to_num(str1);
    var num2 = convert_roman_to_num(str2);
    var result = 0;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = ((num1 > num2) ? (num1 - num2) : (num2 - num1));
            break;
        case '*':
            result = (num1 * num2)
            break;
        case '/':
            result = ((num1 - num2) ? (num1 / num2) : (num2 / num1));
            break;
    }
    return convert_num_to_roman(result);
}

function convert_num_to_roman(num) {
    var result = '';
    var numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var symbol = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    for (var i = 0; i < 13; i++) {
        while (num % numbers[i] < num) {
            result = result + symbol[i];
            num = num - numbers[i];
        }
    }
    return result;
}

function convert_roman_to_num(str) {
    var numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var symbol = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    var result = 0;
    for (var i = 0; i < 13; i++) {
        while (str.indexOf(symbol[i]) === 0) {
            result = result + numbers[i];
            str = str.replace(symbol[i], '');
        }
    }
    return result;
}

module.exports = compute_operation;