/****************************************************************************************************
| SEMUA KODE DI SINI DIBUAT SECARA MANUAL TANPA ADANYA PLUGIN ATAUPUN TEMPLATE
|****************************************************************************************************
| Fitur-fitur yang tersedia antara lain :
| >>> Sistem Konversi Mata Uang Indonesia, Format Waktu, Format Tanggal, Kode Transaksi, dll.
| >>> Konversi dari/ke Hexadesimal uInt8 bit.
| >>> Sistem Encoding & Decoding.
| >>> Sistem Kalender perhari, perbulan, & pertahun
| >>> In-Out Data Server menggunakan fungsi Ajax() POST, jadi tidak perlu Reload Web berulang-ulang
|     dan informasi data yang dikirim/diterima tidak terlihat oleh Host.
| >>> Sistem Login menggunakan Cookie yang telah di-Enkripsi.
| >>> Gambar yang diupload mendukung semua file gambar (tergantung Browser),
|     diantaranya: *.jpe*.jpg*.jpeg*.gif*.png*.bmp*.ico*.svg*.svgz*.tif*.tiff*.ai*.drw*.pct*.psp*.xcf*.psd*.raw,
|     telah di-Convert ke ekstensi: *.png, ditambah Watermark, dimensi: 200x200 px, size: kurang lebih 120kb,
|     jadi tidak usah kuatir dengan ukuran gambar yang terlalu besar.
|****************************************************************************************************/
//Jika Window selesai di Load.
onload = function() {
	// _$() sebagai CodeSnippets untuk menggantikan document.querySelector().
	function _$(target) {return document.querySelector(target)}
	//Menghilangkan seleksi teks selain type 'text' atau 'textarea'.
	//----- Tidak Mendukung Google Chrome ----
	function AntiCopas() {
		var Seleksi = getSelection();
		if (Seleksi.rangeCount != 0)Seleksi.removeAllRanges();
	}
	var CopasTiming	= null;
	onselectstart = function(Event) {
		console.log(Event.target);
		Event.target != 'text' || Event.target != 'textarea' ? CopasTiming = setInterval(AntiCopas,10) : clearInterval(CopasTiming);
	}
	onmouseup = function() {
		clearInterval(CopasTiming);
		AntiCopas();
	}
	// Konversi ke Hexadesimal uInt8 bit
	function hex(data, mode) {
		var strlen = function(x) {return x.length},
		strpos = function(x,y) {return x.indexOf(y)},
		substr = function(x,y,z) {return x.substr(y,z)},
		a = 256, b = strlen(data), c = '0123456789ABCDEF', d = '\\x', e = 0, f = 0, g = [], h = '', j = '';
		for( var i = 0; i < a; i++ ) {g[i] = c[e] + c[f++];if( f == c.length ) {e++;f=0}}
		for( var i = 0; i < a; i++ )h += eval( '"' + d + g[i] + '"' );
		for( var i = 0; i < b; i++ )mode == 1?j += g[strpos( h, data[i] )]:j += eval( '"' + d + substr( data, i++, 2 ) + '"' );
		strlen=strpos=substr=data=mode=a=b=c=d=e=f=g=h=null;
		return j
	}
	// Sistem Encode & Decode
	function Enc(x,_) {
		var a = '~!@#$%^&*()_+`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? ',
		b=null, c=x.length, d='', e=a[13], f='', _=hex(_);
		for (var i = 0; i < c; i++) {
			if (f==='?') {
				if (x[0]==e) {
					if(i !== c-1)b=a[parseInt(x.substr(++i,2))];
				}else{
					b=a.indexOf(x[i]).toString();
					if(b.length < 2)b='0'+b;
				};
				d+=b;
				f='';
			} else {
				if (x[0]==e) {
					if(i !== c-1)b=_[parseInt(x.substr(++i,2))];
				}else{
					b=_.indexOf(x[i]).toString();
					if(b.length < 2)b='0'+b;
				};
				d+=b;
				f='?';
			}
		};
		x[0]!==e?d=e+d:d=d.substr(0,d.length-1);
		if(x == '')d='';
		_=x=a=b=c=e=f=null;
		return d
	};
	// Kunci Encode & Decode (Random)
	function EncKey() {
		var a = 'er$%xcv!@12\'zyuiob./s^&*t~df=qw#()_+`p[]\\a345;lnm,g67890-hjkASDFL:"Z{}|XCVWJKOPBQUIGHM<>NERT Y?',
		b = Math.floor((Math.random()*(a.length-1))+1);
		return hex(a.substr(b) + a.substr(0, b),1)
	};
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
	// Konversi Mata Uang Indonesia
	function rupiah(data) {
		if (data.toString().indexOf('Rp. ') == -1) {
			var a = '';
			data = Math.round(data).toString();
			for (var i = 0; i < data.length; i++) {
				if((data.length-(i+1))%3 != 0 || i+1 == data.length){
					a += data.slice(i,i+1);
				} else {
					a += data.slice(i,i+1)+'.';
				}
			}
			return a != 'NaN' ? 'Rp. '+a+',-' : '';
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
	// Tanggal ke Integer
	function tgl2int(data) {
		data = data.split('-');
		return parseInt(data[0]+data[1]+data[2]);
	}
	// String ke *
	function str2star(data) {
		for (var i = 0; i < data.length; i++) data = data.substr(0,i-1)+"*"+data.substr(i);
		return data;
	}
	// Konversi Tanggal
	function FormatTanggal(data) {
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
			data[1] = data[1] < 10 ? '0'+data[1].toString() : data[1];
			return data[3]+'-'+bulan+'-'+data[1];
		}
	}
	// Format Waktu 12 atau 24 jam
	function FormatWaktu(data) {
		if (data.indexOf('AM') != -1 || data.indexOf('PM') != -1) {
			data = data.split(' ');
			data[0] = data[0].split(':');
			data[0][0] = data[1]=='PM'?parseInt(data[0][0])+12:data[0][0];
			data[0][0] = data[0][0] < 10 ? '0'+data[0][0].toString() : data[0][0];
			return data[0][0]+':'+data[0][1]+':'+data[0][2];
		} else {
			data = data.split(':');
			var a = data[0] > 12 ? 'PM' : 'AM';
			data[0] = data[0] > 12 ? data[0]-12 : parseInt(data[0]);
			data[0] = data[0] < 10 ? '0'+data[0].toString() : data[0];
			return data[0]+':'+data[1]+':'+data[2]+' '+a;
		}
	}
	// Cek/Set Atribute Element Aktif atau tidak.
	function CA(target, mode) {
		if (mode == 1) {
			target.setAttribute('aktif',0);
		} else if(mode == 0) {
			target.removeAttribute('aktif');
		} else {
			return target.getAttribute('aktif') != null ? 1 : 0;
		}
	}

	/****************************************************************
	|  VARIABEL
	|****************************************************************/

	//  TOMBOL HEADER  ///////////////////////////////////////////
	var tDashboard = document.querySelector('#header > .menu > #dashboard'),
	tMenu = document.querySelector('#header > .menu > #menu'),
	tTransaksi = document.querySelector('#header > .menu > #transaksi'),
	tLaporan = document.querySelector('#header > .menu > #laporan'),
	tUser = document.querySelector('#header > .menu > #user'),
	tKeluar = document.querySelector('#header > .menu > #keluar');
	//  DASHBOARD  ////////////////////////////////////////////////
	var Dashboard = _$('#Dashboard'),
	BgAnim = Dashboard.querySelector('#background'),
	Login = Dashboard.querySelector('#login'),
	Welcome = Dashboard.querySelector('#welcome'),
	PesanBelum = Welcome.querySelector('#pesanan-belum'),
	TotalMenu = Welcome.querySelector('#total-menu'),
	TotalTransaksi = Welcome.querySelector('#total-transaksi'),
	TotalPendapatan = Welcome.querySelector('#total-pendapatan'),
	tLogin = Dashboard.querySelectorAll('#login > input'),
	tLoginNama = tLogin[0],
	tLoginPass = tLogin[1],
	tLoginLogin = tLogin[2],
	tLoginReg = tLogin[3];
	//  MENU  ///////////////////////////////////////////////////////
	var Menu = _$('#Menu'),
	TabelMenu = Menu.querySelector('.tabel-menu'),
	DaftarMakanan = TabelMenu.querySelector('.daftar-makanan'),
	TambahMenu = Menu.querySelector('#tambah-menu'),
	tTambahMenu = Menu.querySelector('#tombol-tambah'),
	inputTambahMenu = Menu.querySelectorAll('#tambah-menu > input'),
	inputTambahGambar = Menu.querySelector('#tambah-menu > img'),
	inputTambahCanvas = Menu.querySelector('#tambah-menu > canvas'),
	inputTmGambar = inputTambahMenu[0],
	inputTmNama = inputTambahMenu[1],
	inputTmQty = inputTambahMenu[2],
	inputTmHarga = inputTambahMenu[3],
	inputTmSelesai = inputTambahMenu[4],
	inputTmBatal = inputTambahMenu[5],
	UbahMenu = Menu.querySelector('#ubah-menu'),
	inputUbahMenu = Menu.querySelectorAll('#ubah-menu > input'),
	inputUbahGambar = Menu.querySelector('#ubah-menu > img'),
	inputUbahCanvas = Menu.querySelector('#ubah-menu > canvas'),
	inputUmGambar = inputUbahMenu[0],
	inputUmNama = inputUbahMenu[1],
	inputUmQty = inputUbahMenu[2],
	inputUmHarga = inputUbahMenu[3],
	inputUmSelesai = inputUbahMenu[4],
	inputUmBatal = inputUbahMenu[5];
	//  TRANSAKSI  ///////////////////////////////////////////////////
	var Transaksi = _$('#Transaksi'),
	TabelTransaksi = Transaksi.querySelector('.tabel-transaksi'),
	DaftarTransaksi = TabelTransaksi.querySelector('.daftar-transaksi'),
	TabelDetail = Transaksi.querySelector('.tabel-detail'),
	DetailNama = TabelDetail.querySelector('#nama-pembeli'),
	DetailKode = TabelDetail.querySelector('#kode-transaksi'),
	DetailTransaksi = TabelDetail.querySelector('.detail-transaksi'),
	DetailJumlah = TabelDetail.querySelector('#jumlah-harga'),
	DetailTanggal = TabelDetail.querySelector('#Tanggal'),
	DetailWaktu = TabelDetail.querySelector('#Waktu'),
	DetailStatus = TabelDetail.querySelector('#Status'),
	DetailCetak = TabelDetail.querySelector('#Cetak'),
	DetailTutup = TabelDetail.querySelector('#Tutup'),
	UbahStatus = Transaksi.querySelector('#ubah-status'),
	UbahStatusValue = Transaksi.querySelector('#ubah-status > select'),
	UbahStatusSelesai = Transaksi.querySelector('#ubah-status > #selesai'),
	UbahStatusBatal = Transaksi.querySelector('#ubah-status > #batal');
	//  LAPORAN  //////////////////////////////////////////////////////
	var Laporan = _$('#Laporan'),
	LaporanCetak = Laporan.querySelectorAll('input'),
	LcMulai = LaporanCetak[0],
	LcSampai = LaporanCetak[1],
	LcCetak = LaporanCetak[2],
	LTabelTransaksi = Laporan.querySelector('.tabel-transaksi'),
	LDaftarTransaksi = LTabelTransaksi.querySelector('.daftar-transaksi'),
	LTotalTransaksi = LTabelTransaksi.querySelector('#total');
	//  PENGGUNA  /////////////////////////////////////////////////////
	var User = _$('#User');
	Struktur = User.querySelector('#struktur-user'),
	TabelUser = User.querySelector('#tabel-user'),
	DaftarUser = TabelUser.querySelector('.daftar-user'),
	TambahUser = User.querySelector('#tambah-user'),
	tTambahUser = User.querySelector('#tombol-tambah'),
	inputTambahUser = User.querySelectorAll('#tambah-user > input'),
	inputTambahUserGambar = User.querySelector('#tambah-user > img'),
	inputTambahUserCanvas = User.querySelector('#tambah-user > canvas'),
	inputTuGambar = inputTambahUser[0],
	inputTuNama = inputTambahUser[1],
	inputTuPass = inputTambahUser[2],
	inputTuSelesai = inputTambahUser[3],
	inputTuBatal = inputTambahUser[4],
	selectTuLevel = User.querySelector('#tambah-user > select'),
	UbahUser = User.querySelector('#ubah-user'),
	inputUbahUser = User.querySelectorAll('#ubah-user > input'),
	inputUbahUserGambar = User.querySelector('#ubah-user > img'),
	inputUbahUserCanvas = User.querySelector('#ubah-user > canvas'),
	inputUuGambar = inputUbahUser[0],
	inputUuNama = inputUbahUser[1],
	inputUuPass = inputUbahUser[2],
	inputUuSelesai = inputUbahUser[3],
	inputUuBatal = inputUbahUser[4],
	selectUuLevel = User.querySelector('#ubah-user > select');
	//  PESAN  /////////////////////////////////////////////////////////
	var Alert = _$('#Alert'),
	AlertIsi = Alert.querySelector('p');
	//  DATABASE  /////////////////////////////////////////////////////
	var DBMakanan = [],
	DBPesanan = [],
	DBTransaksi = [],
	DBUser = [];
	// MODE ///////////////////////////////////////////////////////////
	var Mode = '', Opsi = '';

	/****************************************************************
	|  INISIALISASI & UPDATE DATABASE
	|****************************************************************/
	// Cek tanggal Transaksi
	function CekDBTransaksi(mode, tgl) {
		var cek = false;
		for (var i = 0; i < DBTransaksi.length; i++) {
			waktu = DBTransaksi[i][1].split(',');
			if (mode == 'hari' && tgl == waktu[0]) cek = true;
			if (mode == 'bulan' && tgl == waktu[0].substr(0,7)) cek = true;
			if (mode == 'tahun' && tgl == waktu[0].substr(0,4)) cek = true;
			if (cek) i = DBTransaksi.length;
		};
		return cek;
	}
	// Update Database Makanan, Pesanan, Transaksi & User
	function _AmbilDB(data) {
		data = data.split('#');
		data[0] = data[0].split(';');
		data[1] = data[1].split(';');
		data[2] = data[2].split(';');
		data[3] = data[3].split(';');
		for (var i = 0; i < data[0].length-1; i++) {
			DBMakanan[i] = data[0][i];
		}
		for (var i = 0; i < data[1].length-1; i++) {
			DBPesanan[i] = data[1][i];
		}
		for (var i = 0; i < data[2].length-1; i++) {
			DBTransaksi[i] = data[2][i];
		}
		for (var i = 0; i < data[3].length-1; i++) {
			DBUser[i] = data[3][i];
		}
		for (var i = 0; i < DBMakanan.length; i++) {
			DBMakanan[i] = DBMakanan[i].split('|');
		}
		for (var i = 0; i < DBPesanan.length; i++) {
			DBPesanan[i] = DBPesanan[i].split('|');
		}
		for (var i = 0; i < DBTransaksi.length; i++) {
			DBTransaksi[i] = DBTransaksi[i].split('|');
		}
		for (var i = 0; i < DBUser.length; i++) {
			DBUser[i] = DBUser[i].split('|');
		}
		data = null;
		_UpdateDashboard();
		_UpdateMenu();
		_UpdateTransaksi();
		_UpdateUser();
	}
	// Update Tampilan Dashboard
	function _UpdateDashboard() {
		var PB = 0, TM = 0, TT = 0, TP = 0;
		for (var i = 0; i < DBTransaksi.length; i++) {
			if(DBTransaksi[i][5] == 'Belum Diproses'){
				PB++;
			} else if (DBTransaksi[i][5] == 'Lunas') {
				TP += parseInt(DBTransaksi[i][4]);
			}
		}
		PesanBelum.innerHTML = PB;
		TotalMenu.innerHTML = DBMakanan.length;
		TotalTransaksi.innerHTML = DBTransaksi.length;
		TotalPendapatan.innerHTML = rupiah(TP);
	}
	// Update Tabel DaftarMenu
	function _UpdateMenu() {
		var DM = '';
		for (var i = 0; i < DBMakanan.length; i++) {
			DM += '<tr>'+
				'<td>'+DBMakanan[i][0]+'</td>'+
				'<td>'+DBMakanan[i][2]+'</td>'+
				'<td>'+DBMakanan[i][3]+'</td>'+
				'<td>'+rupiah(DBMakanan[i][4])+'</td>'+
				'<td><button id="ubah" nomer="'+i+'">Ubah</button><button id="hapus" nomer="'+i+'">Hapus</button></td>'+
			'</tr>';
		}
		DaftarMakanan.innerHTML = DM;
		DM = null;
		var btnUbah = DaftarMakanan.querySelectorAll('#ubah');
		var btnHapus = DaftarMakanan.querySelectorAll('#hapus');
		for (var i = 0; i < DBMakanan.length; i++) {
			btnUbah[i].onclick = function() {
				var ii = parseInt(this.getAttribute('nomer'));
				inputUmNama.setAttribute('kode', DBMakanan[ii][0]);
				inputUbahGambar.src = 'img/upload/menu_'+DBMakanan[ii][0]+'.png';
				inputUmNama.value = DBMakanan[ii][2];
				inputUmQty.value = DBMakanan[ii][3];
				inputUmHarga.value = rupiah(DBMakanan[ii][4]);
				Opsi = 'UbahMenu';
				Tampil();
			}
			btnHapus[i].onclick = function() {
				var ii = parseInt(this.getAttribute('nomer'));
				if (confirm('Hapus menu makanan ini ?')) DataIO('HapusMenu',DBMakanan[ii][0]);
			}
		}
	}
	// Update Tabel Transaksi
	function _UpdateTransaksi() {
		var DT = '', LT = '', TP = 0,
		mulai = tgl2int(FormatTanggal(LcMulai.value)),
		sampai = tgl2int(FormatTanggal(LcSampai.value));
		for (var i = 0; i < DBTransaksi.length; i++) {
			var statusHapus = '<button id="hapus" nomer="'+i+'">Hapus</button>',
			waktu = DBTransaksi[i][1].split(',');
			DT += '<tr>'+
				'<td>'+KODE(DBTransaksi[i][0])+'</td>'+
				'<td>'+FormatTanggal(waktu[0])+'</td>'+
				'<td>'+FormatWaktu(waktu[1])+'</td>'+
				'<td>'+DBTransaksi[i][2]+'</td>'+
				'<td>'+DBTransaksi[i][3]+'</td>'+
				'<td>'+rupiah(DBTransaksi[i][4])+'</td>'+
				'<td>'+DBTransaksi[i][5]+'</td>'+
				'<td><button id="detail" nomer="'+i+'">Detail</button><button id="ubah" nomer="'+i+'">Ubah Status</button>'+statusHapus+'</td>'+
			'</tr>';
			if (tgl2int(waktu[0]) >= mulai && tgl2int(waktu[0]) <= sampai) {
				LT += '<tr>'+
					'<td>'+i+'</td>'+
					'<td>'+KODE(DBTransaksi[i][0])+'</td>'+
					'<td>'+FormatTanggal(waktu[0])+'</td>'+
					'<td>'+FormatWaktu(waktu[1])+'</td>'+
					'<td>'+DBTransaksi[i][2]+'</td>'+
					'<td>'+DBTransaksi[i][3]+'</td>'+
					'<td>'+rupiah(DBTransaksi[i][4])+'</td>'+
					'<td>'+DBTransaksi[i][5]+'</td>'+
				'</tr>';
				if (DBTransaksi[i][5] == 'Lunas') TP += parseInt(DBTransaksi[i][4]);
			}
		}
		DaftarTransaksi.innerHTML = DT;
		LDaftarTransaksi.innerHTML = LT;
		LTotalTransaksi.innerHTML = 'Total Pendapatan : '+rupiah(TP);
		DT = null;
		LT = null;
		var btnDetail = DaftarTransaksi.querySelectorAll('#detail');
		var btnUbahStatus = DaftarTransaksi.querySelectorAll('#ubah');
		var btnHapus = DaftarTransaksi.querySelectorAll('#hapus');
		for (var i = 0; i < DBTransaksi.length; i++) {
			btnDetail[i].onclick = function() {
				var ii = parseInt(this.getAttribute('nomer'));
				var tWaktu = DBTransaksi[ii][1].split(',');
				DetailNama.innerHTML = 'NAMA : '+DBTransaksi[ii][2];
				DetailKode.innerHTML = 'KODE TRANSAKSI : '+KODE(DBTransaksi[ii][0]);
				DetailJumlah.innerHTML = rupiah(DBTransaksi[ii][4]);
				DetailTanggal.innerHTML = 'Tanggal : '+FormatTanggal(tWaktu[0]);
				DetailWaktu.innerHTML = 'Pukul : '+FormatWaktu(tWaktu[1]);
				DetailStatus.innerHTML = 'Status : '+DBTransaksi[ii][5];
				DetailTransaksi.setAttribute('nomer', ii);
				_UpdatePesanan();
				Opsi = 'TabelDetail';
				Tampil();
			}
			btnUbahStatus[i].onclick = function() {
				var ii = parseInt(this.getAttribute('nomer'));
				UbahStatusValue.setAttribute('kode', DBTransaksi[ii][0]);
				UbahStatusValue.value = DBTransaksi[ii][5];
				Opsi = 'UbahStatusTransaksi';
				Tampil();
			}
			btnHapus[i].onclick = function() {
				var ii = parseInt(this.getAttribute('nomer'));
				if (confirm('Hapus transaksi ini ?')) DataIO('HapusTransaksi', DBTransaksi[ii][0]);
			}
		}
	}
	// Update Detail Transaksi
	function _UpdatePesanan() {
		var i = DetailTransaksi.getAttribute('nomer');
		var KT = DBTransaksi[i][0];
		var HasilDetail = '';
		for (var ii = 0, iii=1; ii < DBPesanan.length; ii++) {
			if (DBPesanan[ii][0] == KT) {
				HasilDetail += '<tr>'+
					'<td>'+(iii++)+'</td>'+
					'<td>'+DBPesanan[ii][2]+'</td>'+
					'<td>'+DBPesanan[ii][3]+'</td>'+
					'<td>'+rupiah(DBPesanan[ii][4])+'</td>'+
					'<td>'+rupiah(DBPesanan[ii][5])+'</td>'+
				'</tr>';
			}
		}
		DetailTransaksi.innerHTML = HasilDetail;
		HasilDetail =null;
	}
	// Update Tabel DaftarUser
	function _UpdateUser() {
		var DU = '';
		for (var i = 0; i < DBUser.length; i++) {
			DU += '<tr>'+
				'<td>'+DBUser[i][0]+'</td>'+
				'<td>'+DBUser[i][1]+'</td>'+
				'<td>'+str2star(DBUser[i][2])+'</td>'+
				'<td>'+DBUser[i][3]+'</td>'+
				'<td><button id="ubah" nomer="'+i+'">Ubah</button><button id="hapus" nomer="'+i+'">Hapus</button></td>'+
			'</tr>';
		}
		DaftarUser.innerHTML = DU;
		DU = null;
		var btnUbah = DaftarUser.querySelectorAll('#ubah');
		var btnHapus = DaftarUser.querySelectorAll('#hapus');
		for (var i = 0; i < DBUser.length; i++) {
			btnUbah[i].onclick = function() {
				var ii = parseInt(this.getAttribute('nomer'));
				inputUbahUserGambar.src = 'img/upload/user_'+DBUser[ii][0]+'.png';
				inputUuNama.setAttribute('kode', DBUser[ii][0]);
				inputUuNama.value = DBUser[ii][1];
				inputUuPass.value = DBUser[ii][2];
				selectUuLevel.value = DBUser[ii][3];
				Opsi = 'UbahUser';
				Tampil();
			}
			btnHapus[i].onclick = function() {
				var ii = parseInt(this.getAttribute('nomer'));
				if (confirm('Hapus Pengguna ini ?')) DataIO('HapusUser',DBUser[ii][0]);
			}
		}
	}

	//  MODE  ///////////////////////////////////////////////////////
	// Pengatur tampilan konten dan menu
	function Tampil() {
		var Tombol = document.querySelectorAll('#header > .menu > p')
		var Tampilan = document.body.querySelectorAll('div');
		for (var i = 0; i < Tombol.length; i++) {
			CA(Tombol[i],0);
		}
		for (var i = 0; i < Tampilan.length; i++) {
			CA(Tampilan[i],0);
		}
		BgAnim.style.display = Mode == 'Dashboard' ? 'inline-block' : 'none';
		if (Mode == 'Dashboard') {
			CA(Dashboard,1);
			CA(tDashboard,1);
			if (Opsi == 'Login') {
				CA(Login,1);
				CA(Welcome,0);
			} else if (Opsi == 'SudahLogin') {
				CA(Login,0);
				CA(Welcome,1);
			}
		} else if (Mode == 'Menu') {
			CA(Menu,1);
			CA(tMenu,1);
			if (Opsi == 'TabelMenu') {
				CA(TabelMenu,1);
				CA(TambahMenu,0);
				CA(tTambahMenu.parentElement,1);
				CA(UbahMenu,0);
			} else if (Opsi == 'TambahMenu') {
				CA(TabelMenu,0);
				CA(TambahMenu,1);
				CA(tTambahMenu.parentElement,0);
				CA(UbahMenu,0);
			} else if (Opsi == 'UbahMenu') {
				CA(TabelMenu,0);
				CA(TambahMenu,0);
				CA(tTambahMenu.parentElement,1);
				CA(UbahMenu,1);
			}
		} else if (Mode == 'Transaksi') {
			CA(Transaksi,1);
			CA(tTransaksi,1);
			if (Opsi == 'TabelTransaksi') {
				CA(TabelTransaksi,1);
				CA(TabelDetail,0);
				CA(UbahStatus,0);
			} else if (Opsi == "TabelDetail") {
				CA(TabelTransaksi,0);
				CA(TabelDetail,1);
				CA(UbahStatus,0);
			} else if (Opsi == "UbahStatusTransaksi") {
				CA(TabelTransaksi,0);
				CA(TabelDetail,0);
				CA(UbahStatus,1);
			}
		} else if (Mode == 'Laporan') {
			CA(Laporan,1);
			CA(tLaporan,1);
			if (Opsi == 'LTabelTransaksi') {
				CA(LTabelTransaksi,1);
			} else if (Opsi == 'Cetak') {

			}
		} else if (Mode == 'User') {
			CA(User,1);
			CA(tUser,1);
			if (Opsi == 'DaftarUser') {
				CA(Struktur,1);
				CA(TabelUser,1);
				CA(tTambahUser.parentElement,1);
				CA(TambahUser,0);
				CA(UbahUser,0);
			} else if (Opsi == 'TambahUser') {
				CA(Struktur,0);
				CA(TabelUser,0);
				CA(tTambahUser.parentElement,0);
				CA(TambahUser,1);
				CA(UbahUser,0);
			} else if (Opsi == 'UbahUser') {
				CA(Struktur,0);
				CA(TabelUser,0);
				CA(tTambahUser.parentElement,0);
				CA(TambahUser,0);
				CA(UbahUser,1);
			}
		}
	}
	// Cek Sesi awal untuk tampilan awal & tombol Menu Header
	if (document.cookie.indexOf('Sesi=Admin') != -1) {
		//Mode = 'Dashboard';
		//Opsi = 'SudahLogin';
		Mode = 'User';
		Opsi = 'DaftarUser';
		tDashboard.onclick = function() {
			Mode = 'Dashboard';
			Opsi = 'SudahLogin';
			Tampil();
		}
		tMenu.onclick = function() {
			Mode = 'Menu';
			Opsi = 'TabelMenu';
			Tampil();
		}
		tTransaksi.onclick = function() {
			Mode = 'Transaksi';
			Opsi = 'TabelTransaksi';
			Tampil();
		}
		tLaporan.onclick = function() {
			Mode = 'Laporan';
			Opsi = 'LTabelTransaksi';
			Tampil();
		}
		tUser.onclick = function() {
			Mode = 'User';
			Opsi = 'DaftarUser';
			Tampil();
		}
		tKeluar.onclick = function() {
			document.cookie = 'Sesi=';
			document.location.reload();
			close();
		}
	} else {
		Mode = 'Dashboard';
		Opsi = 'Login';
		tDashboard.style.display = 'none';
		tTransaksi.style.display = 'none';
		tMenu.style.display = 'none';
		tLaporan.style.display = 'none';
		tUser.style.display = 'none';
		tKeluar.style.display = 'none';
		tDashboard.onclick = function() {}
		tMenu.onclick = function() {}
		tTransaksi.onclick = function() {}
		tLaporan.onclick = function() {}
		tUser.onclick = function() {}
		tKeluar.onclick = function() {}
	}
	Tampil();

	//  DASHBOARD  ////////////////////////////////////////////////
	// Animasi Background Dashboard
	if (BgAnim.style.background == '') {
		var setGambar = ['url(img/upload/dashboard_1.jpg)', 'url(img/upload/dashboard_2.jpg)', 'url(img/upload/dashboard_3.jpg)'],
		setAnimKey = ['bganimleft', 'bganimright', 'bganimtop', 'bganimbottom', 'bganimlefttop', 'bganimleftbottom', 'bganimrighttop', 'bganimrightbottom'],
		gambar = setGambar.length-1;
		BgAnim.style.opacity = 1;
		if(navigator.userAgent.indexOf('Chrome') != -1)BgAnim.style.filter = 'blur(0)';
		var gantiGambar = setInterval(function() {
			BgAnim.style.opacity = 0;
			setTimeout(function() {
				setGambar.length == gambar+1 ? gambar -= gambar : gambar++;
				BgAnim.style.backgroundImage = setGambar[gambar];
				BgAnim.style.WebkitAnimationName = setAnimKey[Math.floor(Math.random()*setAnimKey.length)];
				BgAnim.style.animationName = setAnimKey[Math.floor(Math.random()*(setAnimKey.length))];
				BgAnim.style.opacity = 1;
			},1000);
		},10000);
		if(setGambar.length<2)clearInterval(gantiGambar);
	};
	// Login
	tLoginLogin.onclick = function() {
		if (tLoginNama.value.length < 5 || tLoginPass.value.length < 5) {
			Psn('Isikan Nama  & Password minimal 5 karakter !')
		} else if (tLoginNama.value.length > 45 || tLoginPass.value.length > 15) {
			Psn('Isikan Nama maksimal 45 karakter & Password maksimal 15 karakter!')
		} else {
			DataIO('Login', tLoginNama.value+'|'+tLoginPass.value);
		}
	}
	function _Login(status) {
		if (status != 'OK') {
			Psn('Nama atau Password Salah !');
		} else {
			document.cookie = 'Sesi=Admin';
			document.location.reload();
		}
	}
	// Register
	tLoginReg.onclick = function() {
		if (tLoginNama.value.length < 5 || tLoginPass.value.length < 5) {
			Psn('Isikan Nama  & Password minimal 5 karakter !')
		} else if (tLoginNama.value.length > 45 || tLoginPass.value.length > 15) {
			Psn('Isikan Nama maksimal 45 karakter & Password maksimal 15 karakter!')
		} else {
			DataIO('Register', tLoginNama.value+'|'+tLoginPass.value);
		}
	}
	function _Register(status) {
		if (status == 'OK') {
			Psn('Registrasi Berhasil. Mohon Tunggu Kofirmasi Dari Admin untuk pengaktifan akun!');
		} else {
			Psn('Registrasi Gagal, Coba Gunakan Nama Lain!');
		}
	}

	//  MENU  ///////////////////////////////////////////////////////
	// Reset Input Gambar
	inputTmGambar.value = '';
	inputUmGambar.value = '';
	// Tambah Menu
	tTambahMenu.onclick = function() {
		Opsi = 'TambahMenu';
		Tampil();
	}
	inputTmGambar.onchange = function() {
		var files = this.files.item(0);
		var reader = new FileReader();
		reader.onloadend = function () {
			inputTambahGambar.src = reader.result;
		}
		reader.readAsDataURL(files);
	}
	inputTambahGambar.onload = function() {
			var canvas = inputTambahCanvas;
			canvas.width = this.width;
			canvas.height = this.height;
			var width = canvas.width;
			var height = canvas.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(this,0,0,width,height);
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.strokeStyle = 'rgba(0,0,0,.7)';
			ctx.font = "19px icon";
			ctx.textAlign = "center";
			ctx.strokeText("\uF0F5",width/2,height*.7);
			ctx.fillText("\uF0F5",width/2,height*.7);
			ctx.font = "18px anemone";
			ctx.textAlign = "center";
			ctx.strokeText("Habibah",width/2,height*.8);
			ctx.fillText("Habibah",width/2,height*.8);
			ctx.font = "14px brandit";
			ctx.textAlign = "center";
			ctx.strokeText("-MENU-",width/2,height*.865);
			ctx.fillText("-MENU-",width/2,height*.865);
	}
	inputTmHarga.onfocus = function() {
		this.value = this.value.indexOf('Rp.') != -1 ? rupiah(this.value) : this.value;
	}
	inputTmHarga.onblur = function() {
		this.value = this.value.indexOf('Rp.') == -1 ? rupiah(this.value) : this.value;
	}
	inputTmSelesai.onclick = function() {
		if (inputTmGambar.value == '') {
			Psn('Gambar Makanan Masih Kosong');
		} else if (inputTmNama.value == '') {
			Psn('Nama Makanan Masih Kosong');
		} else if (inputTmNama.value.length > 50) {
			Psn('Nama Makanan Maksimal 50 Karakter');
		} else if (inputTmQty.value < 0) {
			Psn('Quantity Makanan tidak valid');
		} else if (inputTmQty.value > 99999999) {
			Psn('Quantity Makanan tidak boleh lebih dari 99999999');
		} else if (rupiah(inputTmHarga.value) < 0) {
			Psn('Harga Makanan tidak valid');
		} else if (rupiah(inputTmHarga.value) > 99999999) {
			Psn('Harga Makanan tidak boleh lebih dari Rp. 99.999.999,-');
		} else {
			inputTmGambar.value = '';
			inputTambahCanvas.toBlob(function (blob) {
				var reader = new FileReader();
				reader.onloadend = function () {
					var DataTM = hex(reader.result,1)+'|'+Waktu()+'|'+inputTmNama.value+'|'+inputTmQty.value+'|'+rupiah(inputTmHarga.value);
					DataIO('TambahMenu', DataTM);
				}
				reader.readAsBinaryString(blob);
			})
		}
	}
	inputTmBatal.onclick = function() {
		Opsi = 'TabelMenu';
		Tampil();
	}
	// Ubah Menu
	inputUmGambar.onchange = function() {
		var files = this.files.item(0);
		var reader = new FileReader();
		reader.onloadend = function () {
			inputUbahGambar.src = reader.result;
		}
		reader.readAsDataURL(files);
	}
	inputUbahGambar.onload = function() {
			inputUmGambar.value = '';
			var canvas = inputUbahCanvas;
			canvas.width = this.width;
			canvas.height = this.height;
			var width = canvas.width;
			var height = canvas.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(this,0,0,width,height);
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.strokeStyle = 'rgba(0,0,0,.7)';
			ctx.font = "19px icon";
			ctx.textAlign = "center";
			ctx.strokeText("\uF0F5",width/2,height*.7);
			ctx.fillText("\uF0F5",width/2,height*.7);
			ctx.font = "18px anemone";
			ctx.textAlign = "center";
			ctx.strokeText("Habibah",width/2,height*.8);
			ctx.fillText("Habibah",width/2,height*.8);
			ctx.font = "14px brandit";
			ctx.textAlign = "center";
			ctx.strokeText("-MENU-",width/2,height*.865);
			ctx.fillText("-MENU-",width/2,height*.865);
	}
	inputUmHarga.onfocus = function() {
		this.value = this.value.indexOf('Rp.') != -1 ? rupiah(this.value) : this.value;
	}
	inputUmHarga.onblur = function() {
		this.value = this.value.indexOf('Rp.') == -1 ? rupiah(this.value) : this.value;
	}
	inputUmSelesai.onclick = function() {
		if (inputUmNama.value == '') {
			Psn('Nama Makanan Masih Kosong');
		} else if (inputUmNama.value.length > 50) {
			Psn('Nama Makanan Maksimal 50 Karakter');
		} else if (inputUmQty.value < 0) {
			Psn('Quantity Makanan tidak valid');
		} else if (inputUmQty.value > 99999999) {
			Psn('Quantity Makanan tidak boleh lebih dari 99999999');
		} else if (rupiah(inputUmHarga.value) < 0) {
			Psn('Harga Makanan tidak valid');
		} else if (rupiah(inputUmHarga.value) > 99999999) {
			Psn('Harga Makanan tidak boleh lebih dari Rp. 99.999.999,-');
		} else {
			var UmGambar = '';
			if (inputUbahGambar.src.indexOf('img/upload/') == -1) {
				inputUbahCanvas.toBlob(function (blob) {
					var reader = new FileReader();
					reader.onloadend = function () {
						var DataUM = hex(reader.result,1)+'|'+inputUmNama.getAttribute('kode')+'|'+inputUmNama.value+'|'+inputUmQty.value+'|'+rupiah(inputUmHarga.value);
						DataIO('UbahMenu', DataUM);
					}
					reader.readAsBinaryString(blob);
				})
			} else {
				var DataUM = UmGambar+'|'+inputUmNama.getAttribute('kode')+'|'+inputUmNama.value+'|'+inputUmQty.value+'|'+rupiah(inputUmHarga.value);
				DataIO('UbahMenu', DataUM);
			}
		}
	}
	inputUmBatal.onclick = function() {
		Opsi = 'TabelMenu';
		Tampil();
	}

	//  TRANSAKSI  ///////////////////////////////////////////////////
	// Detail Transaksi & Print Nota untuk Pembayaran;
	DetailCetak.onclick = function() {
		var atas = '<!DOCTYPE html><html><head><title>Bukti Transaksi</title><style type="text/css">body{position: absolute;top: 0;left: 0;font-family:Arial;text-align: center;width: 100%;}.tabel-detail{display: inline-block;position: relative;background-color: white;padding: 2px;border-radius: 5px;box-shadow: 0 0 2px #333;color: black;}.tabel-detail th{padding: 2px 5px;border: 1px teal solid;color: teal;font-size: 14px;}.tabel-detail td{padding: 2px 5px;border: 1px black dashed;color: black;font-size: 12px;}.opsi{display: none;}</style></head><body><table class="tabel-detail">';
		var bawah = '</table></body><script>setTimeout(function() {print();close()},1000);</script></html>';
		var dataCetak = atas+TabelDetail.innerHTML+bawah;

		// Menbuat & mencetak dokumen baru menggunakan base64 Encode, untuk Browser lama;
		//open('data:text/html;base64,'+btoa(dataCetak));

		// Yang ini pakai Blob;
		/*
			var buat = new Blob([dataCetak], {type: 'text/html'});
			var buatURL = URL.createObjectURL(buat);
			open(buatURL);
			buat = null;
			buatURL = null;
		*/

		// Yang ini menggunakan new window, tidak usah konversi
		var cetak = open("", "Detail Transaksi", "width="+innerWidth+",height="+innerHeight);
		cetak.document.write(dataCetak);
		// Mengosongkan Memori
		atas = null;
		bawah = null;
		dataCetak = null;
	}
	DetailTutup.onclick = function() {
		Opsi = 'TabelTransaksi';
		Tampil();
	}
	// Ubah Status Transaksi
	UbahStatusSelesai.onclick = function(){
		if (UbahStatusValue.value != '') {
			DataIO('UbahTransaksi', UbahStatusValue.getAttribute('kode')+'|'+UbahStatusValue.value);
		}
	}
	UbahStatusBatal.onclick = function(){
		Opsi = 'TabelTransaksi';
		Tampil();
	}

	//  LAPORAN  //////////////////////////////////////////////////////
	LcMulai.onclick = function(e) {Kalender('Kalender',0,e)}
	LcSampai.onclick = function(e) {Kalender('Kalender',0,e)}
	LcCetak.onclick = function() {
		var Mulai = FormatTanggal(LcMulai.value);
		var Sampai = FormatTanggal(LcSampai.value);
		if (Kalender('Cek', Mulai) == 'Valid' && Kalender('Cek', Mulai) == 'Valid' && tgl2int(Mulai) <= tgl2int(Sampai) && LDaftarTransaksi.innerHTML != '') {
			var atas = '<!DOCTYPE html><html><head><title>Tabel Transaksi</title><style type="text/css">body{position: absolute;top: 0;left: 0;font-family:Arial;text-align: center;width: 100%;}.tabel-transaksi{display: inline-block;position: relative;background-color: white;padding: 2px;border-radius: 4px;box-shadow: 0 0 2px #333;color: black;}.tabel-transaksi th{padding: 2px 5px;border: 1px teal solid;color: teal;font-size: 14px;}.tabel-transaksi td{padding: 2px 5px;border: 1px black dashed;color: black;font-size: 12px;}</style></head><body><table class="tabel-transaksi">';
			var bawah = '</table></body><script>setTimeout(function() {print();close()},1000);</script></html>';
			var dataCetak = atas+LTabelTransaksi.innerHTML+bawah;

			// Menbuat & mencetak dokumen baru menggunakan base64 Encode, untuk Browser lama;
			//open('data:text/html;base64,'+btoa(dataCetak));

			// Yang ini pakai Blob;
			/*
				var buat = new Blob([dataCetak], {type: 'text/html'});
				var buatURL = URL.createObjectURL(buat);
				open(buatURL);
				buat = null;
				buatURL = null;
			*/

			// Yang ini menggunakan new window, tidak usah konversi
			var cetak = open("", "Detail Transaksi", "width="+innerWidth+",height="+innerHeight);
			cetak.document.write(dataCetak);
			// Mengosongkan Memori
			atas = null;
			bawah = null;
			dataCetak = null;
		} else if (Kalender('Cek', Mulai) != 'Valid' || Kalender('Cek', Mulai) != 'Valid' || tgl2int(Mulai) > tgl2int(Sampai)) {
			Psn('Tanggal Tidak Valid');
		} else if (LDaftarTransaksi.innerHTML == '') {
			Psn('Hasil Kosong');
		}
	}

	//  USER  ///////////////////////////////////////////////////////
	// Reset value
	inputTuGambar.value = '';
	inputUuGambar.value = '';
	selectTuLevel.value = 'Baru';
	selectUuLevel.value = 'Baru';
	// Tambah User
	tTambahUser.onclick = function() {
		Opsi = 'TambahUser';
		Tampil();
	}
	inputTuGambar.onchange = function() {
		var files = this.files.item(0);
		var reader = new FileReader();
		reader.onloadend = function () {
			inputTambahUserGambar.src = reader.result;
		}
		reader.readAsDataURL(files);
	}
	inputTambahUserGambar.onload = function() {
			var canvas = inputTambahUserCanvas;
			canvas.width = this.width;
			canvas.height = this.height;
			var width = canvas.width;
			var height = canvas.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(this,0,0,width,height);
			/**
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.strokeStyle = 'rgba(0,0,0,.7)';
			ctx.font = "19px icon";
			ctx.textAlign = "center";
			ctx.strokeText("\uF0F5",width/2,height*.7);
			ctx.fillText("\uF0F5",width/2,height*.7);
			ctx.font = "18px anemone";
			ctx.textAlign = "center";
			ctx.strokeText("Habibah",width/2,height*.8);
			ctx.fillText("Habibah",width/2,height*.8);
			ctx.font = "14px brandit";
			ctx.textAlign = "center";
			ctx.strokeText("-MENU-",width/2,height*.865);
			ctx.fillText("-MENU-",width/2,height*.865);
			*/
	}

	inputTuSelesai.onclick = function() {
		if (inputTuGambar.value == '') {
			Psn('Gambar User Masih Kosong');
		} else if (inputTuNama.value == '') {
			Psn('Nama User Masih Kosong');
		} else if (inputTuPass.value == '') {
			Psn('Password User Masih Kosong');
		} else if (inputTuNama.value.length < 5) {
			Psn('Nama User Minimal 5 Karakter');
		} else if (inputTuPass.value.length < 5) {
			Psn('Password User Minimal 5 Karakter');
		} else if (inputTuNama.value.length > 50) {
			Psn('Nama User Maksimal 50 Karakter');
		} else if (inputTuPass.value.length > 50) {
			Psn('Password User Maksimal 50 Karakter');
		} else {
			inputTuGambar.value = '';
			inputTambahUserCanvas.toBlob(function (blob) {
				var reader = new FileReader();
				reader.onloadend = function () {
					console.log('TambahUser'+hex(reader.result,1)+inputTuNama.value+'|'+inputTuPass.value+'|'+selectTuLevel.value);
				}
				reader.readAsBinaryString(blob);
			})
		}
	}
	inputTuBatal.onclick = function() {
		Opsi = 'DaftarUser';
		Tampil();
	}
	// Ubah User
	inputUuGambar.onchange = function() {
		var files = this.files.item(0);
		var reader = new FileReader();
		reader.onloadend = function () {
			inputUbahUserGambar.src = reader.result;
		}
		reader.readAsDataURL(files);
	}
	inputUbahUserGambar.onload = function() {
			inputUuGambar.value = '';
			var canvas = inputUbahUserCanvas;
			canvas.width = this.width;
			canvas.height = this.height;
			var width = canvas.width;
			var height = canvas.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(this,0,0,width,height);
			/**
			ctx.fillStyle = 'rgba(255,255,255,.5)';
			ctx.strokeStyle = 'rgba(0,0,0,.7)';
			ctx.font = "19px icon";
			ctx.textAlign = "center";
			ctx.strokeText("\uF0F5",width/2,height*.7);
			ctx.fillText("\uF0F5",width/2,height*.7);
			ctx.font = "18px anemone";
			ctx.textAlign = "center";
			ctx.strokeText("Habibah",width/2,height*.8);
			ctx.fillText("Habibah",width/2,height*.8);
			ctx.font = "14px brandit";
			ctx.textAlign = "center";
			ctx.strokeText("-MENU-",width/2,height*.865);
			ctx.fillText("-MENU-",width/2,height*.865);
			*/
	}
	inputUuSelesai.onclick = function() {
		if (inputUuGambar.value == '') {
			Psn('Gambar User Masih Kosong');
		} else if (inputUuNama.value == '') {
			Psn('Nama User Masih Kosong');
		} else if (inputUuPass.value == '') {
			Psn('Password User Masih Kosong');
		} else if (inputUuNama.value.length < 5) {
			Psn('Nama User Minimal 5 Karakter');
		} else if (inputUuPass.value.length < 5) {
			Psn('Password User Minimal 5 Karakter');
		} else if (inputUuNama.value.length > 50) {
			Psn('Nama User Maksimal 50 Karakter');
		} else if (inputUuPass.value.length > 50) {
			Psn('Password User Maksimal 50 Karakter');
		} else {
			if (inputUbahUserGambar.src.indexOf('img/upload/') == -1) {
				inputUbahUserCanvas.toBlob(function (blob) {
					var reader = new FileReader();
					reader.onloadend = function () {
						DataIO('UbahUser', hex(reader.result,1)+'|'+inputUuNama.getAttribute('kode')+'|'+inputUuNama.value+'|'+inputUuPass.value+'|'+inputUuLevel.value);
					}
					reader.readAsBinaryString(blob);
				})
			} else {
				DataIO('UbahUser', '|'+inputUuNama.getAttribute('kode')+'|'+inputUuNama.value+'|'+inputUuPass.value+'|'+inputUuLevel.value);
			}
		}
	}
	inputUuBatal.onclick = function() {
		Opsi = 'DaftarUser';
		Tampil();
	}

	//  PESAN  /////////////////////////////////////////////////////////
	// Pesan Tampil
	function Psn(isi) {
		setTimeout(function(){
			CA(Alert,1);
		},100);
		AlertIsi.innerHTML = isi;
		Dashboard.style.filter = 'blur(5px)';
		Menu.style.filter = 'blur(5px)';
		Transaksi.style.filter = 'blur(5px)';
		Laporan.style.filter = 'blur(5px)';
		User.style.filter = 'blur(5px)';
	}
	// Pesan Tutup
	onclick = function(e) {
		if(CA(Alert) == 1){
			CA(Alert,0);
			Dashboard.style.filter = 'blur(0)';
			Menu.style.filter = 'blur(0)';
			Transaksi.style.filter = 'blur(0)';
			Laporan.style.filter = 'blur(0)';
			User.style.filter = 'blur(0)';
		}
	}

	//  KALENDER  /////////////////////////////////////////////////////
	function Kalender(mode, data, e) {
		var tgl = new Date(),
		jumlahHari = [31,28,31,30,31,30,31,31,30,31,30,31],
		namaHari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum\'at','Sabtu'],
		namaBulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
		hariIni = tgl.getDate(),
		bulanIni = tgl.getMonth(),
		tahunIni = tgl.getFullYear();
		if (mode == 'Kalender') {
			var body = document.body,
			hari = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
			bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'],
			kalender = body.querySelector('#kalender'),
			UA = navigator.userAgent;
			if (!kalender) {
				kalender = document.createElement('div');
				kalender.setAttribute('id', 'kalender');
				kalender.setAttribute('class', 'kalender');
				body.appendChild(kalender);
				kalender = body.querySelector('#kalender');
				kalender.innerHTML =	'<table>'+
								'<thead class="kalender">'+
									'<tr class="kalender"><td id="mundur"></td><td id="head" mode="hari"></td><td id="maju"></td></tr>'+
								'</thead>'+
								'<tbody id="harian" class="kalender">'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'+
								'</tbody>'+
								'<tbody id="bulanan" class="kalender">'+
									'<tr class="kalender"><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td></tr>'+
								'</tbody>'+
								'<tbody id="tahunan" class="kalender">'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td></tr>'+
									'<tr class="kalender"><td></td><td></td><td></td><td></td></tr>'+
								'</tbody>'
							+'</table>';
			};
			if (UA.indexOf('Firefox') != -1) {
				kalender.style.transition = 'opacity .4s';
			} else if (UA.indexOf('Chrome') != -1) {
				kalender.style.transition = 'opacity .4s';
			};
			onclick = function(e) {
				if(CA(Alert) == 1){
					CA(Alert,0);
					Dashboard.style.filter = 'blur(0)';
					Menu.style.filter = 'blur(0)';
					Transaksi.style.filter = 'blur(0)';
					Laporan.style.filter = 'blur(0)';
				}
				if (e.target.parentNode.className != 'kalender' && e.target.getAttribute('type', 'button') == null) {
					kalenderHilang();
				} else {
					if(kalender.style.opacity == 1 && UA.indexOf('Chrome') != -1) {
						kalender.style.transition = 'opacity .4s';
					}
				}
			};
			function kalenderHilang(){
				kalender.style.opacity = 0;
				if (UA.indexOf('Chrome') != -1) {
					kalender.style.transition = 'opacity .4s';
					setTimeout(function(){
						kalender.style.transform = 'scale(0,0)';
					},400);
				} else {
					setTimeout(function(){
						kalender.style.transform = 'scale(0,0)';
					},400);
				}
			};
			function kalenderTampil() {
				kalender.style.opacity = 1;
				kalender.style.transform = 'scale(1, 1)';
				var x = e.clientX, y = e.clientY, w = kalender.clientWidth, h = kalender.clientHeight;
				if (x <= 100 && y <= 100) {
					kalender.style.transform = 'translate('+x+'px, '+y+'px)';
				} else if (x <= 100 && y > 100 && y <= innerHeight-100) {
					kalender.style.transform = 'translate('+x+'px, '+(y-(h*.5))+'px)';
				} else if (x <= 100 && y > innerHeight-100) {
					kalender.style.transform = 'translate('+x+'px, '+(y-h)+'px)';
				} else if (x > 100 && x <= innerWidth-100 && y <= 100) {
					kalender.style.transform = 'translate('+(x-(w*.5))+'px, '+y+'px)';
				} else if (x > 100 && x <= innerWidth-100 && y > 100 && y <= innerHeight-100) {
					kalender.style.transform = 'translate('+(x-(w*.5))+'px, '+(y-(h*.5))+'px)';
				} else if (x > 100 && x <= innerWidth-100 && y > innerHeight-100) {
					kalender.style.transform = 'translate('+(x-(w*.5))+'px, '+(y-h)+'px)';
				} else if (x > innerWidth-100 && y <= 100) {
					kalender.style.transform = 'translate('+(x-w)+'px, '+y+'px)';
				} else if (x > innerWidth-100 && y > 100 && y <= innerHeight-100) {
					kalender.style.transform = 'translate('+(x-w)+'px, '+(y-(h*.5))+'px)';
				} else if (x > innerWidth-100 && y > innerHeight-100) {
					kalender.style.transform = 'translate('+(x-w)+'px, '+(y-h)+'px)';
				};
				Kalender(e);
			};
			kalenderTampil();
			function Kalender(e) {
				var head = kalender.querySelector("#head"),
				mundur = kalender.querySelector("#mundur"),
				maju = kalender.querySelector("#maju"),
				harian = kalender.querySelector("#harian"),
				bulanan = kalender.querySelector("#bulanan"),
				tahunan = kalender.querySelector("#tahunan"),
				tanggal = [0,0,0,0,0,0,0,0,0,0,0,0],
				value = FormatTanggal(e.target.value).split('-'),
				thn = parseInt(value[0]),
				bln = parseInt(value[1]),
				hr = parseInt(value[2]),
				kabisat = value.length==3&&thn!=0&&bln!=0&&bln<=12&&hr!=0?hr<=jumlahHari[bln-1]?thn%4==0&&bln==2?1:bln==2?hr>28?null:0:0:null:null;
				kabisat==null?value=[tahunIni,bulanIni+1,hariIni]:value=[thn,bln,hr];
				function kalenderUbah() {
					jumlahHari[1]=value[0]%4!=0?28:29;
					tanggal[0]=((365*(value[0]-1))+Math.floor((value[0]-1)/4))%7;
					for(var i=0;i<tanggal.length;i++)if(i!=0)tanggal[i]=(tanggal[i-1]+jumlahHari[i-1])%7;
					if (head.getAttribute('mode') == 'hari') {
						for(var i=0;i<hari.length;i++)harian.children[0].children[i].textContent=hari[i];
						for (var i=1,ii=1,iii=0,iv=tanggal[value[1]-1],v=1,vi=1;i<=42;i++) {
							if (iii>6) {
								iii = 0;
								if(ii<6)ii++;
							};
							if(i<=iv){
								harian.children[ii].children[iii].setAttribute('disabled',0);
								harian.children[ii].children[iii].removeAttribute('aktif');
								harian.children[ii].children[iii].textContent='';
								harian.children[ii].children[iii].onclick = null;
							}else if(i>iv){
								if (v<=jumlahHari[value[1]-1]) {
									var mulaiValid = e.target.name == 'mulai' && LcSampai.value != 'Sampai' ? tgl2int(value[0]+'-'+(value[1]<10?'0'+value[1]:value[1])+'-'+(v<10?'0'+v:v)) > tgl2int(FormatTanggal(LcSampai.value)) ? true : false : false,
									sampaiValid = e.target.name == 'sampai' && LcMulai.value != 'Mulai' ? tgl2int(value[0]+'-'+(value[1]<10?'0'+value[1]:value[1])+'-'+(v<10?'0'+v:v)) < tgl2int(FormatTanggal(LcMulai.value)) ? true : false : false,
									cekDB = CekDBTransaksi('hari', value[0]+'-'+(value[1]<10?'0'+value[1]:value[1])+'-'+(v<10?'0'+v:v));
									harian.children[ii].children[iii].textContent=v;
									if (((value[0]*1000)+(value[1]*100)+v) > ((tahunIni*1000)+((bulanIni+1)*100)+hariIni) || mulaiValid || sampaiValid || !cekDB) {
										harian.children[ii].children[iii].setAttribute('disabled',0);
										harian.children[ii].children[iii].removeAttribute('aktif');
										harian.children[ii].children[iii].onclick = null;
									} else {
										harian.children[ii].children[iii].removeAttribute('disabled');
										harian.children[ii].children[iii].onclick = function(){
											kalenderHilang();
											value[2] = parseInt(this.textContent);
											var hasilBln = value[1]<10?'0'+value[1]:value[1],
											hasilHr = value[2]<10?'0'+value[2]:value[2];
											e.target.value = FormatTanggal(value[0]+'-'+hasilBln+'-'+hasilHr);
											_UpdateTransaksi();
										};
										if(v==value[2]) {
											harian.children[ii].children[iii].setAttribute('aktif',0);
										} else {
											harian.children[ii].children[iii].removeAttribute('aktif');
										}
									}
								} else {
									harian.children[ii].children[iii].setAttribute('disabled',0);
									harian.children[ii].children[iii].removeAttribute('aktif');
									harian.children[ii].children[iii].textContent='';
									harian.children[ii].children[iii].onclick = null;
									vi++
								};
								v++
							};
							iii++
						}
					} else if (head.getAttribute('mode') == 'bulan') {
						for (var i=0,ii=0,iii=0;i<12;i++) {
							if (iii>2) {
								iii = 0;
								if(ii<4)ii++;
							};
							var bulanTemp = i+1;
							bulanTemp = bulanTemp<10?'0'+bulanTemp:bulanTemp;
							var mulaiValid = e.target.name == 'mulai' && LcSampai.value != 'Sampai' ? parseInt(value[0]+bulanTemp) > parseInt(tgl2int(FormatTanggal(LcSampai.value)).toString().substr(0,7)) ? true : false : false,
							sampaiValid = e.target.name == 'sampai' && LcMulai.value != 'Mulai' ? parseInt(value[0]+bulanTemp) < parseInt(tgl2int(FormatTanggal(LcMulai.value)).toString().substr(0,7)) ? true : false : false,
							cekDB = CekDBTransaksi('bulan', value[0]+'-'+bulanTemp);
							bulanan.children[ii].children[iii].setAttribute('value',i);
							bulanan.children[ii].children[iii].textContent=bulan[i];
							if (((value[0]*100)+i+1) > ((tahunIni*100)+(bulanIni+1)) || mulaiValid || sampaiValid || !cekDB) {
								bulanan.children[ii].children[iii].setAttribute('disabled',0);
								bulanan.children[ii].children[iii].removeAttribute('aktif');
								bulanan.children[ii].children[iii].onclick = null;
							} else {
								bulanan.children[ii].children[iii].removeAttribute('disabled');
								if(value[1]==i+1){
									bulanan.children[ii].children[iii].setAttribute('aktif',0);
								} else {
									bulanan.children[ii].children[iii].removeAttribute('aktif');
								};
								bulanan.children[ii].children[iii].onclick = function(){
									head.setAttribute('mode', 'hari');
									value[1] = parseInt(this.getAttribute('value'))+1;
									kalenderMode();
								}
							};
							iii++
						}
					} else if (head.getAttribute('mode') == 'tahun') {
						var tahun = head.textContent.split(' - ');
						tahun[0] = parseInt(tahun[0]);
						tahun[1] = parseInt(tahun[1]);
						for (var i=0,ii=0,iii=0;i<20;i++) {
							if (iii>3) {
								iii = 0;
								if(ii<5)ii++;
							};
							var mulaiValid = e.target.name == 'mulai' && LcSampai.value != 'Sampai' ? parseInt(tahun[0]+i) > parseInt(tgl2int(FormatTanggal(LcSampai.value)).toString().substr(0,4)) ? true : false : false,
							sampaiValid = e.target.name == 'sampai' && LcMulai.value != 'Mulai' ? parseInt(tahun[0]+i) < parseInt(tgl2int(FormatTanggal(LcMulai.value)).toString().substr(0,4)) ? true : false : false,
							cekDB = CekDBTransaksi('tahun', tahun[0]+i);
							tahunan.children[ii].children[iii].textContent=tahun[0]+i;
							if (tahun[0]+i > tahunIni || mulaiValid || sampaiValid || !cekDB) {
								tahunan.children[ii].children[iii].setAttribute('disabled',0);
								tahunan.children[ii].children[iii].removeAttribute('aktif');
								tahunan.children[ii].children[iii].onclick = null;
							} else {
								tahunan.children[ii].children[iii].removeAttribute('disabled');
								if(value[0]==tahun[0]+i){
									tahunan.children[ii].children[iii].setAttribute('aktif',0);
								} else {
									tahunan.children[ii].children[iii].removeAttribute('aktif');
								};
								tahunan.children[ii].children[iii].onclick = function(){
									head.setAttribute('mode', 'bulan');
									value[0] = parseInt(this.textContent);
									kalenderMode();
								}
							};
							iii++
						}
					}
				};
				mundur.onclick = function(){
					if (head.getAttribute('mode') == 'hari') {
						if(value[1]>1){
							value[1]--;
						} else if(value[1]<=1 && value[0]>1){
							value[1] = 12;
							value[0]--;
						};
						head.textContent = namaBulan[(value[1])-1]+' '+value[0];
					} else if (head.getAttribute('mode') == 'bulan') {
						if(value[0]>1)value[0]--;
						head.textContent = value[0];
					} else if (head.getAttribute('mode') == 'tahun') {
						if(value[0]>20)value[0]-=20;
						var teks = Math.floor((value[0])/20)*20;
						head.textContent=teks==value[0]?(teks-19)+' - '+teks:(teks+1)+' - '+(teks+20);
					};
					kalenderUbah();
				};
				maju.onclick = function(){
					if (head.getAttribute('mode') == 'hari') {
						if(value[1]<12){
							value[1]++;
						} else if(value[1]>=12 && value[0]<=20000) {
							value[1]=1;
							value[0]++;
						};
						head.textContent = namaBulan[(value[1])-1]+' '+value[0];
					} else if (head.getAttribute('mode') == 'bulan') {
						if(value[0]<=20000)value[0]++;
						head.textContent = value[0];
					} else if (head.getAttribute('mode') == 'tahun') {
						if(value[0]<=20000)value[0]+=20;
						var teks = Math.floor((value[0])/20)*20;
						head.textContent = teks==value[0]?(teks-19)+' - '+teks:(teks+1)+' - '+(teks+20);
					};
					kalenderUbah();
				};
				function kalenderMode() {
					if (head.getAttribute('mode') == 'hari') {
						harian.style.zIndex = '2';
						harian.style.opacity = '1';
						harian.style.transform = 'scale(1,1)';
						bulanan.style.zIndex = '1';
						bulanan.style.opacity = '0';
						bulanan.style.transform = 'scale(1.5,1.5)';
						tahunan.style.zIndex = '1';
						tahunan.style.opacity = '0';
						tahunan.style.transform = 'scale(1.5,1.5)';
						head.textContent = namaBulan[(value[1])-1]+' '+value[0];
					} else if (head.getAttribute('mode') == 'bulan') {
						harian.style.zIndex = '1';
						harian.style.opacity = '0';
						harian.style.transform = 'scale(.5,.5)';
						bulanan.style.zIndex = '2';
						bulanan.style.opacity = '1';
						bulanan.style.transform = 'scale(1,1)';
						tahunan.style.zIndex = '1';
						tahunan.style.opacity = '0';
						tahunan.style.transform = 'scale(1.5,1.5)';
						head.textContent = value[0];
					} else if (head.getAttribute('mode') == 'tahun') {
						harian.style.zIndex = '1';
						harian.style.opacity = '0';
						harian.style.transform = 'scale(.5,.5)';
						bulanan.style.zIndex = '1';
						bulanan.style.opacity = '0';
						bulanan.style.transform = 'scale(.5,.5)';
						tahunan.style.zIndex = '2';
						tahunan.style.opacity = '1';
						tahunan.style.transform = 'scale(1,1)';
						var teks = Math.floor((value[0])/20)*20;
						head.textContent = teks==value[0]?(teks-19)+' - '+teks:(teks+1)+' - '+(teks+20);
					};
					kalenderUbah();
				};
				head.setAttribute('mode', 'hari');
				kalenderMode();
				head.onclick = function() {
					if (this.getAttribute('mode') == 'hari') {
						this.setAttribute('mode', 'bulan');
						kalenderMode();
					} else if (this.getAttribute('mode') == 'bulan') {
						this.setAttribute('mode', 'tahun');
						kalenderMode();
					}
				}
			}
		} else if (mode == 'Cek') {
			var strlen = function(x) {return x.length};
			var strpos = function(x,y) {return x.indexOf(y)};
			var substr = function(x,y,z) {return x.substr(y,z)};
			var explode = function(x,y) {return y.split(x)};

			var tg = explode('-', data),
			thn = parseInt(tg[0]),
			bln = parseInt(tg[1]),
			hr = parseInt(tg[2]),
			kabisat = thn/4;
			if (strpos(kabisat.toString(), '.') == -1) {
				kabisat = 'ya'
			} else {
				kabisat = 0
			};
			if (tg.length == 3 && tg[0].length == 4 && tg[1].length == 2 && tg[2].length == 2 && bln > 0 && bln <= 12 && hr > 0) {
				if (bln == 1 || bln == 3 || bln == 5 || bln == 7 || bln == 8 || bln == 10 || bln == 12) {
					if (hr <= 31) {
						return 'Valid'
					} else {
						return 0
					}
				} else if (bln == 4 || bln == 6 || bln == 9 || bln == 11) {
					if (hr <= 30) {
						return 'Valid'
					} else {
						return 0
					}
				} else if (bln == 2) {
					if (kabisat == 'ya') {
						if (hr <= 29) {
							return 'Valid'
						} else {
							return 0
						}
					} else {
						if (hr <= 28) {
							return 'Valid'
						} else {
							return 0
						}
					}
				}
			} else {
				return 0
			}
		}
	};

	/****************************************************************
	|  KONEKSI KE DATABASE
	|****************************************************************/

	// Kompatibilitas fungsi XMLHttpRequest
	if( typeof XMLHttpRequest == "undefined" ) {
		XMLHttpRequest = function() {
			return new ActiveXObject(
				navigator.userAgent.indexOf("MSIE 5")>=0
				?"Microsoft.XMLHTTP"
				:"Msxml2.XMLHTTP")
		}
	}
	// In-Out Data Server menggunakan fungsi Ajax() POST.
	// Fungsi untuk koneksi, mengambil, menambah, mengubah, menghapus Database MySQL Server.
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
						Psn('Maaf, Koneksi Database Server Bermasalah & Masih dalam perbaikan');
					} else if(mode == 'AmbilDB') {
						_AmbilDB(this.responseText);
					} else if(mode == 'Login') {
						_Login(this.responseText);
					} else if(mode == 'Register') {
						_Register(this.responseText);
					} else if(mode == 'TambahMenu') {
						if(this.responseText == 'OK') {
							Psn('Daftar Menu Berhasil ditambah');
							DataIO('AmbilDB',0);
							Opsi = 'TabelMenu';
							Tampil();
						} else {
							console.log(this.responseText);
							Psn('Daftar Menu Gagal ditambah');
						}
					} else if(mode == 'UbahMenu') {
						if(this.responseText == 'OK') {
							Psn('Daftar Menu Berhasil diubah');
							DataIO('AmbilDB',0);
						} else {
							console.log(this.responseText);
							Psn('Daftar Menu Gagal diubah');
						}
					} else if(mode == 'HapusMenu') {
						if(this.responseText == 'OK') {
							Psn('Daftar Menu Berhasil dihapus');
							DataIO('AmbilDB',0);
						} else {
							Psn('Daftar Menu Gagal dihapus');
							console.log(this.responseText);
						}
					} else if(mode == 'UbahTransaksi') {
						if(this.responseText == 'OK') {
							Psn('Status Transaksi Berhasil diubah');
							Opsi = 'TabelTransaksi';
							Tampil();
							DataIO('AmbilDB',0);
						} else {
							Psn('Status Transaksi Gagal diubah');
						}
					} else if (mode == 'HapusTransaksi') {
						if(this.responseText == 'OK') {
							Psn('Transaksi Berhasil dihapus');
							DataIO('AmbilDB',0);
						} else {
							Psn('Transaksi Gagal dihapus');
						}
					}
				} else {
					Peringatan('Maaf, Permintaan gagal diproses. Mohon periksan Koneksi Anda');
				}
				Ajax = null;
			}
		}
		Ajax.send('mode='+mode+'&data='+data);
	}
	// Mengambil Database Awal
	if(document.cookie.indexOf('Sesi=Admin') != -1)DataIO('AmbilDB',0);

	// menghilangkan source code
	onload = null;
}
