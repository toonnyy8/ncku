extern "C" {
int *copy(int vals[], int size);
}

int *copy(int vals[], int size) {
  int res[size];
  for (int i = 0; i < size; i++)
    res[i] = vals[i];
  return res;
}