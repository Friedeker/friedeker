// Vytvoření efektu kurzoru
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Aktualizace pozice kurzoru
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Skrytí kurzoru při nečinnosti
let timeout;
document.addEventListener('mousemove', () => {
  cursor.style.display = 'block';
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cursor.style.display = 'none';
  }, 2000);
});

console.log(document.querySelector('.watermark'));
