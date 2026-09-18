const nav = document.querySelector('.nav-wrap');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();


const windTurbineVideo = document.getElementById('windTurbineVideo');

if (windTurbineVideo) {
  const configureWindVideo = () => {
    windTurbineVideo.muted = true;
    windTurbineVideo.loop = true;
    windTurbineVideo.playbackRate = 10;

    const wrap = windTurbineVideo.closest('.flow-video-wrap');
    if (wrap && windTurbineVideo.videoWidth && windTurbineVideo.videoHeight) {
      const croppedHeight = windTurbineVideo.videoHeight * 0.75;
      wrap.style.aspectRatio = `${windTurbineVideo.videoWidth} / ${croppedHeight}`;
    }

    const playPromise = windTurbineVideo.play();
    if (playPromise) playPromise.catch(() => {});
  };

  windTurbineVideo.addEventListener('loadedmetadata', configureWindVideo);
  windTurbineVideo.addEventListener('canplay', () => {
    windTurbineVideo.playbackRate = 10;
  });
}
