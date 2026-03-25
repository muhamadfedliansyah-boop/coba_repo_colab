let sapi = [];

const hargaSapi = [
    { jenis: "limosin", harga: 5000000 },
    { jenis: "brahman", harga: 4000000 },
    { jenis: "simental", harga: 4500000 },
    { jenis: "angus", harga: 5500000 }
];

function tambahSapi() {
    const JenisSapi = document.getElementById("jenis").value;
    const BeratSapi = document.getElementById("berat").value;
    const UmurSapi = document.getElementById("umur").value;
    const HargaSapi = hargaSapi[hargaSapi.findIndex(item => item.jenis === JenisSapi)].harga;

    if (JenisSapi && BeratSapi && UmurSapi && HargaSapi) {
         let id 
         do {
            id = "SAPI-" + Math.floor(Math.random() * 100);
            } while (sapi.some(item => item.idsapi === id));

        sapi.push({
            idsapi: id,
            Jenis: JenisSapi,
            Berat: BeratSapi,
            Umur: UmurSapi,
            Harga: HargaSapi
        });
        
        tampilkanSapi();
        hitungTotal();

        document.getElementById("jenis").value = "";
        document.getElementById("berat").value = "";
        document.getElementById("umur").value = "";
    }
    else{
        alert("Mohon lengkapi semua data!");
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
        row.insertCell(4).textContent = item.Harga;
        row.insertCell(5).textContent = item.Umur;
        row.insertCell(6).textContent = new Date().toLocaleDateString();
        const kolom = row.insertCell(7);
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", function() {
            hapusSapi(index);
        });

        kolom.appendChild(tombolHapus);
    });
}

function hapusSapi(index) {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        sapi.splice(index, 1);
        tampilkanSapi();
        hitungTotal();
    }
}

function hitungTotal() {
    let total = sapi.length;
    let totalNilai = 0;
    sapi.forEach(item => {
        totalNilai += item.Harga;
    });
    document.getElementById("totalJumlah").textContent = total;
    document.getElementById("totalNilai").textContent = "Rp " + totalNilai.toLocaleString('id-ID');
}

document.getElementById("tambahBtn").addEventListener("click", tambahSapi);