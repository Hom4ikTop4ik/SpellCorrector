$(document).ready(function () 
{
  // эта функция получает наш результат проверки орфографии
  fix_spell = function (data) 
  {
    data.forEach(function (elem) 
    {
      // Яндекс возвращает JSON, где
      // [word] — исходное слово
      // ['s'] — массив исправлений
      let wrong = elem['word'];
      let good = elem['s'][0] || elem['word']; // если ['s'] пусто, берём исходное слово

      // "берём" текст из поля вывода
      let text = $('#text_field_correct').val()
      // меняем по одной ошибке на правильные слова (наиболее предполагаемые Яндексом)
      text = text.replace(wrong, good); // WRONG -> GOOD word

      // находит наше поле вывода по имени, заменяет текст
      $('#text_field_correct').val( text );
    });
  }
});


flag = 0;
// обработчик нажатия на клавиши [ мой :) ]
document.addEventListener('keyup', function (e) {
  // если отжат пробел или энтер
  if (/*(e.ctrlKey) &&*/ (e.keyCode == 13))
    flag = 0;
});


// обработчик нажатия на клавиши
document.addEventListener('keydown', function (e) {
  // если нажат пробел или энтер
  if ((flag == 0) && /*(e.ctrlKey) &&*/ (e.keyCode == 13)) 
  {
    // флаг, чтоб при зажатии клавиш не было кучи запросов
    flag = 1;
    
    // сохраню текст, на всякий..
    let text = $('#text_field').val();

    // скопирую текст в нижнее поле
    $('#text_field_correct').val(text);

    // делим текст на строки
    var lines = text.replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n");
    
    // и обрабатываем каждую строчку:
    lines.forEach(function (line) 
    {
      if (line.length) {
        // отправляем строку со словами на проверку в Спеллер, результат сразу отправляется в функцию fix_spell
        $.getScript('https://speller.yandex.net/services/spellservice.json/checkText?text=' + line + '&callback=fix_spell');
      }
    });

  }
});
