<?php
require 'Silent.php';
require 'Koneksi.php';
$mode = $_POST['mode'];
$data = $_POST['data'];
$koneksi = new MySQLI( $host, $user, $pass, $db);
if ($koneksi) {
	if ($mode == 'DaftarMakanan') {
		$hasil = '';
		$daftar = $koneksi->query("SELECT * FROM daftar_makanan");
		if ($daftar->num_rows != 0) {
			while($i = mysqli_fetch_assoc($daftar)) {
				$hasil .= $i['kode_makanan'].'|'.$i['tanggal_tambah'].'|'.$i['nama'].'|'.$i['qty'].'|'.$i['harga'].';';
			}
		}
		echo $hasil;
	} elseif ($mode == 'CariTransaksi') {
		$hasil = '';
		$daftar_pesan = '';
		$data = explode('|', $data);
		$daftar = $koneksi->query("SELECT * FROM transaksi WHERE kode_transaksi = '$data[0]' AND nama_pembeli = '$data[1]'");
		if ($daftar->num_rows != 0) {
			while($i = mysqli_fetch_assoc($daftar)) {
				$hasil = $i['kode_transaksi'].'|'.$i['tanggal'].','.$i['jam'].'|'.$i['nama_pembeli'].'|'.$i['nomer_meja'].'|'.$i['total'].'|'.$i['status'];
			}
		}
		$daftar = $koneksi->query("SELECT * FROM daftar_pesanan WHERE kode_transaksi = '$data[0]'");
		if ($daftar->num_rows != 0) {
			while($i = mysqli_fetch_assoc($daftar)) {
				$daftar_pesan .= $i['kode_makanan'].'|'.$i['nama_makanan'].'|'.$i['qty'].'|'.$i['harga'].'|'.$i['total'].';';
			}
		}
		if ($hasil == '') {
			echo '';
		} else {
			echo $hasil.'[]'.$daftar_pesan;
		}
	} elseif ($mode == 'TambahTransaksi') {
		$data = explode('[]', $data);
		$data0 = explode('|', $data[0]);
		$waktu = explode(',', $data0[0]);
		$data1 = explode(';', $data[1]);
		$daftar = '';
		$kodeTransaksi = '';
		$transaksi = $koneksi->query("INSERT INTO transaksi (tanggal,jam,nama_pembeli,nomer_meja,total,status) VALUES ('$waktu[0]','$waktu[1]', '$data0[1]', '$data0[2]', '$data0[3]', '$data0[4]')");
		if ($transaksi) {
			$kode = $koneksi->query("SELECT * FROM transaksi WHERE tanggal = '$waktu[0]' AND jam = '$waktu[1]' LIMIT 1");
			if ($kode->num_rows != 0) {

				while($i = mysqli_fetch_assoc($kode)) {
					$kodeTransaksi = $i['kode_transaksi'];
				}
				for ($i=0; $i < count($data1); $i++) {
					$datavalue = explode('|', $data1[$i]);
					$daftar .= "INSERT INTO daftar_pesanan (kode_transaksi,kode_makanan,nama_makanan,qty,harga,total) VALUES ('".$kodeTransaksi."','".$datavalue[0]."','".$datavalue[1]."','".$datavalue[2]."','".$datavalue[3]."','".$datavalue[4]."');";
					$daftar .= "UPDATE daftar_makanan SET qty = (qty-$datavalue[2]) WHERE kode_makanan = $datavalue[0];";
				}
				$hasil = $koneksi->multi_query($daftar);
				if ($hasil) {
					echo '[SuksesTransaksi]|'.$kodeTransaksi.'|'.$data0[0];
				} else {
					echo '[GagalTransaksi]';
				}
			}
		} else {
			echo '[GagalTransaksi]';
		}
	} elseif ($mode == 'BatalTransaksi') {
		$cekStatus = $koneksi->query("SELECT status FROM transaksi WHERE kode_transaksi = $data LIMIT 1");
		$status = 'Lunas';
		$tambahQty = '';
		if ($cekStatus->num_rows != 0) {
			while($i = mysqli_fetch_assoc($cekStatus)) {
				$status = $i['status'];
			}
		}
		if ($status == 'Belum Diproses') {
			$pilihPesanan = $koneksi->query("SELECT kode_makanan, qty FROM daftar_pesanan WHERE kode_transaksi = $data");
			if ($pilihPesanan) {
				while($i = mysqli_fetch_assoc($pilihPesanan)) {
					$tambahQty .= "UPDATE daftar_makanan SET qty = (qty+".$i['qty'].") WHERE kode_makanan = ".$i['kode_makanan'].";";
				}
			}
		}
		$hapusTransaksi = "DELETE FROM transaksi WHERE kode_transaksi = $data;";
		$hapusPesanan = "DELETE FROM daftar_pesanan WHERE kode_transaksi = $data;";
		$kode = $koneksi->multi_query($tambahQty.$hapusTransaksi.$hapusPesanan);
		if ($kode) {
			echo '[SuksesBatal]';
		} else {
			echo '[GagalBatal]';
		}
	} elseif ($mode == 'Login') {
		$data = explode('|', $data);
		$User = $koneksi->query("SELECT * FROM daftar_user WHERE username = '$data[0]' AND password = '$data[1]' AND status != 'Baru'");
		if ($User->num_rows != 0) {
			echo 'OK';
		}
	} elseif ($mode == 'Register') {
		$data = explode('|', $data);
		$User = $koneksi->query("SELECT * FROM daftar_user WHERE username = '$data[0]'");
		if($User->num_rows == 0) {
			$User2 = $koneksi->query("INSERT INTO `daftar_user` (`id_user`, `username`, `password`, `status`) VALUES (NULL, '$data[0]', '$data[1]', 'Baru')");
			if ($User2) {
				echo 'OK';
			}
		}
	} elseif ($mode == 'AmbilDB') {
		$DBMakanan = '';
		$DBPesanan = '';
		$DBTransaksi = '';
		$DBUser = '';
		$daftar_makanan = $koneksi->query("SELECT * FROM daftar_makanan");
		if ($daftar_makanan->num_rows != 0) {
			while($i = mysqli_fetch_assoc($daftar_makanan)) {
				$DBMakanan .= $i['kode_makanan'].'|'.$i['tanggal_tambah'].'|'.$i['nama'].'|'.$i['qty'].'|'.$i['harga'].';';
			}
		}
		$daftar_pesanan = $koneksi->query("SELECT * FROM daftar_pesanan");
		if ($daftar_pesanan->num_rows != 0) {
			while($i = mysqli_fetch_assoc($daftar_pesanan)) {
				$DBPesanan .= $i['kode_transaksi'].'|'.$i['kode_makanan'].'|'.$i['nama_makanan'].'|'.$i['qty'].'|'.$i['harga'].'|'.$i['total'].';';
			}
		}
		$transaksi = $koneksi->query("SELECT * FROM transaksi");
		if ($transaksi->num_rows != 0) {
			while($i = mysqli_fetch_assoc($transaksi)) {
				$DBTransaksi .= $i['kode_transaksi'].'|'.$i['tanggal'].','.$i['jam'].'|'.$i['nama_pembeli'].'|'.$i['nomer_meja'].'|'.$i['total'].'|'.$i['status'].';';
			}
		}
		$user = $koneksi->query("SELECT * FROM daftar_user");
		if ($user->num_rows != 0) {
			while($i = mysqli_fetch_assoc($user)) {
				$DBUser .= $i['id_user'].'|'.$i['username'].'|'.$i['password'].'|'.$i['status'].';';
			}
		}
		echo $DBMakanan.'#'.$DBPesanan.'#'.$DBTransaksi.'#'.$DBUser;
	} elseif ($mode == 'TambahMenu') {
		$data = explode('|', $data);
		$dataWaktu = explode(',', $data[1]);
		$tambah_menu = $koneksi->query("INSERT INTO daftar_makanan (tanggal_tambah,jam,nama,qty,harga) VALUES ('$dataWaktu[0]','$dataWaktu[1]','$data[2]', '$data[3]', '$data[4]')");
		if ($tambah_menu) {
			$kode = $koneksi->query("SELECT kode_makanan FROM daftar_makanan WHERE tanggal_tambah = '$dataWaktu[0]' AND jam = '$dataWaktu[1]' LIMIT 1");
			if ($kode->num_rows != 0) {
				$kodeMenu = '';
				while($i = mysqli_fetch_assoc($kode)) {
					$kodeMenu = $i['kode_makanan'];
				}
				$src = 'data:text/plain,'.urlencode(hex2bin($data[0]));
				$dest = '../img/upload/menu_'.$kodeMenu.'.png';
				if (copy($src, $dest)) {
					echo 'OK';
				}
			}
		}
	} elseif ($mode == 'UbahMenu') {
		$data = explode('|', $data);
		if ($data[0] != '') {
			$src = 'data:text/plain,'.urlencode(hex2bin($data[0]));
			$dest = '../img/upload/menu_'.$data[1].'.png';
			unlink($dest);
			copy($src, $dest);
		}
		$update = $koneksi->query("UPDATE daftar_makanan SET nama = '$data[2]',qty = '$data[3]',harga = '$data[4]' WHERE kode_makanan = '$data[1]';");
		if ($update) {
			echo "OK";
		}
	} elseif ($mode == 'HapusMenu') {
		$hapus = $koneksi->query("DELETE FROM daftar_makanan WHERE kode_makanan = $data;");
		$src = '../img/upload/menu_'.$data.'.png';
		if ($hapus && unlink($src)) {
			echo "OK";
		}
	} elseif ($mode == 'UbahTransaksi') {
		$data = explode('|', $data);
		$update = $koneksi->query("UPDATE transaksi SET status = '$data[1]' WHERE kode_transaksi = '$data[0]';");
		if ($update) {
			echo "OK";
		}
	} elseif ($mode == 'CetakTransaksi') {
		$data = explode('|', $data);
		$transaksi = $koneksi->query("SELECT * FROM transaksi WHERE tanggal BETWEEN '$data[0]' AND '$data[1]' ORDER BY tanggal");
		if ($transaksi->num_rows != 0) {
			$DBTransaksi = '';
			while($i = mysqli_fetch_assoc($transaksi)) {
				$DBTransaksi .= $i['kode_transaksi'].'|'.$i['tanggal'].'|'.$i['jam'].'|'.$i['nama_pembeli'].'|'.$i['nomer_meja'].'|'.$i['total'].'|'.$i['status'].';';
			}
		echo $hasil = "data:text/html;base64,".base64_encode(file_get_contents('../html/CetakTabel.html')."buatTabel('$DBTransaksi');</script></html>");
		}
	} elseif ($mode == 'HapusTransaksi') {
		$cekStatus = $koneksi->query("SELECT status FROM transaksi WHERE kode_transaksi = $data LIMIT 1");
		$status = 'Lunas';
		$tambahQty = '';
		if ($cekStatus->num_rows != 0) {
			while($i = mysqli_fetch_assoc($cekStatus)) {
				$status = $i['status'];
			}
		}
		if ($status == 'Belum Diproses') {
			$pilihPesanan = $koneksi->query("SELECT kode_makanan, qty FROM daftar_pesanan WHERE kode_transaksi = $data");
			if ($pilihPesanan) {
				while($i = mysqli_fetch_assoc($pilihPesanan)) {
					$tambahQty .= "UPDATE daftar_makanan SET qty = (qty+".$i['qty'].") WHERE kode_makanan = ".$i['kode_makanan'].";";
				}
			}
		}
		$hapusTransaksi = "DELETE FROM transaksi WHERE kode_transaksi = '".$data."';";
		$hapusPesanan = "DELETE FROM daftar_pesanan WHERE kode_transaksi = '".$data."';";
		$kode = $koneksi->multi_query($tambahQty.$hapusTransaksi.$hapusPesanan);
		if ($kode) {
			echo 'OK';
		}
	}
} else {
	echo 'Koneksi Gagal';
}
$koneksi->close();
?>
