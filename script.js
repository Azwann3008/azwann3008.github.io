let cart = JSON.parse(localStorage.getItem("cart")) || [];

tampilkanCart();

function tambahKeCart(nama, harga) {
    cart.push({nama, harga});
    simpanCart();
    tampilkanCart();
}

function tampilkanCart() {
    let daftar = document.getElementById("daftarCart");
    let totalText = document.getElementById("totalHarga");

    if(!daftar) return;

    daftar.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = item.nama + " - Rp " + formatRupiah(item.harga) +
        " <button onclick='hapusItem(" + index + ")'>X</button>";
        daftar.appendChild(li);
        total += item.harga;
    });

    totalText.textContent = "Total: Rp " + formatRupiah(total);
}

function hapusItem(index) {
    cart.splice(index, 1);
    simpanCart();
    tampilkanCart();
}

function simpanCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function checkout() {
    if(cart.length === 0){
        alert("Keranjang kosong!");
        return;
    }

    let pesan = "Halo, saya ingin membeli:%0A";
    let total = 0;

    cart.forEach(item => {
        pesan += "- " + item.nama + " (Rp " + formatRupiah(item.harga) + ")%0A";
        total += item.harga;
    });

    pesan += "%0ATotal: Rp " + formatRupiah(total);

    window.open("https://wa.me/6282287035669?text=" + pesan, "_blank");
}
