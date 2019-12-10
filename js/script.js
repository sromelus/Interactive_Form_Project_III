/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

const $activities = $('.activities');
const $bitcoinPaymentInstruction = $('#bitcoin').hide();
const $checkboxes = $('.activities input');
const $creditCardInstruction = $('#credit-card');
const $creditCardNumber = $('#cc-num');
const $cvv = $('#cvv');
const $design = $('#design');
const $otherTitle = $('#other-title').hide();
const $legend = $('legend').eq(2);
const $mail = $('#mail');
const $name = $('#name').focus();
const $payment = $('#payment');
const $paymentType = $('#payment option');
const $paypalPaymentInstruction = $('#paypal').hide();
const $priceTag = $('#price')
const $shirtColor = $('#color').hide();
const $submit = $('button');
const $title = $('#title');
const incompleteSubmissionText = '<div id="form-incomplete"  style="display: none" class="invalid-text">Please complete all requirements above.</div>';
const activitySectionInvalidText = '<div id="invalid-activity"  style="display: none" class="invalid-text">Please select at least one activity.</div>';
const invalidCvvMessage = '<li id="invalid-cvv-text" class="invalid-text" style="display: none"> cvv should be a 3-digit number.</li>';
const invalidZipcodeMessage = '<li id="invalid-zipcode-text" class="invalid-text" style="display: none"> zidcode should be a 5-digit number.</li>';
const invalidCardMessage = '<li id="invalid-card-text" class="invalid-text" style="display: none"> Please enter a number that is between 13 and 16 digits long.</li>';
const invalidEmptyCardNumber = '<li id="invalid-card-number-empty-text" class="invalid-text" style="display: none"> Please enter a credit card number.</li>';
const invalidEmptyZipNumber = '<li id="invalid-zip-number-empty-text" class="invalid-text" style="display: none"> Please enter a zipcode.</li>';
const invalidEmptyCvvNumber = '<li id="invalid-cvv-number-empty-text" class="invalid-text" style="display: none"> Please enter a 3-digit pin code (cvv).</li>';
const $zipcode = $('#zip');
// I used let to declare the bottom variable to allow me to manipulate their values later in the code.
let $selectedCheckboxes = $('.activities input:checked');
let isValidCard;

// validInput function checks if user input is valid by showing a valid notification
const validInput = (element) => {
  element.addClass('valid');
  element.removeClass('invalid');
  element.prev().children().eq(0).slideUp();
  element.prev().children().eq(1).fadeIn(500);
}

// invalidInput function checks if user input is invalid by showing an invalid notification
const invalidInput = (element) => {
  element.addClass('invalid');
  element.removeClass('valid');
  element.prev().children().eq(0).fadeIn(500);;
  element.prev().children().eq(1).slideUp();
}

// changePaymentsMethod function shows current selected payment method and hides all other payment options
// loops through $paymentType to toggle on and off selected elements base on the event target
const changePaymentsMethod = (element) => {
  element.fadeIn(500);
  const lastSibling = (element.siblings().length - 1);
  const secondToLastSibling = (lastSibling - 1);
  $(element.siblings()[secondToLastSibling]).slideUp();
  $(element.siblings()[lastSibling]).slideUp();
  for(let i = 1; i < $paymentType.length; i++){

    if($($paymentType[i]).val() === element.prop('class').replace('-', ' ')){
       $($paymentType[i]).attr('selected', true)
    } else {
      $($paymentType[i]).attr('selected', false)
    }
  }
}

// validateCard function changes label and input box border color to red if user's input is not the right format
const validateCard = (element) => {
  if(isValidCard){
    element.removeClass("invalid");
    element.prev().removeClass("invalid-text");
  } else {
    element.addClass("invalid");
    element.prev().addClass("invalid-text");
  }
}

// this function hides all credit card error messages when payment is change to paypal or bitcoin
const hideCardErrorMessages = () => {
  $('#invalid-card-text').slideUp();
  $('#invalid-zipcode-text').slideUp();
  $('#invalid-cvv-text').slideUp();
  $('#invalid-card-number-empty-text').slideUp();
  $('#invalid-zip-number-empty-text').slideUp();
  $('#invalid-cvv-number-empty-text').slideUp();
  $creditCardNumber.removeClass("invalid");
  $creditCardNumber.prev().removeClass("invalid-text");
  $zipcode.removeClass("invalid");
  $zipcode.prev().removeClass("invalid-text");
  $cvv.removeClass("invalid");
  $cvv.prev().removeClass("invalid-text");
  const checkIfAllSectionAreValid = (($name.attr('class') === 'valid') && ($mail.attr('class') === 'valid') && ($name.attr('class') === 'valid')) && ($selectedCheckboxes.length > 0);
  if(checkIfAllSectionAreValid){
    $('#form-incomplete').fadeOut(500);
  }
}

//as the page load the messges below are appended to the DOM
$shirtColor.prev().slideUp();
$paymentType.eq(1).attr('selected', true);
$name.prev().append('<span id="invalid-name" style="display: none" class="invalid-text"> Please enter a valid name only letter characters.</span>');
$name.prev().append('<span id="valid-name"  style="display: none" class="valid-text"> OK!</span>')
$mail.prev().append('<span id="invalid-mail"  style="display: none" class="invalid-text"> Please enter a valid email format.</span>');
$mail.prev().append('<span id="valid-mail"  style="display: none" class="valid-text"> OK!</span>');
$payment.after(invalidCvvMessage);
$payment.after(invalidZipcodeMessage);
$payment.after(invalidCardMessage);
$payment.after(invalidEmptyCvvNumber);
$payment.after(invalidEmptyZipNumber);
$payment.after(invalidEmptyCardNumber);
$submit.before(incompleteSubmissionText);
$legend.before(activitySectionInvalidText);


$name.on('focusout input', (e) => {
  const inValidName = /^[A-Za-z]+\s?([A-Za-z]+)?$/.test(e.target.value);
  if(inValidName){
    validInput($name);
  } else {
    invalidInput($name);
  }
})

$mail.on('focusout input', (e) => {
  const inValidEmail = /^\w+@[a-z]+\.[a-z]+$/.test(e.target.value)
  if(inValidEmail){
    validInput($mail);
  } else {
    invalidInput($mail);
  }
})

$activities.on('change', (e)=> {
  // declaring balance with let here allows me to use it in both for loops bellow
  let balance = 0.00;
  const $checkbox = $(e.target);
  $selectedCheckboxes = $('.activities input:checked');

  //if selected checkbox is not the main Conference
  //iterate over the '$checkboxes'
  //assign the checked checkbox to a variable called '$checked'
  //assign the checked checkbox type to a variable called '$checkedCheckboxType'
  //assign the current checkbox type in the loop to a variable called '$currentCheckboxType'
  //if checked checkbox type is equal to the current checkbox type in the loop. disabled the current checkbox

  if($checkbox.prop('name') !== 'all'){
    for(let i = 1; i < $checkboxes.length; i++){
      const $checked = $($checkboxes[i]).prop('checked');
      const $checkedCheckboxType = $checkbox.data('day-and-time')
      const $currentCheckboxType = $($checkboxes[i]).data('day-and-time');

      if(!$checkbox.prop('checked') && $currentCheckboxType === $checkedCheckboxType){
        $($checkboxes[i]).attr('disabled', false)
      }else if(!$checked && $currentCheckboxType === $checkedCheckboxType) {
        $($checkboxes[i]).attr('disabled', true)
      }
    }
  }

// loop over all checked checkbox, sum the cost and assign the total cost to variable call 'balance'
  if($selectedCheckboxes.length > 0){
    for(let i = 0; i < $selectedCheckboxes.length; i++ ){
      balance += $($selectedCheckboxes[i]).data('cost');
    }
    $('#invalid-activity').slideUp();
    $priceTag.text(`$${balance.toFixed(2)}`)
  } else {
    $('#invalid-activity').fadeIn(500);
  }
});


$design.on('change', (e) => {
  $(e.target[0]).attr('disabled', true);//disable select payment method
  $shirtColor.prev().fadeIn(500);// show shirt color label
  $shirtColor.fadeIn(500); // show shirt color options
  const $colorOptions = $('#color option').slideUp(); //hide shirt color options
  if(e.target.value === 'js puns'){
    $colorOptions.eq(1).attr('selected', true)
    $colorOptions.eq(3).attr('selected', false)
    $colorOptions.slice( 0, 3 ).fadeIn(500);
  } else if(e.target.value === 'heart js'){
    $colorOptions.eq(3).attr('selected', true)
    $(e.target).attr('selected', true);
    $colorOptions.slice( 3, 6 ).fadeIn(500);
  }
});

// if other is selected for job role show show other input box
$title.on('change', (e) => {
  if(e.target.value === 'other'){
    $otherTitle.fadeIn(500);
  } else {
    $otherTitle.slideUp();
  }
});

$payment.on('change',(e) => {
  $(e.target[0]).attr('disabled', true);
  if(e.target.value === 'paypal'){
    changePaymentsMethod($paypalPaymentInstruction)
    hideCardErrorMessages();
  } else if(e.target.value === 'bitcoin') {
    changePaymentsMethod($bitcoinPaymentInstruction)
    hideCardErrorMessages();
  } else {
    changePaymentsMethod($creditCardInstruction)
  }
});

$creditCardNumber.on('focusout input', (e) => {
  isValidCard = /^\d{13,16}$/.test(e.target.value);
  if($creditCardNumber.val() === ''){
    $('#invalid-card-number-empty-text').fadeIn(500);
  }else{
    $('#invalid-card-number-empty-text').slideUp();
    validateCard($creditCardNumber);
  }

  if($creditCardNumber.attr('class') === 'invalid' && $creditCardNumber.val() === ''){
    $('#invalid-card-text').slideUp();
  } else if ($creditCardNumber.attr('class') === 'invalid' && $creditCardNumber.val().length === 10 ) {
    $('#invalid-card-text').fadeIn(500);
  } else if ($creditCardNumber.attr('class') === 'invalid' && $creditCardNumber.val().length > 16 ) {
    $('#invalid-card-text').fadeIn(500);
  } else {
    $('#invalid-card-text').slideUp();
  }
})

$zipcode.on('focusout input', (e) => {
  isValidCard = /^\d{5}$/.test(e.target.value);
  if($zipcode.val() === ''){
    $('#invalid-zip-number-empty-text').fadeIn(500);
  }else{
    $('#invalid-zip-number-empty-text').slideUp();
    validateCard($zipcode);
  }

  if($zipcode.attr('class') === 'invalid' && $zipcode.val() === ''){
    $('#invalid-zipcode-text').slideUp();
  } else if ($zipcode.attr('class') === 'invalid' && $zipcode.val().length > 0){
    $('#invalid-zipcode-text').fadeIn(500);
  } else {
    $('#invalid-zipcode-text').slideUp();
  }
})

$cvv.on('focusout input', (e) => {
  isValidCard = /^\d{3}$/.test(e.target.value);
  if($cvv.val() === ''){
    $('#invalid-cvv-number-empty-text').fadeIn(500);
  }else{
    $('#invalid-cvv-number-empty-text').slideUp();
    validateCard($cvv);
  }

  if($cvv.attr('class') === 'invalid' && $cvv.val() === ''){
    $('#invalid-cvv-text').slideUp();
  } else if ($cvv.attr('class') === 'invalid' && $cvv.val().length > 0) {
    $('#invalid-cvv-text').fadeIn(500);
  } else {
    $('#invalid-cvv-text').slideUp();
  }
})

$submit.on('click', (e) => {
  // on submit we check if all inputs are valid.
  // if they are valid user will receive a successful notification
  // if they are not valid user will receive a notification to check highlighted input
  const atLeastOneActivityNotChecked = ($selectedCheckboxes.length === 0);
  const nameInvalid = ($name.attr('class') !== 'valid');
  const mailInvalid = ($mail.attr('class') !== 'valid');
  const cardNumberInvalid = ($creditCardNumber.val() === ''|| $creditCardNumber.attr('class') === 'invalid');
  const zipInvalid = ($zipcode.val() === '' || $zipcode.attr('class') === 'invalid');
  const cvvInvalid = ($cvv.val() === '' || $cvv.attr('class') === 'invalid');
  const isCreditCardSelected = ($paymentType.eq(1).attr('selected') === 'selected');
  const isAtLeastOneIsInvalid = (cardNumberInvalid || zipInvalid || cvvInvalid)
  const cardSelected = (isCreditCardSelected && isAtLeastOneIsInvalid)

  if(nameInvalid || mailInvalid || atLeastOneActivityNotChecked || cardSelected){
    e.preventDefault();
    $name.trigger('focusout');
    $mail.trigger('focusout');

    if(atLeastOneActivityNotChecked){
      $('#invalid-activity').fadeIn(500);
    } else {
      $('#invalid-activity').slideUp();
    }

    if(isCreditCardSelected){
      if(cardNumberInvalid || zipInvalid || cvvInvalid){
        $creditCardNumber.trigger('focusout');
        $zipcode.trigger('focusout');
        $cvv.trigger('focusout');
      }
    }
    $('#form-incomplete').fadeIn(500);
  } else {
    //submit form to the server
  }
})
