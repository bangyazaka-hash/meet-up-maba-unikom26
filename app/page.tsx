'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Video,
  ChevronDown,
  Users,
  Gift,
  Award,
  Coffee,
  Sparkles,
  ArrowRight,
  Send,
  ExternalLink,
} from 'lucide-react';

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

const EVENT_DATE = new Date('2026-09-13T08:30:00+07:00');

const BENEFITS: BenefitItem[] = [
  { icon: <Users className="h-5 w-5" />, text: 'Relasi antar jurusan se-UNIKOM' },
  { icon: <Sparkles className="h-5 w-5" />, text: 'Sharing session bareng senior berpengalaman' },
  { icon: <Coffee className="h-5 w-5" />, text: 'Snack & Drink gratis untuk peserta' },
  { icon: <Award className="h-5 w-5" />, text: 'E-Certificate resmi kepanitiaan' },
  { icon: <Gift className="h-5 w-5" />, text: 'Doorprize menarik & merchandise eksklusif' },
];

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
    alt: 'Interior venue meetup modern',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    alt: 'Suasana diskusi mahasiswa',
  },
  {
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop',
    alt: 'Area café yang cozy',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    alt: 'Ruang acara dengan pencahayaan hangat',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    alt: 'Suasana workshop kolaboratif',
  },
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop',
    alt: 'Momen foto bersama peserta',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const distance = EVENT_DATE.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

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

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CountdownBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-900/80 text-2xl font-bold text-amber-400 shadow-lg sm:h-20 sm:w-20 sm:text-3xl">
        {value}
      </div>
      <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase sm:text-xs">
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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  /* Smooth-scroll helper */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const isEventPassed =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* ============================================================ */}
      {/*  NAVBAR                                                       */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-sm font-black text-slate-900">
              M
            </span>
            Meetup Maba
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
                className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('benefit')}
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-amber-500 hover:shadow-md"
            >
              Daftar Sekarang
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
            {[
              { label: 'Info Acara', id: 'info' },
              { label: 'Biaya & Benefit', id: 'benefit' },
              { label: 'Galeri', id: 'galeri' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-cyan-600"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('benefit')}
              className="mt-2 w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-amber-500"
            >
              Daftar Sekarang
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
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:pt-36">
          <div className="text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-300 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Event Eksklusif Mahasiswa Baru
            </span>

            {/* Heading */}
            <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Join{' '}
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Meetup Maba
              </span>
              <br className="hidden sm:block" /> UNIKOM 2025
            </h1>

            {/* ✅ COUNTDOWN TIMER — menggantikan paragraf sub-headline */}
            <div className="mt-8">
              {isEventPassed ? (
                <p className="text-lg font-semibold text-amber-400">
                  🎉 Acara sudah dimulai! Lihat info di bawah ya.
                </p>
              ) : (
                <div className="mx-auto flex max-w-md items-center justify-center gap-3 sm:gap-4">
                  <CountdownBlock value={padZero(timeLeft.days)} label="Hari" />
                  <span className="mt-[-18px] text-xl font-bold text-slate-600">:</span>
                  <CountdownBlock value={padZero(timeLeft.hours)} label="Jam" />
                  <span className="mt-[-18px] text-xl font-bold text-slate-600">:</span>
                  <CountdownBlock value={padZero(timeLeft.minutes)} label="Menit" />
                  <span className="mt-[-18px] text-xl font-bold text-slate-600">:</span>
                  <CountdownBlock value={padZero(timeLeft.seconds)} label="Detik" />
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => scrollTo('benefit')}
                className="group flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-400/25 transition-all hover:bg-amber-500 hover:shadow-xl hover:shadow-amber-400/30 active:scale-[0.97]"
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollTo('info')}
                className="rounded-xl border border-slate-600 px-7 py-3.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                Lihat Info Acara
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
            subtitle="Simpan tanggalnya dan jangan sampai terlewat!"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card — Detail Acara */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-5 text-lg font-bold text-slate-900">Detail Acara</h3>
              <div className="flex flex-col gap-3">
                <InfoChip
                  icon={<Calendar className="h-5 w-5" />}
                  label="Sabtu, 13 September 2025"
                />
                <InfoChip
                  icon={<Clock className="h-5 w-5" />}
                  label="08.30 WIB – Selesai"
                />
                <InfoChip
                  icon={<MapPin className="h-5 w-5" />}
                  label="Aula Gedung D Lt. 5, Universitas Komputer Indonesia"
                />
              </div>

              <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
                <p className="text-sm leading-relaxed text-cyan-800">
                  <span className="font-semibold">💡 Tips:</span> Datang 15 menit lebih
                  awal untuk registrasi on-site dan dapatkan spot duduk terbaik. Bawa
                  kartu mahasiswa / bukti pendaftaran digital ya!
                </p>
              </div>
            </div>

            {/* Card — Saluran Komunikasi */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-5 text-lg font-bold text-slate-900">
                Saluran Komunikasi
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-slate-500">
                Gabung dulu di grup resmi biar nggak ketinggalan info terbaru, update
                jadwal, dan kenalan dengan teman-teman maba lainnya.
              </p>

              <div className="flex flex-col gap-3">
                {/* WhatsApp */}
                <a
                  href="https://chat.whatsapp.com/DummyLinkGrupMabaUNIKOM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5 transition-all hover:border-green-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white shadow-sm">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Grup WhatsApp Resmi Maba
                    </p>
                    <p className="text-xs text-slate-500">
                      1.200+ maba sudah gabung
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-green-600" />
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/DummyChannelMabaUNIKOM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3.5 transition-all hover:border-sky-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500 text-white shadow-sm">
                    <Send className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      Channel Telegram Info &amp; Diskusi
                    </p>
                    <p className="text-xs text-slate-500">
                      Update info, Q&amp;A, dan pengumuman
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-sky-600" />
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
          <SectionHeading
            title="Biaya & Benefit"
            subtitle="Semua kebaikan ini cuma buat kamu yang daftar."
          />

          <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-5">
            {/* Left — Price Card */}
            <div className="lg:col-span-2">
              <div className="relative h-full overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-xl sm:p-8">
                <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-400/15 blur-2xl" />

                <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                  Biaya Pendaftaran
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-amber-400 sm:text-5xl">
                    GRATIS
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Tanpa biaya apapun. 100% gratis untuk seluruh mahasiswa baru UNIKOM
                  angkatan 2025.
                </p>

                <button
                  onClick={() => {
                    const msg = encodeURIComponent(
                      'Halo, saya ingin mendaftar Meetup Maba UNIKOM 2025!'
                    );
                    window.open(
                      `https://chat.whatsapp.com/DummyLinkGrupMabaUNIKOM?text=${msg}`,
                      '_blank'
                    );
                  }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-900 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-500 hover:shadow-xl active:scale-[0.97]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Daftar via WhatsApp
                </button>

                <p className="mt-3 text-center text-[11px] text-slate-500">
                  Kuota terbatas — 200 peserta
                </p>
              </div>
            </div>

            {/* Right — Benefits */}
            <div className="lg:col-span-3">
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
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GALERI                                                       */}
      {/* ============================================================ */}
      <section id="galeri" className="scroll-mt-16 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            title="Galeri Tempat Meetup"
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
                src="https://www.youtube.com/embed//PI40LZ8Uow4?rel=0&modestbranding=1"
                title="Video Venue Meetup Maba UNIKOM"
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
            <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-sm font-black text-slate-900">
                M
              </span>
              Meetup Maba
            </div>

            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              Selamat datang di keluarga besar Universitas Komputer Indonesia! Semoga
              perjalanan kampus-mu penuh warna, prestasi, dan kenangan tak terlupakan.
              🎓✨
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://chat.whatsapp.com/DummyLinkGrupMabaUNIKOM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-green-50 hover:text-green-600"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/DummyChannelMabaUNIKOM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-600"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-2 w-full border-t border-slate-100 pt-6">
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} Meetup Maba UNIKOM. Made with{' '}
                <span className="text-red-400">♥</span> for freshers.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}