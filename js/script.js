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
const incompleteSubmissionText = '<div id="form-incomplete"  style="display: none" class="invalid-text">Please complete all requirements before registering.</div>';
const activitySectionInvalidText = '<div id="invalid-activity"  style="display: none" class="invalid-text">Please select at least one activity.</div>';
// let invalidCardMessages = '<ul><li id="invalid-cvv-text" class="invalid-text" style="display: none"> cvv should be a 3-digit number behind your card.</li>';
// invalidCardMessages += '<li id="invalid-zipcode-text" class="invalid-text" style="display: none"> zidcode should be a 5-digit number.</li>';
// invalidCardMessages += '<li id="invalid-card-text" class="invalid-text" style="display: none"> credit card number should be between 13 and 16 digits.</li></ul>';
const invalidCvvMessage = '<li id="invalid-cvv-text" class="invalid-text" style="display: none"> cvv should be a 3-digit number behind your card.</li>';
const invalidZipcodeMessage = '<li id="invalid-zipcode-text" class="invalid-text" style="display: none"> zidcode should be a 5-digit number.</li>';
const invalidCardMessage = '<li id="invalid-card-text" class="invalid-text" style="display: none"> credit card number should be between 13 and 16 digits.</li>';
const $zipcode = $('#zip');
// I used let to declare the bottom variable to allow me to manipulate their values later in the code.
let $selectedCheckboxes = $('.activities input:checked');
let isValidCard;

// validInput function checks if user input is valid by showing a valid notification
const validInput = (element) => {
  element.addClass('valid');
  element.removeClass('invalid');
  element.prev().children().eq(0).hide();
  element.prev().children().eq(1).show();
}

// invalidInput function checks if user input is invalid by showing an invalid notification
const invalidInput = (element) => {
  element.addClass('invalid');
  element.removeClass('valid');
  element.prev().children().eq(0).show();;
  element.prev().children().eq(1).hide();
}

// changePaymentsMethod function shows current selected payment method and hides all other payment options
// loops through $paymentType to toggle on and off selected elements base on the event target
const changePaymentsMethod = (element) => {
  element.show();
  // $paymentType.eq(1).attr('selected', true);
  $(element.siblings()[3]).hide()
  $(element.siblings()[4]).hide();
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

//as the page load the messges below are appended to the DOM
$shirtColor.prev().hide();
$paymentType.eq(1).attr('selected', true);
$name.prev().append('<span id="invalid-name" style="display: none" class="invalid-text"> Please enter a valid name only letter characters.</span>');
$name.prev().append('<span id="valid-name"  style="display: none" class="valid-text"> OK!</span>')
$mail.prev().append('<span id="invalid-mail"  style="display: none" class="invalid-text"> Please enter a valid email format.</span>');
$mail.prev().append('<span id="valid-mail"  style="display: none" class="valid-text"> OK!</span>');
$payment.after(invalidCvvMessage);
$payment.after(invalidZipcodeMessage);
$payment.after(invalidCardMessage);
$submit.before(incompleteSubmissionText);
$legend.before(activitySectionInvalidText);


$name.on('focusout', (e) => {
  const inValidName = /^[A-Za-z]+\s?([A-Za-z]+)?$/.test(e.target.value);
  if(inValidName){
    validInput($name);
  } else {
    invalidInput($name);
  }
})

$mail.on('focusout', (e) => {
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
  for(let i = 0; i < $selectedCheckboxes.length; i++ ){
    balance += $($selectedCheckboxes[i]).data('cost');
  }
  $priceTag.text(`$${balance.toFixed(2)}`)
});


$design.on('change', (e) => {
  $(e.target[0]).attr('disabled', true);
  $shirtColor.show();
  $shirtColor.prev().show();
  const $colorOptions = $('#color option').hide();
  if(e.target.value === 'js puns'){
    $colorOptions.eq(1).attr('selected', true)
    $colorOptions.eq(3).attr('selected', false)
    $colorOptions.slice( 0, 3 ).show();
  } else if(e.target.value === 'heart js'){
    $colorOptions.eq(3).attr('selected', true)
    $(e.target).attr('selected', true);
    $colorOptions.slice( 3, 6 ).show();
  }
});


$title.on('change', (e) => {
  if(e.target.value === 'other'){
    $otherTitle.show();
  } else {
    $otherTitle.hide()
  }
});

$payment.on('change',(e) => {
  $(e.target[0]).attr('disabled', true);
  if(e.target.value === 'paypal'){
    changePaymentsMethod($paypalPaymentInstruction)
  } else if(e.target.value === 'bitcoin') {
    changePaymentsMethod($bitcoinPaymentInstruction)
  } else {
    changePaymentsMethod($creditCardInstruction)
  }
});

$creditCardNumber.on('focusout', (e) => {
  isValidCard = /^\d{13,16}$/.test(e.target.value);
  validateCard($creditCardNumber);
  if($creditCardNumber.attr('class') === 'invalid'){
    $('#invalid-card-text').show();
  } else {
    $('#invalid-card-text').hide();
  }
})

$zipcode.on('focusout', (e) => {
  isValidCard = /^\d{5}$/.test(e.target.value);
  validateCard($zipcode);
  if($zipcode.attr('class') === 'invalid'){
    $('#invalid-zipcode-text').show();
  } else {
    $('#invalid-zipcode-text').hide();
  }
})

$cvv.on('focusout', (e) => {
  isValidCard = /^\d{3}$/.test(e.target.value);
  validateCard($cvv);
  if($cvv.attr('class') === 'invalid'){
    $('#invalid-cvv-text').show();
  } else {
    $('#invalid-cvv-text').hide();
  }
})

$submit.on('click', (e) => {
  // on submit we check if all inputs are valid.
  // if they are valid user will receive a successful notification
  // if they are not valid user will receive a notification to check highlighted input
  const atLeastOneActivityNotChecked = ($selectedCheckboxes.length === 0);
  const nameInvalid = ($name.attr('class') !== 'valid');
  const mailInvalid = ($mail.attr('class') !== 'valid');
  const cardNumberInvalid = ($creditCardNumber.val() === '' || $creditCardNumber.attr('class') === 'invalid');
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
      $('#invalid-activity').show();
    } else {
      $('#invalid-activity').hide();
    }

    if(isCreditCardSelected){
      if(cardNumberInvalid || zipInvalid || cvvInvalid){
        $creditCardNumber.trigger('focusout');
        $zipcode.trigger('focusout');
        $cvv.trigger('focusout');
      }
    }
    $('#form-incomplete').show();
  } else {
    //submit form to the server
  }


})
