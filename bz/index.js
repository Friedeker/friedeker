function vypocetBoduZvratu() {

	const fn = parseFloat(document.getElementById("fn").value);

	const b = parseFloat(document.getElementById("b").value);

	const p = parseFloat(document.getElementById("p").value);


	if (isNaN(fn) || isNaN(b) || isNaN(p)) {

		alert("Vyplňte všechna pole čísly!");

		return;

	}


	if (p <= b) {

		alert("Prodejní cena musí být vyšší než variabilní náklady!");

		return;

	}


	const Q = fn / (p - b);

	document.getElementById("result").innerText = "Bod zvratu: " + Math.ceil(Q) + " kusů";

}

