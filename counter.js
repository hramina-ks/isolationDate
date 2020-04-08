Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
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
        let d1 = new Date();
        d0.setHours(0,0,0,0);
        d1.setHours(0,0,0,0);
        if (d0 <= d1)
        {
            let radios_check = form.querySelector('.radios [type=radio]:checked'); //какая радиокнопка с картинкой выбрана
            let check_id = radios_check.id;// id выбранной радиокнопки
            let check_label = form.querySelector('label[for=' + CSS.escape(check_id) + ']') //label выбранной радиокнопки
            let check_image = check_label.querySelector('.radios_img'); //выбранная картинка
            
                let d0_year = d0.getFullYear();
                let d0_month = d0.getMonth();
                let d0_date = d0.getDate();
            
                let d1_year = d1.getFullYear();
                let d1_month = d1.getMonth();
                let d1_date = d1.getDate();

                let years = 0;
                let monthes = 0;
                let dates = 0;

                let yearText;
                let monthText;
                let dateText;
                let stringDate = "Сижу на карантине ";

                years = d1_year - d0_year; 
                monthes = d1_month - d0_month;
                dates = d1_date - d0_date;

                if (dates < 0 && monthes < 0)
                {
                    monthes--;
                    dates = d1_date + (d0.daysInMonth() - d0_date) + 1;
                    years--;
                    monthes = d1_month + (12 - d0_month) - 1;
                }
                //console.log(dates + " " + monthes + " " + years)
                
                if (dates < 0)
                {
                    monthes--;
                    dates = d1_date + (d0.daysInMonth() - d0_date) + 1;
                    if (monthes < 0)
                    {
                        years--;
                        monthes = d1_month + (12 - d0_month) - 1;
                    
                    }
                }
                //console.log(dates + " " + monthes + " " + years)
                
                if (monthes < 0)
                {
                    years--;
                    monthes = d1_month + (12 - d0_month);
                
                }
                //console.log(dates + " " + monthes + " " + years)

                switch (years % 10)
                {
                    case 1 : yearText = " год "; break;
                    case 2 : case 3 : case 4 : yearText = " года "; break;
                    default : yearText = " лет "; break;
                }
                
                switch (monthes % 10)
                {
                    case 1 : monthText = " месяц "; break;
                    case 2 : case 3 : case 4 : monthText = " месяца "; break;
                    default : monthText = " месяцев "; break;
                }
                
                switch (dates % 10)
                {
                    case 1 : dateText = " день"; break;
                    case 2 : case 3 : case 4 : dateText = " дня"; break;
                    default : dateText = " дней"; break;
                }

                switch (years)
                {
                    case 11 : case 12 : case 13 : case 14 : case 15 : case 16 : case 17 : case 18 : case 19 : yearText = " лет "; break;
                }
                switch (monthes)
                {
                    case 11 : case 12 : case 13 : case 14 : case 15 : case 16 : case 17 : case 18 : case 19 : monthText = " месяцев "; break;
                }
                switch (dates)
                {
                    case 11 : case 12 : case 13 : case 14 : case 15 : case 16 : case 17 : case 18 : case 19 : dateText = " дней "; break;
                }

                if (years != 0)
                {
                    stringDate = stringDate + years + yearText;
                }
                if (monthes != 0)
                {
                    stringDate = stringDate + monthes + monthText;
                }

                if (years != 0 || monthes != 0)
                {
                    stringDate = stringDate + "и " + dates + dateText;
                }
                else
                {
                    stringDate = stringDate + dates + " дней"
                }

            let result_div = document.createElement("div");
            result_div.className = "result";
            result_div.id = "result_id";
            result_div.attachShadow({mode: 'open'});
    
            result_div.shadowRoot.append(result.content.cloneNode(true)); // (*)
            let result_img = result_div.shadowRoot.querySelector(".result_img");
            result_div.shadowRoot.querySelector('.result_text').innerHTML = stringDate;
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