"use strict";

//flagが"pen-flag"のときpenguineのターン、flagが"bear-flag"のときbearのターン
let flag = "pen-flag";
//let flag = "bear-flag";

//ターン数カウンター
let counter = 9;

// class = "square" を取得
const squares = document.getElementsByClassName("square");

// Array に変換
const squaresArray = Array.from(squares);

// squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// New Game ボタンを取得
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

// Win Or Lose Judgement Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winningLine = null;

// メッセージ
const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack! (Your Turn)</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack! (Computer Turn)</p>';

const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';

//サウンド
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {
        setMessage("pen-turn");

        //squareがクリック可能がを判断するクリックを追加
        squaresArray.forEach (function(square){
            square.classList.add("js-clickable");
        });
    }, false
);

// Win or Lose Judment Lineを配列化
//****************************************
//JavaScript でfilterを使う方法
function JudgLine(targetArray, idArray) {
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

//****************************************
// Square クリックしたときのイベント発火
// クリックしたsquareに,penguinかbearを表示。
squaresArray.forEach(function (square){
    square.addEventListener('click', () => {
        let gameOverFlg = isSelect(square);

        //GameOver ではない場合、クマのターン (Auto)
        if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");

            setTimeout(
                function () {
                  bearTurn();
                },
                "2000"
            );
        }
    });
});

//**************************************
// クリックしたsquareに,penguinかbearを表示。
// 表示したところはクリック出来ないようにする。
function isSelect(selectSquare) {
    let gameOverFlg = "0";
    if (flag === "pen-flag") {
        //クリックサウンド
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-pen-checked"); //squareにpenguinsを表示。
        selectSquare.classList.add("js-unclickable"); //squareがクリックできないようにする。
        selectSquare.classList.remove("js-clickable"); //squareがクリック可能かを判断するクラスを削除。

        //penguine is win
        if (isWinner("penguins")){
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }
        setMessage("bear-turn");
        flag = "bear-flag";

    } else {
        //クリックサウンド
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-bear-checked"); //squareにbearを表示。
        selectSquare.classList.add("js-unclickable"); //squareがクリックできないようにする。
        selectSquare.classList.remove("js-clickable"); //squareがクリック可能かを判断するクラスを削除。

        //white-bear is win
        if (isWinner("bear")){
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }
    //ターン数カウンターを1する
    counter --;

    //ターン数＝0になったらDRAW
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}
//**************************************
// 勝敗判定 (しょうはい　はんてい)
//**************************************
function isWinner(symbol) {
    const result = lineArray.some(function (line) {
        const subResult = line.every(function (square) {
            if (symbol === "penguins" ) {
                //console.log("pen-checked");
                return square.classList.contains("js-pen-checked");
                
            }
            if (symbol === "bear" ) {
                //console.log("bear-checked");
                return square.classList.contains("js-bear-checked");
            }
        });
        if (subResult) { winningLine = line }

        return subResult;
    });
    return result;
}

// メッセージを切り替え関数
//**************************************
const msgtext = document.getElementById("msgtext");
function setMessage(id) {

    switch (id) {
        case "pen-turn":
            msgtext.innerHTML = msgtxt1;
            break;
        case "bear-turn":
            msgtext.innerHTML = msgtxt2;
            break;

        case "pen-win":
            msgtext.innerHTML = msgtxt3;
            break;

        case "bear-win":
            msgtext.innerHTML = msgtxt4;
            break;

        case "draw":
            msgtext.innerHTML = msgtxt5;
            break;

        default:
            msgtext.innerHTML = msgtxt1;
    }
}

//**************************************
// ゲーム終了時の処理
//**************************************
function gameOver(status) {
    //GameOver サウンド
    let w_sound;
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    //All square unclickable
    //squaresArray.forEach(function (square) {
    //    square.classList.add("js-unclickable");
    //});
    squaresBox.classList.add("js-unclickable"); //squares-boxクリックできないようにする。

    //display New game button : display
    newgamebtn_display.classList.remove("js-hidden");

    //Win Effect
    if (status === "penguins") {
        //Winner-Line penguins High-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-pen_highLight");
            });
        }

        //Penguins Win!! ==> snow color Pink
        $(document).snowfall({
            flakeColor : "rgb(255,240,245)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    
    } else if (status === "bear") {
        //Winner-Line Bear High-light
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-bear_highLight");
            });
        }

        //Bear Win!! ==> snow color Blue
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
        
    }
}

//**************************************
// New Game button クリックした時、ゲーム初期化
//**************************************
newgamebtn.addEventListener('click', () => {

    //新しいゲームはペンギンのターンから始まる。
    flag = "pen-flag";

    //ターンカウンターを初期化する。
    counter = 9;

    //winningLineを初期化する。
    winningLine = null;

    //9個のマス目を初期化する。
    squaresArray.forEach(function (square) {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");
    });

    //メッセージのセット。
    squaresBox.classList.remove("js-unclickable");
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");

    //snowfall stop
    $(document).snowfall("clear");
});


//**************************************
// クマのターン(Computer)のロジックの関数
//**************************************
function bearTurn(){
    let bearTurnEnd = "0";
    let gameOverFlg = "0";

    while (bearTurnEnd === "0") {

        //クマのリーチ行を検索(attack)
        bearTurnEnd = isReach("bear");
        if (bearTurnEnd === "1") { //クマのリーチ行あり..この一手で終わり
            gameOverFlg = "1";
            break; //while を終了
        }

        //ペンギンのリーチ行を検索(defence)
        bearTurnEnd = isReach("penguins");
        if (bearTurnEnd === "1") {
            break; //while を終了
        }
    
    
        //まだ升目を選んでいない場合、クリックできるマス目をランダムに選ぶ。
        const bearSquare = squaresArray.filter(function(square) {
            return square.classList.contains("js-clickable");
            
        });

        let n = Math.floor(Math.random() * bearSquare.length);
        gameOverFlg = isSelect(bearSquare[n]);
        break; //while を終了

    }
    
    //GameOver ではない場合。
    if (gameOverFlg === "0") {
        squaresBox.classList.remove("js-unclickable");
    }
}


//**************************************
// リーチ行を探す
//**************************************
function isReach(status) {
    let bearTurnEnd = "0"; //マスのターン

    lineArray.some(function (line){
        let bearCheckCnt = 0; //マスがチェックされている数
        let penCheckCnt = 0; //ペンギンがチェックされている数

        line.forEach(function (square){
            if (square.classList.contains("js-bear-checked")) {
                bearCheckCnt ++; //マスがチェックされている数
            }

            if (square.classList.contains("js-pen-checked")) {
                penCheckCnt ++; //ペンギンがチェックされている数
            }

        });

        //クマのリーチ行を検索時に、クマのリーチ行あり
        if (status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0) {
            
            bearTurnEnd = "1"; //クマのリーチ行あり
        }

        //ペンギンのリーチ行を検索時に、ペンギンのリーチ行あり
        if (status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
            
            bearTurnEnd = "1"; //ペンギンのリーチ行あり
        }

        //クマ　か　ペンギンのリーチ行ある場合、空いているマス目を選択する
        if (bearTurnEnd === "1") {
            line.some(function (square) {
                if (square.classList.contains("js-clickable")) {
                    isSelect(square);
                    return true;
                }
            })
            return true;
        }

    });

    return bearTurnEnd;
}