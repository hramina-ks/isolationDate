Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 33).getDate(); //метод для получения количества дней в месяце (задать заведомо нереальное число (33), браузер сам сбросит его до максимально возможного)
};
let imageDate = document.querySelector(".imageDate");
let content = document.querySelector(".content");
let form = document.querySelector(".formclass"); //ищем на странице форму
let radios = form.querySelectorAll(".radios__item"); //получаем все радиокнопки
let btnDate = document.getElementById("btnDate"); //и кнопку расчета
btnDate.addEventListener("click", function(event) //если на кнопку нажали
{
    let startDate = document.getElementById("startDate").value; //получаем дату начала карантина
    isResult = document.getElementById("result_id"); //ищем, есть ли уже результат расчета на странице
    if (isResult != null)
    {
        isResult.remove(); //если есть, удаляем
    }
    if (startDate != '') //если поле для даты начала не пустое
    {
        let d0 = new Date(startDate); //преобразуем дату начала в тип Date
        let d1 = new Date(); //получаем сегодняшнюю дату
        d0.setHours(0,0,0,0); //обнуляем время для даты начала
        d1.setHours(0,0,0,0); //обнуляем время для сегодняшней даты
        if (d0 <= d1) //если дата начала меньше или равна сегодняшней
        {
            let radios_check = form.querySelector('.radios [type=radio]:checked'); //ищем, какая радиокнопка отмечена 
            let check_id = radios_check.id;// получаем id выбранной радиокнопки
            let check_label = form.querySelector('label[for=' + CSS.escape(check_id) + ']') //и label выбранной радиокнопки
            let check_image = check_label.querySelector('.radios_img'); //а вот и сама картинка
            
                let d0_year = d0.getFullYear(); //год в начальной дате
                let d0_month = d0.getMonth(); //месяц в начальной дате
                let d0_date = d0.getDate(); //день в начальной дате
            
                let d1_year = d1.getFullYear(); //год сейчас
                let d1_month = d1.getMonth(); //месяц сейчас
                let d1_date = d1.getDate(); //день сейчас

                let years = 0;
                let monthes = 0;
                let dates = 0; //по умолчанию прошедшее время равно 0

                let yearText; 
                let monthText;
                let dateText;
                let stringDate = "Сижу на карантине "; //переменные для создания текстовой строки

                years = d1_year - d0_year; 
                monthes = d1_month - d0_month
                dates = d1_date - d0_date; //считаем базовую разницу между датам - отдельно годы, месяцы и дни

                if (dates < 0 && monthes < 0) //если разница по дням и месяцам отрицательная
                {
                    monthes--; //количество месяцев уменьшаем на 1
                    dates = d1_date + (d0.daysInMonth() - d0_date) + 1; //количество дней равно сумме дней от сегодняшней даты до начала последнего месяца и от стартовой даты до конца первого месяца
                    years--; //количество лет уменьшаем на 1
                    monthes = d1_month + (12 - d0_month) - 1; //считаем количество месяцев
                }
                
                if (dates < 0) //если разница по дням отрицательная
                {
                    monthes--;
                    dates = d1_date + (d0.daysInMonth() - d0_date) + 1; //делаем перерасчет для месяцев
                    if (monthes < 0) //если после этого месяцы ушли в минус
                    {
                        years--;
                        monthes = d1_month + (12 - d0_month) - 1; //пересчитываем годы
                    
                    }
                }
                
                if (monthes < 0) //если месяцы отрицательные
                {
                    years--; 
                    monthes = d1_month + (12 - d0_month); //пересчитываем годы
                
                }

                //определяем падеж и число для годов, месяцев и дней
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

                //особые случаи определим отдельно
                switch (years)
                {
                    case 11 : case 12 : case 13 : case 14 : yearText = " лет "; break;
                }
                switch (monthes)
                {
                    case 11 : monthText = " месяцев "; break;
                }
                switch (dates)
                {
                    case 11 : case 12 : case 13 : case 14 : dateText = " дней "; break;
                }

                if (years != 0) //если прошло больше 0 лет
                {
                    stringDate = stringDate + years + yearText; //добавляем к строке годы
                }
                if (monthes != 0)//если прошло больше 0 месяцев
                {
                    stringDate = stringDate + monthes + monthText; //добавляем к строке месяцы
                }

                if (years != 0 || monthes != 0) //если годы или месяцы не равны 0
                {
                    stringDate = stringDate + "и " + dates + dateText; //добавляем союз И, а после дни
                }
                else
                {
                    stringDate = stringDate + dates + dateText; //иначе пишем в строку только дни
                }


            let result_div = document.createElement("div"); //Создаем новый див для блока результатов
            let result = document.getElementById('result');
            result_div.append(result.content.cloneNode(true));
            result_div.className = "result";
            result_div.id = "result_id";
            let result_img = result_div.querySelector(".result_img");
            result_div.querySelector('.result_text').innerHTML = stringDate;
            result_img.src = check_image.src;
            result_img.title = check_image.title;
            result_img.alt = check_image.alt; //заполняем теги и атрибуты в новом диве
            imageDate.after(result_div); //публикуем див на странице
        }
        else
        {
            alert('Эта дата еще не наступила!');
        }
    }
    else 
    {
        alert('Дата не выбрана!');
    }

        event.preventDefault();  
        }, false);