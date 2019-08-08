# Credit-Card-Validator
Validate, Verify &amp; Check Credit Card or Debit Card Number. The data you enter will not be saved.

## How to use

### **Click [here](https://neterror.pw/credit-card-validator) to start using the validator.**

or access https://neterror.pw/credit-card-validator.


## Features

### Card Detection

The validator can tell you the card type by the code you enter.
![Accepted Credit Cards](https://i.imgur.com/hwdXWRR.jpg)

### Format Verification

The validator will check if your credit card number has the proper format. Your credit card number should look like this:

1234 5678 9876 5432

XXXX XXXX XXXX XXXX


![Example](http://www.inovseg.net.br/wp-content/uploads/2017/02/inovseg-produtos-cartao-de-credito.png)

### Privacy

No data is being recorded. The code is completly open-source so you can make sure the credit card numbers you enter aren't stored anywhere.

### Support
You can get free support on the [Issues Page](https://github.com/neterror420/Credit-Card-Validator/issues) or you can access my website for livechat, Discord and e-mail support: https://neterror.pw/.


## How it works

```javascript

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
});```
