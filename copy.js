let blocks = document.querySelectorAll('.code_block');
let buttons = document.querySelectorAll('.copycode');

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', function(e){
      button_id = e.target.getAttribute('id');

      let copytext = document.createElement('input');
        copytext.value = blocks[button_id].querySelector('.code_value').value;
        document.body.appendChild(copytext);
        copytext.select();
        document.execCommand('copy');
        document.body.removeChild(copytext);
    });
  };