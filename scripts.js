let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.bus-card');
    const totalSlides = slides.length;

    // Update current index
    currentIndex += direction;

    // Loop back to the start or end
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Calculate the offset for the carousel
    const offset = -currentIndex * (slides[0].clientWidth + 16); // 16 is the margin-right
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}px)`;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu functionality
const MobileMenuButton = document.querySelector('.mobile-menu-button');
const NavLinks = document.querySelector('.hidden.md\\:flex');

MobileMenuButton?.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
    navLinks.classList.toggle('flex-col');
    navLinks.classList.toggle('absolute');
    navLinks.classList.toggle('top-16');
    navLinks.classList.toggle('left-0');
    navLinks.classList.toggle('w-full');
    navLinks.classList.toggle('bg-blue-800');
    navLinks.classList.toggle('p-4');
    navLinks.classList.toggle('space-y-4');
});

// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    
    logo.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah perilaku default
        window.scrollTo({
            top: 0, // Scroll ke bagian atas halaman
            behavior: 'smooth' // Efek scroll yang halus
        });
    });
});

// Fungsi lainnya tetap sama...

  function submitForm(event) {
  event.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const nomor = document.getElementById('nomor').value.trim();
  const kebutuhanBus = document.getElementById('kebutuhanBus').value;
  const tanggalMulai = document.getElementById('tanggalAwal').value;
  const tanggalSelesai = document.getElementById('tanggalSelesai').value;
  const penjemputan = document.getElementById('penjemputan').value.trim();
  const tujuan = document.getElementById('tujuan').value.trim();

  if (!nama || !nomor || !kebutuhanBus || !tanggalMulai || !tanggalSelesai || !penjemputan || !tujuan) {
    alert('Semua field wajib diisi.');
    return false;
  }

  if (tanggalSelesai < tanggalMulai) {
    alert('Tanggal Selesai tidak boleh sebelum tanggal Mulai.');
    return false;
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const tanggalMulaiFormatted = formatDate(tanggalMulai);
  const tanggalSelesaiFormatted = formatDate(tanggalSelesai);

  const message = 
`Halo, saya ingin melakukan reservasi bus dengan detail berikut:
Nama: ${nama}
Nomor Telepon: ${nomor}
Kebutuhan Bus: ${kebutuhanBus}
Tanggal Mulai: ${tanggalMulaiFormatted}
Tanggal Selesai: ${tanggalSelesaiFormatted}
Penjemputan: ${penjemputan}
Tujuan: ${tujuan}`;

  const waNumber = '6285640014000'; // Nomor WhatsApp tujuan
  const encodedMessage = encodeURIComponent(message);
  const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;
  window.open(waURL, '_blank');

  return false;
}

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.hidden.md\\:flex');
    
    mobileMenuButton?.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('flex-col');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('top-16');
        navLinks.classList.toggle('left-0');
        navLinks.classList.toggle('w-full');
        navLinks.classList.toggle('bg-blue-800');
        navLinks.classList.toggle('p-4');
        navLinks.classList.toggle('space-y-4');
    });

    