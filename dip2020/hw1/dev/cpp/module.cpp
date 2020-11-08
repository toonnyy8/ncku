#include <cstdlib>
#include <math.h>

extern "C"
{
    void consoleLog(int num);
    int* new_int_arr(int size);
    void delete_int_arr(int* ptr);
    int* gray(int img[], int width, int height);
    int* extract_red(int img[], int width, int height);
    int* extract_green(int img[], int width, int height);
    int* extract_blue(int img[], int width, int height);
    int* mean_filter(int img[], int width, int height);
    int* median_filter(int img[], int width, int height);
    int* histogram(int img[], int width, int height);
    int*
         threshold(int img[], int width, int height, int cutoff);
    int* vertical_filter(int img[], int width, int height);
    int*
         horizontal_filter(int img[], int width, int height);
    int* combined(int    img1[],
                  int    img2[],
                  int    width,
                  int    height,
                  double rate);
    int*
    overlap(int img1[], int img2[], int width, int height);
}

int* new_int_arr(int size)
{
    int* ptr = new int[size];
    return ptr;
}

void delete_int_arr(int* ptr)
{
    delete[] ptr;
}

int* gray(int img[], int width, int height)
{
    int* gray_img = new int[width * height * 4];
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
    int* channel_img = new int[width * height * 4];
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

// kernel 的寬高必須是奇數
int* conv(int  inp[],
          int  width,
          int  height,
          int* kernel,
          int  kernel_width,
          int  kernel_height,
          int  mean)
{
    int* result_img = new int[width * height * 4];
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
                for (int offset_y = offset_y_begin;
                     offset_y <= offset_y_end; offset_y++)
                {
                    for (int offset_x = offset_x_begin;
                         offset_x <= offset_x_end;
                         offset_x++)
                    {
                        int ky = offset_y - y +
                                 (kernel_height - 1) / 2;

                        int kx = offset_x - x +
                                 (kernel_width - 1) / 2;
                        count += 1;
                        int inp_val =
                            inp[((offset_y * width) +
                                 offset_x) *
                                    4 +
                                c];
                        int kernel_val = kernel
                            [kernel_width * kernel_height -
                             ((ky * kernel_width) + kx) -
                             1];
                        val += inp_val * kernel_val;
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
    int* result_img = new int[width * height * 4];
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

int* threshold(int img[], int width, int height, int cutoff)
{
    consoleLog(cutoff);
    int* result_img = new int[width * height * 4];

    for (int i = 0; i < width * height; i++)
    {
        for (int c = 0; c < 3; c++)
        {
            result_img[i * 4 + c] =
                img[i * 4 + c] >= cutoff ? 255 : 0;
        }
        result_img[i * 4 + 3] = img[i * 4 + 3];
    }

    return result_img;
}

int* vertical_filter(int img[], int width, int height)
{
    int kernel[9];
    kernel[0] = 1;
    kernel[3] = 2;
    kernel[6] = 1;
    kernel[1] = 0;
    kernel[4] = 0;
    kernel[7] = 0;
    kernel[2] = -1;
    kernel[5] = -2;
    kernel[8] = -1;
    int* result_img =
        conv(img, width, height, kernel, 3, 3, false);

    for (int i = 0; i < width * height * 4; i++)
        result_img[i] = abs(result_img[i]);

    return result_img;
}

int* horizontal_filter(int img[], int width, int height)
{
    int kernel[9];
    kernel[0] = 1;
    kernel[1] = 2;
    kernel[2] = 1;
    kernel[3] = 0;
    kernel[4] = 0;
    kernel[5] = 0;
    kernel[6] = -1;
    kernel[7] = -2;
    kernel[8] = -1;
    int* result_img =
        conv(img, width, height, kernel, 3, 3, false);

    for (int i = 0; i < width * height * 4; i++)
        result_img[i] = abs(result_img[i]);

    return result_img;
}

int* combined(int    img1[],
              int    img2[],
              int    width,
              int    height,
              double rate)
{
    // consoleLog(width * height * 4);
    int* result_img = new int[width * height * 4];
    for (int i = 0; i < width * height * 4; i++)
    {
        result_img[i] = pow((pow(img1[i], 2) * rate +
                             pow(img2[i], 2) * (1 - rate)),
                            0.5);
    }

    return result_img;
}

int* overlap(int img1[], int img2[], int width, int height)
{
    // consoleLog(width * height * 4);
    int* result_img = new int[width * height * 4];
    for (int i = 0; i < width * height; i++)
    {
        if (img2[i * 4] != 0 || img2[i * 4 + 1] != 0 ||
            img2[i * 4 + 2] != 0)
        {
            result_img[i * 4]     = 0;
            result_img[i * 4 + 1] = 255;
            result_img[i * 4 + 2] = 0;
        }
        else
        {
            result_img[i * 4]     = img1[i * 4];
            result_img[i * 4 + 1] = img1[i * 4 + 1];
            result_img[i * 4 + 2] = img1[i * 4 + 2];
        }
        result_img[i * 4 + 3] = img1[i * 4 + 3];
    }

    return result_img;
}

int* histogram_mapping(int img[],
                       int width,
                       int height,
                       int channel)
{
    int  frequency[256];
    int* mapping = new int[256];
    int  all     = width * height;
    int  cutoff  = all / 256;

    for (int i = 0; i < 256; i++)
    {
        frequency[i] = 0;
        mapping[i]   = 0;
    }
    for (int i = 0; i < all; i++)
    {
        frequency[img[i * 4 + channel]] += 1;
    }
    int accumulation = 0;
    int j            = 0;

    for (int i = 0; i < 256; i++)
    {
        mapping[i] = j;
        accumulation += frequency[i];
        while (accumulation > cutoff * (j + 1))
            j += 1;
    }
    return mapping;
}

int* histogram(int img[], int width, int height)
{
    int* mapping_red =
        histogram_mapping(img, width, height, 0);
    int* mapping_green =
        histogram_mapping(img, width, height, 1);
    int* mapping_blue =
        histogram_mapping(img, width, height, 2);

    int* result_img = new int[width * height * 4];
    for (int i = 0; i < width * height; i++)
    {
        result_img[i * 4] = mapping_red[img[i * 4]];
        result_img[i * 4 + 1] =
            mapping_green[img[i * 4 + 1]];
        result_img[i * 4 + 2] =
            mapping_blue[img[i * 4 + 2]];
        result_img[i * 4 + 3] = 255;
    }
    delete[] mapping_red;
    delete[] mapping_green;
    delete[] mapping_blue;
    return result_img;
}