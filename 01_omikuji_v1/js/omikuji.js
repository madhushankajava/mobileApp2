"use strict";
window.addEventListener("DOMContentLoaded",
    function(){
        //ページ全体が読み込まれたタイミングで実行するコード

        // ヘッダーのテキストエフェクト
        $("header").textillate({
        loop: false, // ループのオンオフ
        minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
        initialDelay: 2000,   // 遅延時間
        autoStart: true,      // アニメーションを自動的にスタート
        in: {                 // フェードインのエフェクトの詳細設定
            effect: "fadeInLeftBig", // エフェクトの名前（animate.css参照）
            delayScale: 1.5,         // 遅延時間の指数
            delay: 50,               // 文字ごとの遅延時間
            sync: false,             // trueはアニメーションをすべての文字に同時に適用
            huffle: true            // trueは文字を順番にではなく、ランダムに
            }
        });
      
        // おみくじボタン（id="btn1"）　ボヤァと表示させる
        $(function () {
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });

        setTimeout(
            function () {
                //ポップアップメッセージ
                let popMessage = "いらっしゃい！おみくじ引いてって！";
                window.alert(popMessage);
            },
            "5000"
        );

    },false
);

//おみくじボタン1
const btn1=document.getElementById("btn1");
btn1.addEventListener("click",
    function(){
        let n = Math.floor(Math.random() * 3);

        switch (n) {
            case 0:
                btn1.textContent = "Verry Happy !!";
                btn1.style.color = "#FF0000";
                btn1.style.fontSize = "35px";
                break;
            case 1:
                btn1.textContent = "Happy !";
                btn1.style.color = "#fff001";
                btn1.style.fontSize = "30px";
                break;
            case 2:
                btn1.textContent = "UnHappy...";
                btn1.style.color = "#261e1c";
                btn1.style.fontSize = "25px";
                break;
        }

        // snowfall stop
        $(document).snowfall("clear");

        // jQueryのsnowfall
        $(document).ready(function(){
            $(document).snowfall({
                maxSpeed : 5, // 最大速度
                minSpeed : 1, // 最小速度
                maxSize  : 20, // 最大サイズ
                minSize  : 1, // 最小サイズ
                image : 'pictures/sakura_hanabira.png'
            });
        });

    },false
);