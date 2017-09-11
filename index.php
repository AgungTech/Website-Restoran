<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Menu Makanan</title>
	<link rel="icon" type="image/x-icon" href="img/aset/house.ico" />
	<link rel="stylesheet" type="text/css" href="css/User.css">
	<script type="text/javascript" src="js/User.js"></script>
</head>
<div id="peringatan">
	<p class="judul">Peringatan</p><p class="tombol">&#xF071;</p>
	<div class="tepi">
		<div class="isi"></div>
	</div>
</div>
<body>
<div id="header">
	<div id="logo">
		<p class="icon">&#xF0F5;</p>
		<p class="habiba">Habibah</p>
		<p class="menu">-MENU-</p>
	</div>
	<form id="order-form">
		<div class="grup">
			<div id="meja" class="tombol"><p>&#xF133;</p><div id="meja-value"></div><input type="button" name="meja" value=" MEJA"></div>
		</div>
		<div class="grup show-hide satu">
			<div id="nama" class="input"><p>&#xF0C0;</p><input type="text" name="nama" placeholder="Masukkan Nama"></div>
			<div id="total" class="input"><p>&#xF0D6;</p><input type="text" name="total" placeholder="Total Harga" disabled="0"></div>
		</div>
		<div class="grup show-hide dua">
			<div id="lihat" class="input"><p>&#xF044;</p><input type="button" name="lihat" value="Lihat Pesanan"></div>
			<div id="order" class="input-mini"><p>&#xF07A;</p><input type="button" name="order" value="Order"></div>
			<div id="hapus" class="input-mini"><p>&#xF171;</p><input type="reset" name="hapus" value="Batal"></div>
		</div>
		<div class="grup toggle">
			<div id="opsi" class="tombol"><p>&#xF0C9;</p><input type="button" name="opsi" value=" OPSI"></div>
		</div>
		<div class="grup">
			<div class="waktu">
				<svg id="waktu" width="100" height="100">
					<circle id="detik" cx="50" cy="50" r="48"/>
					<circle id="menit" cx="50" cy="50" r="45"/>
					<circle id="jam" cx="50" cy="50" r="42"/>
					<circle id="jari" cx="50" cy="50" r="38"/>
				</svg>
				<svg id="teks-kalender" width="100" height="100">
					<text id="hari" x="50" y="38">Senin</text>
					<text id="tanggal" x="30" y="55">01</text>
					<text id="tahun" x="63" y="55">2017</text>
					<text id="bulan" x="50" y="70">Januari</text>
				</svg>
				<svg id="teks-waktu" width="100" height="100">
					<text id="jam" x="50" y="50">00:00</text>
					<text id="format" x="50" y="70">AM</text>
				</svg>
			</div>
		</div>
	</form>
</div>
<div id="nomor-meja">
	<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p>
</div>
<div id="dialog-tambah">
	<p class="judul">Tambah Pesanan</p>
	<div id="tabel-pesanan">
		<table class="tabel-pesanan">
			<thead>
				<tr>
					<td>No.</td>
					<td>Nama Makanan</td>
					<td>Qty</td>
					<td>Harga</td>
					<td>Total</td>
				</tr>
			</thead>
			<tbody class="daftar-pesanan"></tbody>
			<tbody>
				<tr class="total-jumlah">
					<td colspan="4">Jumlah Total Harga</td>
					<td  id="jumlah-harga"></td>
				</tr>
				<tr class="info-pesanan">
					<td colspan="5"><p id="tanggal"></p><p id="waktu"></p><p id="status"></p></td>
				</tr>
				<tr class="nama-pemesan">
					<td colspan="5"><p id="nama-pemesan"></p></td>
				</tr>
				<tr class="kode-transaksi">
					<td colspan="5"><p id="kode-transaksi"></p></td>
				</tr>
				<tr class="info">
					<td colspan="5"><p id="info"></p></td>
				</tr>
			</tbody>
		</table>
	</div>
	<p class="judul">Opsi Pesanan</p>
	<div id="opsi-pesanan">
		<div id="tombol-order" class="input-mini"><p>&#xF00C;</p><input type="button" name="tombol-order" value="Order"></div>
		<div id="tombol-tutup" class="input-mini"><p>&#xF066;</p><input type="button" name="tombol-tutup" value="Tutup"></div>
	</div>
</div>
<div id="dialog-pesanan">
	<p class="judul">Cari Pesanan</p>
	<form id="cari-pesanan">
		<div class="grup">
			<div id="kode-transaksi" class="input"><p>&#xF084;</p><input type="text" name="kode-transaksi" placeholder="Kode Transaksi"></div>
			<div id="nama-transaksi" class="input"><p>&#xF0C0;</p><input type="text" name="nama-transaksi" placeholder="Nama Pemesan"></div>
		</div>
		<div class="grup-mini">
			<div id="tombol-cari" class="input-mini"><p>&#xF002;</p><input type="button" name="tombol-cari" value="Cari"></div>
			<div id="tombol-reset" class="input-mini"><p>&#xF021;</p><input type="reset" name="tombol-reset" value="Reset"></div>
		</div>
	</form>
	<p class="judul">Tabel Pesanan</p>
	<div id="tabel-pesanan">
		<table class="tabel-pesanan">
			<thead>
				<tr>
					<td>No.</td>
					<td>Nama Makanan</td>
					<td>Qty</td>
					<td>Harga</td>
					<td>Total</td>
				</tr>
			</thead>
			<tbody class="daftar-pesanan"></tbody>
			<tbody>
				<tr class="total-jumlah">
					<td colspan="4">Jumlah Total Harga</td>
					<td  id="jumlah-harga"></td>
				</tr>
				<tr class="info-pesanan">
					<td colspan="5"><p id="tanggal"></p><p id="waktu"></p><p id="status"></p></td>
				</tr>
			</tbody>
		</table>
	</div>
	<p class="judul">Opsi Pesanan</p>
	<div id="opsi-pesanan">
		<div id="tombol-ubah" class="input-mini"><p>&#xF0AD;</p><input type="button" name="tombol-ubah" value="Ubah"></div>
		<div id="tombol-batal" class="input-mini"><p>&#xF05E;</p><input type="button" name="tombol-batal" value="Batal"></div>
		<div id="tombol-tutup" class="input-mini"><p>&#xF066;</p><input type="button" name="tombol-tutup" value="Tutup"></div>
	</div>
</div>
<div id="konten">
	<p id="welcome">- Selamat Datang & Selamat Menikmati -</p>
</div>
<div id="footer"><p>&copy; 2017 &#x2665; Design by: INAYAH</p></div>
</body>
</html>