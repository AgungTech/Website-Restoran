-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 28 Jul 2017 pada 16.40
-- Versi Server: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restoran`
--
DROP DATABASE `restoran`;
CREATE DATABASE IF NOT EXISTS `restoran` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `restoran`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `daftar_makanan`
--

CREATE TABLE `daftar_makanan` (
  `kode_makanan` int(5) NOT NULL,
  `tanggal_tambah` varchar(10) NOT NULL,
  `jam` varchar(8) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `qty` int(8) NOT NULL,
  `harga` bigint(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `daftar_makanan`
--

INSERT INTO `daftar_makanan` (`kode_makanan`, `tanggal_tambah`, `jam`, `nama`, `qty`, `harga`) VALUES
(10001, '2017-06-01', '00:00:00', 'Lemper Bakar', 300, 15000),
(10002, '2017-06-01', '00:00:00', 'Pastel', 400, 25000),
(10003, '2017-06-01', '00:00:00', 'Sambosa', 500, 25000),
(10004, '2017-06-01', '00:00:00', 'Brota', 300, 25000),
(10005, '2017-06-01', '00:00:00', 'Risol Mayo', 400, 25000),
(10006, '2017-06-01', '00:00:00', 'Tahu Bakso', 500, 10000),
(10007, '2017-06-01', '00:00:00', 'Roti Mariyam', 300, 25000),
(10008, '2017-06-01', '00:00:00', 'Mageli', 400, 10000),
(10009, '2017-06-01', '00:00:00', 'Kroket', 500, 30000),
(10010, '2017-06-01', '00:00:00', 'Pentol Bakso', 300, 10000),
(10011, '2017-06-01', '00:00:00', 'Siomay', 400, 25000),
(10012, '2017-06-01', '00:00:00', 'Onde-Onde', 500, 10000),
(10013, '2017-06-01', '00:00:00', 'Tortilla Barbeque', 300, 30000),
(10014, '2017-06-01', '00:00:00', 'Donat Kentang', 400, 25000),
(10015, '2017-06-01', '00:00:00', 'Kebab', 500, 25000),
(10016, '2017-06-01', '00:00:00', 'Martabak', 300, 10000),
(10017, '2017-06-01', '00:00:00', 'Donat Original', 400, 10000),
(10018, '2017-06-01', '00:00:00', 'Donat Toping Selai', 500, 10000),
(10019, '2017-06-01', '00:00:00', 'Delipao Coklat', 300, 15000),
(10020, '2017-06-01', '00:00:00', 'Rujak Cireng', 500, 10000),
(10021, '2017-06-01', '00:00:00', 'Burger Spesial', 400, 10000),
(10022, '2017-06-01', '00:00:00', 'Pizza', 500, 25000),
(10023, '2017-06-01', '00:00:00', 'Molen', 400, 10000),
(10024, '2017-06-01', '00:00:00', 'Martabak Mihun', 300, 10000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `daftar_pesanan`
--

CREATE TABLE `daftar_pesanan` (
  `kode_pesanan` int(8) NOT NULL,
  `kode_transaksi` int(8) NOT NULL,
  `kode_makanan` int(5) NOT NULL,
  `nama_makanan` varchar(50) NOT NULL,
  `qty` int(5) NOT NULL,
  `harga` int(8) NOT NULL,
  `total` bigint(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `daftar_pesanan`
--

INSERT INTO `daftar_pesanan` (`kode_pesanan`, `kode_transaksi`, `kode_makanan`, `nama_makanan`, `qty`, `harga`, `total`) VALUES
(85, 57198, 10003, 'Sambosa', 1, 25000, 25000),
(86, 57199, 10003, 'Sambosa', 4, 25000, 100000),
(90, 57201, 10005, 'Risol Mayo', 2, 25000, 50000),
(91, 57201, 10008, 'Mageli', 2, 10000, 20000),
(92, 57201, 10010, 'Pentol Bakso', 2, 10000, 20000),
(100, 57205, 10002, 'Pastel', 3, 25000, 75000),
(101, 57205, 10004, 'Brota', 2, 25000, 50000),
(102, 57206, 10001, 'Lemper Bakar', 19, 15000, 285000),
(103, 57206, 10002, 'Pastel', 15, 25000, 375000),
(104, 57206, 10003, 'Sambosa', 154, 25000, 3850000),
(105, 57206, 10004, 'Brota', 156, 25000, 3900000),
(106, 57206, 10005, 'Risol Mayo', 4, 25000, 100000),
(107, 57206, 10006, 'Tahu Bakso', 7, 10000, 70000),
(108, 57206, 10007, 'Roti Mariyam', 9, 25000, 225000),
(109, 57206, 10008, 'Mageli', 11, 10000, 110000),
(110, 57206, 10009, 'Kroket', 14, 30000, 420000),
(111, 57206, 10010, 'Pentol Bakso', 300, 10000, 3000000),
(112, 57206, 10011, 'Siomay', 10, 25000, 250000),
(113, 57206, 10012, 'Onde-Onde', 6, 10000, 60000),
(114, 57206, 10013, 'Tortilla Barbeque', 14, 30000, 420000),
(115, 57206, 10014, 'Donat Kentang', 21, 25000, 525000),
(116, 57206, 10015, 'Kebab', 13, 25000, 325000),
(117, 57206, 10016, 'Martabak', 15, 10000, 150000),
(118, 57206, 10017, 'Donat Original', 11, 10000, 110000),
(119, 57206, 10018, 'Donat Toping Selai', 10, 10000, 100000),
(120, 57206, 10019, 'Delipao Coklat', 5, 15000, 75000),
(121, 57206, 10020, 'Rujak Cireng', 16, 10000, 160000),
(122, 57206, 10021, 'Burger Spesial', 2, 10000, 20000),
(123, 57206, 10022, 'Pizza', 62, 25000, 1550000),
(124, 57206, 10023, 'Molen', 8, 10000, 80000),
(125, 57206, 10024, 'Martabak Mihun', 10, 10000, 100000),
(127, 57208, 10001, 'Lemper Bakar', 1, 15000, 15000),
(128, 57208, 10002, 'Pastel', 1, 25000, 25000),
(129, 57208, 10003, 'Sambosa', 1, 25000, 25000),
(130, 57208, 10004, 'Brota', 1, 25000, 25000),
(131, 57208, 10005, 'Risol Mayo', 1, 25000, 25000),
(132, 57208, 10006, 'Tahu Bakso', 1, 10000, 10000),
(133, 57208, 10007, 'Roti Mariyam', 1, 25000, 25000),
(134, 57208, 10008, 'Mageli', 1, 10000, 10000),
(135, 57208, 10009, 'Kroket', 1, 30000, 30000),
(136, 57208, 10010, 'Pentol Bakso', 1, 10000, 10000),
(137, 57208, 10011, 'Siomay', 1, 25000, 25000),
(138, 57208, 10012, 'Onde-Onde', 1, 10000, 10000),
(139, 57208, 10013, 'Tortilla Barbeque', 1, 30000, 30000),
(140, 57208, 10014, 'Donat Kentang', 1, 25000, 25000),
(141, 57208, 10015, 'Kebab', 1, 25000, 25000),
(142, 57208, 10016, 'Martabak', 9, 10000, 90000),
(143, 57208, 10017, 'Donat Original', 1, 10000, 10000),
(144, 57208, 10018, 'Donat Toping Selai', 1, 10000, 10000),
(145, 57208, 10019, 'Delipao Coklat', 1, 15000, 15000),
(146, 57208, 10020, 'Rujak Cireng', 1, 10000, 10000),
(147, 57208, 10021, 'Burger Spesial', 1, 10000, 10000),
(148, 57208, 10022, 'Pizza', 1, 25000, 25000),
(149, 57208, 10023, 'Molen', 1, 10000, 10000),
(150, 57208, 10024, 'Martabak Mihun', 1, 10000, 10000),
(151, 57209, 10003, 'Sambosa', 6, 25000, 150000),
(152, 57209, 10004, 'Brota', 1, 25000, 25000),
(158, 57211, 10001, 'Lemper Bakar', 1, 15000, 15000),
(159, 57211, 10002, 'Pastel', 1, 25000, 25000),
(160, 57211, 10003, 'Sambosa', 1, 25000, 25000),
(161, 57211, 10008, 'Mageli', 1, 10000, 10000),
(162, 57211, 10009, 'Kroket', 1, 30000, 30000),
(163, 57211, 10010, 'Pentol Bakso', 1, 10000, 10000),
(164, 57211, 10013, 'Tortilla Barbeque', 11, 30000, 330000),
(165, 57211, 10014, 'Donat Kentang', 1, 25000, 25000),
(166, 57211, 10015, 'Kebab', 1, 25000, 25000),
(169, 57213, 10001, 'Lemper Bakar', 4, 15000, 60000),
(170, 57213, 10002, 'Pastel', 6, 25000, 150000),
(171, 57213, 10003, 'Sambosa', 5, 25000, 125000),
(173, 57215, 10001, 'Lemper Bakar', 4, 15000, 60000),
(174, 57215, 10002, 'Pastel', 4, 25000, 100000),
(175, 57215, 10003, 'Sambosa', 3, 25000, 75000),
(176, 57216, 10002, 'Pastel', 6, 25000, 150000),
(177, 57217, 10001, 'Lemper Bakar', 4, 15000, 60000),
(178, 57217, 10002, 'Pastel', 3, 25000, 75000),
(179, 57217, 10003, 'Sambosa', 3, 25000, 75000),
(180, 57217, 10008, 'Mageli', 5, 10000, 50000),
(181, 57218, 10001, 'Lemper Bakar', 6, 15000, 90000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `daftar_user`
--

CREATE TABLE `daftar_user` (
  `id_user` int(5) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(15) NOT NULL,
  `status` enum('Admin','Manager','Baru') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `daftar_user`
--

INSERT INTO `daftar_user` (`id_user`, `username`, `password`, `status`) VALUES
(10000, 'admin', 'admin', 'Admin'),
(10001, 'manager', 'manager', 'Manager'),
(10006, 'BARRU', 'BARRU', 'Baru'),
(10007, 'admi55', 'admin', 'Baru');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `kode_transaksi` int(8) NOT NULL,
  `tanggal` varchar(19) NOT NULL,
  `jam` varchar(9) NOT NULL,
  `nama_pembeli` varchar(15) NOT NULL,
  `nomer_meja` int(4) NOT NULL,
  `total` bigint(15) NOT NULL,
  `bayar` bigint(15) DEFAULT NULL,
  `status` enum('Belum Diproses','Lunas') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`kode_transaksi`, `tanggal`, `jam`, `nama_pembeli`, `nomer_meja`, `total`, `bayar`, `status`) VALUES
(57198, '2017-06-10', '03:34:47', 'AKU', 10, 25000, NULL, 'Lunas'),
(57199, '2017-06-10', '03:37:18', 'AKU', 10, 100000, NULL, 'Lunas'),
(57201, '2017-06-10', '11:08:46', 'aaa', 3, 90000, NULL, 'Lunas'),
(57205, '2017-06-10', '11:55:20', 'Sss', 3, 125000, NULL, 'Lunas'),
(57206, '2017-06-10', '17:59:55', 'AKU', 5, 16260000, NULL, 'Lunas'),
(57208, '2017-06-10', '23:02:07', 'AKU', 4, 505000, NULL, 'Lunas'),
(57209, '2017-06-11', '04:41:34', 'AKU', 10, 175000, NULL, 'Lunas'),
(57211, '2017-06-11', '08:25:04', 'AKU', 10, 495000, NULL, 'Lunas'),
(57213, '2017-06-12', '20:24:41', 'AKU', 1, 335000, NULL, 'Lunas'),
(57215, '2017-06-29', '15:32:11', 'A', 5, 235000, NULL, 'Belum Diproses'),
(57216, '2017-06-29', '15:34:20', 'A', 1, 150000, NULL, 'Belum Diproses'),
(57217, '2017-07-03', '14:16:52', 'AKU', 1, 260000, NULL, 'Lunas'),
(57218, '2017-07-07', '17:05:12', 'Mas Hadi', 7, 90000, NULL, 'Lunas');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftar_makanan`
--
ALTER TABLE `daftar_makanan`
  ADD PRIMARY KEY (`kode_makanan`);

--
-- Indexes for table `daftar_pesanan`
--
ALTER TABLE `daftar_pesanan`
  ADD PRIMARY KEY (`kode_pesanan`);

--
-- Indexes for table `daftar_user`
--
ALTER TABLE `daftar_user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`kode_transaksi`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daftar_makanan`
--
ALTER TABLE `daftar_makanan`
  MODIFY `kode_makanan` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10025;
--
-- AUTO_INCREMENT for table `daftar_pesanan`
--
ALTER TABLE `daftar_pesanan`
  MODIFY `kode_pesanan` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;
--
-- AUTO_INCREMENT for table `daftar_user`
--
ALTER TABLE `daftar_user`
  MODIFY `id_user` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10008;
--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `kode_transaksi` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57219;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
