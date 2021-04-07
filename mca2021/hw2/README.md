# 成大 多媒體內容分析 2021

## GMM 分割圖像

### 使用方式

-   Train

    ```zsh
    >> program train -h //查看使用說明
    >> program train -e <最大更新次數(可選，預設為 10)> \
                     -k <GMM 的 kernel 數目(可選，預設為 2)> \
                     -w <儲存權重檔名(可選，預設為 "gmm_file")> \
                     -r <二分類參考用的輸入檔案(必要)> <二分類參考用的標記檔案(必要)> \
                     -f <訓練用檔案(必要，可多個)>...
    ```

-   Evaluation
    ```zsh
    >> program eval -h //查看使用說明
    >> program eval -i <輸入檔案(必要)> \
                     -w <儲存權重檔名(必要)> \
                     -o <輸出分割圖檔名(可選)> \
                     -t <標記圖檔名(可選，有的話會計算  Dice Coefficient)>
    ```
