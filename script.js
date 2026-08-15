const display = document.getElementById('display');

function appendValue(val) {
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];

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
            const operators = ['+', '-', '*', '/'];

            // Əgər sonda natamam operator varsa (+, -, *, /), onu silirik:
            if (operators.includes(lastChar)) {
                expression = expression.slice(0, -1);
            }

            // Mətni ədədə çevirib 100-ə bölürük
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
            const operators = ['+', '-', '*', '/'];

            // Sonda artıq qalan operator varsa silirik
            if (operators.includes(lastChar)) {
                expression = expression.slice(0, -1);
            }

            display.value = eval(expression);
            display.scrollLeft = display.scrollWidth;
        }
    } catch (error) {
        display.value = 'Error!';
        setTimeout(() => clearDisplay(), 1500);
    }
}