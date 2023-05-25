function validerInput(input) {
  if (input.value < 1) {
    input.value = 1; // Hvis verdien er mindre enn 1, sett den til 1
  } else if (input.value > 8) {
    input.value = 8; // Hvis verdien er større enn 8, sett den til 8
  }
}



// Funksjon for å sjekke om brikker kan ta hverandre
function kanAngripe(brikke1Rad, brikke1Kolonne, brikke2Rad, brikke2Kolonne, valg) {
  if (valg === "dronninger") {
    // Sjekker om dronningene kan angripe hverandre
    // Sjekker om brikker befinner seg på samme rad eller kolonne
    if (brikke1Rad === brikke2Rad || brikke1Kolonne === brikke2Kolonne) {
      return true;
    }

    // Sjekker om brikker er skrå ovenfor hverandre
    if (Math.abs(brikke1Rad - brikke2Rad) === Math.abs(brikke1Kolonne - brikke2Kolonne)) {
      return true;
    }
  } else if (valg === "hester") {
    // Sjekker om hestene kan angripe hverandre
    var radDifferanse = Math.abs(brikke1Rad - brikke2Rad);
    var kolonneDifferanse = Math.abs(brikke1Kolonne - brikke2Kolonne);
    if ((radDifferanse === 2 && kolonneDifferanse === 1) || (radDifferanse === 1 && kolonneDifferanse === 2)) {
      return true;
    }
  }

  // Returnerer false hvis brikker ikke kan ta hverandre
  return false;
}

// Funksjon for å oppdatere og lage sjakkbrettet
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
  }

  return ruter;
}

// Funksjon for å plassere brikker på sjakkbrettet
function plasserBrikker(ruter, brikke1Rad, brikke1Kolonne, brikke2Rad, brikke2Kolonne, valg) {
  if (valg === "dronninger") {
    ruter[brikke1Rad * 8 + brikke1Kolonne].innerHTML = "<span class='hvitdronning'>&#9819;</span>";
    ruter[brikke2Rad * 8 + brikke2Kolonne].innerHTML = "<span class='svartdronning'>&#9819;</span>";
  } else if (valg === "hester") {
    ruter[brikke1Rad * 8 + brikke1Kolonne].innerHTML = "<span class='hvithest'>&#9822;</span>";
    ruter[brikke2Rad * 8 + brikke2Kolonne].innerHTML = "<span class='svarthest'>&#9822;</span>";
  }
}

// Funksjon for å sjekke brikker
function sjekkBrikker() {
  var brikke1Rad = parseInt(document.getElementById("brikke1-rad").value) - 1;
  var brikke1Kolonne = parseInt(document.getElementById("brikke1-kolonne").value) - 1;
  var brikke2Rad = parseInt(document.getElementById("brikke2-rad").value) - 1;
  var brikke2Kolonne = parseInt(document.getElementById("brikke2-kolonne").value) - 1;
  var valg = document.getElementById("valg").value;

  var ruter = oppdaterSjakkbrett();
  plasserBrikker(ruter, brikke1Rad, brikke1Kolonne, brikke2Rad, brikke2Kolonne, valg);

  var resultatDiv = document.getElementById("resultat");
  var kanTa = kanAngripe(brikke1Rad, brikke1Kolonne, brikke2Rad, brikke2Kolonne, valg);
  if (kanTa) {
    resultatDiv.textContent = "Brikkene kan ta hverandre.";
  } else {
    resultatDiv.textContent = "Brikkene kan ikke ta hverandre.";
  }
}
