const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const calculateButton = document.getElementById('btn');

const dd = document.getElementById('dd');
const mm = document.getElementById('mm');
const yy = document.getElementById('yy');
calculateButton.addEventListener('click', calculateAge);
function calculateAge() {
    const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const today = new Date();
    const age = calculateAgeInYearsMonthsDays(birthDate, today);
    dd.textContent = age.days;
    mm.textContent = age.months;
    yy.textContent = age.years;
    function calculateAgeInYearsMonthsDays(birthDate, today) {
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

}