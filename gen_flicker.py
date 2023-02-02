import random

MIN = 0.8
MAX = 1.0
for percent in range(0, 101, 10):
    print(f"  {percent}% {{")
    print(f"    opacity: {random.random() * (MAX - MIN) + MIN:.5f};")
    print(f"  }}")
