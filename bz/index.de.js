function vypocetBoduZvratu() {

	const fn = parseFloat(document.getElementById("fn").value);

	const b = parseFloat(document.getElementById("b").value);

	const p = parseFloat(document.getElementById("p").value);


	if (isNaN(fn) || isNaN(b) || isNaN(p)) {

		alert("Füllen Sie alle Felder mit Zahlen aus!");

		return;

	}


	if (p <= b) {

		alert("Der Verkaufspreis muss höher als die variablen Kosten sein!");

		return;

	}


	const Q = fn / (p - b);

	document.getElementById("result").innerText = "Bod zvratu: " + Math.ceil(Q) + " kusů";

}

