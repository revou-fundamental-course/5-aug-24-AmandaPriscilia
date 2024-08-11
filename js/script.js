//Mengambil elemen document object lalu simpan dalam variabel
var age = document.getElementById('age');
var height = document.getElementById('height');
var weight = document.getElementById('weight');
var male = document.getElementById('m');
var female = document.getElementById('f');
var form = document.getElementById('form');
let resultArea = document.querySelector('.comment');

modalContent = document.querySelector('.modal-content');
modalText = document.querySelector('#modalText');
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName('close')[0];

function calculate() {
    //form validasi input sebelum menghitung bmi
    if (age.value == '' || height.value == '' || weight.value == '' || (male.checked == false && female.checked == false)) {
        modal.style.display = 'block';
        modalText.innerHTML = `Harap Untuk Mengisi Form dengan valid!`;
    } else {
        countBmi(); // Jika semua validasi berhasil, hitung BMI
    }
}

function countBmi() {
    // Sembunyikan tulisan keterangan pengisian saat hasil dihitung
    document.getElementById('infoText').style.display = 'none';
    //Inisialisasi variabel 'p' sebagai array yang menyimpan nilai-nilai input dari formulir
    // Variabel 'p' diisi dengan tiga nilai: usia (age.value), tinggi badan (height.value), dan berat badan (weight.value)
    var p = [age.value, height.value, weight.value];

    // Mengecek jenis kelamin
    if (male.checked) {
        p.push('male');
    } else if (female.checked) {
        p.push('female');
    }

    var bmi = Number(p[2]) / (((Number(p[1]) / 100) * Number(p[1])) / 100); //tinggi badan dimasukkan dalam sentimeter (cm), sehingga perlu dikonversi ke meter dengan membaginya dengan 100. Itulah mengapa saya menggunakan rumus ini

    // Inisialisasi variabel untuk menyimpan hasil dan penjelasan
    var result = '';
    var explanation = '';

    // Menentukan kategori BMI berdasarkan hasil perhitungan
    if (bmi < 18.5) {
        // BMI kurang dari 18.5 dianggap sebagai kekurangan berat badan
        result = 'Kekurangan Berat Badan';
        explanation = 'Berat badan Anda kurang. Sebaiknya meningkatkan asupan kalori dan nutrisi untuk mencapai berat badan ideal.';
    } else if (18.5 <= bmi && bmi <= 24.9) {
        // BMI antara 18.5 dan 24.9 dianggap sebagai normal (ideal)
        result = 'Normal (Ideal)';
        explanation = 'Berat badan Anda ideal. Pertahankan pola hidup sehat untuk menjaga berat badan.';
    } else if (25.0 <= bmi && bmi <= 29.9) {
        // BMI antara 25.0 dan 29.9 dianggap sebagai kelebihan berat badan
        result = 'Kelebihan Berat Badan';
        explanation = 'Berat badan Anda berlebih. Disarankan untuk mulai program diet dan olahraga untuk menurunkan berat badan.';
    } else if (30.0 <= bmi) {
        // BMI 30.0 atau lebih dianggap sebagai kegemukan (obesitas)
        result = 'Kegemukan (Obesitas)';
        explanation = 'Anda mengalami obesitas. Sebaiknya konsultasikan dengan ahli gizi atau dokter untuk penanganan lebih lanjut.';
    }

    // Menampilkan hasil kategori BMI dan penjelasan di halaman
    resultArea.style.display = 'block'; // Menampilkan area hasil
    document.querySelector('.comment').innerHTML = `Kategori <span id="comment">${result}</span>`; // Menampilkan kategori BMI
    document.querySelector('#result').innerHTML = bmi.toFixed(2); // Menampilkan nilai BMI dengan dua desimal

    document.getElementById('instructionText').innerHTML = explanation; // Update keterangan setelah hasil dihitung
    document.getElementById('downloadBtn').style.display = 'block'; // Tampilkan tombol unduh
}

//pop-up yang muncul jika form tidak diisi
span.onclick = function () {
    // Ketika pengguna mengklik pada <span> (x), modal akan ditutup
    modal.style.display = 'none'; // Mengatur display modal menjadi 'none' untuk menyembunyikannya
};
// Ketika pengguna mengklik di mana saja di luar modal, modal akan ditutup
window.onclick = function (event) {
    // Memeriksa apakah elemen yang diklik adalah modal
    if (event.target == modal) {
        modal.style.display = 'none'; // Mengatur display modal menjadi 'none' untuk menyembunyikannya
    }
};

// Fungsi untuk mengunduh hasil sebagai PDF
function downloadResult() {
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    
    var age = document.getElementById('age').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var gender = male.checked ? 'Male' : 'Female';
    var bmi = document.querySelector('#result').innerHTML;
    var result = document.querySelector('#comment').innerHTML;

    var content = `BMI Calculation Result\n\nAge: ${age}\nGender: ${gender}\nHeight: ${height} cm\nWeight: ${weight} kg\n\nBMI anda adalah: ${bmi}\nResult: ${result}`;

    doc.text(content, 10, 10);
    doc.save('BMI_Result.pdf');
}

// Menambahkan event listener untuk tombol download
document.getElementById('downloadBtn').addEventListener('click', downloadResult);

function resetForm() {
    // Mengatur ulang nilai input
    document.getElementById('age').value = '';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';

    // Menghapus pilihan radio
    var radios = document.getElementsByName('radio');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    // Menghapus hasil dan komentar
    document.getElementById('result').innerHTML = '00.00';
    document.querySelector('.comment').innerHTML = '';

    // Menyembunyikan tombol unduh
    document.getElementById('downloadBtn').style.display = 'none';

    // Tampilkan kembali keterangan pengisian 
    var infoText = document.getElementById('infoText');
    if (infoText) {
        infoText.style.display = 'block';
        infoText.innerHTML = `
          Cari tahu apakah berat badan Anda ideal dengan Kalkulator BMI kami. Cukup masukkan usia, jenis kelamin, tinggi, dan berat badan, lalu hitung BMI Anda dalam sekejap! <br>
          Fitur Utama: <br>
          - Penggunaan Cepat: Interface sederhana untuk menghitung BMI tanpa ribet. <br>
          - Kategori Berat Badan: Dapatkan informasi apakah Anda kurus, ideal, atau berlebih. <br>
          - Unduh Hasil: Simpan hasil perhitungan BMI Anda dalam format PDF. <br> <br>
          Coba sekarang dan ketahui status berat badan Anda! <br /><br />
      `;
    }
    // Sembunyikan penjelasan kategori berat badan
    var instructionText = document.getElementById('instructionText');
    if (instructionText) {
        instructionText.innerHTML = ''; // Kosongkan isi
    }
}
