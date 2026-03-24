let sapi= []

const hargaSapi = {
    "limosin": 5000000,
    "brahman": 4000000,
    "simental": 4500000,
    "angus": 5500000
}

function tambahSapi() {
const JenisSapi = document.getElementById("jenis").value;
const BeratSapi = document.getElementById("berat").value;
const UmurSapi = document.getElementById("umur").value;
const HargaSapi = hargaSapi[JenisSapi];

if (JenisSapi && BeratSapi && UmurSapi && HargaSapi) {
    const id = Math.floor(Math.random() * 1000);
    sapi.push({
        idsapi: id,
        Jenis: JenisSapi,
        Berat: BeratSapi,
        Umur: UmurSapi,
        Harga: HargaSapi
    });
    tampilkanSapi();
}
}

function tampilkanSapi() {
    const tableBody = document.getElementById("tabelSapi");
    tableBody.innerHTML
    sapi.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = item.idsapi;
        row.insertCell(2).textContent = item.Jenis.toUpperCase();
        row.insertCell(3).textContent = item.Berat;
        row.insertCell(4).textContent = item.Harga;
        row.insertCell(5).textContent = item.Umur;
        row.insertCell(6).textContent = new Date().toLocaleDateString();
        const aksiCell = row.insertCell(7);
        aksiCell.innerHTML = `<button onclick="hapusSapi(${index})">Hapus</button>`;
    });
}

function hapusSapi(index) {
    if(confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    sapi.splice(index, 1);
    tampilkanSapi();
}
}

document.getElementById("tambahBtn").addEventListener("click", tambahSapi);
