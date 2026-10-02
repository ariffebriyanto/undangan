/**
 * Tito & Andini Wedding Invitation Interactive Script
 * Multi-Event Architecture:
 * 1. Walimatul 'Ursi / Syukuran (9 Okt 2026, 19:00 WIB, Jl. Rembang 25 A Surabaya)
 * 2. Akad Nikah & Resepsi (10 Okt 2026, Akad 10:00 & Resepsi 11:00-14:00 WIB, Aula Masjid Ulul Azmi UNAIR)
 * 3. Ngunduh Mantu (11 Okt 2026, 08:00 WIB, Jl. Rembang 25 A Surabaya)
 */

/* ========================================================
   CONFIG DATA FOR 3 WEDDING EVENTS
   ======================================================== */
const WEDDING_EVENTS = {
  walimah: {
    id: 'walimah',
    badge: "WALIMATUL 'URSI",
    title: "Walimatul 'Ursi",
    subtitle: "Acara Syukuran Pernikahan",
    coverSub: "Syukuran Walimatul 'Ursi",
    dateFormatted: "Jumat, 9 Oktober 2026",
    dateDayName: "JUMAT",
    dateDayNum: "09",
    dateMonthYear: "OKTOBER 2026",
    timeDisplay: "Pukul 19.00 WIB (Ba'da Isya) - Selesai",
    timeShort: "19.00 WIB - Selesai",
    venueName: "Kediaman Mempelai Pria (Bpk. Abdul Karim & Ibu Sumarni)",
    addressShort: "Jl. Rembang 25 A, Surabaya",
    addressFull: "Jl. Rembang No. 25 A, Kec. Bubutan, Surabaya, Jawa Timur",
    addressNote: "📌 Akses dekat Jl. Dupak / Krembangan / Pasar Turi Surabaya",
    targetDate: new Date('2026-10-09T19:00:00+07:00').getTime(),
    calStart: "20261009T120000Z", // 19:00 WIB = 12:00 UTC
    calEnd: "20261009T160000Z",   // 23:00 WIB = 16:00 UTC
    calTitle: "Walimatul 'Ursi: Tito Sumarsono & Andini Melati Putri",
    calDesc: "Acara Syukuran Walimatul 'Ursi Tito Sumarsono & Andini Melati Putri bertempat di Jl. Rembang 25 A, Surabaya.",
    mapLat: -7.2475,
    mapLng: 112.7275,
    gmapsQuery: "Jl.+Rembang+25+A+Surabaya",
    gmapsIframe: "https://maps.google.com/maps?q=Jl.+Rembang+25+A+Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed",
    gmapsDir: "https://www.google.com/maps/dir/?api=1&destination=Jl.+Rembang+25A+Surabaya",
    storageKey: "tito_andini_wishes_walimah",
    defaultWishes: []
  },
  akad: {
    id: 'akad',
    badge: "AKAD NIKAH & RESEPSI",
    title: "Akad Nikah & Resepsi",
    subtitle: "Prosesi Ijab Qabul & Resepsi Pernikahan",
    coverSub: "Akad Nikah & Resepsi",
    dateFormatted: "Sabtu, 10 Oktober 2026",
    dateDayName: "SABTU",
    dateDayNum: "10",
    dateMonthYear: "OKTOBER 2026",
    timeDisplay: "Akad: 10.00 WIB | Resepsi: 11.00 - 14.00 WIB",
    timeShort: "10.00 - 14.00 WIB",
    venueName: "Aula Masjid Ulul Azmi Universitas Airlangga Kampus C",
    addressShort: "Masjid Ulul Azmi UNAIR Kampus C, Surabaya",
    addressFull: "Aula Masjid Ulul Azmi, Jl. Dr. Ir. H.Soekarno Kampus C UNAIR, Mulyorejo, Surabaya, Jawa Timur",
    addressNote: "📌 Kompleks Kampus C Universitas Airlangga, Mulyorejo Surabaya",
    targetDate: new Date('2026-10-10T10:00:00+07:00').getTime(),
    calStart: "20261010T030000Z", // 10:00 WIB = 03:00 UTC
    calEnd: "20261010T070000Z",   // 14:00 WIB = 07:00 UTC
    calTitle: "Akad Nikah & Resepsi: Tito Sumarsono & Andini Melati Putri",
    calDesc: "Akad Nikah (10.00 WIB) & Resepsi Pernikahan (11.00 - 14.00 WIB) Tito & Andini bertempat di Aula Masjid Ulul Azmi Kampus C UNAIR Surabaya.",
    mapLat: -7.270928,
    mapLng: 112.784407,
    gmapsQuery: "Masjid+Ulul+Azmi+Universitas+Airlangga+Surabaya",
    gmapsIframe: "https://maps.google.com/maps?q=Masjid+Ulul+Azmi+Universitas+Airlangga+Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed",
    gmapsDir: "https://www.google.com/maps/dir/?api=1&destination=Masjid+Ulul+Azmi+Universitas+Airlangga+Surabaya",
    storageKey: "tito_andini_wishes_akad",
    defaultWishes: []
  },
  'ngunduh-mantu': {
    id: 'ngunduh-mantu',
    badge: "NGUNDUH MANTU",
    title: "Ngunduh Mantu",
    subtitle: "Acara Tasyakuran Ngunduh Mantu",
    coverSub: "Tasyakuran Ngunduh Mantu",
    dateFormatted: "Minggu, 11 Oktober 2026",
    dateDayName: "MINGGU",
    dateDayNum: "11",
    dateMonthYear: "OKTOBER 2026",
    timeDisplay: "Pukul 08.00 WIB - Selesai",
    timeShort: "08.00 WIB - Selesai",
    venueName: "Kediaman Mempelai Pria (Bpk. Abdul Karim & Ibu Sumarni)",
    addressShort: "Jl. Rembang 25 A, Surabaya",
    addressFull: "Jl. Rembang No. 25 A, Kec. Bubutan, Surabaya, Jawa Timur",
    addressNote: "📌 Akses dekat Jl. Dupak / Krembangan / Pasar Turi Surabaya",
    targetDate: new Date('2026-10-11T08:00:00+07:00').getTime(),
    calStart: "20261011T010000Z", // 08:00 WIB = 01:00 UTC
    calEnd: "20261011T070000Z",   // 14:00 WIB = 07:00 UTC
    calTitle: "Ngunduh Mantu: Tito Sumarsono & Andini Melati Putri",
    calDesc: "Acara Tasyakuran Ngunduh Mantu Tito Sumarsono & Andini Melati Putri di Jl. Rembang 25 A, Surabaya.",
    mapLat: -7.2475,
    mapLng: 112.7275,
    gmapsQuery: "Jl.+Rembang+25+A+Surabaya",
    gmapsIframe: "https://maps.google.com/maps?q=Jl.+Rembang+25+A+Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed",
    gmapsDir: "https://www.google.com/maps/dir/?api=1&destination=Jl.+Rembang+25A+Surabaya",
    storageKey: "tito_andini_wishes_mantu",
    defaultWishes: []
  }
};

let currentEvent = null;
let weddingMap = null;
let currentMapMarker = null;

/* ========================================================
   INITIALIZATION
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Determine current active event
  currentEvent = resolveActiveEvent();

  // Apply event metadata to DOM
  applyEventToDOM(currentEvent);

  // 1. Guest Name from URL Parameter (?to=Nama+Tamu or ?u=Nama+Tamu)
  initGuestName();

  // 2. Cover / Envelope Opening
  initCoverModal();

  // 3. Audio & Music Player
  initMusicPlayer();

  // 4. Countdown Timer
  initCountdown();

  // 5. Calendar Integration (Google Calendar & ICS)
  initCalendar();

  // 6. Gallery Lightbox & Filtering (Using new photos)
  initGallery();

  // 7. Event Switcher (if tabs exist)
  initEventSwitcher();

  // 8. Guestbook & RSVP with Event-Segregated LocalStorage
  initGuestbook();

  // 9. Copy to Clipboard (Bank Account & Address)
  initCopyButtons();

  // 10. Falling Petals & Sparkles Canvas Animation
  initPetalsCanvas();

  // 11. Interactive Leaflet & Google Maps View
  initLeafletMap();

  // 12. Navigation Spy
  initNavSpy();
});

/* ========================================================
   RESOLVE ACTIVE EVENT
   ======================================================== */
function resolveActiveEvent() {
  // 1. Check data-event attribute on body
  const bodyEvent = document.body.dataset.event;
  if (bodyEvent && WEDDING_EVENTS[bodyEvent]) {
    return WEDDING_EVENTS[bodyEvent];
  }

  // 2. Check URL search param (?acara=... or ?event=...)
  const urlParams = new URLSearchParams(window.location.search);
  const paramEvent = urlParams.get('acara') || urlParams.get('event');
  if (paramEvent) {
    const key = paramEvent.toLowerCase().trim();
    if (key === 'walimah' || key === 'syukuran') return WEDDING_EVENTS.walimah;
    if (key === 'akad' || key === 'resepsi') return WEDDING_EVENTS.akad;
    if (key === 'ngunduh-mantu' || key === 'ngunduh' || key === 'mantu' || key === 'unduhmantu') return WEDDING_EVENTS['ngunduh-mantu'];
  }

  // 3. Check pathname
  const path = window.location.pathname.toLowerCase();
  if (path.includes('/walimah')) return WEDDING_EVENTS.walimah;
  if (path.includes('/akad')) return WEDDING_EVENTS.akad;
  if (path.includes('/ngunduh-mantu') || path.includes('/mantu')) return WEDDING_EVENTS['ngunduh-mantu'];

  // Default to Walimatul 'Ursi
  return WEDDING_EVENTS.walimah;
}

/* ========================================================
   APPLY EVENT DETAILS TO DOM ELEMENTS
   ======================================================== */
function applyEventToDOM(event) {
  if (!event) return;

  // Cover Screen
  const coverSub = document.querySelector('.cover-sub');
  if (coverSub) coverSub.textContent = event.coverSub;

  const coverDatePill = document.querySelector('.cover-date-pill');
  if (coverDatePill) coverDatePill.textContent = event.dateFormatted;

  // Hero Section
  const invitationType = document.querySelector('.invitation-type');
  if (invitationType) invitationType.textContent = event.title;

  const invitationSubtitle = document.querySelector('.invitation-subtitle');
  if (invitationSubtitle) invitationSubtitle.textContent = event.subtitle;

  const heroDate = document.querySelector('.hero-date');
  if (heroDate) {
    heroDate.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 4h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
      ${event.dateFormatted} • Surabaya
    `;
  }

  // Highlight Banner
  const bannerDayName = document.querySelector('.highlight-date-badge .day-name');
  if (bannerDayName) bannerDayName.textContent = event.dateDayName;

  const bannerDayNum = document.querySelector('.highlight-date-badge .day-num');
  if (bannerDayNum) bannerDayNum.textContent = event.dateDayNum;

  const bannerMonthYear = document.querySelector('.highlight-date-badge .month-year');
  if (bannerMonthYear) bannerMonthYear.textContent = event.dateMonthYear;

  const highlightTimeInfo = document.querySelector('.highlight-time-info');
  if (highlightTimeInfo) {
    highlightTimeInfo.innerHTML = `
      <h4>${event.timeDisplay}</h4>
      <p>${event.title} • ${event.addressShort}</p>
    `;
  }

  // Map Text & Address Card
  const locDetailCard = document.querySelector('.location-detail-card .loc-text');
  if (locDetailCard) {
    locDetailCard.innerHTML = `
      <strong>${event.venueName}</strong>
      <p>${event.addressFull}</p>
      <span class="loc-note">${event.addressNote}</span>
    `;
  }

  // Floating map badge
  const mapFloatingBadge = document.querySelector('.map-floating-badge');
  if (mapFloatingBadge) {
    mapFloatingBadge.innerHTML = `
      <span class="pulse-dot"></span>
      <span>Lokasi Acara: ${event.addressShort}</span>
    `;
  }

  // Map Direction Button
  const btnMap = document.querySelector('.btn-map');
  if (btnMap) {
    btnMap.href = event.gmapsDir;
  }

  // Google Maps View Button
  const btnGmaps = document.querySelector('.map-action-grid a.btn-copy-alt');
  if (btnGmaps) {
    btnGmaps.href = `https://maps.google.com/?q=${event.gmapsQuery}`;
  }

  // Copy Address Button
  const btnCopyAddr = document.querySelector('.map-section-box .btn-copy');
  if (btnCopyAddr) {
    btnCopyAddr.dataset.copy = `${event.venueName} - ${event.addressFull}`;
  }

  // Google Maps Iframe Fallback
  const gmapsIframe = document.querySelector('#gmaps-map-wrap iframe');
  if (gmapsIframe) {
    gmapsIframe.src = event.gmapsIframe;
  }

  // Update Leaflet Map view if map already loaded
  updateLeafletMapView(event);
}

/* ========================================================
   1. GUEST NAME INJECTION
   ======================================================== */
function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest');
  const guestNameEl = document.getElementById('guest-name');
  const rsvpNameInput = document.getElementById('rsvp-name');

  if (guestParam) {
    let formattedName = decodeURIComponent(guestParam.replace(/\+/g, ' ')).trim();
    if (formattedName) {
      if (guestNameEl) guestNameEl.textContent = formattedName;
      if (rsvpNameInput) rsvpNameInput.value = formattedName;
      return;
    }
  }

  if (guestNameEl) guestNameEl.textContent = 'Tamu Undangan';
}

/* ========================================================
   2. COVER / ENVELOPE MODAL
   ======================================================== */
function initCoverModal() {
  const coverScreen = document.getElementById('cover-screen');
  const openBtn = document.getElementById('btn-open-invitation');

  if (!coverScreen || !openBtn) return;

  document.body.style.overflow = 'hidden';

  openBtn.addEventListener('click', () => {
    coverScreen.classList.add('opened');
    document.body.style.overflow = '';

    playWeddingMusic();
    showToast('Selamat datang di undangan kami ✨');

    setTimeout(() => {
      if (weddingMap) weddingMap.invalidateSize();
    }, 600);
  });
}

/* ========================================================
   3. BACKGROUND MUSIC (WEB AUDIO API ROMANTIC HARP/PIANO)
   ======================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;
let bgAudioElement = null;

function initMusicPlayer() {
  const musicToggle = document.getElementById('music-toggle');
  bgAudioElement = document.getElementById('bg-audio');

  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (isMusicPlaying) {
        pauseWeddingMusic();
      } else {
        playWeddingMusic();
      }
    });
  }
}

function playWeddingMusic() {
  const musicToggle = document.getElementById('music-toggle');

  if (bgAudioElement && bgAudioElement.src && !bgAudioElement.src.endsWith('#')) {
    bgAudioElement.play().then(() => {
      isMusicPlaying = true;
      if (musicToggle) musicToggle.classList.add('playing');
      return;
    }).catch(() => {
      startGenerativeAcousticHarp();
    });
  } else {
    startGenerativeAcousticHarp();
  }

  isMusicPlaying = true;
  if (musicToggle) musicToggle.classList.add('playing');
}

function pauseWeddingMusic() {
  const musicToggle = document.getElementById('music-toggle');
  if (bgAudioElement) bgAudioElement.pause();
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  isMusicPlaying = false;
  if (musicToggle) musicToggle.classList.remove('playing');
}

function startGenerativeAcousticHarp() {
  if (musicInterval) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Pentatonic scale chords in C Major / A Minor
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

    function playNote(freq, delay = 0, duration = 2.2) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + delay);
      osc.stop(audioCtx.currentTime + delay + duration);
    }

    function playArpeggio() {
      const idx1 = Math.floor(Math.random() * 3);
      const idx2 = idx1 + 2;
      const idx3 = idx2 + 2;
      const idx4 = idx3 + 2;

      playNote(scale[idx1 % scale.length], 0);
      playNote(scale[idx2 % scale.length], 0.28);
      playNote(scale[idx3 % scale.length], 0.56);
      playNote(scale[idx4 % scale.length], 0.84);
    }

    playArpeggio();
    musicInterval = setInterval(playArpeggio, 2800);
  } catch (e) {
    console.log('Generative music not supported:', e);
  }
}

/* ========================================================
   4. COUNTDOWN TIMER
   ======================================================== */
let countdownTimerId = null;

function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const target = currentEvent ? currentEvent.targetDate : new Date('2026-10-09T19:00:00+07:00').getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  if (countdownTimerId) clearInterval(countdownTimerId);
  countdownTimerId = setInterval(update, 1000);
}

/* ========================================================
   5. CALENDAR INTEGRATION
   ======================================================== */
function initCalendar() {
  const gcalBtn = document.getElementById('btn-google-calendar');
  const icalBtn = document.getElementById('btn-ical-calendar');

  if (gcalBtn) {
    gcalBtn.addEventListener('click', () => {
      const ev = currentEvent || WEDDING_EVENTS.walimah;
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.calTitle)}&dates=${ev.calStart}/${ev.calEnd}&details=${encodeURIComponent(ev.calDesc)}&location=${encodeURIComponent(ev.addressFull)}`;
      window.open(gcalUrl, '_blank');
    });
  }

  if (icalBtn) {
    icalBtn.addEventListener('click', () => {
      const ev = currentEvent || WEDDING_EVENTS.walimah;
      const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tito and Andini Wedding//ID
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${ev.calTitle}
DESCRIPTION:${ev.calDesc}
LOCATION:${ev.addressFull}
DTSTART:${ev.calStart}
DTEND:${ev.calEnd}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${ev.id}-Tito-Andini.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Jadwal kalender berhasil diunduh!');
    });
  }
}

/* ========================================================
   6. GALLERY LIGHTBOX & TABS
   ======================================================== */
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // 1. Lightbox setup
  let currentImageIndex = 0;
  const imageSources = [];

  galleryItems.forEach((card, index) => {
    const img = card.querySelector('img');
    if (img) {
      imageSources.push({
        src: img.src,
        caption: card.querySelector('.gallery-caption')?.textContent || ''
      });

      card.addEventListener('click', () => {
        openLightbox(index);
      });
    }
  });

  function openLightbox(index) {
    if (!lightbox || !lightboxImg || !imageSources[index]) return;
    currentImageIndex = index;
    lightboxImg.src = imageSources[index].src;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
      lightboxImg.src = imageSources[currentImageIndex].src;
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % imageSources.length;
      lightboxImg.src = imageSources[currentImageIndex].src;
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });

  // 2. 2-Slide Carousel Controller
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dots = document.querySelectorAll('.slider-dot');
  const pageText = document.getElementById('slider-page-text');

  let activeSlide = 0;
  const totalSlides = 2;

  function updateSlider(slideIndex) {
    if (!track) return;
    activeSlide = (slideIndex + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${activeSlide * 50}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeSlide);
    });

    if (pageText) {
      pageText.textContent = `Slide ${activeSlide + 1} dari ${totalSlides}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlider(activeSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlider(activeSlide + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.dataset.slide, 10);
      if (!isNaN(targetIndex)) {
        updateSlider(targetIndex);
      }
    });
  });

  // Touch Swipe for mobile devices
  if (track) {
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          updateSlider(activeSlide + 1); // Swipe left -> next
        } else {
          updateSlider(activeSlide - 1); // Swipe right -> prev
        }
      }
    }, { passive: true });
  }
}

/* ========================================================
   7. EVENT SWITCHER (TABS FOR MASTER / MAIN PAGE)
   ======================================================== */
function initEventSwitcher() {
  const switcherBtns = document.querySelectorAll('.event-tab-btn');
  if (!switcherBtns.length) return;

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventKey = btn.dataset.event;
      if (WEDDING_EVENTS[eventKey]) {
        switcherBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentEvent = WEDDING_EVENTS[eventKey];
        applyEventToDOM(currentEvent);
        initCountdown();
        initGuestbook(); // Reload comments for this specific event!

        showToast(`Beralih ke jadwal: ${currentEvent.title}`);
      }
    });
  });
}

/* ========================================================
   8. GUESTBOOK & RSVP WITH EVENT-SEGREGATED STORAGE & LIKES
   ======================================================== */
function initGuestbook() {
  const form = document.getElementById('rsvp-form');
  const wishesListEl = document.getElementById('guest-wishes-list');
  const statTotalEl = document.getElementById('stat-total');
  const statHadirEl = document.getElementById('stat-hadir');
  const statLikesEl = document.getElementById('stat-likes');
  const countAllWishesEl = document.getElementById('count-all-wishes');
  const filterTabs = document.querySelectorAll('.comment-tab');

  const ev = currentEvent || WEDDING_EVENTS.walimah;
  const storageKey = ev.storageKey;

  let activeFilter = 'all';

  // Load from local storage or set event defaults
  let wishes = [];
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      wishes = JSON.parse(saved);
      // Clean up any old mock/dummy items
      wishes = wishes.filter(item => item && item.id && !item.id.startsWith('w-w') && !item.id.startsWith('w-a') && !item.id.startsWith('w-m') && !/^w-[1-9]$/.test(item.id));
      localStorage.setItem(storageKey, JSON.stringify(wishes));
    } else {
      wishes = [];
      localStorage.setItem(storageKey, JSON.stringify(wishes));
    }
  } catch (e) {
    wishes = [];
  }

  function saveWishes() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishes));
    } catch (e) {}
  }

  function renderWishes() {
    if (!wishesListEl) return;
    wishesListEl.innerHTML = '';

    let totalHadir = 0;
    let totalLikes = 0;

    wishes.forEach(item => {
      if (item.status === 'hadir') totalHadir++;
      totalLikes += (item.likes || 0);
    });

    if (statTotalEl) statTotalEl.textContent = wishes.length;
    if (statHadirEl) statHadirEl.textContent = totalHadir;
    if (statLikesEl) statLikesEl.textContent = totalLikes;
    if (countAllWishesEl) countAllWishesEl.textContent = wishes.length;

    const filtered = wishes.filter(item => {
      if (activeFilter === 'all') return true;
      return item.status === activeFilter;
    });

    if (filtered.length === 0) {
      wishesListEl.innerHTML = `
        <div style="text-align: center; padding: 28px 16px; color: var(--text-muted); font-size: 0.88rem; background: var(--bg-cream); border-radius: 16px; border: 1px dashed rgba(212, 175, 55, 0.4);">
          <div style="font-size: 1.8rem; margin-bottom: 6px;">💌</div>
          Belum ada komentar dan ucapan.<br>Jadilah yang pertama memberikan doa restu untuk Tito &amp; Andini!
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'wish-card';

      let statusLabel = 'Hadir';
      let statusClass = 'hadir';
      if (item.status === 'tidak-hadir') {
        statusLabel = 'Berhalangan';
        statusClass = 'tidak-hadir';
      } else if (item.status === 'ragu') {
        statusLabel = 'Masih Ragu';
        statusClass = 'ragu';
      }

      const initial = item.name.charAt(0).toUpperCase();

      card.innerHTML = `
        <div class="wish-header">
          <div class="wish-author">
            <div class="wish-avatar">${initial}</div>
            <div class="wish-author-info">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${item.time || 'Baru saja'}</span>
            </div>
          </div>
          <span class="wish-status-badge ${statusClass}">
            ${statusLabel}
          </span>
        </div>
        <div class="wish-body">
          ${escapeHtml(item.message)}
        </div>
        <div class="wish-footer">
          <span class="wish-guest-count">👥 ${item.guestCount || '2 Orang'}</span>
          <button class="wish-likes-btn ${item.userLiked ? 'liked' : ''}" data-id="${item.id}">
            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span class="like-num">${item.likes || 0}</span>
          </button>
        </div>
      `;

      const likeBtn = card.querySelector('.wish-likes-btn');
      likeBtn.addEventListener('click', () => {
        if (!item.userLiked) {
          item.likes = (item.likes || 0) + 1;
          item.userLiked = true;
          likeBtn.classList.add('liked');
          likeBtn.querySelector('.like-num').textContent = item.likes;
          saveWishes();
          if (statLikesEl) statLikesEl.textContent = parseInt(statLikesEl.textContent || 0) + 1;
          showToast('Terima kasih atas tanda cinta Anda ❤️');
        } else {
          item.likes = Math.max(0, (item.likes || 1) - 1);
          item.userLiked = false;
          likeBtn.classList.remove('liked');
          likeBtn.querySelector('.like-num').textContent = item.likes;
          saveWishes();
          if (statLikesEl) statLikesEl.textContent = Math.max(0, parseInt(statLikesEl.textContent || 1) - 1);
        }
      });

      wishesListEl.appendChild(card);
    });
  }

  // Filter tabs listeners
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderWishes();
    });
  });

  renderWishes();

  if (form) {
    // Remove previous listeners by cloning if re-initted
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const statusInput = newForm.querySelector('input[name="attendance"]:checked');
      const guestCountSelect = document.getElementById('rsvp-count');
      const guestCountText = guestCountSelect ? guestCountSelect.options[guestCountSelect.selectedIndex].text : '2 Orang';
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name) {
        showToast('Mohon masukkan nama Anda');
        return;
      }
      if (!statusInput) {
        showToast('Mohon pilih konfirmasi kehadiran');
        return;
      }
      if (!message) {
        showToast('Mohon berikan ucapan atau doa restu');
        return;
      }

      const newWish = {
        id: "w-" + Date.now(),
        name: name,
        status: statusInput.value,
        guestCount: statusInput.value === 'tidak-hadir' ? '0 Orang' : guestCountText,
        message: message,
        time: 'Baru saja',
        likes: 1,
        userLiked: true
      };

      wishes.unshift(newWish);
      saveWishes();

      renderWishes();
      document.getElementById('rsvp-message').value = '';
      showToast('Alhamdulillah, ucapan dan kehadiran Anda berhasil dikirim! ✨');
    });
  }
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* ========================================================
   9. COPY TO CLIPBOARD
   ======================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Berhasil disalin: ${textToCopy}`);
        }).catch(() => {
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Berhasil disalin: ${textToCopy}`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      <span id="toast-text">${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    document.getElementById('toast-text').textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ========================================================
   10. FALLING PETALS CANVAS
   ======================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = 28;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.5 - 0.75,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.8 - 0.9,
      opacity: Math.random() * 0.5 + 0.35,
      isGold: Math.random() > 0.75
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size, -p.size, p.size * 1.5, p.size, 0, p.size * 1.8);
      ctx.bezierCurveTo(-p.size * 1.5, p.size, -p.size, -p.size, 0, 0);

      if (p.isGold) {
        ctx.fillStyle = `rgba(246, 226, 122, ${p.opacity * 0.8})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      }

      ctx.fill();
      ctx.restore();

      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.015) * 0.6 + p.speedX * 0.3;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ========================================================
   11. INTERACTIVE MAP VIEW (LEAFLET)
   ======================================================== */
function initLeafletMap() {
  const mapElement = document.getElementById('leaflet-map');
  const tabLeaflet = document.getElementById('btn-tab-leaflet');
  const tabGmaps = document.getElementById('btn-tab-gmaps');
  const leafletWrap = document.getElementById('leaflet-map-wrap');
  const gmapsWrap = document.getElementById('gmaps-map-wrap');

  if (!mapElement) return;

  const ev = currentEvent || WEDDING_EVENTS.walimah;

  try {
    if (typeof L !== 'undefined') {
      weddingMap = L.map('leaflet-map', {
        center: [ev.mapLat, ev.mapLng],
        zoom: 16,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(weddingMap);

      const goldIcon = L.divIcon({
        className: 'custom-wedding-marker',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 36px; height: 36px; background: rgba(197, 155, 39, 0.35); border-radius: 50%; animation: pulsePin 1.5s infinite;"></div>
            <div style="position: relative; width: 26px; height: 26px; background: #1b4332; border: 2.5px solid #ffd700; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); color: #fff; font-size: 14px;">
              💍
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
      });

      currentMapMarker = L.marker([ev.mapLat, ev.mapLng], { icon: goldIcon }).addTo(weddingMap);

      currentMapMarker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 6px 4px; min-width: 180px;">
          <strong style="color: #1b4332; font-size: 0.92rem; display: block;">${ev.title}</strong>
          <span style="font-weight: 700; color: #b38728; font-size: 1rem; display: block; margin: 2px 0;">Tito &amp; Andini</span>
          <p style="font-size: 0.78rem; color: #333; margin: 4px 0 2px;">${ev.venueName}</p>
          <span style="font-size: 0.74rem; color: #666; font-weight: 600;">${ev.addressShort}</span>
        </div>
      `).openPopup();

      window.addEventListener('resize', () => {
        if (weddingMap) weddingMap.invalidateSize();
      });
    }
  } catch (err) {
    console.log('Leaflet Map Init:', err);
  }

  // Switcher Tab between Leaflet and Google Maps View
  if (tabLeaflet && tabGmaps && leafletWrap && gmapsWrap) {
    tabLeaflet.addEventListener('click', () => {
      tabLeaflet.classList.add('active');
      tabGmaps.classList.remove('active');
      leafletWrap.style.display = 'block';
      gmapsWrap.style.display = 'none';
      if (weddingMap) {
        setTimeout(() => { weddingMap.invalidateSize(); }, 200);
      }
    });

    tabGmaps.addEventListener('click', () => {
      tabGmaps.classList.add('active');
      tabLeaflet.classList.remove('active');
      leafletWrap.style.display = 'none';
      gmapsWrap.style.display = 'block';
    });
  }
}

function updateLeafletMapView(event) {
  if (!weddingMap || !event) return;
  try {
    weddingMap.setView([event.mapLat, event.mapLng], 16);
    if (currentMapMarker) {
      currentMapMarker.setLatLng([event.mapLat, event.mapLng]);
      currentMapMarker.setPopupContent(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 6px 4px; min-width: 180px;">
          <strong style="color: #1b4332; font-size: 0.92rem; display: block;">${event.title}</strong>
          <span style="font-weight: 700; color: #b38728; font-size: 1rem; display: block; margin: 2px 0;">Tito &amp; Andini</span>
          <p style="font-size: 0.78rem; color: #333; margin: 4px 0 2px;">${event.venueName}</p>
          <span style="font-size: 0.74rem; color: #666; font-weight: 600;">${event.addressShort}</span>
        </div>
      `).openPopup();
    }
    weddingMap.invalidateSize();
  } catch (e) {}
}

/* ========================================================
   12. NAVIGATION SPY
   ======================================================== */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
