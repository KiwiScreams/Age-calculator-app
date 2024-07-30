const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const calculateButton = document.getElementById('btn');
const outputDay = document.getElementById('dd');
const outputMonth = document.getElementById('mm');
const outputYear = document.getElementById('yy');

function inputValidationFunc(input, minv, maxv, err) {
    if (input.value === '') {
        errorCalculate(input, 'This field is required');
    } else if (input.value < minv || input.value > maxv) {
        errorCalculate(input, err);
    } else {
        successCalculate(input);
    }
}

function errorCalculate(input, message) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const errorText = input.parentElement.querySelector('.error-message');
    errorText.innerHTML = message;
    label.classList.add('error-text');
    errorText.classList.remove('hidden');
    input.classList.add('error');
}

function successCalculate(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const errorText = input.parentElement.querySelector('.error-message');
    label.classList.remove('error-text');
    errorText.classList.add('hidden');
    errorText.innerHTML = '';
    input.classList.remove('error');
}

function calculateFunc() {
    const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const today = new Date();
    const age = calculateFuncInYearsMonthsDays(birthDate, today);
    outputDay.innerHTML = age.days;
    outputMonth.innerHTML = age.months;
    outputYear.innerHTML = age.years;
}

function calculateFuncInYearsMonthsDays(birthDate, today) {
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
        errorCalculate(dayInput, 'This field is required');
        errorCalculate(monthInput, 'This field is required');
        errorCalculate(yearInput, 'This field is required');
        outputDay.innerHTML = '--';
        outputMonth.innerHTML = '--';
        outputYear.innerHTML = '--';
        return;
    }

    const dateInput = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const currentDay = new Date();

    if (!dateInput || dateInput > currentDay || yearInput.value < 0) {
        errorCalculate(dayInput, 'Must be a valid date');
        errorCalculate(monthInput, '');
        errorCalculate(yearInput, '');
        outputDay.innerHTML = '--';
        outputMonth.innerHTML = '--';
        outputYear.innerHTML = '--';
        return;
    }

    if (dayInput.classList.contains('error') || monthInput.classList.contains('error') || yearInput.classList.contains('error')) {
        outputDay.innerHTML = '--';
        outputMonth.innerHTML = '--';
        outputYear.innerHTML = '--';
        return;
    }

    calculateFunc();
});

document.addEventListener('DOMContentLoaded', () => {
    dayInput.value = '';
    monthInput.value = '';
    yearInput.value = '';
    outputDay.innerHTML = '--';
    outputMonth.innerHTML = '--';
    outputYear.innerHTML = '--';
});