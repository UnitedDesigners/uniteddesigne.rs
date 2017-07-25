const DESKTOP = window.matchMedia( "(min-width: 1180px)" );
const TABLET = window.matchMedia( "(min-width: 720px)" );

// Stats.js - I'm sorry in advance

const stats = document.getElementsByClassName('stats__card');
let activeStat = 1;

function nextStat() {
  if (activeStat !== stats.length) {
    if (TABLET.matches) {
      if (activeStat * 3 !== stats.length) {
        activeStat++;
      }
    } else {
      activeStat++;
    }
  }

  updateDom();
}

function prevStat() {
  if (activeStat !== 1) {
    activeStat--;
  }

  updateDom();
}

function updateDom() {
  document.getElementById('stats__active').innerHTML = activeStat;
  document.getElementById('stats__total').innerHTML = TABLET.matches ? stats.length / 3 : stats.length;

  if (TABLET.matches && !DESKTOP.matches) {
    if (activeStat !== 1) {
      const prevStartIndex = ((activeStat - 1) * 3) - 3;
      stats[prevStartIndex].style.display = 'none';
      stats[prevStartIndex + 1].style.display = 'none';
      stats[prevStartIndex + 2].style.display = 'none';
    }

    if (activeStat !== 3) {
      const postStartIndex = ((activeStat - 1) * 3) + 3;
      stats[postStartIndex].style.display = 'none';
      stats[postStartIndex + 1].style.display = 'none';
      stats[postStartIndex + 2].style.display = 'none';
    }

    const startIndex = (activeStat - 1) * 3;
    stats[startIndex].style.display = 'flex';
    stats[startIndex + 1].style.display = 'flex';
    stats[startIndex + 2].style.display = 'flex';
  } else if (!DESKTOP.matches) {
    if (activeStat !== 1) {
      stats[activeStat - 2].style.display = 'none';
    }

    if (activeStat !== stats.length) {
      stats[activeStat].style.display = 'none';
    }

    stats[activeStat - 1].style.display = 'flex';
  }

}

function resetDom() {
  activeStat = 1;

  for (stat of stats)
    stat.style.display = '';

  updateDom();
}

// Init
updateDom()

// Bind Events
TABLET.addListener(resetDom) // Reset DOM on activation of Tablet Media Query
DESKTOP.addListener(resetDom) // Reset DOM on activation of Desktop Media Query
document.getElementById('stats__prev').onclick = prevStat;
document.getElementById('stats__next').onclick = nextStat;
