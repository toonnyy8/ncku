extern "C" {
int sum(int vals[], int size);
}

int sum(int vals[], int size) {
  int res = 0;
  for (int i = 0; i < size; i++)
    res += vals[i];
  return res;
}