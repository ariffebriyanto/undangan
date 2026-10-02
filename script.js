/**
 * Tito & Andini Wedding Invitation Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Guest Name from URL Parameter (?to=Nama+Tamu or ?u=Nama+Tamu)
  initGuestName();

  // 2. Cover / Envelope Opening
  initCoverModal();

  // 3. Audio & Music Player (Web Audio API Synthesizer + Fallback)
  initMusicPlayer();

  // 4. Countdown Timer to 9 October 2026 19:00 WIB
  initCountdown();

  // 5. Calendar Integration (Google Calendar & ICS)
  initCalendar();

  // 6. Gallery Lightbox & Filtering
  initGallery();

  // 7. Guestbook & RSVP with LocalStorage persistence
  initGuestbook();

  // 8. Copy to Clipboard (Bank Account & Address)
  initCopyButtons();

  // 9. Falling Petals & Sparkles Canvas Animation
  initPetalsCanvas();

  // 10. Interactive Leaflet & Google Maps View
  initLeafletMap();

  // 11. Navigation Spy
  initNavSpy();
});

/* ========================================================
   1. GUEST NAME INJECTION
   ======================================================== */
function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('guest');
  const guestNameEl = document.getElementById('guest-name');
  const rsvpNameInput = document.getElementById('rsvp-name');

  if (guestParam) {
    // Decode and format guest name nicely
    let formattedName = decodeURIComponent(guestParam.replace(/\+/g, ' ')).trim();
    if (formattedName) {
      if (guestNameEl) guestNameEl.textContent = formattedName;
      if (rsvpNameInput) rsvpNameInput.value = formattedName;
      return;
    }
  }

  // Default guest name
  if (guestNameEl) guestNameEl.textContent = 'Tamu Undangan';
}

/* ========================================================
   2. COVER / ENVELOPE MODAL
   ======================================================== */
function initCoverModal() {
  const coverScreen = document.getElementById('cover-screen');
  const openBtn = document.getElementById('btn-open-invitation');

  if (!coverScreen || !openBtn) return;

  // Prevent scrolling when cover is active
  document.body.style.overflow = 'hidden';

  openBtn.addEventListener('click', () => {
    coverScreen.classList.add('opened');
    document.body.style.overflow = '';

    // Trigger music playback
    playWeddingMusic();

    // Trigger celebration toast
    showToast('Selamat datang di undangan kami ✨');

    // Invalidate map size after cover animation finishes
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
  
  // Try HTML5 audio first if source exists and loaded
  if (bgAudioElement && bgAudioElement.src && !bgAudioElement.src.endsWith('#')) {
    bgAudioElement.play().then(() => {
      isMusicPlaying = true;
      if (musicToggle) musicToggle.classList.add('playing');
      return;
    }).catch(() => {
      // Fallback to Web Audio API synthesis
      startGenerativeAcousticHarp();
    });
  } else {
    // Generative Web Audio API acoustic harp / piano progression
    startGenerativeAcousticHarp();
  }

  isMusicPlaying = true;
  if (musicToggle) musicToggle.classList.add('playing');
}

function pauseWeddingMusic() {
  const musicToggle = document.getElementById('music-toggle');
  if (bgAudioElement) {
    bgAudioElement.pause();
  }
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  isMusicPlaying = false;
  if (musicToggle) musicToggle.classList.remove('playing');
}

/**
 * Romantic soothing generative harp/chimes arpeggiator using Web Audio API.
 * Ensures the invitation has authentic, dreamy, offline-ready romantic music!
 */
function startGenerativeAcousticHarp() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (musicInterval) clearInterval(musicInterval);

    // D Major / B Minor romantic pentatonic scale frequencies (Hz)
    // Notes: D4, F#4, A4, B4, C#5, D5, E5, F#5
    const chordProgression = [
      // Dmaj9
      [293.66, 369.99, 440.00, 554.37, 587.33],
      // Gmaj7
      [196.00, 246.94, 293.66, 369.99, 440.00],
      // Bm7
      [246.94, 293.66, 369.99, 440.00, 587.33],
      // A sus4 / A
      [220.00, 293.66, 329.63, 440.00, 554.37]
    ];

    let chordIndex = 0;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!isMusicPlaying) return;
      const currentChord = chordProgression[chordIndex];
      const freq = currentChord[noteIndex % currentChord.length];

      playAcousticPluck(freq, 0.08);

      noteIndex++;
      if (noteIndex >= currentChord.length * 2) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % chordProgression.length;
      }
    };

    // Play every 360ms for a gentle soothing tempo
    musicInterval = setInterval(playNextNote, 360);
    playNextNote();
  } catch (err) {
    console.log('Web Audio setup:', err);
  }
}

function playAcousticPluck(frequency, gainLevel) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  // Warm acoustic tone with soft sine + triangle blend
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, now);

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(frequency * 2, now); // soft octave harmonic

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + 1.2);

  // Pluck envelope: sharp gentle attack, long warm decay
  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.linearRampToValueAtTime(gainLevel, now + 0.025);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

  osc.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(filter);
  filter.connect(audioCtx.destination);

  osc.start(now);
  osc2.start(now);
  osc.stop(now + 2.5);
  osc2.stop(now + 2.5);
}

/* ========================================================
   4. COUNTDOWN TIMER
   ======================================================== */
function initCountdown() {
  // Target: Jumat, 9 Oktober 2026 19:00:00 WIB (GMT+7)
  const targetDate = new Date('2026-10-09T19:00:00+07:00').getTime();

  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

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
  setInterval(update, 1000);
}

/* ========================================================
   5. CALENDAR INTEGRATION
   ======================================================== */
function initCalendar() {
  const gcalBtn = document.getElementById('btn-google-calendar');
  const icalBtn = document.getElementById('btn-ical-calendar');

  const eventTitle = "Walimatul 'Ursi: Tito Sumarsono & Andini Melati Putri";
  const eventDesc = "Acara Syukuran Pernikahan Tito Sumarsono & Andini Melati Putri. Bertempat di Jl. Rembang 25 A, Surabaya (Bpk. Abdul Karim & Ibu Sumarni).";
  const eventLoc = "Jl. Rembang 25 A, Surabaya, Jawa Timur";
  const startDate = "20261009T120000Z"; // 19:00 WIB is 12:00 UTC
  const endDate = "20261009T160000Z";   // 23:00 WIB is 16:00 UTC

  if (gcalBtn) {
    gcalBtn.addEventListener('click', () => {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDesc)}&location=${encodeURIComponent(eventLoc)}`;
      window.open(gcalUrl, '_blank');
    });
  }

  if (icalBtn) {
    icalBtn.addEventListener('click', () => {
      const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tito and Andini Wedding//ID
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:${eventDesc}
LOCATION:${eventLoc}
DTSTART:${startDate}
DTEND:${endDate}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Pernikahan-Tito-Andini.ics');
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
  const tabBtns = document.querySelectorAll('.tab-btn');

  let currentImageIndex = 0;
  const imageSources = [];

  galleryItems.forEach((card, index) => {
    const img = card.querySelector('img');
    if (img) {
      imageSources.push({
        src: img.src,
        category: card.dataset.category || 'all',
        caption: card.querySelector('.gallery-caption')?.textContent || ''
      });

      card.addEventListener('click', () => {
        openLightbox(index);
      });
    }
  });

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
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

  // Filter tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ========================================================
   7. GUESTBOOK & RSVP WITH PERSISTENCE & LIKES
   ======================================================== */
const DEFAULT_WISHES = [
  {
    id: "w-1",
    name: "H. Achmad Fauzi & Keluarga",
    status: "hadir",
    guestCount: "2 Orang",
    message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Mas Tito dan Mbak Andini. Semoga menjadi keluarga sakinah mawaddah warahmah, rukun till jannah.",
    time: "2 jam yang lalu",
    likes: 12
  },
  {
    id: "w-2",
    name: "Rizky Firmansyah, S.T.",
    status: "hadir",
    guestCount: "1 Orang",
    message: "Selamat brader Tito! Akhirnya berlabuh ke pelaminan bersama Andini tercinta. Insya Allah hadir tepat waktu di Jl. Rembang Surabaya!",
    time: "4 jam yang lalu",
    likes: 8
  },
  {
    id: "w-3",
    name: "dr. Nurul Hidayati",
    status: "hadir",
    guestCount: "2 Orang",
    message: "Masya Allah cantiknya sahabatku Andini. Selamat ya sayang, semoga Tito senantiasa menjadi imam terbaik pembimbing ke surga.",
    time: "Kemarin",
    likes: 15
  },
  {
    id: "w-4",
    name: "Bambang Soedjarwo & Ibu (Keluarga Besar Surabaya)",
    status: "hadir",
    guestCount: "Rombongan Keluarga",
    message: "Turut bersuka cita atas pernikahan ananda Tito & Andini. Semoga senantiasa dalam limpahan berkah dan kelapangan rezeki dari Allah SWT.",
    time: "2 hari yang lalu",
    likes: 7
  },
  {
    id: "w-5",
    name: "Dimas Anggara & Istri (Jakarta)",
    status: "tidak-hadir",
    guestCount: "0 Orang",
    message: "Selamat Tito & Andini! Mohon maaf belum bisa hadir langsung karena dinas luar kota, namun doa tulus kami senantiasa menyertai keberkahan rumah tangga kalian.",
    time: "3 hari yang lalu",
    likes: 4
  }
];

function initGuestbook() {
  const form = document.getElementById('rsvp-form');
  const wishesListEl = document.getElementById('guest-wishes-list');
  const statTotalEl = document.getElementById('stat-total');
  const statHadirEl = document.getElementById('stat-hadir');
  const statLikesEl = document.getElementById('stat-likes');
  const countAllWishesEl = document.getElementById('count-all-wishes');
  const filterTabs = document.querySelectorAll('.comment-tab');

  let activeFilter = 'all';

  // Load from local storage or set defaults
  let wishes = [];
  try {
    const saved = localStorage.getItem('tito_andini_wishes');
    if (saved) {
      wishes = JSON.parse(saved);
    } else {
      wishes = [...DEFAULT_WISHES];
      localStorage.setItem('tito_andini_wishes', JSON.stringify(wishes));
    }
  } catch (e) {
    wishes = [...DEFAULT_WISHES];
  }

  function saveWishes() {
    try {
      localStorage.setItem('tito_andini_wishes', JSON.stringify(wishes));
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

    // Filtered list
    const filtered = wishes.filter(item => {
      if (activeFilter === 'all') return true;
      return item.status === activeFilter;
    });

    if (filtered.length === 0) {
      wishesListEl.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.85rem;">
          Belum ada komentar untuk kategori ini. Jadilah yang pertama memberikan doa restu!
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

      // First letter avatar
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

      // Handle like click
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
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const statusInput = form.querySelector('input[name="attendance"]:checked');
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

      // Scroll smoothly to comments list
    });
  }
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* ========================================================
   8. COPY TO CLIPBOARD
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
          // Fallback
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
   9. FALLING WHITE ROSE PETALS & SPARKLES CANVAS
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
      // Draw petal shape
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

      // Update position
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.015) * 0.6 + p.speedX * 0.3;
      p.rotation += p.rotSpeed;

      // Wrap around
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
   10. INTERACTIVE MAP VIEW (LEAFLET & OPENSTREETMAP)
   ======================================================== */
let weddingMap = null;

function initLeafletMap() {
  const mapElement = document.getElementById('leaflet-map');
  const tabLeaflet = document.getElementById('btn-tab-leaflet');
  const tabGmaps = document.getElementById('btn-tab-gmaps');
  const leafletWrap = document.getElementById('leaflet-map-wrap');
  const gmapsWrap = document.getElementById('gmaps-map-wrap');

  if (!mapElement) return;

  // Jl. Rembang 25A, Surabaya Coordinates (Jepara/Bubutan Area, Surabaya)
  const venueLat = -7.2475;
  const venueLng = 112.7275;

  try {
    if (typeof L !== 'undefined') {
      weddingMap = L.map('leaflet-map', {
        center: [venueLat, venueLng],
        zoom: 16,
        scrollWheelZoom: false
      });

      // Standard OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(weddingMap);

      // Custom Gold Pin Marker
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

      const marker = L.marker([venueLat, venueLng], { icon: goldIcon }).addTo(weddingMap);

      // Custom rich popup
      marker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 6px 4px; min-width: 180px;">
          <strong style="color: #1b4332; font-size: 0.92rem; display: block;">Walimatul 'Ursi</strong>
          <span style="font-weight: 700; color: #b38728; font-size: 1rem; display: block; margin: 2px 0;">Tito &amp; Andini</span>
          <p style="font-size: 0.78rem; color: #333; margin: 4px 0 2px;">Kediaman Bpk. Abdul Karim &amp; Ibu Sumarni</p>
          <span style="font-size: 0.74rem; color: #666; font-weight: 600;">Jl. Rembang 25 A, Surabaya</span>
        </div>
      `).openPopup();

      // Invalidate size on window resize
      window.addEventListener('resize', () => {
        if (weddingMap) weddingMap.invalidateSize();
      });
    }
  } catch (err) {
    console.log('Leaflet Map Init:', err);
  }

  // Map Tab Switcher logic
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

/* ========================================================
   11. NAVIGATION SPY
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
