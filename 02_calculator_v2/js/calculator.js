'use strict';
//ページ上の要素 (ELement)を参照
const elementSelect = document.getElementById ("calcType");
const elementNum1 = document.getElementById ("num1");
const elementNum2 = document.getElementById ("num2");
const elementResult = document.getElementById ("result");
const elementbtnEqual = document.getElementById ("btnEqual");

//イベントを登録
elementSelect.addEventListener("change", clear);
elementNum1.addEventListener("change", clear);
elementNum2.addEventListener("change", clear);

elementbtnEqual.addEventListener("click", update);


//計算する画面に結果を表示します。
function update() {
    //計算結果を求める
    const result = calculate(
        Number(elementNum1.value),  //1番日のテキスト入カフォームの値
        Number(elementNum2.value),  //2番日のテキスト入カフォームの値
        elementSelect.value //セレクトボックスの値（計算の種類
    );
     //両面に表示
     elementResult.innerHTML = result;   //テキストを代人
}

//計算します。[関数を作る]
function calculate(num1, num2, calcType) {
    let result;
    //算の種類で処理を分岐
    switch(calcType) {
        case "type-add":    //足し算の場合
            result = num1 + num2;
            break; 
        case "type-substract":  //引き算の場合
            result = num1 - num2;
            break;
        case "type-multiply":   //掛け算の場合
            result = num1 * num2;
            break 
        case "type-divide": //割り算の場合
            result = num1 / num2;
            break;
    }
    return result;
}

//関数 (clear) 計算結果をクリアします
function clear() {
   elementResult.innerHTML = "";
}