/**
 * Control state of buttons
 */
function disableButtons( buttonsId ){  
    buttonsId.forEach( disableButton );
}

function disableButton( button ){
    button.disabled = true;
}

function enableButtons( buttonsId ){
    buttonsId.forEach( enableButton );
}

function enableButton( button ){
    button.disabled = false;
}
