const $otherTitle = $('#other-title').hide();
const $shirtColor = $('#color').hide();
const $priceTag = $('#price')
const $checkboxes = $('.activities input');
const $creditCard = $('#credit-card');
const $paypal = $('#paypal').hide();
const $bitcoin = $('#bitcoin').hide();
const $name = $('#name').focus();
const $mail = $('#mail');
const $submit = $('button');
const $activities = $('.activities');
const $payment = $('#payment');
const $title = $('#title');
const $design = $('#design');
const $legend = $('legend').eq(2);
const incompleteSubmissionText = '<div id="form-incomplete"  style="display: none" class="invalid-text">Please complete all requirements before registering.</div>';
const completeSubmissionText = '<div id="form-complete"  style="display: none" class="valid-text">Congrats!! From submitted successfully</div>';
const selectAtLeastOneText = '<div id="invalid-activity"  style="display: none" class="invalid-text">Please select at least one activity.</div>';
let $selectedCheckboxes = $('.activities input:checked');


$shirtColor.prev().hide();

$name.prev().append(' <span id="invalid-name" style="display: none" class="invalid-text">invalid</span>');
$name.prev().append(' <span id="invalid-name" style="display: none" class="invalid-text">invalid</span>');
$name.prev().append(' <span id="valid-name"  style="display: none" class="valid-text">OK!</span>')
$mail.prev().append(' <span id="invalid-mail"  style="display: none" class="invalid-text">invalid</span>');
$mail.prev().append(' <span id="valid-mail"  style="display: none" class="valid-text">OK!</span>');
$submit.before(incompleteSubmissionText);
$submit.before(completeSubmissionText);
$legend.before(selectAtLeastOneText);

$name.on('focusout', (e) => {
  inValidName = /^[A-Za-z]+\s?([A-Za-z]+)?$/.test(e.target.value);
  if(inValidName){
    $name.addClass('valid');
    $name.removeClass('invalid');
    $('#invalid-name').hide();
    $('#valid-name').show();
  } else {
    $name.addClass('invalid');
    $name.removeClass('valid');
    $('#invalid-name').show();
    $('#valid-name').hide();
  }
})

$mail.on('focusout', (e) => {
  const inValidEmail = /\w+@[a-z]+\.[a-z]+/.test(e.target.value)
  if(inValidEmail){
    $mail.addClass('valid');
    $mail.removeClass('invalid');
    $('#invalid-mail').hide();
    $('#valid-mail').show();
  } else {
    $mail.addClass('invalid');
    $mail.removeClass('valid');
    $('#invalid-mail').show();
    $('#valid-mail').hide();
  }
})


// $('.activities input')
// console.log( $(e.target).data('cost'))

$activities.on('change', (e)=> {
  let balance = 0.00;
  const $checkbox = $(e.target);
  $selectedCheckboxes = $('.activities input:checked');
  //Loop over the `checkboxes` variable above to iterate over all the checkbox inputs
  //if the checkbox is not checked and the data-day-and-time attribute is the same as
  // the checked checkbox, disabled current checkbox.
  if($checkbox.prop('name') !== 'all'){
    for(let i = 1; i < $checkboxes.length; i++){
      const $checked = $($checkboxes[i]).prop('checked');
      const $checkedCheckboxType = $checkbox.data('day-and-time')
      const $currentCheckboxType = $($checkboxes[i]).data('dayAndTime');

      if(!$checkbox.prop('checked') && $currentCheckboxType === $checkedCheckboxType){
        $($checkboxes[i]).attr('disabled', false)
      }else if(!$checked && $currentCheckboxType === $checkedCheckboxType) {
        $($checkboxes[i]).attr('disabled', true)
      }
    }
  }

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
    $colorOptions.slice( 0, 3 ).show();
  } else if(e.target.value === 'heart js'){
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
    $paypal.show();
    $bitcoin.hide()
    $creditCard.hide();
  } else if(e.target.value === 'bitcoin') {
    $bitcoin.show();
    $paypal.hide();
    $creditCard.hide();
  } else {
    $creditCard.show();
    $bitcoin.hide()
    $paypal.hide();
  }
});

$('#cc-num').on('focusout', (e) => {
  const isValidCard = /^\d{13,16}$/.test(e.target.value);
  if(!isValidCard){
    $('#cc-num').addClass("invalid");
    $('#cc-num').prev().addClass("invalid-text");
  } else {
    $('#cc-num').removeClass("invalid");
    $('#cc-num').prev().removeClass("invalid-text");
  }
})

$('#zip').on('focusout', (e) => {
  const isValidCard = /^\d{5}$/.test(e.target.value);
  if(!isValidCard){
    $('#zip').addClass("invalid");
    $('#zip').prev().addClass("invalid-text");
  } else {
    $('#zip').removeClass("invalid");
    $('#zip').prev().removeClass("invalid-text");
  }
})

$('#cvv').on('focusout', (e) => {
  const isValidCard = /^\d{3}$/.test(e.target.value);
  if(!isValidCard){
    $('#cvv').addClass("invalid");
    $('#cvv').prev().addClass("invalid-text");
  } else {
    $('#cvv').removeClass("invalid");
    $('#cvv').prev().removeClass("invalid-text");
  }
})




$submit.on('click', (e) => {
  e.preventDefault();
  const atLeastOne = ($selectedCheckboxes.length === 0);
  const isNameValid = ($name.attr('class') !== 'valid');
  const isMailValid = ($mail.attr('class') !== 'valid');
  const isCardNumberValid = ($('#cc-num').attr('class') === 'invalid');
  const isZipValid = ($('#zip').attr('class') === 'invalid');
  const isCvvValid = ($('#cvv').attr('class') === 'invalid');

  if(atLeastOne || isNameValid || isMailValid || isCardNumberValid || isZipValid || isCvvValid){
    $('#form-incomplete').show();
    $('#form-complete').hide();

    if(atLeastOne){
      $('#invalid-activity').show();
    } else {
      $('#invalid-activity').hide();
    }

    if(isNameValid){
      $name.addClass('invalid');
      $('#invalid-name').show();
    }

    if(isMailValid){
      $mail.addClass('invalid');
      $('#invalid-mail').show();
    }

    if($('#cc-num').val() === '' || isCardNumberValid){
      $('#cc-num').addClass("invalid");
      $('#cc-num').prev().addClass("invalid-text");
    }

    if($('#zip').val() === '' || isZipValid){
      $('#zip').addClass("invalid");
      $('#zip').prev().addClass("invalid-text");
    }

    if($('#cvv').val() === '' || isCvvValid){
      $('#cvv').addClass("invalid");
      $('#cvv').prev().addClass("invalid-text");
    }
  } else {
    $('#invalid-activity').hide();
    $('#form-complete').show();
    $('#form-incomplete').hide();
  }
})
