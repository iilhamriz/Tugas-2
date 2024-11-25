import java.util.ArrayList;
import java.util.Scanner;

class Menu {
    private String nama;
    private double harga;
    private String kategori;

    public Menu(String nama, double harga, String kategori) {
        this.nama = nama;
        this.harga = harga;
        this.kategori = kategori;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public double getHarga() {
        return harga;
    }

    public void setHarga(double harga) {
        this.harga = harga;
    }

    public String getKategori() {
        return kategori;
    }

    @Override
    public String toString() {
        return nama + " - Rp " + harga;
    }
}


public class Main {
    private static ArrayList<Menu> daftarMenu = new ArrayList<>();
    private static ArrayList<Menu> pesanan = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        // Tambahkan menu awal
        daftarMenu.add(new Menu("Nasi Goreng", 25000, "Makanan"));
        daftarMenu.add(new Menu("Mie Ayam", 20000, "Makanan"));
        daftarMenu.add(new Menu("Es Teh", 5000, "Minuman"));
        daftarMenu.add(new Menu("Es Jeruk", 7000, "Minuman"));

        while (true) {
            System.out.println("\n=== Restoran Sederhana ===");
            System.out.println("1. Menu Pelanggan");
            System.out.println("2. Pengelolaan Menu");
            System.out.println("3. Keluar");
            System.out.print("Pilih menu: ");
            int pilihan = scanner.nextInt();
            scanner.nextLine(); // Konsumsi newline

            switch (pilihan) {
                case 1 -> menuPelanggan();
                case 2 -> pengelolaanMenu();
                case 3 -> {
                    System.out.println("Terima kasih telah menggunakan aplikasi ini!");
                    return;
                }
                default -> System.out.println("Pilihan tidak valid!");
            }
        }
    }

    private static void menuPelanggan() {
        System.out.println("\n=== Menu Restoran ===");
        tampilkanMenu();

        while (true) {
            System.out.print("\nMasukkan nama menu yang ingin dipesan (atau 'selesai'): ");
            String namaMenu = scanner.nextLine();
            if (namaMenu.equalsIgnoreCase("selesai")) break;

            boolean ditemukan = false;
            for (Menu menu : daftarMenu) {
                if (menu.getNama().equalsIgnoreCase(namaMenu)) {
                    pesanan.add(menu);
                    System.out.println("Menu berhasil ditambahkan ke pesanan.");
                    ditemukan = true;
                    break;
                }
            }
            if (!ditemukan) System.out.println("Menu tidak ditemukan. Silakan coba lagi.");
        }

        hitungTotal();
    }

    private static void hitungTotal() {
        double totalBiaya = 0;
        for (Menu menu : pesanan) {
            totalBiaya += menu.getHarga();
        }

        double diskon = 0;
        if (totalBiaya > 100000) {
            diskon = totalBiaya * 0.10;
        } else if (totalBiaya > 50000) {
            System.out.println("\nPenawaran Beli 1 Gratis 1 untuk kategori Minuman berlaku!");
            // Hapus item minuman termurah dari pesanan
            double hargaTermurah = Double.MAX_VALUE;
            Menu termurah = null;
            for (Menu menu : pesanan) {
                if (menu.getKategori().equals("Minuman") && menu.getHarga() < hargaTermurah) {
                    hargaTermurah = menu.getHarga();
                    termurah = menu;
                }
            }
            if (termurah != null) {
                pesanan.remove(termurah);
                System.out.println("Diskon: Minuman " + termurah.getNama() + " gratis.");
            }
        }

        double pajak = totalBiaya * 0.10;
        double biayaPelayanan = 20000;
        double totalAkhir = totalBiaya - diskon + pajak + biayaPelayanan;

        System.out.println("\n=== Struk Pesanan ===");
        for (Menu menu : pesanan) {
            System.out.println(menu.getNama() + " - Rp " + menu.getHarga());
        }
        System.out.println("Subtotal: Rp " + totalBiaya);
        System.out.println("Diskon: Rp " + diskon);
        System.out.println("Pajak (10%): Rp " + pajak);
        System.out.println("Biaya Pelayanan: Rp " + biayaPelayanan);
        System.out.println("Total Akhir: Rp " + totalAkhir);
    }

    private static void pengelolaanMenu() {
        while (true) {
            System.out.println("\n=== Pengelolaan Menu ===");
            System.out.println("1. Tambah Menu");
            System.out.println("2. Ubah Harga Menu");
            System.out.println("3. Hapus Menu");
            System.out.println("4. Kembali ke Menu Utama");
            System.out.print("Pilih menu: ");
            int pilihan = scanner.nextInt();
            scanner.nextLine();

            switch (pilihan) {
                case 1 -> tambahMenu();
                case 2 -> ubahHargaMenu();
                case 3 -> hapusMenu();
                case 4 -> {
                    return;
                }
                default -> System.out.println("Pilihan tidak valid!");
            }
        }
    }

    private static void tambahMenu() {
        System.out.print("Masukkan nama menu baru: ");
        String nama = scanner.nextLine();
        System.out.print("Masukkan harga: ");
        double harga = scanner.nextDouble();
        scanner.nextLine();
        System.out.print("Masukkan kategori (Makanan/Minuman): ");
        String kategori = scanner.nextLine();

        daftarMenu.add(new Menu(nama, harga, kategori));
        System.out.println("Menu baru berhasil ditambahkan!");
    }

    private static void ubahHargaMenu() {
        tampilkanMenu();
        System.out.print("\nMasukkan nomor menu yang ingin diubah: ");
        int index = scanner.nextInt() - 1;
        scanner.nextLine();

        if (index >= 0 && index < daftarMenu.size()) {
            System.out.print("Masukkan harga baru: ");
            double hargaBaru = scanner.nextDouble();
            scanner.nextLine();
            daftarMenu.get(index).setHarga(hargaBaru);
            System.out.println("Harga menu berhasil diubah!");
        } else {
            System.out.println("Menu tidak ditemukan.");
        }
    }

    private static void hapusMenu() {
        tampilkanMenu();
        System.out.print("\nMasukkan nomor menu yang ingin dihapus: ");
        int index = scanner.nextInt() - 1;
        scanner.nextLine();

        if (index >= 0 && index < daftarMenu.size()) {
            System.out.print("Yakin ingin menghapus menu ini? (Ya/Tidak): ");
            String konfirmasi = scanner.nextLine();
            if (konfirmasi.equalsIgnoreCase("Ya")) {
                daftarMenu.remove(index);
                System.out.println("Menu berhasil dihapus!");
            } else {
                System.out.println("Penghapusan dibatalkan.");
            }
        } else {
            System.out.println("Menu tidak ditemukan.");
        }
    }

    private static void tampilkanMenu() {
        System.out.println("\n=== Daftar Menu ===");
        for (int i = 0; i < daftarMenu.size(); i++) {
            System.out.println((i + 1) + ". " + daftarMenu.get(i));
        }
    }
}
