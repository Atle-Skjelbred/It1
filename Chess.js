// Funksjon for å sjekke om dronningene kan angripe hverandre
function kanDronningerAngripe(dronning1Rad, dronning1Kolonne, dronning2Rad, dronning2Kolonne) {
    // Sjekker om dronningene befinner seg på samme rad eller kolonne
    if (dronning1Rad === dronning2Rad || dronning1Kolonne === dronning2Kolonne) {
      return true;
    }
  
    // Sjekker om dronningene er skrå ovenfor hverandre
    if (Math.abs(dronning1Rad - dronning2Rad) === Math.abs(dronning1Kolonne - dronning2Kolonne)) {
      return true;
    }
  
    // Returnerer false hvis dronningene ikke er ovenfor hverandre skrått eller rett
    return false;
  }
  
  // Funksjon for å oppdaterere og lager brettet
  function oppdaterSjakkbrett() {
    var sjakkbrett = document.getElementById("sjakkbrett");
    sjakkbrett.innerHTML = "";
  
    var ruter = [];
    var erLysRute = true;
    for (var rad = 0; rad < 8; rad++) {
      for (var kolonne = 0; kolonne < 8; kolonne++) {
        var rute = document.createElement("div");
        rute.classList.add("rute");
        if (erLysRute) {
          rute.classList.add("lys");
        } else {
          rute.classList.add("mørk");
        }
        erLysRute = !erLysRute;
        ruter.push(rute);
        sjakkbrett.appendChild(rute);
      }
      erLysRute = !erLysRute;
      //ErlysRute er usann
    }
  
    return ruter;
  }
  
  // Funksjon for å plassere dronningene på sjakkbrettet
  function plasserDronninger(ruter, dronning1Rad, dronning1Kolonne, dronning2Rad, dronning2Kolonne) {
    ruter[dronning1Rad * 8 + dronning1Kolonne].innerHTML = "<span class='dronning'>&#9819;</span>";
    ruter[dronning2Rad * 8 + dronning2Kolonne].innerHTML = "<span class='dronning'>&#9819;</span>";
  }
  
  // Funksjon for å sjekke dronningene
  function sjekkDronninger() {
    var dronning1Rad = parseInt(document.getElementById("dronning1-rad").value) - 1;
    var dronning1Kolonne = parseInt(document.getElementById("dronning1-kolonne").value) - 1;
    var dronning2Rad = parseInt(document.getElementById("dronning2-rad").value) - 1;
    var dronning2Kolonne = parseInt(document.getElementById("dronning2-kolonne").value) - 1;
  
    var ruter = oppdaterSjakkbrett();
    plasserDronninger(ruter, dronning1Rad, dronning1Kolonne, dronning2Rad, dronning2Kolonne);
  
    var resultatDiv = document.getElementById("resultat");
    var kanAngripe = kanDronningerAngripe(dronning1Rad, dronning1Kolonne, dronning2Rad, dronning2Kolonne);
    if (kanAngripe) {
      resultatDiv.textContent = "Dronningene kan angripe hverandre.";
    } else {
      resultatDiv.textContent = "Dronningene kan ikke angripe hverandre.";
    }
  }
  