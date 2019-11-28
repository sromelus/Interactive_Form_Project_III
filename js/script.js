const $otherTitle = $('#other-title').hide();
const $shirtColor = $('#color').hide();
const $noColorOption  = $('#no-color')
const $priceTag = $('#price')
const $checkboxes = $('.activities input');


$('#name').focus();

// $('.activities input')
// console.log( $(e.target).data('cost'))

$('.activities').on("change", (e)=> {
  let balance = 0.00;
  const $checkbox = $(e.target);
  const $selectedCheckboxes = $('.activities input:checked');
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


$('#design').on("change", (e) => {
  $shirtColor.show();
  $noColorOption.hide();
  const $colorOptions = $('#color option').hide();
  if(e.target.value === "js puns"){
    $colorOptions.slice( 0, 3 ).show();
  } else if(e.target.value === "heart js"){
    $colorOptions.slice( 3, 6 ).show();
  } else {
    $shirtColor.hide();
    $noColorOption.show();
  }
});


$('#title').on("change", (e) => {
  if(e.target.value === "other"){
    $otherTitle.show();
  } else {
    $otherTitle.hide()
  }
});
