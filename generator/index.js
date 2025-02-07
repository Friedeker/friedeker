

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
            alert("Délka hesla musí být mezi 5 a 20 znaky.");
            return;
        }
        if (specialPercentage < 0 || specialPercentage > 100) {
            alert("Zadejte procentuální zastoupení speciálních znaků mezi 0 a 100.");
            return;
        }

        passwordOutput.value = generatePassword(length, specialPercentage);
    });

    copyBtn.addEventListener("click", () => {
        if (passwordOutput.value) {
            navigator.clipboard.writeText(passwordOutput.value).then(() => {
                alert("Heslo bylo zkopírováno.");
				}).catch(() => {
                alert("Chyba při kopírování.");
            });
        } else {
            alert("Nejprve vygenerujte heslo.");
        }
    });
});


