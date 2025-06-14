import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class HomePage {
    async render() {
        return `
        <section class="hero">
        <img src="../../../public/assets/background.webp" alt="Makanan sehat" class="hero-bg" loading="eager" decoding="async"/>
            <div class="hero-content">
                <h1>CaloTrack<br /><span>Pantau Kalorimu Secara Cerdas</span></h1>
                <p>
                Mulai gaya hidup sehat dengan CaloTrack – asisten pintar yang membantumu
                menghitung, memantau, dan mengelola asupan kalori harian dengan mudah
                </p>
                <a href="#/calculate" class="cta-button">Hitung kalorimu →</a>
            </div>
        </section>
        <section class="features">
            <div class="banner-features">
                <h2>Kenapa harus CaloTrack?</h2>
                <p>CaloTrack hadir sebagai solusi cerdas di tengah kesibukan modern, membantumu menganalisis dan memantau kebutuhan kalori harian secara akurat, agar gaya hidup sehat bukan lagi impian.</p>
            </div>
            <div class="feature-card">
                <div class="feature-item">
                    <i class="fa fa-calculator"></i>
                    <h2>Hitung Kalori</h2>
                    <p>Masukkan makanan yang kamu konsumsi untuk menghitung kalori secara otomatis.</p>
                    <a href="#/calculate" class="cta-button__feature">Lihat selengkapnya →</a>
                </div>
                <div class="feature-item">
                    <i class="fa-solid fa-expand"></i>
                    <h2>Prediksi Calori</h2>
                    <p>Prediksi asupan kalori harianmu dengan mudah dan efektif.</p>
                    <a href="#/predict" class="cta-button__feature">Lihat selengkapnya →</a>
                </div>
                <div class="feature-item">
                    <i class="fa-solid fa-fish"></i>
                    <h2>Rekomendasi Cerdas</h2>
                    <p>Dapatkan rekomendasi makanan sehat berdasarkan preferensi dan kebutuhanmu.</p>
                    <a href="#/recommendation" class="cta-button__feature">Lihat selengkapnya →</a>
                </div>
            </div>
        `;
    }

    async afterRender() {
        // Kosong atau bisa isi setup event listener kalau perlu
        // Hero animasi tetap dimuat langsung
        gsap.from(".hero-content h1", {
            opacity: 0,
            y: -30,
            duration: 1,
        });

        // Feature card muncul saat di-scroll
        gsap.utils.toArray(".feature-item").forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%", // saat elemen mencapai 80% dari viewport
                    toggleActions: "play none none none",
                },
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power2.out",
                delay: index * 0.2, 

            });
        });

    }
}