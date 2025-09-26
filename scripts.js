// Script untuk toggle mobile menu dan sub-menu SERVICE (mode mobile/portrait)
// Memastikan menu bisa dibuka/ditutup di layar kecil tanpa mengubah ukuran elemen
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const serviceToggle = document.getElementById('service-toggle');
    const serviceSubmenu = document.getElementById('service-submenu');
    const serviceIcon = document.getElementById('service-icon');

    if (toggleButton && mobileMenu) {
        toggleButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Optional: Ubah icon hamburger ke X saat terbuka
            const icon = toggleButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-2xl';
            } else {
                icon.className = 'fas fa-times text-2xl';
            }
        });

        // Tutup menu saat klik link (untuk UX mobile yang lebih baik)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = toggleButton.querySelector('i');
                icon.className = 'fas fa-bars text-2xl';
            });
        });

        // Tutup menu saat resize ke desktop (opsional, untuk transisi smooth)
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) { // md breakpoint di Tailwind
                mobileMenu.classList.add('hidden');
                const icon = toggleButton.querySelector('i');
                icon.className = 'fas fa-bars text-2xl';
                // Reset sub-menu SERVICE
                if (serviceSubmenu) {
                    serviceSubmenu.classList.add('hidden');
                }
                if (serviceIcon) {
                    serviceIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Toggle untuk sub-menu SERVICE di mobile
    if (serviceToggle && serviceSubmenu && serviceIcon) {
        serviceToggle.addEventListener('click', function() {
            serviceSubmenu.classList.toggle('hidden');
            // Rotasi icon untuk indikasi open/close (dari down ke up)
            if (serviceSubmenu.classList.contains('hidden')) {
                serviceIcon.style.transform = 'rotate(0deg)';
            } else {
                serviceIcon.style.transform = 'rotate(180deg)';
            }
        });
    }
});

// Nonaktifkan klik kanan khusus pada gambar/logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('a[href="Index.html"] img');
    if (logo) {
        logo.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today for both start and end date inputs
    const today = new Date().toISOString().split('T')[0];
    const tanggalAwalInput = document.getElementById('tanggalAwal');
    const tanggalSelesaiInput = document.getElementById('tanggalSelesai');

    tanggalAwalInput.min = today;
    tanggalSelesaiInput.min = today;

    // Optional: Ensure end date is not before start date
    tanggalAwalInput.addEventListener('change', function() {
        if (this.value) {
            tanggalSelesaiInput.min = this.value;
        } else {
            tanggalSelesaiInput.min = today;
        }
    });
});

// Efek Parallax Hero Section: Background perlahan tertutup saat scroll
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('home');
    const heroBg = document.getElementById('hero-bg');
    const aboutSection = document.getElementById('About Us');

    if (!heroBg || !heroSection) return;

    let ticking = false; // Untuk throttle scroll event

    function updateHeroParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        const aboutTop = aboutSection.offsetTop;
        const scrollPercent = Math.min(scrolled / (aboutTop - heroHeight), 1); // 0 to 1 saat hero ke about

        // Efek: Scale background (1 to 1.1) dan opacity (1 to 0.3) saat scroll
        const scale = 1 + (scrollPercent * 0.1); // Scale ringan agar tidak terlalu dramatis
        const opacity = 1 - (scrollPercent * 0.7); // Fade 70% saat section about muncul

        heroBg.style.transform = `scale(${scale}) translateY(${scrollPercent * 50}px)`; // Tambah translateY untuk parallax
        heroBg.style.opacity = opacity;

        // Di mobile, kurangi efek jika user prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            heroBg.style.transform = 'scale(1)';
            heroBg.style.opacity = 1;
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeroParallax);
            ticking = true;
        }
    });

    // Init saat load
    updateHeroParallax();
});

function formatDateToDDMMYYYY(dateString) {
  const parts = dateString.split('-'); // ["YYYY", "MM", "DD"]
  if(parts.length !== 3) return dateString; // fallback jika format tidak sesuai
  return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
}

function submitForm(event) {
  event.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const nomor = document.getElementById('nomor').value.trim();
  const kebutuhanBus = document.getElementById('kebutuhanBus').value;
  const tanggalAwalRaw = document.getElementById('tanggalAwal').value;
  const tanggalSelesaiRaw = document.getElementById('tanggalSelesai').value;
  const jamPenjemputan = document.getElementById('jamPenjemputan').value;
  const penjemputan = document.getElementById('penjemputan').value.trim();
  const tujuan = document.getElementById('tujuan').value.trim();

  if (!nama || !nomor || !kebutuhanBus || !tanggalAwalRaw || !tanggalSelesaiRaw || !jamPenjemputan || !penjemputan || !tujuan) {
    alert('Mohon isi semua field dengan lengkap!');
    return false;
  }

  // Validasi tambahan: Pastikan tanggal selesai tidak sebelum tanggal mulai
  if (new Date(tanggalSelesaiRaw) < new Date(tanggalAwalRaw)) {
    alert('Tanggal Selesai tidak boleh sebelum Tanggal Mulai!');
    return false;
  }

  // Ubah format tanggal ke DD/MM/YYYY
  const tanggalAwal = formatDateToDDMMYYYY(tanggalAwalRaw);
  const tanggalSelesai = formatDateToDDMMYYYY(tanggalSelesaiRaw);

  const pesan = 
`*Formulir Pemesanan Bus*%0A
*Nama:* ${encodeURIComponent(nama)}%0A
*Nomor Telepon:* ${encodeURIComponent(nomor)}%0A
*Kebutuhan Bus:* ${encodeURIComponent(kebutuhanBus)}%0A
*Tanggal Mulai:* ${encodeURIComponent(tanggalAwal)}%0A
*Tanggal Selesai:* ${encodeURIComponent(tanggalSelesai)}%0A
*Jam Penjemputan:* ${encodeURIComponent(jamPenjemputan)}%0A
*Penjemputan:* ${encodeURIComponent(penjemputan)}%0A
*Tujuan:* ${encodeURIComponent(tujuan)}`;

  const waNumber = '6285640014000';
  const waUrl = `https://wa.me/${waNumber}?text=${pesan}`;
  window.open(waUrl, '_blank');

  return false;
}
