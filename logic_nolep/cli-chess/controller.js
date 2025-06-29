export class ChessController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async jalankanPermainan() {
        try {
            while (true) {
                const pemainSekarang = this.model.getPemainSekarang();

                if (this.model.cekCheckMate(pemainSekarang)) {
                    this.view.tampilkanPapan(this.model.getPapan());
                    const pemenang = pemainSekarang === 'putih' ? 'hitam' : 'putih';
                    this.view.tampilkanHasilAkhir({
                        type: 'checkmate',
                        pemenang: pemenang
                    });
                    break;
                }

                if (this.model.cekStalemate(pemainSekarang)) {
                    this.view.tampilkanPapan(this.model.getPapan());
                    this.view.tampilkanHasilAkhir({
                        type: 'stalemate'
                    });
                    break;
                }

                const kingPos = this.model.cariKing(pemainSekarang);
                const warnaLawan = pemainSekarang === 'putih' ? 'hitam' : 'putih';
                const kingAttacked = this.model.posisiDiserang(kingPos, warnaLawan);

                if (kingAttacked) {
                    this.view.tampilkanCheck(pemainSekarang);
                }

                await this.prosesGiliranPemain();
                this.model.gantiGiliran();

                await this.view.tungguEnter(`Tekan enter untuk giliran ${this.model.getPemainSekarang()}...`);
                this.view.clearScreen();
            }

            this.view.tutup();

        } catch (error) {
            this.view.tampilkanError(`Terjadi error: ${error.message}`);
            this.view.tutup();
        }
    }

    async prosesGiliranPemain() {
        while (true) {
            this.view.tampilkanPapan(this.model.getPapan());
            this.view.tampilkanPesan(`\n=== Giliran ${this.model.pemainSekarang} ===`);
            this.view.tampilkanPesan('Ketik "help" untuk bantuan, "quit" untuk keluar');

            const input = await this.view.ambilInput(this.model.getPemainSekarang());

            if (input.toLowerCase() === 'quit' || input.toLowerCase() === 'exit') {
                this.view.tampilkanPesan('Permainan dihentikan.');
                process.exit(0);
            }

            if (input.toLowerCase() === 'help') {
                this.view.tampilkanBantuan();
                await this.view.tungguEnter('Tekan enter untuk lanjut...');
                continue;
            }

            const inputArray = input.split(' ');

            if (inputArray.length === 2) {
                const dari = this.view.parseInput(inputArray[0]);
                const ke = this.view.parseInput(inputArray[1]);

                const valid = this.model.validasiDasar(dari, ke, this.model.getPemainSekarang());

                if (valid) {
                    const result = this.model.pindahBidak(dari, ke);

                    if (result.needsPromotion) {
                        this.view.tampilkanPapan(this.model.getPapan());
                        const bidakBaru = await this.view.pilihPromosi(this.model.getPemainSekarang());
                        this.model.laksanakanPromosi(result.position, bidakBaru);
                        this.view.tampilkanPesan(`Pion dipromosikan menjadi ${bidakBaru}!!`);
                    }

                    break;
                } else {
                    const bidak = this.model.getPapan()[dari[0]][dari[1]];

                    if (!bidak || bidak === ' ') {
                        this.view.tampilkanError('Tidak ada bidak di posisi tersebut!!');
                    } else if (this.model.getWarna()[bidak] !== this.model.getPemainSekarang()) {
                        this.view.tampilkanError('Itu bukan bidak anda!!');
                    } else {
                        this.view.tampilkanError('Langkah tidak valid!! Periksa aturan catur!!');
                    }
                    await this.view.tungguEnter('Tekan enter untuk coba lagi...');
                }
            } else {
                this.view.tampilkanError('Yang bener lah woyy!! Format: a2 a4');
                await this.view.tungguEnter('Tekan enter untuk coba lagi...');
            }
        }
    }
}