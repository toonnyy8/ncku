#include <cstdlib>
#include <math.h>

extern "C"
{
    int* gray(int img[], int width, int height);
    int* extract_red(int img[], int width, int height);
    int* extract_green(int img[], int width, int height);
    int* extract_blue(int img[], int width, int height);
    int* mean_filter(int img[], int width, int height);
    int* median_filter(int img[], int width, int height);
    int* vertical_filter(int img[], int width, int height);
    int*
    horizontal_filter(int img[], int width, int height);
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

// int* mean_filter(int img[], int width, int height)
// {
//     int result_img[width * height * 4];
//     for (int i = 0; i < height; i++)
//     {
//         for (int j = 0; j < width; j++)
//         {
//             for (int c = 0; c < 4; c++)
//             {
//                 int count                           = 0;
//                 result_img[(i * width + j) * 4 + c] = 0;
//                 if (i - 1 >= 0)
//                 {
//                     if (j - 1 >= 0)
//                     {
//                         count += 1;
//                         result_img[(i * width + j) * 4 +
//                                    c] +=
//                             img[((i - 1) * width +
//                                  (j - 1)) *
//                                     4 +
//                                 c];
//                     }
//                     count += 1;
//                     result_img[(i * width + j) * 4 + c]
//                     +=
//                         img[((i - 1) * width + j) * 4 +
//                         c];

//                     if (j + 1 < width)
//                     {
//                         count += 1;
//                         result_img[(i * width + j) * 4 +
//                                    c] +=
//                             img[((i - 1) * width +
//                                  (j + 1)) *
//                                     4 +
//                                 c];
//                     }
//                 }
//                 if (j - 1 >= 0)
//                 {
//                     count += 1;
//                     result_img[(i * width + j) * 4 + c]
//                     +=
//                         img[(i * width + (j - 1)) * 4 +
//                         c];
//                 }
//                 count += 1;
//                 result_img[(i * width + j) * 4 + c] +=
//                     img[(i * width + j) * 4 + c];

//                 if (j + 1 < width)
//                 {
//                     count += 1;
//                     result_img[(i * width + j) * 4 + c]
//                     +=
//                         img[(i * width + (j + 1)) * 4 +
//                         c];
//                 }
//                 if (i + 1 < height)
//                 {
//                     if (j - 1 >= 0)
//                     {
//                         count += 1;
//                         result_img[(i * width + j) * 4 +
//                                    c] +=
//                             img[((i + 1) * width +
//                                  (j - 1)) *
//                                     4 +
//                                 c];
//                     }
//                     count += 1;
//                     result_img[(i * width + j) * 4 + c]
//                     +=
//                         img[((i + 1) * width + j) * 4 +
//                         c];

//                     if (j + 1 < width)
//                     {
//                         count += 1;
//                         result_img[(i * width + j) * 4 +
//                                    c] +=
//                             img[((i + 1) * width +
//                                  (j + 1)) *
//                                     4 +
//                                 c];
//                     }
//                 }

//                 result_img[(i * width + j) * 4 + c] =
//                     result_img[(i * width + j) * 4 + c] /
//                     count;
//             }
//         }
//     }

//     return result_img;
// }

// kernel 的寬高必須是奇數
int* conv(int  inp[],
          int  width,
          int  height,
          int* kernel,
          int  kernel_width,
          int  kernel_height,
          int  mean)
{
    int result_img[width * height * 4];
    for (int y = 0; y < height; y++)
    {
        for (int x = 0; x < width; x++)
        {
            for (int c = 0; c < 3; c++)
            {
                int offset_y_begin =
                    y - (kernel_height - 1) / 2;
                offset_y_begin =
                    offset_y_begin > 0 ? offset_y_begin : 0;

                int offset_y_end =
                    y + (kernel_height - 1) / 2;
                offset_y_end = offset_y_end < height ?
                                   offset_y_end + 1 :
                                   height;
                offset_y_end -= 1;

                int offset_x_begin =
                    x - (kernel_width - 1) / 2;
                offset_x_begin =
                    offset_x_begin > 0 ? offset_x_begin : 0;

                int offset_x_end =
                    x + (kernel_width - 1) / 2;
                offset_x_end = offset_x_end < width ?
                                   offset_x_end + 1 :
                                   width;
                offset_x_end -= 1;

                int count = 0;
                int val   = 0;
                for (int offset_y = offset_y_end;
                     offset_y >= offset_y_begin; offset_y--)
                {
                    for (int offset_x = offset_x_end;
                         offset_x >= offset_x_begin;
                         offset_x--)
                    {
                        int ky = offset_y - y +
                                 (kernel_height - 1) / 2;

                        int kx = offset_x - x +
                                 (kernel_width - 1) / 2;
                        count += 1;
                        val += inp[((offset_y * width) +
                                    offset_x) *
                                       4 +
                                   c] *
                               kernel[((ky * kernel_width) +
                                       kx)];
                    }
                }
                if (mean)
                {
                    val = val / count;
                }
                result_img[((y * width) + x) * 4 + c] = val;
            }
            result_img[((y * width) + x) * 4 + 3] =
                inp[((y * width) + x) * 4 + 3];
        }
    }

    return result_img;
}

int* mean_filter(int img[], int width, int height)
{
    int kernel[9];
    for (int i = 0; i < 9; i++)
    {
        kernel[i] = 1;
    }
    return conv(img, width, height, kernel, 3, 3, true);
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

int* vertical_filter(int img[], int width, int height)
{
    int kernel[9];
    for (int i = 0; i < 9; i++)
    {
        if (i % 3 == 0)
        {
            kernel[i] = 1;
        }
        else if (i % 3 == 1)
        {
            kernel[i] = 0;
        }
        else
        {
            kernel[i] = -1;
        }
    }
    int* result_img =
        conv(img, width, height, kernel, 3, 3, false);

    for (int i = 0; i < width * height * 4; i++)
        result_img[i] = abs(result_img[i]);

    return result_img;
}

int* horizontal_filter(int img[], int width, int height)
{
    int kernel[9];
    for (int i = 0; i < 9; i++)
    {
        if (i < 3)
        {
            kernel[i] = 1;
        }
        else if (i < 6)
        {
            kernel[i] = 0;
        }
        else
        {
            kernel[i] = -1;
        }
    }
    int* result_img =
        conv(img, width, height, kernel, 3, 3, false);

    for (int i = 0; i < width * height * 4; i++)
        result_img[i] = abs(result_img[i]);

    return result_img;
}

int* combined(int img1[], int img2[], int width, int height)
{
    int result_img[9];
    for (int i = 0; i < 9; i++)
    {
        if (i < 3)
        {
            kernel[i] = 1;
        }
        else if (i < 6)
        {
            kernel[i] = 0;
        }
        else
        {
            kernel[i] = -1;
        }
    }
    int* result_img =
        conv(img, width, height, kernel, 3, 3, false);

    for (int i = 0; i < width * height * 4; i++)
        result_img[i] = abs(result_img[i]);

    return result_img;
}

// int main(void)
// {
//     int img[3 * 3 * 4] = {
//         1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3,
//         1, 2, 3, 4, 9, 1, 2, 3, 5, 6, 7, 8,
//         5, 6, 7, 8, 1, 2, 3, 4, 9, 1, 2, 3,
//     };
//     int kernel[3 * 3] = {
//         1, 1, 1, 1, 1, 1, 1, 1, 1,
//     };
//     int* result_img = conv(img, 3, 3, kernel, 3, 3,
//     true); return 0;
// }