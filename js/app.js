const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const calculateButton = document.getElementById('btn');
const outputDay = document.getElementById('dd');
const outputMonth = document.getElementById('mm');
const outputYear = document.getElementById('yy');

function inputValidationFunc(input, minv, maxv, err)
{
    if (input.value === '') {
      inputError(input, 'This field is required');
    } else if (input.value < minv || input.value > maxv) {
      inputError(input, err);
    } else {
      inputWork(input);
    }
  }

function inputError(input, message) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const errorText = input.parentElement.querySelector('.error-message');
    errorText.innerHTML = message;
    errorText.classList.remove('hidden');
  }

  function inputWork(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const errorText = input.parentElement.querySelector('.error-message');
    errorText.classList.add('hidden');
  }

  function calculate() {
    const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const today = new Date();
    const age = dateCalculator(birthDate, today);
    outputDay.innerHTML = age.days;
    outputMonth.innerHTML = age.months;
    outputYear.innerHTML = age.years;
  }
  function dateCalculator(birthDate, today) {
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const days = today.getDate() - birthDate.getDate();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (days < 0) {
      months--;
      days += getDaysInMonth(birthDate.getFullYear(), birthDate.getMonth());
    }
    return { years, months, days };
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  
  dayInput.addEventListener('input', () => {
    inputValidationFunc(dayInput, 1, 31, 'Must be a valid day');
  });
  
  monthInput.addEventListener('input', () => {
    inputValidationFunc(monthInput, 1, 12, 'Must be a valid month');
  });
  
  yearInput.addEventListener('input', () => {
    inputValidationFunc(yearInput, 1900, 2024, 'Must be a valid year');
  });
  
  calculateButton.addEventListener('click', () => {
    if (!dayInput.value || !monthInput.value || !yearInput.value) {
      inputError(dayInput, 'This field is required');
      inputError(monthInput, 'This field is required');
      inputError(yearInput, 'This field is required');
      return;
    }
  
    const dateInput = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const currentDay = new Date();
  
    if (!dateInput || dateInput > currentDay || yearInput.value < 0) {
      inputError(dayInput, 'Must be a valid date');
      inputError(monthInput, '');
      inputError(yearInput, '');
      return;
    }
  
    calculate();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    dayInput.value = '';
    monthInput.value = '';
    yearInput.value = '';
  });
  