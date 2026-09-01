'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Video,
  Users,
  Gift,
  Award,
  Coffee,
  Sparkles,
  ArrowRight,
  Phone,
  ExternalLink,
  AlertTriangle,
  Menu,
  X,
  Music2Icon,
  Gamepad2Icon,
} from 'lucide-react';
import { DM_Sans } from 'next/font/google';

/* ------------------------------------------------------------------ */
/*  Font                                                               */
/* ------------------------------------------------------------------ */

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface BenefitItem {
  icon: React.ReactNode;
  text: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const EVENT_DATE = new Date('2026-09-08T13:00:00+07:00');
const INITIAL_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

const BENEFITS: BenefitItem[] = [
  { icon: <Users className="h-5 w-5" />, text: 'Relasi antar jurusan se-kampus' },
  { icon: <Sparkles className="h-5 w-5" />, text: 'Sharing session bareng senior berpengalaman' },
  { icon: <Coffee className="h-5 w-5" />, text: 'Makan & Minum pilihan untuk peserta' },
  { icon: <Video className="h-5 w-5" />, text: 'Photobooth dengan para pendatang' },
  { icon: <Gamepad2Icon className="h-5 w-5" />, text: 'Bermain game dengan teman-teman maba' },
  { icon: <Music2Icon className="h-5 w-5" />, text: 'Nikmati live musik & Dj yang akan datang' },
  { icon: <Gift className="h-5 w-5" />, text: 'Doorprize menarik & merchandise eksklusif' },
];

const GALLERY_IMAGES = [
  { src: '/place1.png', alt: 'Atap yang artistik dengan pencahayaan hangat' },
  { src: '/place4.png', alt: 'Area indoor dengan dekorasi cozy' },
  { src: '/place3.png', alt: 'Area berkumpul dengan meja dan kursi nyaman' },
  { src: '/place8.png', alt: 'Ruang live music dengan pencahayaan artistik' },
  { src: '/place2.png', alt: 'Suasana workshop kolaboratif' },
  { src: '/place6.png', alt: 'Area depan dengan pencahayaan modern' },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const distance = EVENT_DATE.getTime() - now;
  if (distance <= 0) return { ...INITIAL_TIME };
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

function padZero(n: number): string {
  return n.toString().padStart(2, '0');
}

function isAllZero(t: TimeLeft): boolean {
  return t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CountdownBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-900/80 text-2xl font-bold text-amber-400 shadow-lg sm:h-24 sm:w-24 sm:rounded-2xl sm:text-4xl">
        {value}
      </div>
      <span className="mt-1.5 text-[9px] font-bold tracking-widest text-slate-400 uppercase sm:mt-2 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-500 sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
      <span className="text-cyan-600">{icon}</span>
      {label}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function MeetupMabaPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIME);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
  }, []);

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick, mounted]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const eventPassed = mounted && isAllZero(timeLeft);

  return (
    <div className={`${dmSans.variable} min-h-screen font-sans bg-slate-50 text-slate-900 antialiased`}>
      {/* ============================================================ */}
      {/*  NAVBAR                                                       */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5"
          >
            <img
              src="/logo2.png"
              alt="Logo TwenSix"
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
            <span
              className="bg-gradient-to-r from-amber-400 to-[#92EEFF] bg-clip-text text-transparent text-lg font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              TwenSix
            </span>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {[
              { label: 'Info Acara', id: 'info' },
              { label: 'Biaya & Benefit', id: 'benefit' },
              { label: 'Galeri', id: 'galeri' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-400"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('benefit')}
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-amber-500 hover:shadow-md"
            >
              Informasi lebih lanjut
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-slate-900/95 px-4 pb-4 pt-2 md:hidden">
            {[
              { label: 'Info Acara', id: 'info' },
              { label: 'Biaya & Benefit', id: 'benefit' },
              { label: 'Galeri', id: 'galeri' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('benefit')}
              className="mt-2 w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-amber-500"
            >
              Informasi lebih lanjut
            </button>
          </div>
        )}
      </nav>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800"
      >
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100dvh-52px)] max-w-6xl flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-20">
          <div className="w-full max-w-2xl text-center">

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-amber-300 uppercase animate-[heroFadeIn_0.6s_ease-out_both]">
              <Sparkles className="h-3 w-3" />
              Event Eksklusif Mahasiswa Baru
            </span>

            <h1
              className="mt-6 text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:mt-8 sm:text-5xl lg:text-6xl animate-[heroSlideUp_0.7s_ease-out_0.1s_both]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              First{' '}
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Meet Maba
              </span>{' '}
              2026
            </h1>

            <p className="mt-3 text-lg font-bold leading-snug tracking-wide text-white sm:mt-4 sm:text-xl lg:text-2xl whitespace-nowrap animate-[heroSlideUp_0.7s_ease-out_0.15s_both]">
              Your First Step, <span className="text-amber-400/90">Your New Story.</span>
            </p>

            <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-slate-400 sm:mt-5 sm:text-sm animate-[heroSlideUp_0.7s_ease-out_0.2s_both]">
              Kenali kampusmu, temukan teman baru dari berbagai jurusan & mulai
              perjalanan baru sebagai calon mahasiswa/i baru.
            </p>

            <p className="mt-10 text-[10px] font-bold tracking-[0.25em] text-slate-500 uppercase sm:mt-12 sm:text-xs animate-[heroSlideUp_0.7s_ease-out_0.25s_both]">
              Event starts in
            </p>

            <div className="mt-4 animate-[heroSlideUp_0.7s_ease-out_0.3s_both]">
              {!mounted ? (
                <div className="mx-auto flex max-w-xs items-start justify-center gap-2.5 sm:max-w-lg sm:gap-5">
                  {['Hari', 'Jam', 'Menit', 'Detik'].map((label) => (
                    <div key={label} className="flex flex-col items-center">
                      <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-xl bg-slate-800 sm:h-24 sm:w-24 sm:rounded-2xl" />
                      <span className="mt-1.5 text-[9px] font-bold tracking-widest text-slate-600 uppercase sm:mt-2 sm:text-xs">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : eventPassed ? (
                <p className="text-lg font-semibold text-amber-400">
                  🎉 Acara sudah dimulai! Lihat info di bawah ya.
                </p>
              ) : (
                <div className="mx-auto flex max-w-xs items-start justify-center gap-2.5 sm:max-w-lg sm:gap-5">
                  <CountdownBlock value={padZero(timeLeft.days)} label="Hari" />
                  <CountdownBlock value={padZero(timeLeft.hours)} label="Jam" />
                  <CountdownBlock value={padZero(timeLeft.minutes)} label="Menit" />
                  <CountdownBlock value={padZero(timeLeft.seconds)} label="Detik" />
                </div>
              )}
            </div>

            <div className="mt-8 sm:mt-10 animate-[heroSlideUp_0.7s_ease-out_0.4s_both]">
              <button
                onClick={() => scrollTo('benefit')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-400/25 transition-all hover:bg-amber-500 hover:shadow-xl hover:shadow-amber-400/30 active:scale-[0.97] sm:px-10 sm:py-4 sm:text-base"
              >
                Informasi lebih lanjut
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INFO ACARA & KOMUNIKASI                                      */}
      {/* ============================================================ */}
      <section id="info" className="scroll-mt-16 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            title="Informasi Acara"
            subtitle="Catat tanggalnya & jangan sampai ketinggalan momen pertama bersama camaba lainnya!"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-5 text-lg font-bold text-slate-900">Detail Acara</h3>
              <div className="flex flex-col gap-3">
                <InfoChip
                  icon={<Calendar className="h-5 w-5" />}
                  label="Kamis, 8 September 2026"
                />
                <InfoChip
                  icon={<Clock className="h-5 w-5" />}
                  label="13.00 WIB – Selesai"
                />
                <InfoChip
                  icon={<MapPin className="h-5 w-5" />}
                  label="Cafe Randa, Kota Bandung"
                />
              </div>

              <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
                <p className="text-sm leading-relaxed text-cyan-800">
                  <span className="font-semibold">💡 Tips:</span> Datang 15 menit lebih
                  awal untuk registrasi on-site dan dapatkan spot duduk terbaik. Bawa
                  kartu mahasiswa / bukti pendaftaran digital ya!
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-red-500" />
                  <span className="text-sm font-bold text-red-700">Larangan Peserta</span>
                </div>
                <ul className="ml-6.5 list-disc space-y-1 text-sm leading-relaxed text-red-700/90">
                  <li>Dilarang membawa dan/atau mengonsumsi <strong>minuman beralkohol</strong></li>
                  <li>Dilarang membawa <strong>obat-obatan terlarang / narkotika</strong></li>
                  <li>Dilarang membawa <strong>senjata tajam / benda berbahaya</strong> dalam bentuk apapun</li>
                </ul>
                <p className="mt-2.5 text-xs font-medium text-red-500">
                  Pelanggaran akan ditindaklanjuti sesuai peraturan kampus dan hukum yang berlaku.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-5 text-lg font-bold text-slate-900">
                Kontak & Saluran Komunikasi
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-slate-500">
                Gabung di grup resmi untuk update terbaru & kenalan dengan teman-teman camaba lainnya
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://whatsapp.com/channel/0029Vb8aHdl0VycIdbMdCw3e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5 transition-all hover:border-green-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white shadow-sm">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Saluran whatsapp twensix
                    </p>
                    <p className="text-xs text-slate-500">
                      200+ maba sudah bergabung
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-green-600" />
                </a>

                <a
                  href="https://wa.me/6285136319699?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20Meetup%20Maba%202026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5 transition-all hover:border-green-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Faiq (FTIK)
                    </p>
                    <p className="text-xs text-slate-500">
                      +62 851-3631-9699
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-green-600" />
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

           {/* ============================================================ */}
      {/*  BIAYA & BENEFIT                                              */}
      {/* ============================================================ */}
      <section id="benefit" className="scroll-mt-16 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading title="Biaya & Benefit" />

          {/* --- Price Banner --- */}
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl bg-slate-900 px-6 py-8 text-center shadow-2xl sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

            <p className="relative text-sm leading-relaxed text-slate-400">
              Biaya pendaftaran untuk seluruh mahasiswa baru angkatan 2026
            </p>

            <p className="relative mt-3 text-[10px] font-bold tracking-[0.25em] text-amber-400/60 uppercase sm:text-xs">
              Hanya dengan
            </p>

            <p
              className="relative mt-2 text-5xl font-extrabold leading-none text-amber-400 sm:text-6xl"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Rp.60.000
            </p>

            <p className="relative mt-4 text-[11px] leading-relaxed text-slate-500">
              Kuota terbatas — daftarlah secepatnya agar tidak melewatkan event terbatas ini.
            </p>
          </div>

          {/* --- Benefits List (original style) --- */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
              <h3 className="mb-5 text-lg font-bold text-slate-900">
                Apa aja yang kamu dapat?
              </h3>
              <ul className="flex flex-col gap-4">
                {BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                      {b.icon}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-slate-700">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GALERI                                                       */}
      {/* ============================================================ */}
      <section id="galeri" className="scroll-mt-16 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            title="Galery Venue Acara"
            subtitle="Sneak peek suasana venue yang bakal jadi lokasi acara kita."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-slate-200 shadow-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Video className="h-5 w-5 text-cyan-600" />
              <h3 className="text-lg font-bold text-slate-900">Video Venue</h3>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-900 shadow-md">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/7a3Si0SU3fw?rel=0&modestbranding=1"
                title="Video Venue Meetup Maba"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5"
            >
              <img
                src="/logo2.png"
                alt="Logo TwenSix"
                className="h-8 w-8 object-contain"
              />
              <span
                className="bg-gradient-to-r from-amber-400 to-[#92EEFF] bg-clip-text text-transparent text-lg font-extrabold tracking-tight"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                TwenSix
              </span>
            </button>

            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              Selamat datang di keluarga besar Twensix! Semoga
              perjalanan hidup-mu penuh warna, prestasi, dan kenangan tak terlupakan.
              🎓✨
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://whatsapp.com/channel/0029Vb8aHdl0VycIdbMdCw3e"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-green-50 hover:text-green-600"
                aria-label="WhatsApp Grup"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/6285136319699"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-green-50 hover:text-green-600"
                aria-label="WhatsApp CP Panitia"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-2 w-full border-t border-slate-100 pt-6">
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} Meetup Maba. Made with{' '}
                <span className="text-red-400">♥</span> for freshers.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/*  ANIMASI  */}
      <style jsx>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}