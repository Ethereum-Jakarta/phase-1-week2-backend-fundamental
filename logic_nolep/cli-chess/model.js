export class ChessModel {
    constructor() {
        this.papan = [
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
        ];

        this.pemainSekarang = 'putih';
        this.warna = {
            '♜': 'hitam', '♞': 'hitam', '♝': 'hitam', '♛': 'hitam', '♚': 'hitam', '♟': 'hitam',
            '♖': 'putih', '♘': 'putih', '♗': 'putih', '♕': 'putih', '♔': 'putih', '♙': 'putih'
        };

        // tracking untuk castling
        this.kingPindah = { putih: false, hitam: false };
        this.bentengPindah = {
            putih: { kingSide: false, queenSide: false },
            hitam: { kingSide: false, queenSide: false }
        }

        // tracking En Passant
        this.lastMove = null;

        // histori gerakan untuk undo dan debugging
    }

    // getter untuk mendapatkan data (supaya View bisa akses)
    getPapan() {
        return this.papan;
    }

    getPemainSekarang() {
        return this.pemainSekarang;
    }

    getWarna() {
        return this.warna;
    }

    // method untuk mengubah data
    pindahBidak(dari, ke) {
        let bidak = this.papan[dari[0]][dari[1]];
        const tujuan = this.papan[ke[0]][ke[1]];

        // simpan info gerakan untuk en passant
        const isDoubleMovePion = (bidak === '♙' || bidak === '♟') && Math.abs(ke[0] - dari[0]) === 2;

        // cek apakah ini castling
        if ((bidak === '♚' || bidak === '♔') && Math.abs(ke[1] - dari[1]) === 2) {
            this.laksanakanCastling(dari, ke, this.pemainSekarang);
        } else if (this.validasiEnPassant(dari, ke, this.pemainSekarang)) {
            this.laksanakanEnPassant(dari, ke);
        } else {
            this.papan[ke[0]][ke[1]] = bidak;
            this.papan[dari[0]][dari[1]] = ' ';
        }

        // update tracking untuk castling
        if (bidak === '♔') this.kingPindah.putih = true;
        if (bidak === '♚') this.kingPindah.hitam = true;
        if (bidak === '♖' && dari[0] === 7) {
            if (dari[1] === 0) this.bentengPindah.putih.queenSide = true;
            if (dari[1] === 7) this.bentengPindah.putih.kingSide = true;
        }
        if (bidak === '♜' && dari[0] === 7) {
            if (dari[1] === 0) this.bentengPindah.hitam.queenSide = true;
            if (dari[1] === 7) this.bentengPindah.hitam.kingSide = true;
        }

        // simpan lastMove untuk en passant
        this.lastMove = isDoubleMovePion ? { dari, ke, bidak } : null;

        // cek promosi pion
        if (this.cekPromosiPion(ke, bidak)) {
            return { needsPromotion: true, position: ke };
        }

        return { needsPromotion: false };
    }

    gantiGiliran() {
        this.pemainSekarang = this.pemainSekarang === 'putih' ? 'hitam' : 'putih';
    }

    validasiDasar(dari, ke, pemainSekarang) {
        const bidak = this.papan[dari[0]][dari[1]];

        // cek apakah ada bidak di posisi asal
        if (!bidak || bidak === ' ') return false;

        if (this.warna[bidak] !== this.pemainSekarang) return false;

        if (ke[0] < 0 || ke[0] > 7 || ke[1] < 0 || ke[1] > 7) return false;

        const tujuan = this.papan[ke[0]][ke[1]];
        if (tujuan !== ' ' && this.warna[tujuan] === this.pemainSekarang) return false;

        if ((bidak === '♚' || bidak === '♔') && Math.abs(ke[1] - dari[1]) === 2) {
            return this.validasiCastling(dari, ke, pemainSekarang);
        }

        if ((bidak === '♙' || bidak === '♟') && tujuan === ' ' && dari[1] !== ke[1]) {
            return this.validasiEnPassant(dari, ke, pemainSekarang);
        }

        // validasi gerakan bidak
        let gerakanValid = false;
        if (bidak === '♚' || bidak === '♔') {
            gerakanValid = this.validasiKing(dari, ke);
        } else if (bidak === '♜' || bidak === '♖') {
            gerakanValid = this.validasiBenteng(dari, ke);
        } else if (bidak === '♗' || bidak === '♝') {
            gerakanValid = this.validasiBishop(dari, ke);
        } else if (bidak === '♕' || bidak === '♛') {
            gerakanValid = this.validasiRatu(dari, ke);
        } else if (bidak === '♞' || bidak === '♘') {
            gerakanValid = this.validasiKuda(dari, ke);
        } else if (bidak === '♙' || bidak === '♟') {
            gerakanValid = this.validasiPion(dari, ke);
        }

        if (!gerakanValid) return false;

        // simulasi gerakan selain king
        if (!((bidak === '♚' || bidak === '♔') && Math.abs(ke[1] - dari[1]) === 2)) {
            // simulasi gerakan
            const tujuanAwal = this.papan[ke[0]][ke[1]];
            this.papan[ke[0]][ke[1]] = bidak;
            this.papan[dari[0]][dari[1]] = ' ';

            // cek raja kena check
            const kingPos = this.cariKing(this.pemainSekarang);
            const warnaLawan = this.pemainSekarang === 'putih' ? 'hitam' : 'putih';
            const kingAttacked = this.posisiDiserang(kingPos, warnaLawan);

            // kembalikan papan
            this.papan[dari[0]][dari[1]] = bidak;
            this.papan[ke[0]][ke[1]] = tujuan;

            if (kingAttacked) {
                return false;
            }
        }
        return true;
    }

    validasiKing(dari, ke) {
        const deltaRow = Math.abs(ke[0] - dari[0]);
        const deltaCol = Math.abs(ke[1] - dari[1]);

        // king cuma bisa gerak 1 kotak ke segala arah
        if (deltaRow > 1 || deltaCol > 1) return false;

        // cek apakah posisi tujuan masih diserang
        const king = this.papan[dari[0]][dari[1]];
        const warnaKing = this.warna[king];
        const warnaLawan = warnaKing === 'putih' ? 'hitam' : 'putih';

        // simulasi pindahkan king sementara
        const tujuan = this.papan[ke[0]][ke[1]];
        this.papan[ke[0]][ke[1]] = king;
        this.papan[dari[0]][dari[1]] = ' ';

        // cek apakah posisi baru masih diserang
        const masihDiserang = this.posisiDiserang(ke, warnaLawan);

        // kembalikan posisi
        this.papan[dari[0]][dari[1]] = king;
        this.papan[ke[0]][ke[1]] = tujuan;

        return !masihDiserang;

    }

    cariKing(warna) {
        const kingSymbol = warna === 'putih' ? '♔' : '♚';
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.papan[i][j] === kingSymbol) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    validasiCastling(dari, ke, pemainSekarang) {
        const bidak = this.papan[dari[0]][dari[1]];

        if (bidak !== '♚' && bidak !== '♔') return false;

        // cek apakah ini gerakan castling (king bergerak 2 kotak horizontal)
        const deltaRow = Math.abs(ke[0] - dari[0]);
        const deltaCol = Math.abs(ke[1] - dari[1]);

        if (deltaRow !== 0 || deltaCol !== 2) return false;

        // tentukan king side dan queen side
        const isKingSide = ke[1] > dari[1];
        const bentengCol = isKingSide ? 7 : 0;
        const bentengRow = dari[0];

        // cek king belum pernah bergerak
        if (this.kingPindah[pemainSekarang]) return false;

        // cek benteng belum pernah bergerak
        const bentengSide = isKingSide ? 'kingSide' : 'queenSide';
        if (this.bentengPindah[pemainSekarang][bentengSide]) return false;

        // cek benteng di posisi yang benar
        const expectedBenteng = pemainSekarang === 'putih' ? '♖' : '♜';
        if (this.papan[bentengRow][bentengCol] !== expectedBenteng) return false;

        // cek king tidak sedang di-check
        const kingPos = this.cariKing(pemainSekarang);
        const warnaLawan = pemainSekarang === 'putih' ? 'hitam' : 'putih';
        if (this.posisiDiserang(kingPos, warnaLawan)) return false;

        // cek jalur antara king dan benteng kosong
        const startCol = Math.min(dari[1], rookCol);
        const endCol = Math.max(dari[1], rookCol);

        for (let col = startCol + 1; col < endCol; col++) {
            if (this.papan[bentengRow][col] !== ' ') return false;
        }

        // cek king tidka melewati kotak yang diserang
        const arah = isKingSide ? 1 : -1;
        for (let i = 1; i <= 2; i++) {
            const cekCol = dari[1] + (arah * i);
            if (this.posisiDiserang([dari[0], cekCol], warnaLawan)) {
                return false;
            }
        }
        return false;
    }

    laksanakanCastling(dari, ke, pemainSekarang) {
        const isKingSide = ke[1] > dari[1];
        const bentengCol = isKingSide ? 7 : 0;
        const bentengRow = dari[0];
        const newBentengCol = isKingSide ? ke[1] - 1 : ke[1] + 1;

        // pindahkan king
        const king = this.papan[dari[0]][dari[1]];
        this.papan[ke[0]][ke[1]] = king;
        this.papan[dari[0]][dari[1]] = ' ';

        // pindahkan benteng
        const benteng = this.papan[bentengRow][bentengCol];
        this.papan[bentengRow][newBentengCol] = benteng;
        this.papan[bentengRow][bentengCol] = ' ';

        // update tracking
        this.kingPindah[pemainSekarang] = true;
        const bentengSide = isKingSide ? 'kingSide' : 'queenSide';
        this.bentengPindah[pemainSekarang][bentengSide] = true;
    }

    validasiRatu(dari, ke) {
        return this.validasiBenteng(dari, ke) || this.validasiBishop(dari, ke);
    }

    validasiBenteng(dari, ke) {
        // cuma bisa gerak horizontal atau vertikal
        if (dari[0] !== ke[0] && dari[1] !== ke[1]) return false;

        return this.jalurKosong(dari, ke);
    }

    validasiBishop(dari, ke) {
        const deltaRow = Math.abs(ke[0] - dari[0]);
        const deltaCol = Math.abs(ke[1] - dari[1]);

        if (deltaRow !== deltaCol) return false;    // gerak diagonal;

        return this.jalurKosong(dari, ke);
    }

    validasiKuda(dari, ke) {
        const deltaRow = Math.abs(ke[0] - dari[0]);
        const deltaCol = Math.abs(ke[1] - dari[1]);

        return (deltaRow === 2 && deltaCol === 1) || (deltaRow === 1 && deltaCol === 2);
    }

    validasiPion(dari, ke) {
        const bidak = this.papan[dari[0]][dari[1]];
        const isPutih = this.warna[bidak] === 'putih';

        // pion putih bergerak ke atas(row mengecil) sedangkan pion hitam sebaliknya
        const arahMaju = isPutih ? -1 : 1;

        const deltaRow = ke[0] - dari[0];
        const deltaCol = ke[1] - dari[1];

        // cek pion bergerak ke arah yang benar (pion tidak bisa mundur)
        if ((isPutih && deltaRow > 0) || (!isPutih && deltaRow < 0)) {
            return false;
        }

        const tujuan = this.papan[ke[0]][ke[1]];
        const cekTujuan = tujuan !== ' ';

        if (deltaCol === 0) {
            // gerakan lurus
            return this.validasiPionLurus(dari, ke, arahMaju, cekTujuan);
        } else if (Math.abs(deltaCol) === 1) {
            // pion makan secara diagonal
            return this.validasiPionMakan(dari, ke, arahMaju, cekTujuan);
        } else {
            return false;
        }
    }

    validasiPionLurus(dari, ke, arahMaju, cekTujuan) {
        const deltaRow = ke[0] - dari[0];

        // tidak bolek ada bidak lain saat gerak lurus
        if (cekTujuan) return false;

        if (Math.abs(deltaRow) === 1) {
            // maju 1 petak
            return true;
        } else if (Math.abs(deltaRow) === 2) {
            // maju 2 petak (gerakan awal)
            return this.isPionFirstMove(dari) && this.jalurKosong(dari, ke);
        }

        return false;
    }

    isPionFirstMove(dari) {
        return (dari[0] === 6 || dari[0] === 1);
    }

    validasiPionMakan(dari, ke, arahMaju, cekTujuan) {
        const deltaRow = ke[0] - dari[0];

        // makan diagonal hanya 1 petak
        if (Math.abs(deltaRow) !== 1) return false;

        // harus ada bidak musuh di tujuan
        return cekTujuan;
    }

    validasiEnPassant(dari, ke, pemainSekarang) {
        const bidak = this.papan[dari[0]][dari[1]];

        // hanya pion yang bisa en passant
        if (bidak !== '♙' || bidak !== '♟') return false;

        // cek apakah ada lastMove
        if (!this.lastMove) return false;

        const { dari: lastDari, ke: lastKe, bidak: lastBidak } = this.lastMove;

        // gerakan terakhir harus pion lawan
        const isPionLawan = (lastBidak === '♙' || lastBidak === '♟') && this.warna[lastBidak] !== pemainSekarang;
        if (!isPionLawan) return false;

        // pion lawan harus bergerak 2 kotak
        const lastMoveDistance = Math.abs(lastKe[0] - lastDari[0]);
        if (lastMoveDistance !== 2) return false;

        // pion lawan harus disamping pion kita
        const samaBaris = dari[0] === lastKe[0];
        const sampingKiri = dari[1] === lastKe[1] - 1;
        const sampingKanan = dari[1] === lastKe[1] + 1;

        if (!samaBaris || (!sampingKiri && !sampingKanan)) return false;

        // tujuan harus di belakang pion lawan
        const isPutih = this.warna[bidak] === 'putih';
        const expectedRow = isPutih ? lastKe[0] - 1 : lastKe[0] + 1;
        const expectedCol = lastKe[1];

        return ke[0] === expectedRow && ke[1] === expectedCol;
    }

    laksanakanEnPassant(dari, ke) {
        // pindahkan pion kita
        const bidak = this.papan[dari[0]][dari[1]];
        this.papan[ke[0]][ke[1]] = bidak;
        this.papan[dari[0]][dari[1]] = ' ';

        // hapus pion lawan yang di capture
        const { ke: lastKe } = this.lastMove;
        this.papan[lastKe[0]][lastKe[1]] = ' ';
    }

    cekPromosiPion(ke, bidak) {
        const isPionPutih = bidak === '♙' && ke[0] === 0;
        const isPionHitam = bidak === '♟' && ke[0] === 7;

        return isPionPutih || isPionHitam;
    }

    laksanakanPromosi(posisi, bidakBaru) {
        this.papan[posisi[0]][posisi[1]] = bidakBaru;
    }

    jalurKosong(dari, ke) {
        const deltaRow = ke[0] - dari[0];
        const deltaCol = ke[1] - dari[1];

        // tentukan arah gerakan (-1, 0, atau 1)
        const stepRow = deltaRow === 0 ? 0 : deltaRow / Math.abs(deltaRow);
        const stepCol = deltaCol === 0 ? 0 : deltaCol / Math.abs(deltaCol);

        // mulai dari step 1
        let currentRow = dari[0] + stepRow;
        let currentCol = dari[1] + stepCol;

        while (currentRow !== ke[0] || currentCol !== ke[1]) {
            if (this.papan[currentRow][currentCol] !== ' ') {
                return false;
            }
            currentRow += stepRow;
            currentCol += stepCol;
        }

        return true;
    }

    cekCheckMate(warna) {
        const kingPos = this.cariKing(warna);
        const warnaLawan = warna === 'putih' ? 'hitam' : 'putih';
        const kingAttacked = this.posisiDiserang(kingPos, warnaLawan);

        // jika king tidak dalam check maka bukan checkmate
        if (!kingAttacked) return false;

        // cek apakah ada gerakan legal yang bisa menyelamatkan king
        return !this.adaGerakanLegal(warna);
    }

    cekStalemate(warna) {
        const kingPos = this.cariKing(warna);
        const warnaLawan = warna === 'putih' ? 'hitam' : 'putih';
        const kingAttacked = this.posisiDiserang(kingPos, warnaLawan);

        // jika king dalam check maka bukan stalemate
        if (kingAttacked) return false;

        return !this.adaGerakanLegal(warna);
    }

    posisiDiserang(posisi, warnaLawan) {
        // cek semua bidak lawan, apakah ada yang bisa serang posisi ini
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const bidak = this.papan[i][j];
                if (bidak !== ' ' && this.warna[bidak] === warnaLawan) {
                    // cek apakah bidak ini bisa diserang posisi target
                    if (this.bisaSerang(bidak, [i, j], posisi)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    bisaSerang(bidak, dari, ke) {
        if (bidak === '♚' || bidak === '♔') {
            return this.bisaSerangKing(dari, ke);
        } else if (bidak === '♜' || bidak === '♖') {
            return this.validasiBenteng(dari, ke);
        } else if (bidak === '♗' || bidak === '♝') {
            return this.validasiBishop(dari, ke);
        } else if (bidak === '♕' || bidak === '♛') {
            return this.validasiRatu(dari, ke);
        } else if (bidak === '♞' || bidak === '♘') {
            return this.validasiKuda(dari, ke);
        } else if (bidak === '♙' || bidak === '♟') {
            return this.bisaSerangPion(bidak, dari, ke);  //  khusus pion
        }

        return false;
    }

    bisaSerangKing(dari, ke) {
        const deltaRow = Math.abs(ke[0] - dari[0]);
        const deltaCol = Math.abs(ke[1] - dari[1]);

        return deltaRow <= 1 && deltaCol <= 1 && !(deltaRow === 0 && deltaCol === 0);
    }

    bisaSerangPion(bidak, dari, ke) {
        const isPutih = this.warna[bidak] === 'putih';
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

    adaGerakanLegal(pemainSekarang) {
        // iterasi semua bidak pemain
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const bidak = this.papan[i][j];

                // skip jika bukan bidak pemain
                if (bidak === ' ' || this.warna[bidak] !== pemainSekarang) {
                    continue;
                }

                const gerakanPossible = this.dapatkanSemuaGerakan(bidak, [i, j]);

                for (const gerakan of gerakanPossible) {
                    // cek apakah gerakan ini legal (tidak membuat king kena check)
                    if (this.validasiDasar([i, j], gerakan, pemainSekarang)) {
                        return true;    //  minimal ada 1 gerakan legal;
                    }
                }
            }
        }
        return false;
    }

    dapatkanSemuaGerakan(bidak, posisi) {
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
            gerakan.push(...this.dapatkanGerakanLurus(posisi));

        } else if (bidak === '♗' || bidak === '♝') {
            // bishop gerak diagonal
            gerakan.push(...this.dapatkanGerakanDiagonal(posisi));

        } else if (bidak === '♕' || bidak === '♛') {
            // ratu gerakan kombinasi benteng dan bishop
            gerakan.push(...this.dapatkanGerakanLurus(posisi));
            gerakan.push(...this.dapatkanGerakanDiagonal(posisi));

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
            gerakan.push(...this.dapatkanGerakanPion(bidak, posisi));
        }

        return gerakan;
    }

    dapatkanGerakanLurus(posisi) {
        const gerakan = [];
        const [row, col] = posisi;
        const arah = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        for (const [deltaRow, deltaCol] of arah) {
            for (let i = 1; i < 8; i++) {
                const newRow = row + (deltaRow * i);
                const newCol = col + (deltaCol * i);

                if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

                gerakan.push([newRow, newCol]);

                if (this.papan[newRow][newCol] !== ' ') break;
            }
        }
        return gerakan;
    }

    dapatkanGerakanDiagonal(posisi) {
        const gerakan = [];
        const [row, col] = posisi;
        const arah = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

        for (const [deltaRow, deltaCol] of arah) {
            for (let i = 1; i < 8; i++) {
                const newRow = row + (deltaRow * i);
                const newCol = col + (deltaCol * i);

                if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

                gerakan.push([newRow, newCol]);

                if (this.papan[newRow][newCol] !== ' ') break;
            }
        }
        return gerakan;
    }

    dapatkanGerakanPion(bidak, posisi) {
        const gerakan = [];
        const [row, col] = posisi;
        const isPutih = this.warna[bidak] === 'putih';
        const arahMaju = isPutih ? -1 : 1;

        // gerakan maju 1 petak
        const newRow1 = row + arahMaju;
        if (newRow1 >= 0 && newRow1 < 8) {
            gerakan.push([newRow1, col]);

            // gerakan maju 2 petak (first move)
            if (this.isPionFirstMove(posisi)) {
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
}