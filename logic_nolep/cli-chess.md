# Logic Nolep (Chess with CLI)

Pada logic nolep ini kalian akan membuat game catur dalam CLI di node js

persyaratannya:

1. tampilan board harus bagus dan rapih (minimal bisa di mengerti)
   
   ![image](https://github.com/user-attachments/assets/2c9a37b6-5fda-452c-92cd-a9bbb29016e9)

2. para bidak catur bisa digerakan sesuai aturan catur yang ada
3. game catur di mainkan dengan 2 orang secara bergantian
4. menggerakan bidak catur menggunakan command (e.g., e2 e4)
   - e2 (commang ke-1) bidak yang ingin di gerakan
   - e4 (command ke-2) bidak akan di gerakan ke sana
5. game harus bisa dimainkan dari awal hingga selesai 

```js

const board = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

```

***tampilan bidak catur dan ukuran board harus sama seperti di atas. bebas gunakan semua refrensi yang ada di internet***
