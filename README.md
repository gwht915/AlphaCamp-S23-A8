
# 專案

   - 學期2-3-A8 重構餐廳清單
      * 參考 RESTful 設計，運用 HTTP 動詞來讓路由帶有語義
      * 使用 express.Router 獨立路由器，並規劃路由模組
    
## 專案畫面

   - 主畫面
      ![image](https://github.com/gwht915/AlphaCamp-S23-A7/blob/main/images/S2-3-A8-1.png)

   
## Features - 功能

   - 使用者可以新增一家餐廳
   - 使用者可以瀏覽一家餐廳的詳細資訊
   - 使用者可以瀏覽全部所有餐廳
   - 使用者可以修改一家餐廳的資訊
   - 使用者可以刪除一家餐廳
   - 可按餐廳名稱、類別搜尋特定餐廳
   - 可按指定排序方式排列餐廳清單

## Environment Setup – 環境建置

   - Node.js

## Installing – 專案安裝流程

   - 打開terminal, Clone此專案至本機

      $git clone https://github.com/gwht915/AlphaCamp-S23-A8.git

   - 進入存放此專案的資料夾

      $cd restaurant_list

   - 安裝套件
      $npm install -g nodemon

   - 安裝Mongoose

      $ npm install mongoose@5.9.7
      設定連線

   - 安裝method-override

      $ npm install method-override@3.0.0

   - 在Robo 3T 新增資料庫 restaurant-list

   - 根據restaurant.json在數據庫中建立種子資料
   
      $ node models/seeds/restSeeder.js
      

   - 啟動伺服器，執行app.js專案

      $nodemon app.js 或
      $npm run dev

   - 在瀏覽器中輸入 http://localhost:3000

## Contributor – 專案開發人員

   - Gary Tse

