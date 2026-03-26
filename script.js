let sapi = [];

const daftarHargaDasar = [
    { jenis: "limosin", harga: 70000 },
    { jenis: "brahman", harga: 60000 },
    { jenis: "simental", harga: 65000 },
    { jenis: "angus", harga: 75000 }
];

function tambahSapi() {
    const JenisSapi = document.getElementById("jenis").value;
    const LingkarDada = parseFloat(document.getElementById("berat").value); 
    const UmurInput = parseFloat(document.getElementById("umur").value);

    const dataJenis = daftarHargaDasar.find(item => item.jenis === JenisSapi);
    
    if (JenisSapi !== "Pilih Jenis Sapi" && LingkarDada && UmurInput) {
        const beratEstimasi = Math.pow((LingkarDada + 22), 2) / 100;
        let hargaPerKg = dataJenis ? dataJenis.harga : 50000;
        if (UmurInput < 1) {
            hargaPerKg -= 15000;
        } else if (UmurInput >= 2 && UmurInput <= 3) {
            hargaPerKg += 10000;
        } else if (UmurInput > 5) {
            hargaPerKg -= 5000;
        }
        const totalHargaSapi = Math.round(beratEstimasi * hargaPerKg);

        let id = "sapi-".toUpperCase() + Math.floor(Math.random() * 1000);
        sapi.push({
            idsapi: id,
            Jenis: JenisSapi,
            Berat: beratEstimasi.toFixed(1) + " kg",
            Umur: UmurInput,
            Harga: totalHargaSapi
        });
        
        tampilkanSapi();
        hitungTotal();

        document.getElementById("jenis").value = "Pilih Jenis Sapi";
        document.getElementById("berat").value = "";
        document.getElementById("umur").value = "";
    } else {
        alert("Mohon isi semua");
    }
}

function tampilkanSapi() {
    const tableBody = document.getElementById("tabelSapi");
    tableBody.innerHTML = "";

    sapi.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = item.idsapi;
        row.insertCell(2).textContent = item.Jenis.toUpperCase();
        row.insertCell(3).textContent = item.Berat;
        row.insertCell(4).textContent = "Rp " + item.Harga.toLocaleString('id-ID');
        row.insertCell(5).textContent = item.Umur + " tahun";
        row.insertCell(6).textContent = new Date().toLocaleDateString('id-ID');
        const kolom = row.insertCell(7);
            const tombolHapus = document.createElement("button");
            const tombolEdit = document.createElement("button");
tombolEdit.textContent = "Edit";

tombolEdit.onclick = function () {
    editSapi(index);
};

kolom.appendChild(tombolEdit);
            tombolHapus.textContent = "Hapus";
        
        tombolHapus.onclick = () => {
            sapi.splice(index, 1);
            tampilkanSapi();
            hitungTotal();
        };
        kolom.appendChild(tombolHapus);
    });
}

function hitungTotal() {
    let totalNilai = sapi.reduce((acc, curr) => acc + curr.Harga, 0);
    document.getElementById("totalJumlah").textContent = sapi.length;
    document.getElementById("totalNilai").textContent = "Rp " + totalNilai.toLocaleString('id-ID');
}

document.getElementById("tambahBtn").addEventListener("click", tambahSapi);

function editSapi(index) {
    const tableBody = document.getElementById("tabelSapi");
    const row = tableBody.rows[index];
    const data = sapi[index];

    row.cells[2].innerHTML = `<input value="${data.Jenis}">`;
    row.cells[3].innerHTML = `<input value="${parseFloat(data.Berat)}">`;
    row.cells[5].innerHTML = `<input value="${data.Umur}">`;

    const kolomAksi = row.cells[7];
    kolomAksi.innerHTML = "";

    const tombolSimpan = document.createElement("button");
    tombolSimpan.textContent = "Simpan";

    tombolSimpan.onclick = function () {
        const jenisBaru = row.cells[2].children[0].value;
        const beratBaru = parseFloat(row.cells[3].children[0].value);
        const umurBaru = parseFloat(row.cells[5].children[0].value);

        const dataJenis = daftarHargaDasar.find(item => item.jenis === jenisBaru);

        const beratEstimasi = Math.pow((beratBaru + 22), 2) / 100;

        let hargaPerKg = dataJenis ? dataJenis.harga : 50000;

        if (umurBaru < 1) {
            hargaPerKg -= 15000;
        } else if (umurBaru >= 2 && umurBaru <= 3) {
            hargaPerKg += 10000;
        } else if (umurBaru > 5) {
            hargaPerKg -= 5000;
        }

        const totalHarga = Math.round(beratEstimasi * hargaPerKg);

   
        sapi[index] = {
            ...sapi[index],
            Jenis: jenisBaru,
            Berat: beratEstimasi.toFixed(1) + " kg",
            Umur: umurBaru,
            Harga: totalHarga
        };

        tampilkanSapi();
        hitungTotal();
    };

    kolomAksi.appendChild(tombolSimpan);
}