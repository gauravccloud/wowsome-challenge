var expect = require('chai').expect;
var compute_operation = require('./solution');
var testData = require('./testdata');

describe('#operation()', function() {
    it('should give correct result', function() {
        for (var i = 0; i < testData.length; i++) {
            var test1_str1 = testData[i].str1;
            var test1_str2 = testData[i].str2;
            var test1_operator = testData[i].operator;
            var result = testData[i].result;
            expect(compute_operation(test1_str1, test1_str2, test1_operator)).to.be.string;
            expect(compute_operation(test1_str1, test1_str2, test1_operator)).to.be.equal(result);
        }
    });
});