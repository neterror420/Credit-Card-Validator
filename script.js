function checkLuhn(input) {
	var sum = 0;
	var numdigits = input.length;
	var parity = numdigits % 2;
	for(var i=0; i < numdigits; i++) {
		var digit = parseInt(input.charAt(i))
		if(i % 2 == parity) digit *= 2;
		if(digit > 9) digit -= 9;
		sum += digit;
	}
	return (sum % 10) == 0;
};
function detectCard(input) {
	var typeTest = 'undefined',
		ltest1 = 16,
		ltest2 = 16;
	if(/^4/.test(input)){
		typeTest = 'visa';
		ltest1 = 13;
	} else if (/^5[1-5]/.test(input)){
		typeTest = 'mastercard';
	} else if (/^3[4-7]/.test(input)){
		typeTest = 'amex';
		ltest1 = 15;
    ltest2 = 15;
  } else if(/^6(011|4[4-9]|5)/.test(input)){
		typeTest = 'discover';
	}
	return [typeTest,ltest1,ltest2];
}


$('input.cc').keyup(function(){
	var val = this.value,
      val = val.replace(/[^0-9]/g, ''),
		detected = detectCard(val),
		errorClass = '',
    	luhnCheck = checkLuhn(val),
		valueCheck = (val.length == detected[1] || val.length == detected[2]);
  console.log(valueCheck);
	if(luhnCheck && valueCheck) {
		errorClass = 'verified';
	} else if(valueCheck || val.length > detected[2]) {
		errorClass = 'error';
  }
  
	$(this).attr('class', 'cc ' + detected[0] + ' ' + errorClass);
});