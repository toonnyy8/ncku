extern "C"
{
    int* gray(int img[], int width, int height);
    int* extract_red(int img[], int width, int height);
    int* extract_green(int img[], int width, int height);
    int* extract_blue(int img[], int width, int height);
    int* mean_filter(int img[], int width, int height);
    int* median_filter(int img[], int width, int height);
}

int* gray(int img[], int width, int height)
{
    int gray_img[width * height * 4];
    for (int i = 0; i < width * height; i++)
    {
        int gray_color =
            (img[i * 4] + img[i * 4 + 1] + img[i * 4 + 2]) /
            3;
        gray_img[i * 4]     = gray_color;
        gray_img[i * 4 + 1] = gray_color;
        gray_img[i * 4 + 2] = gray_color;
        gray_img[i * 4 + 3] = img[i * 4 + 3];
    }
    return gray_img;
}

int* extract_channel(int img[],
                     int width,
                     int height,
                     int channel)
{
    int channel_img[width * height * 4];
    for (int i = 0; i < width * height; i++)
    {
        int channel_power      = img[i * 4 + channel];
        channel_img[i * 4]     = channel_power;
        channel_img[i * 4 + 1] = channel_power;
        channel_img[i * 4 + 2] = channel_power;
        channel_img[i * 4 + 3] = img[i * 4 + 3];
    }
    return channel_img;
}

int* extract_red(int img[], int width, int height)
{
    return extract_channel(img, width, height, 0);
}

int* extract_green(int img[], int width, int height)
{
    return extract_channel(img, width, height, 1);
}

int* extract_blue(int img[], int width, int height)
{
    return extract_channel(img, width, height, 2);
}

int* mean_filter(int img[], int width, int height)
{
    int result_img[width * height * 4];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            for (int c = 0; c < 4; c++)
            {
                int count                           = 0;
                result_img[(i * width + j) * 4 + c] = 0;
                if (i - 1 >= 0)
                {
                    if (j - 1 >= 0)
                    {
                        count += 1;
                        result_img[(i * width + j) * 4 +
                                   c] +=
                            img[((i - 1) * width +
                                 (j - 1)) *
                                    4 +
                                c];
                    }
                    count += 1;
                    result_img[(i * width + j) * 4 + c] +=
                        img[((i - 1) * width + j) * 4 + c];

                    if (j + 1 < width)
                    {
                        count += 1;
                        result_img[(i * width + j) * 4 +
                                   c] +=
                            img[((i - 1) * width +
                                 (j + 1)) *
                                    4 +
                                c];
                    }
                }
                if (j - 1 >= 0)
                {
                    count += 1;
                    result_img[(i * width + j) * 4 + c] +=
                        img[(i * width + (j - 1)) * 4 + c];
                }
                count += 1;
                result_img[(i * width + j) * 4 + c] +=
                    img[(i * width + j) * 4 + c];

                if (j + 1 < width)
                {
                    count += 1;
                    result_img[(i * width + j) * 4 + c] +=
                        img[(i * width + (j + 1)) * 4 + c];
                }
                if (i + 1 < height)
                {
                    if (j - 1 >= 0)
                    {
                        count += 1;
                        result_img[(i * width + j) * 4 +
                                   c] +=
                            img[((i + 1) * width +
                                 (j - 1)) *
                                    4 +
                                c];
                    }
                    count += 1;
                    result_img[(i * width + j) * 4 + c] +=
                        img[((i + 1) * width + j) * 4 + c];

                    if (j + 1 < width)
                    {
                        count += 1;
                        result_img[(i * width + j) * 4 +
                                   c] +=
                            img[((i + 1) * width +
                                 (j + 1)) *
                                    4 +
                                c];
                    }
                }

                result_img[(i * width + j) * 4 + c] =
                    result_img[(i * width + j) * 4 + c] /
                    count;
            }
        }
    }

    return result_img;
}

void insertion_sort(int arr[], int size)
{
    for (int i = 1; i < size; i++)
    {
        int val = arr[i];
        int j   = i - 1;
        while (val < arr[j] && j >= 0)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = val;
    }
}

int* median_filter(int img[], int width, int height)
{
    int result_img[width * height * 4];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            for (int c = 0; c < 4; c++)
            {
                int arr[9];
                int count                           = 0;
                result_img[(i * width + j) * 4 + c] = 0;
                if (i - 1 >= 0)
                {
                    if (j - 1 >= 0)
                    {
                        arr[count] = img[((i - 1) * width +
                                          (j - 1)) *
                                             4 +
                                         c];
                        count += 1;
                    }
                    arr[count] =
                        img[((i - 1) * width + j) * 4 + c];
                    count += 1;

                    if (j + 1 < width)
                    {
                        arr[count] = img[((i - 1) * width +
                                          (j + 1)) *
                                             4 +
                                         c];
                        count += 1;
                    }
                }
                if (j - 1 >= 0)
                {
                    arr[count] =
                        img[(i * width + (j - 1)) * 4 + c];
                    count += 1;
                }
                arr[count] = img[(i * width + j) * 4 + c];
                count += 1;

                if (j + 1 < width)
                {
                    arr[count] =
                        img[(i * width + (j + 1)) * 4 + c];
                    count += 1;
                }
                if (i + 1 < height)
                {
                    if (j - 1 >= 0)
                    {
                        arr[count] = img[((i + 1) * width +
                                          (j - 1)) *
                                             4 +
                                         c];
                        count += 1;
                    }
                    arr[count] =
                        img[((i + 1) * width + j) * 4 + c];
                    count += 1;

                    if (j + 1 < width)
                    {
                        arr[count] = img[((i + 1) * width +
                                          (j + 1)) *
                                             4 +
                                         c];
                        count += 1;
                    }
                }
                insertion_sort(arr, count);
                result_img[(i * width + j) * 4 + c] =
                    arr[count / 2];
            }
        }
    }

    return result_img;
}