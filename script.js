/*var haslo = function () {
	var unique = true;
	num = Math.floor(Math.random() * zbior_hasel.length - 5);
	name = zbior_hasel.slice(num, 1);
	zbior_hasel.push(name);
}
*/
/*--------------------------------------*/

/*
function losujHaslo() {


	var zbior_hasel = new Array( //tablica, z której losujemy hasla
		"Fantomas",
		"Super Szamson",
		"Hasło",
		"Myszka",
		"Super bohaterowie",
		"Super pies",
		"Przyjaciel",
		"Kurs Javascript",
		"Terminator",
		"Superman",
		"Herkules",
		"Batman",
		"Spiderman",
		"Kapitan Ameryka"
	);

	var random = zbior_hasel[Math.floor(Math.random() * zbior_hasel.length)]; //zmienna przechowujaca wylosowane haslo z tablicy
	document.getElementById("plansza").innerHTML = random; //pokazujemy wylosowane haslo w divie "plansz"
}

*/

/*--------------------------------------*/

var haslo = "Bez pracy nie ma kołaczy";
haslo = haslo.toUpperCase(); //funkcja zmieniajaca tekst na wielkie litery 

var dlugosc = haslo.length; //length to wlasciwosc (nie jest to funkcja), ktora pobiera liczbe znakow ze zmiennej "haslo" do ukrycia zdania potrzebnego do odgadniecia.

var ile_skuch = 0; //zmienna globalna do podmiany obrazkow w przypadku nietrafienia

var yes = new Audio("yes.wav"); //obiekt dzwieku
var no = new Audio("no.wav"); //obiekt dzwieku

var haslo1 = ""; //zmienna z pustym lancuchem potrzebna do zmiany widocznego hasla na haslo zakodowane


for (i = 0; i < dlugosc; i++) { //petla zamieniajaca zdanie do odgadniecia na ciag myslnikow lub spacji
	if (haslo.charAt(i) == " ") haslo1 = haslo1 + " "; //zamieniamy spacje w zdaniu na spacje z zdaniu zakodowanym
	else haslo1 = haslo1 + "*"; //zamieniamy inne znaki na gwiazdki w zdaniu zakodowanym
}


function wypisz_haslo() {
	document.getElementById("plansza").innerHTML = haslo1;
}
window.onload = start; //wywolanie funkcji "start" przy zaladowaniu strony


var litery = new Array(35); //tablica z 35cioma pojemnikami na cyfry
litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

function start() { //

	var tresc_diva = ""; //zmienna przechowujaca divy z literami alfabetu

	for (i = 0; i <= 34; i++) { //petla generujaca litery alfabetu

		var element = "lit" + i; // tworzymy id = lit0, lit1, lit2, itd. w celu dalszej pracy nad sprawdzaniem liter w hasle

		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz(' + i + ')" id="' + element + '">' + litery[i] + '</div>'; //tak dodajemy klase do html

		if ((i + 1) % 7 == 0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>' //przejscie do nowej linii od 7 iteracji liter, wykorzystujemy modulo czyli dzielenie przez 7 bez reszty
	}

	document.getElementById("alfabet").innerHTML = tresc_diva;
	wypisz_haslo(); //wywolanie funkcji 
}

String.prototype.ustawZnak = function (miejsce, znak) {
	if (miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
}


function sprawdz(nr) { //funkcja odslaniajaca litery

	var trafiona = false; //flaga

	for (i = 0; i < dlugosc; i++) {
		if (haslo.charAt(i) == litery[nr]) {
			haslo1 = haslo1.ustawZnak(i, litery[nr]);
			trafiona = true;
		}
	}

	if (trafiona == true) {

		yes.play(); // wywolanie funkcji dzwieku klikniecia, yes to obiekt

		var element = "lit" + nr;
		document.getElementById(element).style.background = "#ADFF2F"; //zmiana koloru litery na zielony jesli wystepuje w hasle
		document.getElementById(element).style.cursor = "default"; //zmiana kursora jesli litera wystepuje w hasle
		document.getElementById(element).style.color = "#228B22"; //zmiana koloru czcionki jesli litera wystepuje w hasle
		document.getElementById(element).style.border = "2px solid #228B22"; //zmiana koloru ramki jesli litera wystepuje w hasle

		wypisz_haslo();
	} else {

		no.play(); // wywolanie funkcji dzwieku klikniecia, no to obiekt

		var element = "lit" + nr;
		document.getElementById(element).style.background = "#FF69B4"; //zmiana koloru litery jesli nie wystepuje w hasle
		document.getElementById(element).style.cursor = "default"; //zmiana kursora jesli litera nie wystepuje w hasle
		document.getElementById(element).style.color = "#DC143C"; //zmiana koloru czcionki jesli litera nie wystepuje w hasle
		document.getElementById(element).style.border = "2px solid #DC143C"; //zmiana koloru ramki jesli litera nie wystepuje w hasle

		document.getElementById(element).setAttribute("onclick", ";"); //atrybugt blokujacy dalsze dodawanie obrazkow w przypadku ponownego klikniecia tej samej litery


		//Podmiana obrazka w przypadku nietrafienia litery w hasle
		ile_skuch++;
		var obraz = "img/s" + ile_skuch + ".jpg"; //zmienna pomocnicza do podmiany obrazka
		document.getElementById("szubienica").innerHTML = '<img src="' + obraz + '" alt="" />'; //zmiana obrazka

	}

	//wygrana
	if (haslo == haslo1)
		document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: " + haslo + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>'; //onclick przeladowuje cala strone po kliknieciu na nia gdy wygramy


	//przegrana
	if (ile_skuch >= 9)
		document.getElementById("alfabet").innerHTML = "PRZEGRANA! Prawidłowe hasło: " + haslo + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
}

///////////////////////////////
