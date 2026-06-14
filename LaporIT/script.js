$(document).ready(function() {
    let currentStep = 1;

    // Aksi tombol 'Buat Laporan' di Welcome Screen
    $('#btnStart').click(function() {
        $('#welcomeStep').fadeOut(300, function() {
            $('#step1').fadeIn(300);
            $('.progress').fadeIn(300);
            updateProgress();
        });
    });

    // Aksi tombol 'Kembali' KHUSUS di Tahap 1 (Balik ke Welcome Screen)
    $('.btn-back-welcome').click(function() {
        $('#step1').fadeOut(250, function() {
            $('#welcomeStep').fadeIn(250);
            $('.progress').fadeOut(250); 
        });
    });

    // Logika tombol 'Selanjutnya'
    $('.btn-next').click(function() {
        if (currentStep === 2) {
            if ($('#kategori').val() === null) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tunggu Dulu...',
                    text: 'Silahkan pilih tujuan pengaduan/feedback terlebih dahulu!',
                    confirmButtonColor: '#4E0000'
                });
                return;
            }
            if (!$('input[name="jenisLaporan"]:checked').val()) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tunggu Dulu...',
                    text: 'Pilih salah satu jenis laporan kamu!',
                    confirmButtonColor: '#4E0000'
                });
                return;
            }
        }

        $('#step' + currentStep).fadeOut(250, function() {
            currentStep++;
            $('#step' + currentStep).fadeIn(250);
            updateProgress();
        });
    });

    // Logika tombol 'Kembali' Tahap 2 & 3
    $('.btn-prev').click(function() {
        $('#step' + currentStep).fadeOut(250, function() {
            currentStep--;
            $('#step' + currentStep).fadeIn(250);
            updateProgress();
        });
    });

    function updateProgress() {
        let percent = (currentStep / 3) * 100;
        $('#progressBar').css('width', percent + '%');
    }

    // Aksi Submit Form Laporan
    $('#surveiForm').submit(function(e) {
        e.preventDefault(); 

        let namaInput = $('#nama').val().trim();
        const nama = namaInput === '' ? 'Anonim' : namaInput;
        const prodi = $('#prodi').val();
        const kategori = $('#kategori').val();
        const jenis = $('input[name="jenisLaporan"]:checked').val();
        const isi = $('#isiFeedback').val();

        // Membuat objek data aduan baru
        const dataAduanNew = {
            nama: nama,
            prodi: prodi,
            kategori: kategori,
            jenis: jenis,
            isi: isi,
            waktu: new Date().toLocaleString('id-ID')
        };

        // Mengambil data yang sudah ada di Local Storage (jika belum ada, buat array kosong)
        let listAduan = JSON.parse(localStorage.getItem('dataLaporIT_All')) || [];
        
        // Memasukkan data baru ke dalam array
        listAduan.push(dataAduanNew);
        
        // Menyimpan kembali array yang sudah ter-update ke Local Storage
        localStorage.setItem('dataLaporIT_All', JSON.stringify(listAduan));

        // Menampilkan ringkasan laporan saat ini di halaman sukses
        $('#resNama').text(dataAduanNew.nama);
        $('#resProdi').text(dataAduanNew.prodi);
        $('#resKategori').text(dataAduanNew.kategori);
        $('#resJenis').text(dataAduanNew.jenis);
        $('#resIsi').text(dataAduanNew.isi);

        $('#surveiForm').fadeOut(400, function() {
            $('.progress').hide();
            $('#result').fadeIn(600);
        });
    });
});