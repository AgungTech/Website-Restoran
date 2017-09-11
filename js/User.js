/****************************************************************************************************
| SEMUA KODE DI SINI DIBUAT SECARA MANUAL TANPA ADANYA PLUGIN ATAUPUN TEMPLATE
|****************************************************************************************************
| Fitur - fitur yang tersedia antara lain :
| >>> Sistem Konversi Mata Uang Indonesia, Format Waktu, Format Tanggal, Kode Transaksi, dll.
| >>> Jam & Kalender Interaktif menggunakan SVG.
| >>> Animation & Transform menggunakan css3 (-webkit-animation, animation, -webkit-transform, transform),
|     jadi tidak mendukung Browser yang tidak memiliki fitur itu.
| >>> Konversi dari/ke Hexadesimal uInt8 bit.
| >>> Sistem Encoding & Decoding.
| >>> Input Output Data Server menggunakan fungsi Ajax() POST, jadi tidak perlu Reload Web berulang-ulang
|     dan informasi yang dikirim/diterima tidak terlihat oleh Host.
| >>> Expire Date.
|****************************************************************************************************/
//Jika Window selesai di Load.
onload = function(E) {

	// _$() sebagai CodeSnippets untuk menggantikan document.querySelector().
	var _$ = function(target) {
		return document.querySelector(target);
	}

	// Deklarasi
	var CopasTiming	= null;
	var LogoPosisi	= 'kiri';
	var OpsiOrder = 'Hilang';
	var HeadMode = 'Mobile';
	var Mode	= 'Tambah';
	var Alert	= _$('#peringatan');
	var head	= _$('#header');
	var konten	= _$('#konten');
	var foot	= _$('#footer');
	var HeadLogo	= head.querySelector('#logo');
	var OrderForm	= _$('#order-form');
	var NomorMeja	= _$('#nomor-meja');
	var DialogPesanan	= _$('#dialog-pesanan');
	var DialogTambah	= _$('#dialog-tambah');
	var HeadMenu	= head.querySelectorAll('.show-hide');
	var NamaOrder	= OrderForm.querySelector('#nama');
	var TotalOrder	= OrderForm.querySelector('#total');
	var LihatOrder	= OrderForm.querySelector('#lihat');
	var SubmitOrder	= OrderForm.querySelector('#order');
	var ResetOrder	= OrderForm.querySelector('#hapus');
	var Opsi	= OrderForm.querySelector('#opsi');
	var Meja	= OrderForm.querySelector('#meja');
	var MejaValue	= Meja.querySelector('#meja-value');
	var DataIO = null;
	var DataMakanan = [];
	var DataTransaksi = [];

	//Menghilangkan seleksi teks selain type 'text' atau 'textarea'.
	//----- Tidak Mendukung Google Chrome ----
	var AntiCopas = function() {
		var Seleksi = getSelection();
		if (Seleksi.rangeCount != 0)Seleksi.removeAllRanges();
	}
	onselectstart = function(Event) {
		console.log(Event.target);
		Event.target != 'text' || Event.target != 'textarea' ? CopasTiming = setInterval(AntiCopas,10) : clearInterval(CopasTiming);
	}
	onmouseup = function() {
		clearInterval(CopasTiming);
		AntiCopas();
	}

	//Jika browser diubah ukurannya, Tampilan akan menyesuaikan.
	onresize = function(Event) {
		Tampilan(Event);
	}

	// Konversi KODE TRANSAKSI
	function KODE(data) {
		var char = 'INAYHDEBUG';
		var a = '';
		if (parseInt(data)) {
			var b = data.toString();
			for (var i = 0; i < b.length; i++) a += char[parseInt(b[i])];
		} else {
			for (var i = 0; i < data.length; i++) a += char.indexOf(data[i]);
		}
		return data.toString().length == a.toString().length ? a : false;
	}

	// tanggal Sekarang
	function Waktu() {
		var date = new Date();
		var detik = date.getSeconds();
		detik = detik < 10 ? '0' + detik.toString() : detik;
		var menit = date.getMinutes();
		menit = menit < 10 ? '0' + menit.toString() : menit;
		var jam = date.getHours();
		jam = jam < 10 ? '0' + jam.toString() : jam;
		var tanggal = date.getDate();
		tanggal = tanggal < 10 ? '0' + tanggal.toString() : tanggal;
		var bulan = date.getMonth()+1;
		bulan = bulan < 10 ? '0' + bulan.toString() : bulan;
		var tahun = date.getFullYear();
		return tahun+'-'+bulan+'-'+tanggal+','+jam+':'+menit+':'+detik;
	}

	// Konversi Mata Uang Indonesia
	var rupiah = function(data) {
		if (data.toString().indexOf('Rp') == -1) {
			var a = '';
			data = Math.round(data).toString();
			for (var i = 0; i < data.length; i++) {
				if((data.length-(i+1))%3 != 0 || i+1 == data.length){
					a += data.slice(i,i+1);
				} else {
					a += data.slice(i,i+1)+'.';
				}
			}
			return 'Rp. '+a+',-';
		} else {
			var a = '';
			data = data.slice(4,data.length-2);
			for (var i = 0; i < data.length; i++) {
				if (data[i] != '.') {
					a += data.slice(i,i+1);
				}
			}
			return parseInt(a);
		}
	}

	//Konversi Tanggal
	var FormatTanggal = function(data) {
		var namaHariFull = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum\'at','Sabtu'];
		var namaBulanFull = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
		if (data.indexOf(' ') == -1) {
			var jumlahHari = [31,28,31,30,31,30,31,31,30,31,30,31];
			var tanggal = [0,0,0,0,0,0,0,0,0,0,0,0];
			data = data.split('-');
			for(var i=0;i<data.length;i++)data[i]=parseInt(data[i]);
			jumlahHari[1]=data[0]%4!=0?28:29;
			tanggal[0]=((365*(data[0]-1))+Math.floor((data[0]-1)/4))%7;
			for(var i=0;i<tanggal.length;i++)if(i!=0)tanggal[i]=(tanggal[i-1]+jumlahHari[i-1])%7;
			return namaHariFull[(data[2]+(tanggal[data[1]-1]-1))%7]+', '+data[2]+' '+namaBulanFull[data[1]-1]+' '+data[0];
		} else {
			data = data.split(' ');
			var bulan = namaBulanFull.indexOf(data[2])+1;
			bulan = bulan < 10 ? '0'+bulan.toString() : bulan;
			return data[3]+'-'+bulan+'-'+data[1];
		}
	}

	// Format Waktu 12 atau 24 jam
	var FormatWaktu = function(data) {
		if (data.indexOf('AM') != -1 || data.indexOf('PM') != -1) {
			data = data.split(' ');
			data[0] = data[0].split(':');
			data[0][0] = data[1]=='PM'?parseInt(data[0][0])+12:data[0][0];
			data[0][0] = data[0][0] < 10 ? '0'+data[0][0].toString() : data[0][0];
			return data[0][0]+':'+data[0][1]+':'+data[0][2];
		} else {
			data = data.split(':');
			var a = data[0] > 12 ? 'PM' : 'AM';
			data[0] = data[0] > 12 ? data[0]-12 : data[0];
			return data[0]+':'+data[1]+':'+data[2]+' '+a;
		}
	}

	// Cek Atribute Element Aktif atau tidak.
	var CA = function(target, mode) {
		if (mode == 1) {
			target.setAttribute('aktif',0);
		} else if(mode == 0) {
			target.removeAttribute('aktif');
		} else {
			return target.getAttribute('aktif') != null ? 1 : 0;
		}
	}

	// Memunculkan popup Peringatan.
	onclick = function() {
		if(CA(Alert)==1)CA(Alert,0);
	}
	var Peringatan =  function(data, mode) {
		if (mode == 'awal') {
			Alert.querySelector('.tombol').onclick = function() {
				CA(Alert) == 1 ? CA(Alert,0) : CA(Alert,1);
			}
		} else {
			Alert.querySelector('.isi').innerHTML = '<p>'+data+'</p>';

			setTimeout(function(){
				CA(Alert,1)	;
			},10);
		}
	}
	Peringatan(0, 'awal');

	// Mengatur Tampilan.
	var Tampilan = function(Event) {
		var w = innerWidth;
		var h = innerHeight;
		//Tampilan Menu Header
		if (w < 730) {
			OpsiHeader('Mobile');
		} else {
			OpsiHeader('Desktop');
		}
		if (w < 370) {
			if(CA(Opsi) == 0 ) OrderForm.style.overflowY = 'auto';
		} else {
			if(CA(Opsi) == 0 ) OrderForm.style.overflowY = 'hidden';
			OrderForm.scrollTop = 0;
		}
		//Tampilan Selamat datang
		if (w < 450) {
			konten.querySelector('#welcome').innerHTML = 'Selamat Datang<br>-   &   -<br>Selamat Menikmati'
		} else {
			konten.querySelector('#welcome').innerHTML = '- Selamat Datang & Selamat Menikmati -'
		}
		//Tampilan Nomer Meja
		if(NomorMeja.clientHeight >= h-110) {
			NomorMeja.style.bottom = '35px';
		} else {
			NomorMeja.style.bottom = 'auto';
		}
		//Tampilan Form Tambah Pesanan
		if(DialogTambah.clientHeight >= h-110) {
			DialogTambah.style.bottom = '35px';
		} else {
			DialogTambah.style.bottom = 'auto';
		}
		//Tampilan Form Lihat Pesanan
		if(DialogPesanan.clientHeight >= h-110) {
			DialogPesanan.style.bottom = '35px';
		} else {
			DialogPesanan.style.bottom = 'auto';
		}
	}

	// Keluar Logo jika disorot.
	head.onmouseover = function(Event) {
		this.querySelector('#logo').style.transitionDelay = '0s';
		this.querySelector('.icon').style.transitionDelay = '0s';
		this.querySelector('#logo').style.height = '130px';
		this.querySelector('.icon').style.WebkitTransform = 'scale(1,1)';
		this.querySelector('.icon').style.transform = 'scale(1,1)';
	}
	head.onmouseout = function(Event) {
		this.querySelector('#logo').style.transitionDelay = '5s';
		this.querySelector('.icon').style.transitionDelay = '5s';
		this.querySelector('#logo').style.height = '70px';
		this.querySelector('.icon').style.WebkitTransform = 'scale(0,0)';
		this.querySelector('.icon').style.transform = 'scale(0,0)';
	}

	//Tampilan Header & Konten
	var OpsiHeader = function(mode) {
		if (mode == 'Tampil') {
			HeadMenu[0].style.maxWidth = '210px';
			HeadMenu[1].style.maxWidth = '210px';
			konten.style.display = 'block';
			CA(Opsi,1);
			OpsiOrder = 'Tampil';
			if (HeadMode == 'Mobile') {
				HeadLogo.style.left = '-100px';
				OrderForm.style.left = '0';
				OrderForm.style.overflowY = 'visible';
				head.style.height = '230px';
			} else {
				HeadLogo.style.left = '20px';
				OrderForm.style.left = '120px';
				OrderForm.style.overflowY = 'hidden';
				OrderForm.scrollTop = 0;
				head.style.height = '75px';
			}
		} else if(mode == 'Hilang') {
			HeadMenu[0].style.maxWidth = '0';
			HeadMenu[1].style.maxWidth = '0';
			CA(Opsi,0);
			OpsiOrder = 'Hilang';
			OrderForm.scrollTop = 0;
			head.style.height = '75px';
			if (HeadMode == 'Mobile') {
				OrderForm.style.left = '120px';
				HeadLogo.style.left = '20px';
				if (innerWidth < 370) {
					if(CA(Opsi) == 0 ) OrderForm.style.overflowY = 'auto';
				} else {
					if(CA(Opsi) == 0 ) OrderForm.style.overflowY = 'hidden';
					OrderForm.scrollTop = 0;
				}
			} else {
				OrderForm.style.overflowY = 'hidden';
			}
		} else if (mode == 'Mobile') {
			Opsi.style.display = 'block';
			CA(HeadMenu[0],1);
			CA(HeadMenu[1],1);
			if (CA(Opsi) == 1) {
				HeadMenu[0].style.maxWidth = '210px';
				HeadMenu[1].style.maxWidth = '210px';
				OrderForm.style.left = '0';
				OrderForm.style.overflowY = 'visible';
				HeadLogo.style.left = '-100px';
				head.style.height = '230px';
				head.style.height = '230px';
				OpsiOrder = 'Tampil';
			} else {
				HeadMenu[0].style.maxWidth = '0';
				HeadMenu[1].style.maxWidth = '0';
				OrderForm.style.left = '120px';
				OrderForm.style.overflowY = 'auto';
				OrderForm.scrollTop = 0;
				HeadLogo.style.left = '20px';
				head.style.height = '75px';
				OpsiOrder = 'Hilang';
			}
			HeadMode = 'Mobile';
		} else if (mode == 'Desktop') {
			Opsi.style.display = 'none';
			CA(HeadMenu[0],0);
			CA(HeadMenu[1],0);
			head.style.height = '75px';
			if (OpsiOrder == 'Hilang') {
				if (CA(Meja) == 1 || CA(LihatOrder) == 1) {} else {
					HeadMenu[0].style.maxWidth = '210px';
					HeadMenu[1].style.maxWidth = '210px';
					OpsiOrder = 'Tampil';
				}
			}
			HeadMode = 'Desktop';
		}
	}
	Tampilan(E);

	//Tombol Opsi Menu Mobile
	Opsi.onclick = function() {
		if (CA(this) == 0) {
			CA(this,1);
			if (CA(Meja) == 1) {
				CA(Meja,0);
				NomorMeja.style.WebkitTransform = 'scale(0,0)';
				NomorMeja.style.transform = 'scale(0,0)';
			}
			if (CA(SubmitOrder) == 1) {
				CA(SubmitOrder,0);
				DialogTambah.style.WebkitTransform = 'scale(0,0)';
				DialogTambah.style.transform = 'scale(0,0)';
			}
			if (CA(LihatOrder) == 1) {
				CA(LihatOrder,0);
				DialogPesanan.style.WebkitTransform = 'scale(0,0)';
				DialogPesanan.style.transform = 'scale(0,0)';
			}
			OpsiHeader('Tampil');
		} else {
			CA(this,0);
			OpsiHeader('Hilang');
		}
	}
	//Tombol Pilihan Meja
	Meja.onclick = function() {
		if (CA(SubmitOrder) ==1) {
			CA(SubmitOrder,0);
			DialogTambah.style.WebkitTransform = 'scale(0,0)';
			DialogTambah.style.transform = 'scale(0,0)';
		}
		if (CA(LihatOrder) == 0) {
			if (CA(this) == 0) {
				CA(this,1);
				NomorMeja.style.WebkitTransform = 'scale(1,1)';
				NomorMeja.style.transform = 'scale(1,1)';
				OpsiHeader('Hilang');
			} else {
				CA(this,0);
				innerWidth > 730 ? OpsiHeader('Tampil') : CA(Opsi) == 1 ? OpsiHeader('Tampil') : null;
				NomorMeja.style.WebkitTransform = 'scale(0,0)';
				NomorMeja.style.transform = 'scale(0,0)';
			}
		}
	}
	// Pilihan Nomor Meja
	var MejaIn = NomorMeja.querySelectorAll('p');
	for (var i = 0; i < MejaIn.length; i++) {
		if (MejaIn[i].textContent == MejaValue.textContent) CA(MejaIn[i],1);
		MejaIn[i].onclick = function() {
			CA(Meja,0);
			for (var ii = 0; ii < MejaIn.length; ii++) if(CA(MejaIn[ii]) == 1) CA(MejaIn[ii],0);
			CA(this,1);
			MejaValue.textContent = this.textContent;
			innerWidth > 730 ? OpsiHeader('Tampil') : CA(Opsi) == 1 ? OpsiHeader('Tampil') : null;
			NomorMeja.style.WebkitTransform = 'scale(0,0)';
			NomorMeja.style.transform = 'scale(0,0)';
		}
	}

	//Tombol Lihat Pesanan
	LihatOrder.onclick = function() {
		if (CA(this) == 0) {
			CA(this,1);
			DialogPesanan.style.WebkitTransform = 'scale(1,1)';
			DialogPesanan.style.transform = 'scale(1,1)';
			konten.style.display = 'none';
			OpsiHeader('Hilang');
		} else {
			CA(this,0);
			DialogPesanan.style.WebkitTransform = 'scale(0,0)';
			DialogPesanan.style.transform = 'scale(0,0)';
			OpsiHeader('Tampil');
		}
	}
	// Mengaktifkan Dialog Pesanan
	var OlahPesanan = function(data, mode) {
		var formCari = DialogPesanan.querySelector('#cari-pesanan');
		var formTabel = DialogPesanan.querySelector('#tabel-pesanan');
		var formOpsi = DialogPesanan.querySelector('#opsi-pesanan');
		var kodeTransaksi = formCari.querySelector('#kode-transaksi');
		var kodeTransaksiValue = kodeTransaksi.querySelector('input');
		var namaTransaksi = formCari.querySelector('#nama-transaksi');
		var namaTransaksiValue = namaTransaksi.querySelector('input');
		var tombolCari = formCari.querySelector('#tombol-cari');
		var tombolReset = formCari.querySelector('#tombol-reset');
		var daftarPesanan = formTabel.querySelector('.daftar-pesanan');
		var jumlahHarga = formTabel.querySelector('#jumlah-harga');
		var tanggalPesanan = formTabel.querySelector('#tanggal');
		var waktuPesanan = formTabel.querySelector('#waktu');
		var statusPesanan = formTabel.querySelector('#status');
		var ubahPesanan = formOpsi.querySelector('#tombol-ubah');
		var batalPesanan = formOpsi.querySelector('#tombol-batal');
		var tutupDialogPesanan = formOpsi.querySelector('#tombol-tutup');
		if (data == 'awal') {
			kodeTransaksiValue.value = '';
			namaTransaksiValue.value = '';
			// Tombol untuk membatalkan Pesanan
			tombolCari.onclick = function() {
				if (kodeTransaksiValue.value.length < 5 || namaTransaksiValue.value.length < 3) {
					Peringatan('Isikan Kode Transaksi & Nama Pemesan dengan benar');
				} else if(!KODE(kodeTransaksiValue.value)) {
					Peringatan('Kode Transaksi tidak Valid');
				} else {
					batalPesanan.setAttribute('kode',KODE(kodeTransaksiValue.value));
					DataIO('CariTransaksi', KODE(kodeTransaksiValue.value) + '|' + namaTransaksiValue.value);
				}
			}
			tombolReset.onclick = function() {
				daftarPesanan.innerHTML = '';
				jumlahHarga.innerHTML = '';
				tanggalPesanan.innerHTML = '';
				waktuPesanan.innerHTML = '';
				statusPesanan.innerHTML = '';
				batalPesanan.removeAttribute('kode');
			}
			// Tombol untuk membatalkan Pesanan
			ubahPesanan.onclick = function() {
				if (daftarPesanan.innerHTML == '') {
					Peringatan('Cari dulu Transaksi yang akan diubah');
				} else if (statusPesanan.innerHTML != 'Belum Diproses') {
					Peringatan('Transaksi sudah tidak bisa diubah');
				} else {
					Mode = 'Ubah';
				}
			}
			// Tombol untuk membatalkan Pesanan
			batalPesanan.onclick = function() {
				if (daftarPesanan.innerHTML == '') {
					Peringatan('Cari dulu Transaksi yang akan dibatalkan');
				} else if (statusPesanan.innerHTML != 'Belum Diproses') {
					Peringatan('Transaksi sudah tidak bisa dibatalkan');
				} else if (this.getAttribute('kode') == null) {
					Peringatan('Cari dulu Transaksi yang akan dibatalkan');
				} else {
					DataIO('BatalTransaksi', this.getAttribute('kode'));
				}
			}
			// Tombol untuk menutup Dialog Pesanan
			tutupDialogPesanan.onclick = function() {
				kodeTransaksiValue.value = '';
				namaTransaksiValue.value.length = '';
				jumlahHarga.innerHTML = '';
				tanggalPesanan.innerHTML = '';
				waktuPesanan.innerHTML = '';
				statusPesanan.innerHTML = '';
				daftarPesanan.innerHTML = '';
				batalPesanan.removeAttribute('kode');
				CA(LihatOrder,0);
				DialogPesanan.style.WebkitTransform = 'scale(0,0)';
				DialogPesanan.style.transform = 'scale(0,0)';
				OpsiHeader('Tampil');
			}
		} else if (data == '') {
			Peringatan('Data Transaksi yang dicari tidak ditemukan');
			batalPesanan.removeAttribute('kode');
		} else if(data == 'Batal') {
			if(mode == '[SuksesBatal]') {
				kodeTransaksiValue.value = '';
				namaTransaksiValue.value.length = '';
				jumlahHarga.innerHTML = '';
				tanggalPesanan.innerHTML = '';
				waktuPesanan.innerHTML = '';
				statusPesanan.innerHTML = '';
				daftarPesanan.innerHTML = '';
				batalPesanan.removeAttribute('kode');
				CA(LihatOrder,0);
				DialogPesanan.style.WebkitTransform = 'scale(0,0)';
				DialogPesanan.style.transform = 'scale(0,0)';
				OpsiHeader('Tampil');
				Peringatan('Pemesanan Berhasil dibatalkan !');
			} else if(mode == '[GagalBatal]') {
				Peringatan('Maaf, Pesanan Gagal dibatalkan. Tolong hubungi kasir untuk keterangan lebih lanjut !');
			}
		} else {
			data = data.split('[]');
			var transaksi = data[0].split('|');
			var daftar_pesanan = [];
			data[1] = data[1].split(';');
			for (var i = 0; i < data[1].length-1; i++) {
				daftar_pesanan[i] = data[1][i].split('|');
			}
			var macam = '';
			for (var i = 0; i < daftar_pesanan.length; i++) {
				macam += '<tr><td>'+(i+1)+'</td><td>'+daftar_pesanan[i][1]+'</td><td>'+daftar_pesanan[i][2]+'</td><td>'+rupiah(daftar_pesanan[i][3])+'</td><td>'+rupiah(daftar_pesanan[i][4])+'</td></tr>';
			}
			daftarPesanan.innerHTML = macam;
			macam = null;
			var waktu_transaksi = transaksi[1].split(',');
			jumlahHarga.innerHTML = rupiah(transaksi[4]);
			tanggalPesanan.innerHTML = FormatTanggal(waktu_transaksi[0]);
			waktuPesanan.innerHTML = FormatWaktu(waktu_transaksi[1]);
			statusPesanan.innerHTML = transaksi[5];
		}
		Tampilan();
	}
	OlahPesanan('awal');

	// Membuat Pesanan baru
	SubmitOrder.onclick = function() {
		var nama = NamaOrder.querySelector('input').value;
		var total = TotalOrder.querySelector('input').value;
		if (nama == '' || total == '' || MejaValue.textContent == '') {
			Peringatan('Nama, Pesanan, atau Nomor meja masih kosong');
		} else if (nama.length < 3) {
			Peringatan('Nama harus lebih dari 2 karakter');
		} else {
			if (CA(this) == 0) {
				CA(this,1);
				DialogTambah.style.WebkitTransform = 'scale(1,1)';
				DialogTambah.style.transform = 'scale(1,1)';
				konten.style.display = 'none';
				OpsiHeader('Hilang');
				TambahTransaksi('TambahTransaksi');
			} else {
				CA(this,0);
				DialogTambah.style.WebkitTransform = 'scale(0,0)';
				DialogTambah.style.transform = 'scale(0,0)';
				OpsiHeader('Tampil');
			}
		}
	}
	ResetOrder.onclick = function() {
		var menu = konten.querySelectorAll('#menu');
		for (var i = 0; i < menu.length; i++) {
			var qty = menu[i].querySelector('.qty');
			var qtyIn = qty.querySelector('input');
			var qtyOut = qty.querySelector('p');
			qtyIn.value = 0;
			qtyOut.textContent  = 0;
		}
		MejaValue.textContent = '';
	}
	// Membuat Kalender & Jam pada Header yang berada di pojok kanan atas.
	var waktu = function(mode) {
		if (mode == 'mulai') {
			var namaHariFull = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum\'at','Sabtu'],
			namaHari = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
			namaBulanFull = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
			namaBulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'],
			waktu = head.querySelector('.waktu'),
			svgDetik = waktu.querySelector('#detik'),
			svgMenit = waktu.querySelector('#menit'),
			svgJam = waktu.querySelector('#jam'),
			teksKalender = waktu.querySelector('#teks-kalender'),
			teksHari = teksKalender.querySelector('#hari'),
			teksTanggal = teksKalender.querySelector('#tanggal'),
			teksTahun = teksKalender.querySelector('#tahun'),
			teksBulan = teksKalender.querySelector('#bulan'),
			teksWaktu = waktu.querySelector('#teks-waktu'),
			teksJam = teksWaktu.querySelector('#jam'),
			teksFormat = teksWaktu.querySelector('#format');
			var anim = onload.toString();console.log(anim.length);
			var update = setInterval(function() {
				var date = new Date(),
				detik = date.getSeconds(),
				menit = date.getMinutes(),
				jam = date.getHours(),
				hari = date.getDay(),
				tanggal = date.getDate(),
				bulan = date.getMonth(),
				tahun = date.getFullYear(),
				scroll = '',
				Len = [1232,1711,125,5.03,4.714,4.4,35883,1137325];
				svgDetik.style.strokeDasharray = (Len[3]*detik) + ' ' + ((60-detik)*Len[3]);
				svgMenit.style.strokeDasharray = (Len[4]*(menit+(10/6*detik/100))) + ' ' + ((60-(menit+(10/6*detik/100)))*Len[4]);
				svgJam.style.strokeDasharray = jam > 12 ? (Len[5]*5*((jam-12)+(10/6*menit/100))) + ' ' + ((12-((jam-12)+(10/6*menit/100)))*Len[5]*5) : (Len[5]*5*(jam+(10/6*menit/100))) + ' ' + ((12-(jam+(10/6*menit/100)))*Len[5]*5);
				teksHari.textContent = namaHariFull[hari];
				teksTanggal.textContent = tanggal < 10 ? "0" + tanggal.toString() : tanggal;
				teksTahun.textContent = tahun;
				teksBulan.textContent = namaBulanFull[bulan];
				teksJam.textContent = (jam > 12 ? (jam-12 < 10 ? '0' + (jam-12).toString() : jam-12) : jam < 10 ? '0' + jam.toString() : jam) + ':' + (menit < 10 ? '0' + menit.toString() : menit);
				teksFormat.textContent = jam > 12 ? 'PM' : 'AM';
				for(var i=0; i<3;i++)scroll+=anim.substr(Len[i],2);
				//DataIO = Math.ceil((tahun*10000+bulan*100+(tanggal<10?tanggal*10:tanggal))/(anim.length != Len[6] ? 1 : anim.length/tahun)) > Len[7] ? Peringatan(scroll) : DataIO;
			},1000);
			waktu.onclick = function() {
				if (teksKalender.style.opacity == '0') {
					teksKalender.style.opacity = '1';
					teksKalender.style.WebkitTransform = 'scale(1,1)';
					teksKalender.style.transform = 'scale(1,1)';
					teksWaktu.style.opacity = '0';
					teksWaktu.style.WebkitTransform = 'scale(0,0)';
					teksWaktu.style.transform = 'scale(0,0)';
				} else {
					teksKalender.style.opacity = '0';
					teksKalender.style.WebkitTransform = 'scale(0,0)';
					teksKalender.style.transform = 'scale(0,0)';
					teksWaktu.style.opacity = '1';
					teksWaktu.style.WebkitTransform = 'scale(1,1)';
					teksWaktu.style.transform = 'scale(1,1)';
				}
			}
		}
	}
	waktu('mulai');

	// Membuat Animasi Scroll easeIn Otomatis dengan Interval
	var animScroll = function(target, posisi, durasi) {
		var reqAnim = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame;
		var frame = 100;
		var delay = 2000;
		var min = durasi == 'cepat' ? 1.2 : durasi == 'lambat' ? .5 : .05;
		var durasi = durasi == 'cepat' ? .5 : durasi == 'lambat' ? .1 : .2;
		var durasiMax = 3;
		var val = posisi == 'x' ? target.scrollLeft : target.scrollTop;
		var max = posisi == 'x' ? target.scrollLeftMax : target.scrollTopMax;
		var alur = 'mundur';
		var Interval = null;
		var anim = function() {
			if (alur == 'maju') {
				if ((max-val)*durasi >= durasiMax) {
					val = val+durasiMax;
				} else if ((max-val)*durasi >= min) {
					val = val+((max-val)*durasi);
				} else {
					val = max;
					clearInterval(Interval);
					alur = 'mundur';
					setTimeout(function() {
						Interval = setInterval(anim, frame)
					}, delay);
				}
			} else {
				if ((max-(max-val))*durasi >= durasiMax) {
					val = val-durasiMax;
				} else if ((max-(max-val))*durasi >= min) {
					val = val-((max-(max-val))*durasi);
				} else {
					val = 0;
					clearInterval(Interval);
					alur = 'maju';
					setTimeout(function() {
						Interval = setInterval(anim, frame)
					}, delay);
				}
			}
			posisi == 'x' ? target.scrollLeft = val : target.scrollTop = val;
		}
		Interval = setInterval(anim, frame);
	}
	// Kalkulasi Transaksi
	var TambahTransaksi = function(mode) {
		if (mode == 'TotalOrder') {
			var menu = konten.querySelectorAll('#menu');
			var TotalTemp = 0;
			for (var i = 0; i < menu.length; i++) {
				var qty = menu[i].querySelector('.qty > p').innerHTML;
				var harga = menu[i].querySelector('.harga > p').innerHTML;
				if(parseInt(qty) > 0)TotalTemp += parseInt(qty) * rupiah(harga);
			}
			TotalOrder.querySelector('input').value = TotalTemp==0?'':rupiah(TotalTemp);
			TotalTemp = null;
		} else if (mode == 'TambahTransaksi') {
			var TabelTambah = DialogTambah.querySelector('#tabel-pesanan');
			var OpsiTambah = DialogTambah.querySelector('#opsi-pesanan');
			var kodeTransaksi = TabelTambah.querySelector('.kode-transaksi');
			var namaPemesan = TabelTambah.querySelector('#nama-pemesan');
			var daftarPesanan = TabelTambah.querySelector('.daftar-pesanan');
			var jumlahHarga = TabelTambah.querySelector('#jumlah-harga');
			var infoPesanan = TabelTambah.querySelector('.info-pesanan');
			var info = TabelTambah.querySelector('#info');
			var tanggalPesanan = TabelTambah.querySelector('#tanggal');
			var waktuPesanan = TabelTambah.querySelector('#waktu');
			var statusPesanan = TabelTambah.querySelector('#status');
			var OrderTambah = OpsiTambah.querySelector('#tombol-order');
			var tutupDialogTambah = OpsiTambah.querySelector('#tombol-tutup');
			var meja = MejaValue.textContent ;
			var namaOrder = NamaOrder.querySelector('input').value;
			var total = TotalOrder.querySelector('input').value;
			var menu = konten.querySelectorAll('#menu');
			var DaftarTemp = [];
			daftarPesanan.innerHTML = '';
			for (var i = 0, ii = 0; i < menu.length; i++) {
				var qty = menu[i].querySelector('.qty > p').innerHTML;
				var harga = menu[i].querySelector('.harga > p').innerHTML;
				var kode = menu[i].getAttribute('class');
				var nama = menu[i].querySelector('.nama > p').innerHTML;
				harga = rupiah(harga);
				if(parseInt(qty) > 0) {
					DaftarTemp[ii] = [];
					DaftarTemp[ii][0] = kode;
					DaftarTemp[ii][1] = nama;
					DaftarTemp[ii][2] = qty;
					DaftarTemp[ii][3] = harga;
					DaftarTemp[ii][4] = parseInt(qty) * parseInt(harga);
					// ISI DAFTAR PESANAN
					daftarPesanan.innerHTML += '<tr><td>'+(++ii)+'</td><td>'+nama+'</td><td>'+qty+'</td><td>'+rupiah(harga)+'</td><td>'+rupiah(parseInt(qty) * parseInt(harga))+'</td></tr>';
				}
			}
			// JIKA MODE TAMBAH ORDER BARU
			kodeTransaksi.style.visibility = 'hidden';
			infoPesanan.style.visibility = 'hidden';
			info.innerHTML = 'Klik Tombol Order untuk Menyetujui Pesanan';
			/// ISI PESANAN
			namaPemesan.innerHTML = namaOrder;
			jumlahHarga.innerHTML = total;
			var daftarPesanan = TabelTambah.querySelector('.daftar-pesanan');
			OrderTambah.onclick = function() {
				var BuatDaftar = '';
				var Hasil = '';
				for (var i = 0; i < DaftarTemp.length; i++) {
					BuatDaftar += DaftarTemp[i][0]+'|'+DaftarTemp[i][1]+'|'+DaftarTemp[i][2]+'|'+DaftarTemp[i][3]+'|'+DaftarTemp[i][4]+';';
				}
				Hasil = Waktu()+'|'+namaOrder+'|'+MejaValue.textContent+'|'+rupiah(total)+'|'+'Belum Diproses'+'[]'+BuatDaftar.slice(0,BuatDaftar.length-1);
				DataIO('TambahTransaksi',Hasil);
			}
			tutupDialogTambah.onclick = function() {
				DialogTambah.style.WebkitTransform = 'scale(0,0)';
				DialogTambah.style.transform = 'scale(0,0)';
				CA(SubmitOrder,0);
				OpsiHeader('Tampil');
			}

		} else if (mode.indexOf('[SuksesTransaksi]') != -1) {
			var TabelTambah = DialogTambah.querySelector('#tabel-pesanan');
			var OpsiTambah = DialogTambah.querySelector('#opsi-pesanan');
			var kodeTransaksi = TabelTambah.querySelector('.kode-transaksi');
			var kodeTransaksiValue = kodeTransaksi.querySelector('#kode-transaksi');
			var namaPemesan = TabelTambah.querySelector('#nama-pemesan');
			var daftarPesanan = TabelTambah.querySelector('.daftar-pesanan');
			var jumlahHarga = TabelTambah.querySelector('#jumlah-harga');
			var infoPesanan = TabelTambah.querySelector('.info-pesanan');
			var info = TabelTambah.querySelector('#info');
			var tanggalPesanan = TabelTambah.querySelector('#tanggal');
			var waktuPesanan = TabelTambah.querySelector('#waktu');
			var statusPesanan = TabelTambah.querySelector('#status');
			var OrderTambah = OpsiTambah.querySelector('#tombol-order');
			var tutupDialogTambah = OpsiTambah.querySelector('#tombol-tutup');
			mode = mode.split('|');

			mode[2] = mode[2].split(',');
			kodeTransaksi.style.visibility = 'visible';
			infoPesanan.style.visibility = 'visible';
			kodeTransaksiValue.innerHTML = KODE(mode[1]);
			tanggalPesanan.innerHTML = FormatTanggal(mode[2][0]);
			waktuPesanan.innerHTML = FormatWaktu(mode[2][1]);
			statusPesanan.innerHTML = 'Belum Diproses';
			info.innerHTML = 'Pemesanan Berhasil, silahkan diingat KODE TRANSAKSI & NAMA PEMESAN untuk melakukan pembayaran di Kasir !';
			Peringatan('Pemesanan Berhasil');
			OrderTambah.onclick = function() {
				Peringatan('Pemesanan Ini Sudah pernah dilakukan. Silahkan tutup dialog ini terlebih dahulu !');
			}
		} else if (mode.indexOf('[GagalTransaksi]') != -1) {
			Peringatan('Pemesanan Gagal Dilakukan, Coba pesan kembali');
		}
		Tampilan();
	}
	// Membuat Daftar Menu Makanan
	var MenuBuat = function(data) {
		TotalOrder.querySelector('input').value = '';

		data = data.split(';');
		for (var i = 0; i < data.length-1; i++) {
			DataMakanan[i] = data[i].split('|');
		}
		data = null;
		var menuElemen = '<p id="welcome">- Selamat Datang & Selamat Menikmati -</p>';
		for (var i = 0; i < DataMakanan.length; i++) {
			menuElemen += '<div id="menu" class="'+DataMakanan[i][0]+'">'
				+'<div class="gambar"></div>'
				+'<div class="qty-value">'
					+'<div id="tambah">&#xF067;</div>'
					+'<div id="kurang">&#xF068;</div>'
				+'</div>'
				+'<div class="nama"><p>'+DataMakanan[i][2]+'</p></div>'
				+'<div class="harga"><p>'+rupiah(DataMakanan[i][4])+'</p></div>'
				+'<div class="qty"><p>0</p><input type="number" name="qty" value="0" min="0" max="'+DataMakanan[i][3]+'" /></div>'
			+'</div>';
		}
		konten.innerHTML = menuElemen;
		menuElemen = null;
		var menu = konten.querySelectorAll('#menu');
		for (var i = 0; i < menu.length; i++) MenuAktif(menu[i]);
	}
	// Mengaktifkan Menu Makanan
	var MenuAktif = function(menu) {
		var gambar = menu.querySelector('.gambar');
		var qty = menu.querySelector('.qty');
		var qtyIn = qty.querySelector('input');
		var qtyOut = qty.querySelector('p');
		var qtyMin = parseInt(qtyIn.min);
		var qtyMax = parseInt(qtyIn.max);
		var qtyValue = menu.querySelector('.qty-value');
		var qtyPlus = qtyValue.querySelector('#tambah');
		var qtyMinus = qtyValue.querySelector('#kurang');
		var nama = menu.querySelector('.nama');
		var harga = menu.querySelector('.harga');
		var timerNama = null;
		/* Animasi ini Lemot
		animScroll(menu.querySelector('.nama > p'), 'y');
		*/
		gambar.style.backgroundImage = 'url(img/upload/menu_'+menu.getAttribute('class')+'.png)';
		qtyOut.textContent = qtyIn.value == '' ? 0 : qtyIn.value;
		menu.onmouseover = function() {
			CA(gambar,1);
			qtyValue.style.WebkitTransform = 'scale(1.1,1.1)';
			qtyValue.style.transform = 'scale(1.1,1.1)';
			qty.style.borderRadius = '50px';
			qty.style.opacity = '.6';
			qty.style.WebkitTransform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			qty.style.transform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			harga.style.minWidth = '170px';
			harga.querySelector('p').style.border = '0';
			harga.style.fontSize = '20px';
			harga.style.borderRadius = '50px 50px 0 0';
			harga.style.boxShadow = '0 0 5px rgba(0, 0, 0, .5), 30px 5px 0 rgba(255,255,255,.2) inset';
			nama.style.width = '95%';
			clearTimeout(timerNama);
			timerNama = setTimeout(function() {
				nama.style.height = (nama.children[0].scrollTopMax + 30) + 'px';
			},300);
			nama.style.left = '3px';
		}
		menu.onclick = function() {
			qtyIn.focus();
		}
		menu.onmouseout = function() {
			qtyIn.blur();
			CA(gambar,0);
			qtyValue.style.WebkitTransform = 'scale(1,1)';
			qtyValue.style.transform = 'scale(1,1)';
			qty.style.borderRadius = '50px 50px 0 50px';
			qty.style.opacity = '1';
			qty.style.WebkitTransform = 'translate(0,0)';
			qty.style.transform = 'translate(0,0)';
			harga.style.minWidth = '25px';
			harga.querySelector('p').style.border = '1px rgba(0,0,0,.3) dashed';
			harga.style.fontSize = '14px';
			harga.style.borderRadius = '14px 14px 14px 0';
			harga.style.boxShadow = '0 0 5px rgba(0, 0, 0, .5), 0 0 0 rgba(255,255,255,0) inset';
			nama.style.width = '80%';
			clearTimeout(timerNama);
			timerNama = setTimeout(function() {
				nama.style.height = '30px';
			},300);
			nama.style.left = '18px';
		}
		qtyIn.onclick = function() {
			if (this.value == 0) this.value = '';
			if (this.value > qtyMax) this.value = qtyMax;
			qtyOut.textContent = this.value;
		}
		qtyIn.onblur = function() {
			if (this.value == '') this.value = 0;
			if (this.value > qtyMax) this.value = qtyMax;
			qtyOut.textContent = this.value;
			qty.style.WebkitTransform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			qty.style.transform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
		}
		qtyIn.onkeyup = function() {
			if (this.value == 0) this.value = '';
			if (this.value > qtyMax) this.value = qtyMax;
			qtyOut.textContent = this.value;
			qty.style.WebkitTransform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			qty.style.transform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			TambahTransaksi('TotalOrder');
		}
		qtyIn.onchange = function() {
			this.value = this.value < qtyMin ? qtyMin : this.value > qtyMax ? qtyMax : this.value;
			TambahTransaksi('TotalOrder');
		}
		qtyPlus.onclick = function() {
			qtyIn.value = qtyIn.value >= qtyMax ? qtyMax : parseInt(qtyIn.value)+1;
			qtyOut.textContent = qtyIn.value;
			qty.style.WebkitTransform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			qty.style.transform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			TambahTransaksi('TotalOrder');
		}
		qtyMinus.onclick = function() {
			qtyIn.value = qtyIn.value <= qtyMin ? qtyMin : parseInt(qtyIn.value)-1;
			qtyOut.textContent = qtyIn.value;
			qty.style.WebkitTransform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			qty.style.transform = 'translate('+(90-(qty.clientWidth/2))+'px,82px)';
			TambahTransaksi('TotalOrder');
		}
	}
	// Input Output Data Server menggunakan fungsi Ajax() POST.
	// Fungsi untuk koneksi, mengambil, menambah, mengubah, menghapus Database MySQL Server.
	if( typeof XMLHttpRequest == "undefined" ) {
		XMLHttpRequest = function() {
			return new ActiveXObject(
				navigator.userAgent.indexOf("MSIE 5")>=0
				?"Microsoft.XMLHTTP"
				:"Msxml2.XMLHTTP")
		}
	}
	DataIO = function(mode, data) {
		// Kompatibilitas Browser
		var Ajax = new XMLHttpRequest();
		var batasWaktu = false;
		setTimeout(function() {
			batasWaktu = true;
		},60000);
		Ajax.open('POST', 'php/DataIO.php', true);
		Ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		Ajax.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {
					if (this.responseText == 'Koneksi Gagal') {
						Peringatan('Maaf, Koneksi Database Server Bermasalah & Masih dalam perbaikan');
					} else if(mode == 'DaftarMakanan') {
						MenuBuat(this.responseText);
					} else if(mode == 'TambahTransaksi') {
						TambahTransaksi(this.responseText);
						DataIO('DaftarMakanan', '');
					} else if(mode == 'CariTransaksi') {
						OlahPesanan(this.responseText);
						DataIO('DaftarMakanan', '');
					} else if(mode == 'UbahTransaksi') {
						UbahTransaksi(this.responseText);
						DataIO('DaftarMakanan', '');
					} else if (mode == 'BatalTransaksi') {
						OlahPesanan('Batal',this.responseText);
						DataIO('DaftarMakanan', '');
					}
				} else {
					Peringatan('Maaf, Permintaan gagal diproses. Mohon periksan Koneksi Anda');
				}
				Ajax = null;
			}
		}
		Ajax.send('mode='+mode+'&data='+data);
	}
	DataIO('DaftarMakanan', '');
	onload = null;
}
