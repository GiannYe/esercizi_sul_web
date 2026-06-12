const tasto = document.getElementById("tastoCalcola");
tasto.addEventListener('click', calcNum);

function da_b10_a_bN(num, bN) {
    //da 10 a un altra
    let quozienti = parseInt(num); 
    let resto = "";

    while (quozienti > 0) {
        let r = quozienti % bN;
        resto = r.toString() + resto;
        quozienti = parseInt(quozienti / bN);
    }
    return resto;
}

function da_bN_a_b10(num, bI) {
    num = num.toString().toUpperCase();
    const lunghezzaNum = num.toString().length;
    let decimale = 0;
    let potenza = 0;

    for (let i = lunghezzaNum - 1; i >= 0; i--) {
        let ultimaCifra = parseInt(num[i], bI);
        decimale += ultimaCifra * bI ** potenza;
        potenza++;
    }

    return decimale;
}

function calcNum() {
    let num = document.getElementById("numeroDaTrasformare").value;
    //il secondo parametro di parseInt() e' la base
    //di trasformazione. Il default e' 10, ma se la 
    //base e' superiore a 10, serve passare la base 
    //desiderata
    const baseInit = parseInt(document.getElementById("daBase").value, 10);
    const baseFin = parseInt(document.getElementById("aBase").value, 10);
    const risultato = document.getElementById("risultato");

    //controllo validità
    if (num === "" || isNaN(baseInit) || isNaN(baseFin)) {
        //l'input non puo' essere vuoto
        //le basi non possono essere dei non-numeri
        window.alert("Inserisci tutti i valori correttamente");
        return; //questo termina la funzione qua se tale condizione e' vera
    }

    let a;

    if (baseInit === 10) {
        //da base 10 a base N
        a = da_b10_a_bN(num, baseFin);
    } else {
        //da base N a base 10, e poi (se serve) a Base Fin
        let passaggioDecimale = da_bN_a_b10(num, baseInit);
        
        if (baseFin === 10) {
            a = passaggioDecimale;
        } else {
            a = da_b10_a_bN(passaggioDecimale, baseFin);
        }
    }

    risultato.value = a;
}