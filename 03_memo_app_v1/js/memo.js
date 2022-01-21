"use strict"

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
       function () {
              //1.LocalStrogeが使えるかの確認
              if (typeof localStorage === "undefined") {
                     window.alert("このブラウザは Local Storage 機能が実装されていません");
                     return;
              } else {
                     viewStorage();       // localStorageからデーター取得とテーブルへ表示
                     saveLocalStorage();  //2. localStorageへの保存
                     selectTable();       //3. データー選択
                     delLocalStorage();   //4. localStorageから1件削除
                     delAllLocalStroge(); //5. localStorageからすべてのデーターを削除
              }

       }
);

//2. localStorageへの保存
function saveLocalStorage() {
       const save = document.getElementById("save");
       save.addEventListener("click",
              function(e) {
                     e.preventDefault();
                     const key = document.getElementById("textKey").value;
                     const value = document.getElementById("textMemo").value;

                     //値の入力チェック
                     if (key =="" || value =="") {
                            window.alert("Key , Memo はいずれも必須です。");
                            return;
                     } else {
                            let w_confirm = confirm("LocalStorage に\n" + key + "   " + value + "\nを保存しますか？");
                            if (w_confirm === true) {
                                   localStorage.setItem(key, value);
                                   viewStorage(); //localStorageからテーブル取得とテーブル表示
                                   let w_msg = "LocalStorage に  " + key + "   " + value + "  を保存しました。";
                                   window.alert(w_msg);
                                   document.getElementById("textKey").value = "";
                                   document.getElementById("textMemo").value = "";
                            }
                     }
              },false
       );
};

//3. データー選択
function selectTable() {
       const select = document.getElementById("select");
       select.addEventListener("click",
              function(e) {
                     e.preventDefault;
                     selectCheckBox();    //テーブルからデーター選択

              }, false
       );
 };

 //4. localStorageから1件削除
 function delLocalStorage() {
       const del = document.getElementById("del");
       del.addEventListener("click",
              function(e) {
                     e.preventDefault();
                     let w_sel = "0";              //選択されていれば　”1”　が返却される
                     w_sel = selectCheckBox();   //テーブルからデーター選択
                     

                     //値の入力チェック
                     if (w_sel === "1") {
                            const key = document.getElementById("textKey").value;
                            const value = document.getElementById("textMemo").value;
                            let w_confirm = confirm("LocalStorage から\n" + key + "   " + value + "\nを削除しますか？");

                            if (w_confirm === true) {
                                   localStorage.removeItem(key);
                                   viewStorage(); //localStorageからテーブルの取得とテーブル表示
                                   let w_msg = "LocalStorage から  " + key + "   " + value + "  を削除しました。";
                                   window.alert(w_msg);
                                   document.getElementById("textKey").value = "";
                                   document.getElementById("textMemo").value = "";
                            }
                           
                     }
              },false
       );
};

//5. localStorageからすべてのデーターを削除
function delAllLocalStroge() {
       const del = document.getElementById("allClear");
       allClear.addEventListener("click",
              function(e) {
                     e.preventDefault();
                     let w_confirm = confirm("LocalStorageのデーターをすべて削除します。\n よろしいですか？");
                     //確認ダイアログで[ok]を押されたとき、すべて削除する。

                     //値の入力チェック
                     if (w_confirm === true) {
                            localStorage.clear(); //localStorageからすべてのデーターを削除
                            viewStorage(); //localStorageからテーブルの取得とテーブル表示
                            let w_msg = "LocalStorageのデータをすべて削除しました。";
                            window.alert(w_msg);
                            document.getElementById("textKey").value = "";
                            document.getElementById("textMemo").value = "";
                     }
              },false
       );
};

//テーブルからデーター選択
function selectCheckBox() {
     let w_sel = "0";       //選択していれば　"1"　にする
     let w_cnt = 0;         //選択されているチェックボックス数
     const chkbox1 = document.getElementsByName("chkbox1");
     const table1 = document.getElementById("table1");
     let w_textKey = "";
     let w_textMemo = "";

       for(let i=0; i < chkbox1.length; i++) {
              if(chkbox1[i].checked) {
                     if (w_cnt === 0) {
                            w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                            w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
                     }
                     //return w_sel = "1";
                     w_cnt ++;
              }
       }

       document.getElementById("textKey").value = w_textKey;
       document.getElementById("textMemo").value = w_textMemo;
       if (w_cnt === 1) {
              return w_sel = "1";
              
       } else {
              window.alert("１つを選択してください。");
       } 
};

//localStorageからテーブル取得とテーブル表示
function viewStorage() {
       const list = document.getElementById("list");
       //htmlのテーブルの初期化
       while(list.rows[0]) list.deleteRow(0);
       
       //localStrogeすべて情報の取得
       for(let i = 0; i < localStorage.length; i++) {
              let w_key = localStorage.key(i);

              //localStrogeのキーと値を表示
              let tr = document.createElement("tr");
              let td1 = document.createElement("td");
              let td2 = document.createElement("td");
              let td3 = document.createElement("td");

              list.appendChild(tr);
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);

              td1.innerHTML = "<input name = 'chkbox1' type = 'checkbox'>";
              td2.innerHTML = w_key;
              td3.innerHTML = localStorage.getItem(w_key);
       }

       //jQueryのplugin tablesorterを使ってテーブルのソート
       //sortList:引数１...最初からソートしておく例を指定、引数2...0
       $("#table1").tablesorter({  //tableSort add
              sortList: [[1, 0]]   //tableSort add
       });                         //tableSort add

       $("#table1").trigger("update");    //tableSort add
};