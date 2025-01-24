function updateTime() {
  const timeElement = document.querySelector('.current-time');
  if (timeElement) {
      const now = new Date();
      const dateString = now.toLocaleDateString('de-DE', { 
          weekday: 'long', // Zobrazí den v týdnu
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      }); 
      const timeString = now.toLocaleTimeString('de-DE'); // Formát času pro český jazyk
      timeElement.textContent = `Heute ist ${dateString}, aktuální čas: ${timeString}`;
  }
}

setInterval(updateTime, 1000); // Aktualizace každou sekundu
updateTime(); // První zobrazení času
