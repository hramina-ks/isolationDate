let form = document.querySelector(".formclass");
let radios = form.querySelectorAll(".radios__item");
let btnDate = document.getElementById("btnDate");
btnDate.addEventListener("click", function(event)
{
    let startDate = document.getElementById("startDate").value; //получаем дату начала
    isResult = document.getElementById("result_id");
    if (isResult != null)
    {
        isResult.remove();
    }
    if (startDate != '')
    {
        let d0 = new Date(startDate);
        console.log(d0.getFullYear());
        let d1 = new Date();
        if (d0 <= d1)
        {
            let radios_check = form.querySelector('.radios [type=radio]:checked'); //какая радиокнопка с картинкой выбрана
            let check_id = radios_check.id;// id выбранной радиокнопки
            let check_label = form.querySelector('label[for=' + CSS.escape(check_id) + ']') //label выбранной радиокнопки
            let check_image = check_label.querySelector('.radios_img'); //выбранная картинка
            let dt = (d1.getTime() - d0.getTime()) / (1000*60*60*24);

            let result_div = document.createElement("div");
            result_div.className = "result";
            result_div.id = "result_id";
            result_div.attachShadow({mode: 'open'});
    
            result_div.shadowRoot.append(result.content.cloneNode(true)); // (*)
            let result_img = result_div.shadowRoot.querySelector(".result_img");
            result_div.shadowRoot.querySelector('.result_text').innerHTML = '<strong>' + Math.round(dt) + '</strong> день карантина...';
            result_img.src = check_image.src;
            result_img.alt = check_image.alt;
            document.body.append(result_div);
        }
        else
        {
            let result_div = document.createElement("div");
            result_div.id = "result_id";
            result_div.innerHTML = '<p>Эта дата еще не наступила!</p>';
            document.body.append(result_div);
        }
    }
    else 
    {
        let result_div = document.createElement("div");
        result_div.id = "result_id";
        result_div.innerHTML = '<p>Дата не выбрана</p>';
        document.body.append(result_div);
    }

        event.preventDefault();  
        }, false);