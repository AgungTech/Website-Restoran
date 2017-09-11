<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Menu Makanan</title>
	<link rel="icon" type="image/x-icon" href="img/aset/favicon.ico" />
	<link rel="stylesheet" type="text/css" href="css/Home.css">
	<script type="text/javascript" src="js/Home.js"></script>
</head>
<body>
<div id="header">
	<div id="judul">Sistem Administrasi</div>
	<div class="menu">
		<p id="dashboard" aktif>Dashboard</p>
		<p id="transaksi">Transaksi</p>
		<p id="menu">Menu</p>
		<p id="laporan">Laporan</p>
		<p id="user">Pengguna</p>
		<p id="keluar">Keluar</p>
	</div>
</div>
<div id="Dashboard">
	<div id="background"></div>
	<h1>Selamat&#x0a;Datang&#x0a;di&#x0a;Sistem&#x0a;Inventaris&#x0a;Toko&#x0a;Habibah</h1>
	<form id="login">
		<h3>Login / Register</h3>
		<input type="text" name="nama" placeholder="Nama User">
		<input type="password" name="pass" placeholder="Password">
		<input type="button" name="login" value="Login">
		<input type="button" name="login" value="Register">
	</form>
	<div id="welcome">
		<table>
			<tr><td>
			<div class="grid">
				<h4>Pesanan Belum Diproses</h4>
				<p id="pesanan-belum"></p>
			</div>
			<div class="grid">
				<h4>Total Menu Makanan</h4>
				<p id="total-menu"></p>
			</div>
			<div class="grid">
				<h4>Total Transaksi</h2>
				<p id="total-transaksi"></p>
			</div>
			<div class="grid">
				<h4>Total Pendapatan</h4>
				<p id="total-pendapatan"></p>
			</div>
			</td></tr>
		</table>
	</div>
</div>
<div id="Menu">
	<h2>Daftar Makanan</h2>
	<div class="tepi"><input id="tombol-tambah" type="button" name="tambah" value="Tambah Menu"></div>
	<table class="tabel-menu">
		<thead>
			<tr>
				<th>Kode Makanan</th>
				<th>Nama Makanan</th>
				<th>Qty</th>
				<th>Harga</th>
				<th>Opsi</th>
			</tr>
		</thead>
		<tbody class="daftar-makanan">
		</tbody>
	</table>
	<form id="tambah-menu">
		<h3>Tambah Menu</h3>
		<input type="file" accept="image/*" name="gambar" placeholder="Pilih Gambar">
		<img class="gambar-menu">
		<canvas class="canvas-menu"></canvas>
		<input type="text" name="nama-makanan" placeholder="Nama makanan">
		<input type="number" name="qty" placeholder="Quantity" min="0">
		<input type="text" name="harga" placeholder="Harga">
		<input type="button" name="selesai" value="Selesai">
		<input type="button" name="batal" value="Batal">
	</form>
	<form id="ubah-menu">
		<h3>Ubah Menu</h3>
		<input type="file" accept="image/*" name="gambar" placeholder="Pilih Gambar">
		<img class="gambar-menu">
		<canvas class="canvas-menu"></canvas>
		<input type="text" name="nama-makanan" placeholder="Nama makanan">
		<input type="number" name="qty" placeholder="Quantity" min="0">
		<input type="text" name="harga" placeholder="Harga">
		<input type="button" name="harga" value="Selesai">
		<input type="button" name="batal" value="Batal">
	</form>
</div>
<div id="Transaksi">
	<h2>Daftar Transaksi</h2>
	<table class="tabel-transaksi">
		<thead>
			<tr>
				<th>Kode Transaksi</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th>Nama Pembeli</th>
				<th>Meja</th>
				<th>Total</th>
				<th>Status</th>
				<th>Opsi</th>
			</tr>
		</thead>
		<tbody class="daftar-transaksi">
		</tbody>
	</table>
	<table class="tabel-detail">
		<thead>
			<tr>
				<th colspan="5">Detail Transaksi</th>
			</tr>
			<tr class="nama-pembeli">
				<td colspan="5"><p id="nama-pembeli">NAMA PEMBELI</p></td>
			</tr>
			<tr class="kode-transaksi">
				<td colspan="5"><p id="kode-transaksi">KODE TRANSAKSI</p></td>
			</tr>
			<tr>
				<td>No.</td>
				<td>Nama Makanan</td>
				<td>Qty</td>
				<td>Harga</td>
				<td>Total</td>
			</tr>
		</thead>
		<tbody class="detail-transaksi">
		</tbody>
		<tbody>
			<tr class="total-jumlah">
				<td colspan="4">Jumlah Total Harga</td>
				<td  id="jumlah-harga"></td>
			</tr>
			<tr class="info">
				<td colspan="5">
					<p id="Tanggal">Tanggal</p>
					<p id="Waktu">Waktu</p>
					<p id="Status">Status</p>
				</td>
			</tr>
			<tr class="opsi">
				<td colspan="5"><button id="Cetak">Cetak</button><button id="Tutup">Tutup</button></td>
			</tr>
		</tbody>
	</table>
	<div id="ubah-status">
		<select>
			<option value="Belum Diproses">Belum Diproses</option>
			<option value="Lunas">Lunas</option>
		</select>
		<button id="selesai">Selesai</button>
		<button id="batal">Batal</button>
	</div>
</div>
<div id="Laporan">
	<h2>Laporan Transaksi</h2>
	<div id="cetak-data">
		<h3>Cetak Data</h3>
		<input type="button" name="mulai" value="Mulai">
		<input type="button" name="sampai" value="Sampai">
		<input type="button" name="cetak" value="Cetak">
	</div>
	<table class="tabel-transaksi">
		<thead>
			<tr>
				<th>No.</th>
				<th>Kode Transaksi</th>
				<th>Tanggal</th>
				<th>Jam</th>
				<th>Nama Pembeli</th>
				<th>Meja</th>
				<th>Total</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody class="daftar-transaksi">
		</tbody>
		<tbody class="total-transaksi">
			<tr>
				<td colspan="8" id="total">0</td>
			</tr>
		</tbody>
	</table>
</div>
<div id="User">
	<h2>Daftar Pengguna</h2>
	<div id="struktur-user">
		<?php include 'img/src/Management.svg'; ?>
	</div>
	<div class="tepi" aktif><input id="tombol-tambah" type="button" name="tambah" value="Tambah User"></div>
	<table id="tabel-user">
		<thead>
			<tr>
				<th>Id User</th>
				<th>Username</th>
				<th>Password</th>
				<th>Level</th>
				<th>Opsi</th>
			</tr>
		</thead>
		<tbody class="daftar-user">
		</tbody>
	</table>
	<form id="tambah-user">
		<h3>Tambah User</h3>
		<input type="file" accept="image/*" name="gambar" placeholder="Pilih Gambar">
		<img class="gambar-user">
		<canvas class="canvas-user"></canvas>
		<input type="text" name="username" placeholder="Username">
		<input type="password" name="password" placeholder="Password">
		<select>
			<option value="Admin">Admin</option>
			<option value="Manager">Manager</option>
			<option value="Kasir">Kasir</option>
			<option value="Chef">Chef</option>
			<option value="Pelayan">Pelayan</option>
			<option value="Baru">Pilih Level</option>
		</select>
		<input type="button" name="selesai" value="Selesai">
		<input type="button" name="batal" value="Batal">
	</form>
	<form id="ubah-user">
		<h3>Ubah User</h3>
		<input type="file" accept="image/*" name="gambar" placeholder="Pilih Gambar">
		<img class="gambar-user">
		<canvas class="canvas-user"></canvas>
		<input type="text" name="username" placeholder="Username">
		<input type="password" name="password" placeholder="Password">
		<select>
			<option value="Admin">Admin</option>
			<option value="Manager">Manager</option>
			<option value="Kasir">Kasir</option>
			<option value="Chef">Chef</option>
			<option value="Pelayan">Pelayan</option>
			<option value="Baru">Pilih Level</option>
		</select>
		<input type="button" name="selesai" value="Selesai">
		<input type="button" name="batal" value="Batal">
	</form>
</div>
<table id="Alert">
	<tr><td>
	<p>PESAN</p>
	</td></tr>
</div>
<div id="footer"><p>&copy; 2017 &#x2665; Design by: INAYAH</p></div>
</body>
</html>