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
      function (e) {
         e.preventDefault();
         const key = document.getElementById("textKey").value;
         const value = document.getElementById("textMemo").value;

         //値の入力チェック
         if (key == "" || value == "") {
            Swal.fire({
               title: "Memo app"    //タイトルをここに設定
               , html: "Key , Memoはいずれも必須です。"    //メッセージ内容をここに設定
               , type: "error"       //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
               , allowOutsideClick: false   //枠外クリックは許可しない
            });
            return;
         } else {
            let w_msg = "LocalStorage に\n「" + key + "  " + value + "」\nをほぞんしますか？";
            Swal.fire({
               title: "Memo app"   //タイトルをここに設定
               , html: w_msg    //メッセージ内容をここに設定
               , type: "question"   //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
               , showCancelButton: true    //キャンセルボタの表示

            }).then(function (result) {
               //確認ダイアログで「OK」を押されたとき、保存する
               if (result.value === true) {
                  localStorage.setItem(key, value);
                  viewStorage();       //localStorageからテーブル取得とテーブル表示
                  let w_msg = "LocalStorage に「" + key + "  " + value + "」を保存しました。";
                  Swal.fire({
                     title: "Memo app"  //タイトルをここに設定
                     , html: w_msg    //メッセージ内容をここに設定
                     , type: "success"    //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
                     , allowOutsideClick: false   //枠外クリックは許可しない
                  });
                  document.getElementById("textKey").value = "";
                  document.getElementById("textMemo").value = "";
               }
            });
         }
      }
   );
};

//3. データー選択
function selectTable() {
   const select = document.getElementById("select");
   select.addEventListener("click",
      function (e) {
         e.preventDefault;
         selectCheckBox("select");    //テーブルからデーター選択 version-up3➡

      }, false
   );
};

//4. localStorageから1件削除
// version-up3➡localStorageから選択されている行を削除
function delLocalStorage() {
   const del = document.getElementById("del");
   del.addEventListener("click",
      function (e) {
         e.preventDefault();
         const chkbox1 = document.getElementsByName("chkbox1");
         const table1 = document.getElementById("table1");
         let w_cnt = 0;              //選択されていれば　”1”　が返却される
         w_cnt = selectCheckBox("del");   //テーブルからデーター選択


         //値の入力チェック
         if (w_cnt >= 1) {
            //const key = document.getElementById("textKey").value;
            //const value = document.getElementById("textMemo").value;
            let w_msg = "LocalStorage から選択されている " + w_cnt + " 件を削除しますか？";
            Swal.fire({
               title: "Memo app"   //タイトルをここに設定
               , html: w_msg    //メッセージ内容をここに設定
               , type: "question"   //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
               , showCancelButton: true //キャンセルボタの表示
            }).then(function (result) {
               //確認ダイアログで[ok]を押されたとき、削除する。
               if (result.value === true) {
                  for (let i = 0; i < chkbox1.length; i++) {
                     if (chkbox1[i].checked) {
                        localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                     }
                  }
                  //localStorage.removeItem(key);
                  viewStorage(); //localStorageからテーブルの取得とテーブル表示
                  let w_msg = "LocalStorage から  " + w_cnt + "  件を削除しました。";
                  Swal.fire({
                     title: "Memo app"  //タイトルをここに設定
                     , html: w_msg    //メッセージ内容をここに設定
                     , type: "success"    //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
                     , allowOutsideClick: false   //枠外クリックは許可しない
                  });
                  document.getElementById("textKey").value = "";
                  document.getElementById("textMemo").value = "";
               }
            });
         }
      }
   );
};

//5. localStorageからすべてのデーターを削除
function delAllLocalStroge() {
   const del = document.getElementById("allClear");
   allClear.addEventListener("click",
      function (e) {
         e.preventDefault();
         let w_msg = "LocalStorage のデーターをすべて削除します。\nよろしいですか？";
         Swal.fire({
            title: "Memo app"   //タイトルをここに設定
            , html: w_msg    //メッセージ内容をここに設定
            , type: "question"   //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
            , showCancelButton: true //キャンセルボタの表示
         }).then(function (result) {
            //確認ダイアログで[ok]を押されたとき、すべて削除する。
            //値の入力チェック
            if (result.value === true) {
               localStorage.clear(); //localStorageからすべてのデーターを削除
               viewStorage(); //localStorageからテーブルの取得とテーブル表示
               let w_msg = "LocalStorage のデータをすべて削除しました。";
               Swal.fire({
                  title: "Memo app"  //タイトルをここに設定
                  , html: w_msg    //メッセージ内容をここに設定
                  , type: "success"    //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
                  , allowOutsideClick: false   //枠外クリックは許可しない
               });
               document.getElementById("textKey").value = "";
               document.getElementById("textMemo").value = "";
            }
         });
      }
   );
};

//テーブルからデーター選択
function selectCheckBox(mode) { //version-up3➡
   //let w_sel = "0";       //選択していれば　"1"　にする
   let w_cnt = 0;         //選択されているチェックボックス数
   const chkbox1 = document.getElementsByName("chkbox1");
   const table1 = document.getElementById("table1");
   let w_textKey = "";
   let w_textMemo = "";

   for (let i = 0; i < chkbox1.length; i++) {
      if (chkbox1[i].checked) {
         if (w_cnt === 0) {
            w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
            w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
         }
         //return w_sel = "1";
         w_cnt++;
      }
   }

   document.getElementById("textKey").value = w_textKey;
   document.getElementById("textMemo").value = w_textMemo;
   if (mode === "select") {
      if (w_cnt === 1) {   //ちゃんと１つを選択された時
         return w_cnt;

      } else if (w_cnt > 1) {       //1つ以上を選択された時
         let w_msg = "１つだけ選択してください。";
         Swal.fire({
            title: "Memo app"  //タイトルをここに設定
            , html: w_msg    //メッセージ内容をここに設定
            , type: "warning"    //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
            , allowOutsideClick: false   //枠外クリックは許可しない
         });
         return w_cnt;
      } else {       //1つも選択されてない時
         let w_msg = "１つを選択してください。";
         Swal.fire({
            title: "Memo app"   //タイトルをここに設定
            , html: w_msg   //メッセージ内容をここに設定
            , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
            , allowOutsideClick: false   //枠外クリックは許可しない
         });
      }
   }

   if (mode === "del") {
      if (w_cnt >= 1) {
         return w_cnt;
      } else {
         let w_msg = "１つ以上を選択してください。";
         Swal.fire({
            title: "Memo app"  //タイトルをここに設定
            , html: w_msg    //メッセージ内容をここに設定
            , type: "error"    //ダイアログにアイコンを表示したい場合に設定する引数warning、error、success、info、question
            , allowOutsideClick: false   //枠外クリックは許可しない
         });
      }
   }
};

//localStorageからテーブル取得とテーブル表示
function viewStorage() {
   const list = document.getElementById("list");
   //htmlのテーブルの初期化
   while (list.rows[0]) list.deleteRow(0);

   //localStrogeすべて情報の取得
   for (let i = 0; i < localStorage.length; i++) {
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
      sortList: [[1, 0]]      //tableSort add
   });                         //tableSort add

   $("#table1").trigger("update");    //tableSort add
};