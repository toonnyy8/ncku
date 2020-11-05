extern "C"
{
    int* gray(int img[], int height, int width);
}

int* gray(int img[], int height, int width)
{
    int gray_img[height * width * 4];
    for (int i = 0; i < height * width; i++)
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