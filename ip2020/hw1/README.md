# [IP Homework1](https://toonnyy8.github.io/ncku/ip2020/hw1/build/index.html)
> dev 資料夾中存放開發用原始碼。  
> build 資料夾則是存放已經打包完的程式碼，可直接開啟 index.html 觀看執行結果。

功能解說
* upload：選擇並上傳圖片。
* store：將操作區的圖片儲存至暫存區。
* load：將暫存區的圖片覆蓋至操作區。
* undo：回覆上次操作(不含特徵點標記)。
* 在操作區連點兩下：設定特徵點(最多設兩個)。
* gray：灰階化。
* extract：將 RGB 其中一個通道分離出來。
* mean filter：均值濾波器。
* median filter：中位數濾波器。
* histogram：取得 R 通道的直方圖。
* equalization：對每個通道分別做直方圖均衡化。
* threshold：依據設定的閥值對圖片做二值化。
* vertical filter：對 x 方向做 Sobel operator。
* horizontal filter：對 y 方向做 Sobel operator。
* combined：依據設定的比例將操作區與暫存區的圖片融合。
* overlap：將暫存區的圖片對操作區的圖片做遮罩。
* matching：利用標記的特徵點將操作區的圖片轉換到與暫存區的圖片相同的姿態，並顯示轉換的位移、旋轉及縮放。
* intensity difference：計算出操作區與暫存區圖片之間的強度差。