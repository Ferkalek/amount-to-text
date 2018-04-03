const s = (id) => document.getElementById(id);

s('sum').addEventListener('keyup', () => s('output').innerText = num2str(s('sum').value), false);

var price,
    words = [
    ['', '', '', '', 'тисяч', 'мільйонів', 'мільярдів'],
    ['одна', 'одинадцять', 'десять', 'сто', 'тисяча', 'мільйон', 'мільярд'],
    ['дві', 'дванадцять', 'двадцять', 'двісті', 'тисячі', 'мільйони', 'мільярди'],
    ['три', 'тринадцять', 'тридцять', 'триста', 'тисячі', 'мільйони', 'мільярди'],
    ['чотири', 'чотирнадцять', 'сорок', 'чотириста', 'тисячі', 'мільйони', 'мільярди'],
    ['п\'ять', 'п\'ятнадцять', 'п\'ятдесят', 'п\'ятсот', 'тисяч', 'мільйонів', 'мільярдів'],
    ['шість', 'шістнадцять', 'шістдесят', 'шістсот', 'тисяч', 'мільйонів', 'мільярдів'],
    ['сім', 'сімнадцять', 'сімдесят', 'сімсот', 'тисяч', 'мільйонів', 'мільярдів'],
    ['вісім', 'вісімнадцять', 'вісімдесят', 'вісімсот', 'тисяч', 'мільйонів', 'мільярдів'],
    ['дев\'ять', 'дев\'ятнадцять', 'дев\'яносто', 'дев\'ятсот', 'тисяч', 'мільйонів', 'мільярдів'],
];

function num2str(data) {
    let rub = '',
        kop = '',
        money = String(data).replace(',', '.');

    money = `${Math.round(money * 100) / 100}`;

    if (money.indexOf('.') !== -1) {
        rub = money.substr(0, money.indexOf('.'));
        kop = money.substr(money.indexOf('.') + 1);

        if (kop.length === 1) {
            kop += '0';
        }
    } else {
        rub = money;
    }

    const ru = propis(price = rub);
    const res = kop !== '' ? `${ru}, ${kop} коп.` : `${ru}, 00 коп.`;

    return res.substr(0, 1).toUpperCase() + res.substr(1);
}

function propis(price) {
    let litera = '',
        sotny = '',
        desatky = '',
        edinicy = '';
    for (let i = 0; i < price.length; i += 3) {
        sotny = '';
        desatky = '';
        edinicy = '';
        if (n(i + 2, 2) > 10 && n(i + 2, 2) < 20) {
            edinicy = ` ${words[n(i + 1, 1)][1]} ${words[0][((i / 3)) + 3]}`;
            i === 0 ? edinicy += 'грн.' : 0;
        } else {
            edinicy = words[n(i + 1, 1)][0];
            edinicy == 'одна' && (i >= 6) ? edinicy = 'один' : 0;
            edinicy == 'дві' && (i >= 6) ? edinicy = 'два' : 0;
            i === 0 && edinicy !== '' ? 0 : edinicy += ` ${words[n(i + 1, 1)][(i / 3) + 3]}`;
            edinicy === ' ' ? edinicy = '' : (edinicy === ` ${words[n(i + 1, 1)][(i / 3) + 3]}`) ? 0 : edinicy = ` ${edinicy}`;
            i === 0 ? edinicy += ' грн.' : 0;
            (desatky = words[n(i + 2, 1)][2]) !== '' ? desatky = ` ${desatky}` : 0;
        }
        (sotny = words[n(i + 3, 1)][3]) != '' ? sotny = ` ${sotny}` : 0;
        if (price.substr(price.length - i - 3, 3) === '000' && edinicy === ` ${words[0][(i / 3) + 3]}`) edinicy = '';
        litera = sotny + desatky + edinicy + litera;
    }

    if (price === '0') return `Нуль${litera}`;
    return litera.substr(1);
}

function n(start, len) {
    if (start > price.length) return 0;
    return Number(price.substr(price.length - start, len));
}
