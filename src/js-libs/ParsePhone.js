// класс парсер строки в номер телефона
// принимает строку с предположительно номером телефона
// возвращает или строку с полным номером в формате +7 (000) 000-00-00 или исключение, если строку не удалось привести к номеру

class ParsePhone {
    constructor() {
      this.replaceRegexp = /\+7|\+ 7|\-|\(|\)|\+8|\+ 8| |\+/g;
      this.startReplaceRegexp = /^7/g;
      this.formatRegexp = /(\d{3})(\d{3})(\d{2})(\d{2})/;
      this.onlyDigitRegexp = /[^\d]/;
    }
    parse(phone) {
      //удалим возможные пробелы
      phone = phone.trim();
      // считаем, что минимально строка должна состоять из 10 символов (1234567890)
      // все что менее 10 невозможно преобразовать в номер телефона
      if (phone.length < 10) {
        throw new Error('Не похоже на номер телефона');
      }
      //вырезаем из строки все, чтобы осталось только основные 10 цифр (убираем +7 и его вариации, пробелы, скобки, тире)
      phone = phone.replace(this.replaceRegexp, '');
  
      // дополнительно проверяем не НАЧИНАЕТСЯ ли номер с 7 и вырезаем 7 ку (ведь могли передать и такую строку 71234567890)
      // мы не могли проверить это на прошлом шаге, потому что 7ка могла быть и внутри самого номера и там ее вырезать не нужно.
      if (this.startReplaceRegexp.test(phone)) {
        phone = phone.replace(this.startReplaceRegexp, '');
      }
  
      // после этих преобразований у нас должны остаться только 10 цифр, но нам могли передать буквы
      if (this.onlyDigitRegexp.test(phone)) {
        //console.log(phone, 'содержит не цифры');
        throw new Error('Номер должен содержать только цифры');
      }
      // если в итоге осталось ровно 10 цифр
      if (phone.length == 10) {
        let chankedPhone = phone.match(this.formatRegexp);
        const fullPhone = `+7 (${chankedPhone[1]}) ${chankedPhone[2]}-${chankedPhone[3]}-${chankedPhone[4]}`;
        return fullPhone;
      } else {
        throw new Error('Не похоже на номер телефона');
      }
    }
  }
  
  // основной класс. Валидация и форматирование ввода номера телефона, блокировка отправки формы при неполностью введенном номере
  class AgelarPhoneValidator {
    constructor(
      config = {
        inputSelector: '[name=phone]',
        submitSelector: false,
      }
    ) {
      this.notAllowedCharsRegexp = /[^0-9,^\(,^\),^\-,^\+, ]/i;
      this.old = '';
      this.config = config;
      this.inputPhoneSelector = this.config.inputSelector;
      this.submitSelector = this.config.submitSelector;
      const inputes = document.querySelectorAll(this.inputPhoneSelector);
  
      if (inputes) {
        inputes.forEach((input) => {
          const inputObj = {};
          input.addEventListener('input', (event) => {
            this.onChangeInput(event);
          });
          input.addEventListener('click', (event) => {
            this.onClickInput(event);
          });
          input.addEventListener('focus', (event) => {
            this.onClickInput(event);
          });
          input.addEventListener('paste', (event) => {
            this.onPasteInput(event);
          });
          input.autocomplete = 'off';
  
          if (this.config.submitSelector) {
            const form = input.closest('form');
            const submitBtn = form.querySelector(this.submitSelector);
            submitBtn.disabled = true;
          }
        });
      }
    }
    // номер телефона могут не вводить посимволно, а скопировать и вставить
    // необходимо постараться вычленить из вставленной строки номер и отформатировать его согласно нашему паттерну
    onPasteInput(event) {
      let currentValue = event.clipboardData.getData('text/plain');
      try {
        const parsedPhone = new ParsePhone().parse(currentValue);
        event.target.value = parsedPhone;
      } catch (error) {
        this.showErrorOn(event.target);
      }
    }
    // следим за любыми изменениями текста в поле и форматируем ввод
    onChangeInput(event) {
      const form = event.target.closest('form');
      const submitBtn = form.querySelector(this.submitSelector);
  
      let currentValue = event.target.value;
  
      if (this.hasNotAllowedChars(currentValue)) {
        currentValue = this.old;
        this.showErrorOn(event.target);
      }
  
      if (this.isTyping(this.old, currentValue) && currentValue.length == 7) {
        currentValue = currentValue + ') ';
      }
      if (this.isTyping(this.old, currentValue) && currentValue.length == 12) {
        currentValue = currentValue + '-';
      }
      if (this.isTyping(this.old, currentValue) && currentValue.length == 15) {
        currentValue = currentValue + '-';
      }
      if (this.isTyping(this.old, currentValue) && currentValue.length > 18) {
        currentValue = currentValue.substring(0, 18);
      }
      // не позволяем стереть +7 (  (правда это работает только если стирать посимвольно, все еще позволяет выделить сразу всю строку и стереть)
      if (this.isErasing(this.old, currentValue) && currentValue.length == 3) {
        currentValue = `+7 (`;
      }
      // если в конфигурации был передан submitSelector то управляем доступностью кнопки отправки формы
      // если строка с номером достигла 18 символов, считаем что номер введен полностью и разрешаем отправку
      if (this.config.submitSelector) {
        if (currentValue.length == 18) {
          submitBtn.disabled = false;
        } else {
          submitBtn.disabled = true;
        }
      }
      event.target.value = currentValue;
      this.old = currentValue;
    }
  
    // проверка на наличие в номере не цифр, скобок, тире и пробелов
    // есть что доработать, при таком варианте проверки все еще можно ввести дурацкий номер +7 (+++) +++-++-++
    hasNotAllowedChars(phone) {
      return this.notAllowedCharsRegexp.test(phone);
    }
    // при клике, если поле было пустое, заполним его префиксом +7 (
    onClickInput(event) {
      let currentValue = event.target.value;
      this.old = currentValue;
  
      if (!currentValue) {
        currentValue = `+7 (`;
      }
      event.target.value = currentValue;
    }
    // направление ввода номера - добавляем
    isTyping(before, after) {
      if (after.length > before.length) return true;
      return false;
    }
    // направление ввода номера - стираем
    isErasing(before, after) {
      if (after.length < before.length) return true;
      return false;
    }
    // сделаем текст в инпуте цветным на некоторое время
    showErrorOn(input) {
      input.style.color = 'red';
      setTimeout(() => {
        input.style.color = 'inherit';
      }, 600);
    }
  }
  
