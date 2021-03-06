$(document).ready(function(){
    // Make action and clear buttons
    var buttons = [
        {name: '<-', className: 'clearButton'},
        {name: 'clear', className: 'clearButton'},
        {name: ' =', className: 'clearButton'},
        {name: ' / ', className: 'actionButton'},
        {name: ' % ', className: 'actionButton'},
        {name: ' * ', className: 'actionButton'},
        {name: ' + ', className: 'actionButton'},
        {name: ' - ', className: 'actionButton'},
        {name: '(', className: 'actionButton'},
        {name: ')', className: 'actionButton'},
        {name: '.', className: 'actionButton'}
        ]
    // Add number buttons to the array of buttons
    for(var i = 0; i < 10; i++) {
        buttons.push({name: i, className: 'numberButton'})
    }
    // Add all buttons to the calculator
    for(var i = 0; i < buttons.length; i++) {
        var $key = '<button class=' + buttons[i].className + ' value="' + buttons[i].name + '">' + buttons[i].name + '</button>'
        $('.numberPad').append($key)
    }
    $('button').click(function(){
        // when button is pressed add its value to the input paragraph
        $('.inputP').append($(this).attr("value"))
        // if the clear button was pushed, clear input and output paragraphs
        if ($(this).attr("value") == 'clear') {
            $('.inputP').empty()
            $('.outputP').empty()
        }
        // if equal sign was pressed, calculate the result
        if ($(this).attr("value") == ' =') {
            // calculate the result and append it to the output paragraph
            var result = getResult()
            $('.outputP').append('= ').append(result)
        }
        // if back arrow is pressed
        if ($(this).attr("value") == '<-') {
            // remove the back arrow
            var currentInputValue = $('.inputP').text().slice(0,-2)
            // trim all spaces
            currentInputValue = currentInputValue.trim()
            // remove last character
            modifiedInputValue = currentInputValue.slice(0, -1)
            // trim again
            modifiedInputValue.trim()
            // empty the input paragraph
            $('.inputP').empty()
            // append the modified value (with the removed vast element) to the input paragraph
            $('.inputP').append(modifiedInputValue)
        }
    })
    // the function that evaluates what is in the input paragraph
    function getResult() {
        // get the value of input paragraph as string
        var $inputP = $('.inputP').text()
        // remove the equal sign (last element) from the string
        var inputValue = $inputP.slice(0,-1)
        // evaluate and return the string using MathJs library
        // try to evaluate
        try {
            // remove textRed if it is there
            $(".outputP").removeClass("textRed");
            // empty output paragraph if something is there
            $('.outputP').empty()
            // if user made no errors in the format return evaluated value
            return math.eval(inputValue)
        }
        // if there were errors, display the error message
        catch(err) {
            $(".outputP").addClass("textRed");
            return 'your expression was not valid'
        }
    }
    // include keys 0 through 9
    $(document).keydown(function(evt){
        // get value of the key that's been pressed
        var keyValue = (String.fromCharCode(evt.keyCode))
        // initiate acceptable keys array
        var acceptableKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        // if pressed key is acceptable (i.e 0 through 9)
        if (acceptableKeys.indexOf(keyValue) !== -1) {
            // add the acceptable key to the input paragraph
            $('.inputP').append(keyValue)
        }
    });
});