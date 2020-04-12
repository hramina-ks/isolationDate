let fields = document.querySelectorAll('.code_value');
let buttons = document.querySelectorAll('.copycode');

for(var i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', function(e){
      button_id = e.target.getAttribute('id');

      let copytext = document.createElement('input');
        copytext.value = fields[button_id].value;
        document.body.appendChild(copytext);
        copytext.select();
        document.execCommand('copy');
        document.body.removeChild(copytext);
    });
  };