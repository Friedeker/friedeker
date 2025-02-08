

document.addEventListener("DOMContentLoaded", () => {
    const passwordOutput = document.getElementById("password-output");
    const lengthInput = document.getElementById("length");
    const specialInput = document.getElementById("special");
    const generateBtn = document.getElementById("generate");
    const copyBtn = document.getElementById("copy");

    function generatePassword(length, specialPercentage) {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const specials = "!@#$%^&*()-_=+[]{}|;:,.<>?/";
        
        let specialCount = Math.round(length * (specialPercentage / 100));
        let otherCount = length - specialCount;
        let allChars = letters + numbers;
        
        let password = "";
        for (let i = 0; i < otherCount; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        for (let i = 0; i < specialCount; i++) {
            password += specials[Math.floor(Math.random() * specials.length)];
        }
        
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }

    generateBtn.addEventListener("click", () => {
        const length = parseInt(lengthInput.value, 10);
        const specialPercentage = parseInt(specialInput.value, 10);

        if (length < 5 || length > 20) {
            alert("Die Länge des Passworts muss zwischen 5 und 20 Zeichen betragen.");
            return;
        }
        if (specialPercentage < 0 || specialPercentage > 100) {
            alert("Geben Sie den Prozentsatz der Sonderzeichen zwischen 0 und 100 ein.");
            return;
        }

        passwordOutput.value = generatePassword(length, specialPercentage);

        copyBtn.addEventListener("click", () => {
            if (passwordOutput.value) {
                navigator.clipboard.writeText(passwordOutput.value).then(() => {
                    alert("Das Passwort wurde kopiert.");
                    passwordOutput.value = "";
                   }).catch(() => {
                    alert("Fehler beim Kopieren.");
                });
            } else {
                alert("Generieren Sie zunächst ein Passwort.");
            }
        });
    });
    
    });

    