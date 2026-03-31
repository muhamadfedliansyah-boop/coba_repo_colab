let peternakan = [];

let stokSapiTersedia = 0;
let stokKambingTersedia = 0;

const hargaSapi = [ 
    { jenis: "limosin", harga: 70000 },
    { jenis: "brahman", harga: 60000 }, 
    { jenis: "simental", harga: 65000 }, 
    { jenis: "angus", harga: 75000 } 
];

const hargaKambing = [ 
    { jenis: "etawa", harga: 90000 }, 
    { jenis: "muara", harga: 85000 }, 
    { jenis: "boer", harga: 95000 } 
];

function setStok(jenis) {
    let input = prompt(`Masukkan jumlah stok awal ${jenis}:`, "0");
    let jumlah = parseInt(input);

    if (!isNaN(jumlah) && jumlah >= 0) {
        if (jenis === 'Sapi') stokSapiTersedia = jumlah;
        else stokKambingTersedia = jumlah;
        updateStatistik();
    } else {
        alert("Masukkan angka yang valid!");
    }
}

function showForm(target) {
    const formSapi = document.getElementById('form-sapi');
    const formKambing = document.getElementById('form-kambing');
    const btnSapi = document.getElementById('btn-sapi');
    const btnKambing = document.getElementById('btn-kambing');

    if (target === 'sapi') {
        formSapi.classList.remove('hidden');
        formKambing.classList.add('hidden');
        btnSapi.classList.add('active');
        btnKambing.classList.remove('active');
    } else {
        formKambing.classList.remove('hidden');
        formSapi.classList.add('hidden');
        btnKambing.classList.add('active');
        btnSapi.classList.remove('active');
    }
}

function hitungHarga(jenis, berat, umur, arrayHarga) {
    const dataJenis = arrayHarga.find(item => item.jenis.toLowerCase() === jenis.toLowerCase());
    let base = dataJenis ? dataJenis.harga : 50000;

    if (umur < 1) base -= 15000;
    else if (umur >= 2 && umur <= 3) base += 10000;
    else if (umur > 5) base -= 5000;

    return Math.round(berat * base);
}

function tambahSapi() {
    const elJenis = document.getElementById("jenisSapi");
    const elBerat = document.getElementById("beratSapi");
    const elUmur = document.getElementById("umurSapi");

    if (stokSapiTersedia <= 0) {
        alert("Stok Sapi habis! Klik card stok untuk mengisi kembali.");
        return;
    }

    if(elJenis.value !== "Pilih Jenis Sapi" && elBerat.value && elUmur.value) {
        const berat = parseFloat(elBerat.value);
        const umur = parseFloat(elUmur.value);

        peternakan.push({
            kategori: 'Sapi',
            id: "SAPI-" + Math.floor(Math.random() * 1000),
            jenis: elJenis.value,
            berat: berat.toFixed(1) + " kg",
            harga: hitungHarga(elJenis.value, berat, umur, hargaSapi),
            umur: umur,
            tgl: new Date().toLocaleDateString('id-ID')
        });
        
        stokSapiTersedia--; 
        elJenis.value = "Pilih Jenis Sapi";
        elBerat.value = "";
        elUmur.value = "";
        refreshUI();
    } else {
        alert("Mohon isi semua data sapi.");
    }
}

function tambahKambing() {
    const elJenis = document.getElementById("jenisKambing");
    const elBerat = document.getElementById("beratKambing");
    const elUmur = document.getElementById("umurKambing");

    if (stokKambingTersedia <= 0) {
        alert("Stok Kambing habis! Klik card stok untuk mengisi kembali.");
        return;
    }

    if (elJenis.value !== "Pilih Jenis" && elBerat.value && elUmur.value) {
        const berat = parseFloat(elBerat.value);
        const umur = parseFloat(elUmur.value);

        peternakan.push({
            kategori: 'Kambing',
            id: "KMB-" + Math.floor(Math.random() * 1000),
            jenis: elJenis.value,
            berat: berat.toFixed(1) + " kg",
            harga: hitungHarga(elJenis.value, berat, umur, hargaKambing),
            umur: umur,
            tgl: new Date().toLocaleDateString('id-ID')
        });
        
        stokKambingTersedia--; 
        elJenis.value = "Pilih Jenis";
        elBerat.value = "";
        elUmur.value = "";
        refreshUI();
    } else {
        alert("Mohon isi semua data kambing.");
    }
}

function refreshUI() {
    const tbody = document.getElementById("tabelTerpadu");
    if (!tbody) return;
    tbody.innerHTML = "";

    peternakan.forEach((item, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.id}</td>
            <td>${item.kategori}</td>
            <td>${item.jenis.toUpperCase()}</td>
            <td>${item.berat}</td>
            <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
            <td>${item.umur} Thn</td>
            <td>${item.tgl}</td>
            <td>
                <button class="btn-aksi" onclick="editData(${index})"><img src="img/edit.png" alt="Edit"></button>
                <button class="btn-aksi" onclick="hapusData(${index})"><img src="img/delete.png" alt="Hapus"></button>
            </td>
        `;
    });

    updateStatistik();
}

function updateStatistik() {
    const sapiTerjual = peternakan.filter(item => item.kategori === 'Sapi');
    const kambingTerjual = peternakan.filter(item => item.kategori === 'Kambing');

    const nilaiSapi = sapiTerjual.reduce((sum, item) => sum + item.harga, 0);
    const nilaiKambing = kambingTerjual.reduce((sum, item) => sum + item.harga, 0);

    if(document.getElementById("stokSapiTersedia")) document.getElementById("stokSapiTersedia").textContent = stokSapiTersedia;
    if(document.getElementById("stokKambingTersedia")) document.getElementById("stokKambingTersedia").textContent = stokKambingTersedia;

    if(document.getElementById("totalJumlahSapi")) document.getElementById("totalJumlahSapi").textContent = sapiTerjual.length;
    if(document.getElementById("totalNilaiSapi")) document.getElementById("totalNilaiSapi").textContent = "Rp " + nilaiSapi.toLocaleString('id-ID');
    if(document.getElementById("totalJumlahKambing")) document.getElementById("totalJumlahKambing").textContent = kambingTerjual.length;
    if(document.getElementById("totalNilaiKambing")) document.getElementById("totalNilaiKambing").textContent = "Rp " + nilaiKambing.toLocaleString('id-ID');
}

function editData(index) {
    const row = document.getElementById("tabelTerpadu").rows[index];
    const data = peternakan[index];

    row.cells[3].innerHTML = `<input type="text" id="edit-jenis-${index}" value="${data.jenis}" style="width: 80px">`;
    row.cells[4].innerHTML = `<input type="number" id="edit-berat-${index}" value="${parseFloat(data.berat)}" style="width: 60px">`;
    row.cells[6].innerHTML = `<input type="number" id="edit-umur-${index}" value="${data.umur}" style="width: 50px">`;

    row.cells[8].innerHTML = `<button class="btn-aksi" onclick="simpanEdit(${index})">Simpan</button>`;
}

function simpanEdit(index) {
    const newJenis = document.getElementById(`edit-jenis-${index}`).value;
    const newBerat = parseFloat(document.getElementById(`edit-berat-${index}`).value);
    const newUmur = parseFloat(document.getElementById(`edit-umur-${index}`).value);

    const arrayHarga = peternakan[index].kategori === "Sapi" ? hargaSapi : hargaKambing;

    peternakan[index].jenis = newJenis;
    peternakan[index].berat = newBerat.toFixed(1) + " kg";
    peternakan[index].umur = newUmur;
    peternakan[index].harga = hitungHarga(newJenis, newBerat, newUmur, arrayHarga);
    
    refreshUI();
}

function hapusData(index) {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        if (peternakan[index].kategori === 'Sapi') stokSapiTersedia++;
        else stokKambingTersedia++;

        peternakan.splice(index, 1);
        refreshUI();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    refreshUI();
    showForm('sapi');
});