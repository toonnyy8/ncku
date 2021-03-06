# 成大 多媒體內容分析 2021

## 使用 GMM 進行色彩圖像分割

### 使用方式

-   Train

    ```zsh
    //查看訓練模式使用說明
    >> program train -h

    //執行訓練
    >> program train -e <最大更新次數(可選，預設為 10)> \
                     -k <GMM 的 kernel 數目(可選，預設為 2)> \
                     -w <儲存權重檔名(可選，預設為 "gmm_file")> \
                     -r <場景分類參考用的輸入檔案(必要)> <場景分類參考用的標記檔案(必要)> [<場景分類參考用的輸入檔案> <場景分類參考用的標記檔案>](可選，可多個)... \
                     -f <訓練用檔案(必要，可多個)>...

    //範例
    >> hw2.exe train -e 10 -k 4 -w ./weights/m2k4.json -r ./data/soccer1.jpg ./data/soccer1_mask.png ./data/soccer2.jpg ./data/soccer2_mask.png -f ./data/soccer1.jpg ./data/soccer2.jpg
    ```

-   Evaluation

    ```zsh
    //查看評估模式使用說明
    >> program eval -h

    //執行 gmm 切割
    >> program eval -i <輸入檔案(必要)> \
                    -w <儲存權重檔名(必要)> \
                    -o <輸出分割圖檔名(可選)> \
                    -t <標記圖檔名(可選，有的話會計算 Pixel Accuracy)>

    //範例
    >> hw2.exe eval -i ./data/soccer2.jpg -w ./weights/m2k4.json -o ./output_img/m2k4s2.png -t ./data/soccer2_mask.png
    ```
