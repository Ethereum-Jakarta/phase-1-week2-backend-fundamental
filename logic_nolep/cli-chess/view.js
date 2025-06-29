import readline from 'readline';
import chalk from 'chalk';

export class ChessView {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    tampilkanPapan(papan) {
        let angka = 8;
        console.log('  a b c d e f g h');
        for (let i = 0; i < papan.length; i++) {
            let baris = '';
            baris += angka + ' ';
            for (let j = 0; j < papan[i].length; j++) {
                let now = papan[i][j];
                if (now === ' ') {
                    baris += '.' + ' ';
                } else {
                    baris += now + ' ';
                }
            }
            baris += angka;
            console.log(baris);
            angka--;
        }
        console.log('  a b c d e f g h');
    }

    async ambilInput(pemainSekarang) {
        return new Promise((resolve) => {
            this.rl.question(chalk.yellow(`Giliran anda ${pemainSekarang}: `), (input) => {
                resolve(input);
            });
        });
    }

    tampilkanPesan(pesan) {
        console.log(pesan);
    }

    tampilkanBantuan() {
        console.log(chalk.cyan.bold('\n=== BANTUAN CHESS GAME ==='));
        console.log(chalk.white('Format input: e2 e4 (dari e2 ke e4)'));
        console.log(chalk.white('Contoh: d1 d4, a2 a3'));
        console.log(chalk.yellow('\nAturan Khusus:'));
        console.log(chalk.white('• Castling: Gerakkan king 2 kotak (e1 g1 atau e1 c1)'));
        console.log(chalk.white('• En Passant: Otomatis jika syarat terpenuhi'));
        console.log(chalk.white('• Promosi Pion: Pilih bidak saat pion sampai ujung'));
    }

    tampilkanError(pesan) {
        console.log(chalk.red(pesan));
    }

    tampilkanHasilAkhir(hasil) {
        if (hasil.type === 'checkmate') {
            console.log(chalk.red(`\n🏆 CHECKMATE!! ${hasil.pemenang.toUpperCase()} MENANG!!`));
        } else if (hasil.type === 'stalemate') {
            console.log(chalk.yellow(`\n🤝 STALEMATE! PERMAINAN SERI! 🤝`));
        }
    }

    tampilkanCheck(pemain) {
        console.log(chalk.red(`⚠️  ${pemain.toUpperCase()} DALAM CHECK!! ⚠️`));
    }

    async tungguEnter(pesan) {
        return new Promise((resolve) => {
            this.rl.question(pesan, () => {
                resolve();
            });
        });
    }

    clearScreen() {
        console.clear();
    }

    tutup() {
        this.rl.close();
    }

    parseInput(input) {
        let hasil = [];
        for (let i = 0; i < input.length; i++) {
            let coba = input[i];
            let ubah;

            if (coba === 'a' || coba === '8') {
                ubah = 0;
            } else if (coba === 'b' || coba === '7') {
                ubah = 1;
            } else if (coba === 'c' || coba === '6') {
                ubah = 2;
            } else if (coba === 'd' || coba === '5') {
                ubah = 3;
            } else if (coba === 'e' || coba === '4') {
                ubah = 4;
            } else if (coba === 'f' || coba === '3') {
                ubah = 5;
            } else if (coba === 'g' || coba === '2') {
                ubah = 6;
            } else if (coba === 'h' || coba === '1') {
                ubah = 7;
            } else {
                ubah = 99;
            }
            hasil.unshift(ubah);
        }
        return hasil;
    }

    async pilihPromosi(warna) {
        const pieces = warna === 'putih'
            ? { 'q': '♕', 'r': '♖', 'b': '♗', 'k': '♘' }
            : { 'q': '♛', 'r': '♜', 'b': '♝', 'k': '♞' };

        console.log(chalk.cyan('\n🎉 PROMOSI PION! 🎉'));
        console.log(chalk.yellow('Pilih bidak untuk promosi:'));
        console.log(chalk.white(`q - Ratu ${pieces.q}`));
        console.log(chalk.white(`r - Benteng ${pieces.r}`));
        console.log(chalk.white(`b - Bishop ${pieces.b}`));
        console.log(chalk.white(`k - Kuda ${pieces.k}`));

        while (true) {
            const input = await this.ambilInput('Pilihan (q/r/b/k)');
            const choice = input.toLowerCase().trim();

            if (pieces[choice]) {
                return pieces[choice];
            } else {
                this.tampilkanError('Pilihan tidak valid!! Guanakan q, r, b, atau k');
            }
        }
    }
}