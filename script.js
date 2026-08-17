const display = document.getElementById('display');

function appendValue(val) {
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/', '^'];

    // 1. Yan-yana iki operator yazılmasının qarşısını alır
    if (operators.includes(lastChar) && operators.includes(val)) {
        display.value = display.value.slice(0, -1) + val;
        return;
    }

    // 2. Nöqtə (Decimal) Məntiqi
    if (val === '.') {
        if (display.value === '' || operators.includes(lastChar)) {
            display.value += '0.';
            display.scrollLeft = display.scrollWidth;
            return;
        }

        if (lastChar === '.') return;

        const parts = display.value.split(/[\+\-\*\/]/);
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes('.')) return;
    }

    // 3. Əvvəldəki artıq sıfırların (0) silinməsi məntiqi
    const parts = display.value.split(/[\+\-\*\/]/);
    const currentNumber = parts[parts.length - 1];

    // Əgər cari ədəd təkcə "0"-dırsa və nöqtə YOXDURSA (yeni rəqəm basıldıqda "0"-ı əvəzləyir)
    if (currentNumber === '0' && val !== '.' && !operators.includes(val)) {
        display.value = display.value.slice(0, -1) + val;
        display.scrollLeft = display.scrollWidth;
        return;
    }

    display.value += val;
    display.scrollLeft = display.scrollWidth;
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
            let expression = display.value;
            const lastChar = expression.slice(-1);
            const operators = ['+', '-', '*', '/', '^'];

            // Əgər sonda natamam operator varsa, onu silirik:
            if (operators.includes(lastChar)) {
                expression = expression.slice(0, -1);
            }

            // ^ işarəsini ** ilə əvəz edirik
            expression = expression.replace(/\^/g, '**');
            
            display.value = eval(expression) / 100;
            display.scrollLeft = display.scrollWidth;
        }
    } catch (error) {
        display.value = 'Error!';
        setTimeout(() => clearDisplay(), 1500);
    }
}
function calculate() {
    try {
        if (display.value !== '') {
            let expression = display.value;
            const lastChar = expression.slice(-1);
            const operators = ['+', '-', '*', '/', '^'];

            // Sonda artıq qalan operator varsa silirik
            if (operators.includes(lastChar)) {
                expression = expression.slice(0, -1);
            }

            // ^ işarəsini ** ilə əvəz edirik (JavaScript üstü qüvvət operatoru)
            expression = expression.replace(/\^/g, '**');
            
            display.value = eval(expression);
            display.scrollLeft = display.scrollWidth;
        }
    } catch (error) {
        display.value = 'Error!';
        setTimeout(() => clearDisplay(), 1500);
    }
}

function calculateSquareRoot() {
    try {
        if (display.value !== '') {
            let expression = display.value;
            const lastChar = expression.slice(-1);
            const operators = ['+', '-', '*', '/', '^'];

            if (operators.includes(lastChar)) {
                expression = expression.slice(0, -1);
            }

            expression = expression.replace(/\^/g, '**');
            display.value = Math.sqrt(eval(expression));
            display.scrollLeft = display.scrollWidth;
        }
    } catch (error) {
        display.value = 'Error!';
        setTimeout(() => clearDisplay(), 1500);
    }
}

function calculateLogarithm() {
    try {
        if (display.value !== '') {
            let expression = display.value;
            const lastChar = expression.slice(-1);
            const operators = ['+', '-', '*', '/', '^'];

            if (operators.includes(lastChar)) {
                expression = expression.slice(0, -1);
            }

            expression = expression.replace(/\^/g, '**');
            display.value = Math.log10(eval(expression));
            display.scrollLeft = display.scrollWidth;
        }
    } catch (error) {
        display.value = 'Error!';
        setTimeout(() => clearDisplay(), 1500);
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Rəqəmlər (0-9)
    if (key >= '0' && key <= '9') {
        appendValue(key);
    }
    // Operatorlar
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    }
    // Üstü qüvvət
    else if (key === '^') {
        appendValue('^');
    }
    // Nöqtə/Decimal
    else if (key === '.') {
        appendValue('.');
    }
    // Enter - Hesabla
    else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    // Backspace - Sil
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    // Delete - Clear
    else if (key === 'Delete') {
        event.preventDefault();
        clearDisplay();
    }
    // Kök (r key)
    else if (key === 'r' || key === 'R') {
        event.preventDefault();
        calculateSquareRoot();
    }
    // Loqarifma (l key)
    else if (key === 'l' || key === 'L') {
        event.preventDefault();
        calculateLogarithm();
    }
    // Faiz (% key)
    else if (key === '%') {
        event.preventDefault();
        calculatePercent();
    }
});