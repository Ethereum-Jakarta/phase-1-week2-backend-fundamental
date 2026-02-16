import readline from 'readline';
import chalk from 'chalk';
import fs from 'fs/promises';

let papan = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

let pemainSekarang = 'putih';

let warna = {
    '♜': 'hitam', '♞': 'hitam', '♝': 'hitam', '♛': 'hitam', '♚': 'hitam', '♟': 'hitam',
    '♖': 'putih', '♘': 'putih', '♗': 'putih', '♕': 'putih', '♔': 'putih', '♙': 'putih'
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

function tampilkanPapan() {
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

async function ambilInput() {
    console.log('\n');
    while (true) {
        tampilkanPapan();
        let command = await question(chalk.yellow(`Giliran anda ${pemainSekarang}: `));
        let array = command.split(' ');

        if (array.length === 2) {
            let dari = parseInput(array[0]);
            let ke = parseInput(array[1]);

            let valid = validasiDasar(dari, ke, pemainSekarang);
            if (valid) {
                pindahBidak(dari, ke);
                break;
            } else {
                await question('Langkah tidak valid, yang bener lah...');
            }
        } else {
            console.log('Yang bener lah woyy!!');
        }
    }
}

function validasiDasar(dari, ke, pemainSekarang) {
    const bidak = papan[dari[0]][dari[1]];

    // cek apakah ada bidak di posisi asal
    if (!bidak || bidak === ' ') return false;

    if (warna[bidak] !== pemainSekarang) return false;

    if (ke[0] < 0 || ke[0] > 7 || ke[1] < 0 || ke[1] > 7) return false;

    const tujuan = papan[ke[0]][ke[1]];
    if (tujuan !== ' ' && warna[tujuan] === pemainSekarang) return false;

    // validasi gerakan bidak
    let gerakanValid = false;
    if (bidak === '♚' || bidak === '♔') {
        gerakanValid = validasiKing(dari, ke);
    } else if (bidak === '♜' || bidak === '♖') {
        gerakanValid = validasiBenteng(dari, ke);
    } else if (bidak === '♗' || bidak === '♝') {
        gerakanValid = validasiBishop(dari, ke);
    } else if (bidak === '♕' || bidak === '♛') {
        gerakanValid = validasiRatu(dari, ke);
    } else if (bidak === '♞' || bidak === '♘') {
        gerakanValid = validasiKuda(dari, ke);
    } else if (bidak === '♙' || bidak === '♟') {
        gerakanValid = validasiPion(dari, ke);
    }

    if (!gerakanValid) return false;

    // simulasi gerakan selain king
    if (bidak !== '♚' && bidak !== '♔') {
        // simulasi gerakan
        papan[ke[0]][ke[1]] = bidak;
        papan[dari[0]][dari[1]] = ' ';

        // cek raja kena check
        const kingPos = cariKing(pemainSekarang);
        const warnaLawan = pemainSekarang === 'putih' ? 'hitam' : 'putih';
        const kingAttacked = posisiDiserang(kingPos, warnaLawan);

        // kembalikan papan
        papan[dari[0]][dari[1]] = bidak;
        papan[ke[0]][ke[1]] = tujuan;

        if (kingAttacked) {
            console.log('gerakan ditolak: king akan kena check');
            return false;
        }
    }
    return true;
}

function validasiKing(dari, ke) {
    const deltaRow = Math.abs(ke[0] - dari[0]);
    const deltaCol = Math.abs(ke[1] - dari[1]);

    // king cuma bisa gerak 1 kotak ke segala arah
    if (deltaRow > 1 || deltaCol > 1) return false;

    // cek apakah posisi tujuan masih diserang
    const king = papan[dari[0]][dari[1]];
    const warnaKing = warna[king];
    const warnaLawan = warnaKing === 'putih' ? 'hitam' : 'putih';

    // simulasi pindahkan king sementara
    const tujuan = papan[ke[0]][ke[1]];
    papan[ke[0]][ke[1]] = king;
    papan[dari[0]][dari[1]] = ' ';

    // cek apakah posisi baru masih diserang
    const masihDiserang = posisiDiserang(ke, warnaLawan);

    // kembalikan posisi
    papan[dari[0]][dari[1]] = king;
    papan[ke[0]][ke[1]] = tujuan;

    return !masihDiserang;

}

function cariKing(warna) {
    const kingSymbol = warna === 'putih' ? '♔' : '♚';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (papan[i][j] === kingSymbol) {
                return [i, j];
            }
        }
    }
    return null;
}

function posisiDiserang(posisi, warnaLawan) {
    // cek semua bidak lawan, apakah ada yang bisa serang posisi ini
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const bidak = papan[i][j];
            if (bidak !== ' ' && warna[bidak] === warnaLawan) {
                // cek apakah bidak ini bisa diserang posisi target
                if (bisaSerang(bidak, [i, j], posisi)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function validasiRatu(dari, ke) {
    return validasiBenteng(dari, ke) || validasiBishop(dari, ke);
}

function validasiKuda(dari, ke) {
    const deltaRow = Math.abs(ke[0] - dari[0]);
    const deltaCol = Math.abs(ke[1] - dari[1]);

    return (deltaRow === 2 && deltaCol === 1) || (deltaRow === 1 && deltaCol === 2);
}

function validasiBenteng(dari, ke) {
    // cuma bisa gerak horizontal atau vertikal
    if (dari[0] !== ke[0] && dari[1] !== ke[1]) return false;

    return jalurKosong(dari, ke);
}

function validasiBishop(dari, ke) {
    const deltaRow = Math.abs(ke[0] - dari[0]);
    const deltaCol = Math.abs(ke[1] - dari[1]);

    if (deltaRow !== deltaCol) return false;    // gerak diagonal;

    return jalurKosong(dari, ke);
}

function validasiPion(dari, ke) {
    const bidak = papan[dari[0]][dari[1]];
    const isPutih = warna[bidak] === 'putih';

    // pion putih bergerak ke atas(row mengecil) sedangkan pion hitam sebaliknya
    const arahMaju = isPutih ? -1 : 1;

    const deltaRow = ke[0] - dari[0];
    const deltaCol = ke[1] - dari[1];

    // cek pion bergerak ke arah yang benar (pion tidak bisa mundur)
    if ((isPutih && deltaRow >= 0) || (!isPutih && deltaRow <= 0)) {
        return false;
    }

    const tujuan = papan[ke[0]][ke[1]];
    const cekTujuan = tujuan !== ' ';

    if (deltaCol === 0) {
        // gerakan lurus
        return validasiPionLurus(dari, ke, arahMaju, cekTujuan);
    } else if (Math.abs(deltaCol) === 1) {
        // pion makan secara diagonal
        return validasiPionMakan(dari, ke, arahMaju, cekTujuan);
    } else {
        return false;
    }
}

function validasiPionLurus(dari, ke, arahMaju, cekTujuan) {
    const deltaRow = ke[0] - dari[0];

    // tidak bolek ada bidak lain saat gerak lurus
    if (cekTujuan) return false;

    if (Math.abs(deltaRow) === 1) {
        // maju 1 petak
        return true;
    } else if (Math.abs(deltaRow) === 2) {
        // maju 2 petak (gerakan awal)
        return isPionFirstMove(dari) && jalurKosong(dari, ke);
    }

    return false;
}

function isPionFirstMove(dari) {
    return (dari[0] === 6 || dari[0] === 1);
}

function validasiPionMakan(dari, ke, arahMaju, cekTujuan) {
    const deltaRow = ke[0] - dari[0];

    // makan diagonal hanya 1 petak
    if (Math.abs(deltaRow) !== 1) return false;

    // harus ada bidak musuh di tujuan
    return cekTujuan;
}

function bisaSerang(bidak, dari, ke) {
    if (bidak === '♚' || bidak === '♔') {
        return validasiKing(dari, ke);
    } else if (bidak === '♜' || bidak === '♖') {
        return validasiBenteng(dari, ke);
    } else if (bidak === '♗' || bidak === '♝') {
        return validasiBishop(dari, ke);
    } else if (bidak === '♕' || bidak === '♛') {
        return validasiRatu(dari, ke);
    } else if (bidak === '♞' || bidak === '♘') {
        return validasiKuda(dari, ke);
    } else if (bidak === '♙' || bidak === '♟') {
        return bisaSerangPion(bidak, dari, ke);  //  khusus pion
    }

    return false;
}

function bisaSerangPion(bidak, dari, ke) {
    const isPutih = warna[bidak] === 'putih';
    const arahMaju = isPutih ? -1 : 1;

    const deltaRow = ke[0] - dari[0];
    const deltaCol = ke[1] - dari[1];

    // pion hanya bisa serang diagonal 1 petak
    if (Math.abs(deltaRow) === 1 && Math.abs(deltaCol) === 1) {
        // cek arah serang benar
        return (isPutih && deltaRow < 0) || (!isPutih && deltaRow > 0);
    }

    return false;
}

function jalurKosong(dari, ke) {
    const deltaRow = ke[0] - dari[0];
    const deltaCol = ke[1] - dari[1];

    // tentukan arah gerakan (-1, 0, atau 1)
    const stepRow = deltaRow === 0 ? 0 : deltaRow / Math.abs(deltaRow);
    const stepCol = deltaCol === 0 ? 0 : deltaCol / Math.abs(deltaCol);

    // mulai dari step 1
    let currentRow = dari[0] + stepRow;
    let currentCol = dari[1] + stepCol;

    while (currentRow !== ke[0] || currentCol !== ke[1]) {
        if (papan[currentRow][currentCol] !== ' ') {
            return false;
        }
        currentRow += stepRow;
        currentCol += stepCol;
    }

    return true;
}

function pindahBidak(dari, ke) {
    let bidak = papan[dari[0]][dari[1]];
    papan[ke[0]][ke[1]] = bidak;
    papan[dari[0]][dari[1]] = ' ';
}

function parseInput(input) {
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

function gantiGiliran() {
    pemainSekarang = pemainSekarang === 'putih' ? 'hitam' : 'putih';
}

function cekCheckMate(warna) {
    const kingPos = cariKing(warna);
    const warnaLawan = warna === 'putih' ? 'hitam' : 'putih';
    const kingAttacked = posisiDiserang(kingPos, warnaLawan);

    // jika king tidak dalam check maka bukan checkmate
    if (!kingAttacked) return false;

    // cek apakah ada gerakan legal yang bisa menyelamatkan king
    return !adaGerakanLegal(warna);
}

function cekStalemate(warna) {
    const kingPos = cariKing(warna);
    const warnaLawan = warna === 'putih' ? 'hitam' : 'putih';
    const kingAttacked = posisiDiserang(kingPos, warnaLawan);

    // jika king dalam check maka bukan stalemate
    if (kingAttacked) return false;

    return !adaGerakanLegal(warna);
}

function adaGerakanLegal(pemainSekarang) {
    // iterasi semua bidak pemain
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const bidak = papan[i][j];

            // skip jika bukan bidak pemain
            if (bidak === ' ' || warna[bidak] !== pemainSekarang) {
                continue;
            }

            const gerakanPossible = dapatkanSemuaGerakan(bidak, [i, j]);

            for (const gerakan of gerakanPossible) {
                // cek apakah gerakan ini legal (tidak membuat king kena check)
                if (validasiDasar([i, j], gerakan, pemainSekarang)) {
                    return true;    //  minimal ada 1 gerakan legal;
                }
            }
        }
    }
    return false;
}

function dapatkanSemuaGerakan(bidak, posisi) {
    const gerakan = [];
    const [row, col] = posisi;

    if (bidak === '♚' || bidak === '♔') {
        // king : 8 arah, 1 petak
        for (let deltaRow = -1; deltaRow <= 1; deltaRow++) {
            for (let deltaCol = -1; deltaCol <= 1; deltaCol++) {
                if (deltaRow === 0 && deltaCol === 0) continue;

                const newRow = row + deltaRow;
                const newCol = col + deltaCol;

                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    gerakan.push([newRow, newCol]);
                }
            }
        }
    } else if (bidak === '♜' || bidak === '♖') {
        // benteng gerak horizontal dan vertikal
        gerakan.push(...dapatkanGerakanLurus(posisi));

    } else if (bidak === '♗' || bidak === '♝') {
        // bishop gerak diagonal
        gerakan.push(...dapatkanGerakanDiagonal(posisi));

    } else if (bidak === '♕' || bidak === '♛') {
        // ratu gerakan kombinasi benteng dan bishop
        gerakan.push(...dapatkanGerakanLurus(posisi));
        gerakan.push(...dapatkanGerakanDiagonal(posisi));

    } else if (bidak === '♞' || bidak === '♘') {
        // kuda gerak L
        const gerakanKuda = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];

        for (const [deltaRow, deltaCol] of gerakanKuda) {
            const newRow = row + deltaRow;
            const newCol = col + deltaCol;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                gerakan.push([newRow, newCol]);
            }
        }
    } else if (bidak === '♙' || bidak === '♟') {
        // pion gerakan paling ribet
        gerakan.push(...dapatkanGerakanPion(bidak, posisi));
    }

    return gerakan;
}

function dapatkanGerakanLurus(posisi) {
    const gerakan = [];
    const [row, col] = posisi;
    const arah = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (const [deltaRow, deltaCol] of arah) {
        for (let i = 1; i < 8; i++) {
            const newRow = row + (deltaRow * i);
            const newCol = col + (deltaCol * i);

            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

            gerakan.push([newRow, newCol]);

            if (papan[newRow][newCol] !== ' ') break;
        }
    }
    return gerakan;
}

function dapatkanGerakanDiagonal(posisi) {
    const gerakan = [];
    const [row, col] = posisi;
    const arah = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (const [deltaRow, deltaCol] of arah) {
        for (let i = 1; i < 8; i++) {
            const newRow = row + (deltaRow * i);
            const newCol = col + (deltaCol * i);

            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

            gerakan.push([newRow, newCol]);

            if (papan[newRow][newCol] !== ' ') break;
        }
    }
    return gerakan;
}

function dapatkanGerakanPion(bidak, posisi) {
    const gerakan = [];
    const [row, col] = posisi;
    const isPutih = warna[bidak] === 'putih';
    const arahMaju = isPutih ? -1 : 1;

    // gerakan maju 1 petak
    const newRow1 = row + arahMaju;
    if (newRow1 >= 0 && newRow1 < 8) {
        gerakan.push([newRow1, col]);

        // gerakan maju 2 petak (first move)
        if (isPionFirstMove(posisi)) {
            const newRow2 = row + (arahMaju * 2);
            if (newRow2 >= 0 && newRow2 < 8) {
                gerakan.push([newRow2, col]);
            }
        }
    }

    // gerakan makan diagonal
    for (const deltaCol of [-1, 1]) {
        const newRow = row + arahMaju;
        const newCol = col + deltaCol;

        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            gerakan.push([newRow, newCol]);
        }
    }
    return gerakan;
}

async function main() {
    while (true) {
        // cek checkmate / stalemate sebelum input
        if (cekCheckMate(pemainSekarang)) {
            tampilkanPapan();
            const pemenang = pemainSekarang === 'putih' ? 'hitam' : 'putih';
            console.log(chalk.red(`\n🏆 CHECKMATE! ${pemenang.toUpperCase()} MENANG!!`));
            break;
        }

        if (cekStalemate(pemainSekarang)) {
            tampilkanPapan();
            console.log(chalk.yellow(`\n🤝 STALEMATE! PERMAINAN SERI! 🤝`));
            break;
        }

        const kingPos = cariKing(pemainSekarang);
        const warnaLawan = pemainSekarang === 'putih' ? 'hitam' : 'putih';
        const kingAttacked = posisiDiserang(kingPos, warnaLawan);

        if (kingAttacked) {
            console.log(chalk.red(`⚠️  ${pemainSekarang.toUpperCase()} DALAM CHECK!! ⚠️`));
        }

        await ambilInput();
        gantiGiliran();
        await question(`Tekan enter untuk giliran ${pemainSekarang}...`);
        console.clear();
    }
    rl.close();
}

main();