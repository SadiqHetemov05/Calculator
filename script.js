const display = document.getElementById('display');

function appendValue(val) {
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];

    // Əgər son simvol operatordursa və yeni basılan da operatordursa:
    if (operators.includes(lastChar) && operators.includes(val)) {
        // Köhnə operatoru yenisi ilə əvəz et
        display.value = display.value.slice(0, -1) + val;
    } else {
        display.value += val;
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculatePercent() {
    try {
        if (display.value !== '') {
            display.value = eval(display.value) / 100;
        }
    } catch (error) {
        display.value = 'Error!';
        setTimeout(() => clearDisplay(), 1500);
    }
}

function calculate() {
    try {
        if (display.value !== '') {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = 'Error!';
        setTimeout(() => clearDisplay(), 1500);
    }
}