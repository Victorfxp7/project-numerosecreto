let maxNumber = 100; 
let secretNumber = generateSecretNumber(maxNumber);
let attempts = 0;

// Função que gera o número secreto
function generateSecretNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Definir novo limite máximo
document.getElementById('set-max-btn').addEventListener('click', () => {

    const chosenMax = Number(document.getElementById('max-number').value);

    if (chosenMax < 10 || chosenMax > 1000) {
        alert("Escolha um número entre 10 e 1000.");
        return;
    }

    maxNumber = chosenMax;
    secretNumber = generateSecretNumber(maxNumber);
    attempts = 0;

    document.getElementById('attempts-count').textContent = attempts;
    document.getElementById('result-text').textContent =
        `Novo limite definido! Agora adivinhe entre 1 e ${maxNumber}.`;

    console.log("Número secreto atualizado:", secretNumber);
});

// Botão "Verificar"
document.getElementById('guess-button').addEventListener('click', () => {
    const guess = Number(document.getElementById('guess-input').value);

    // ❌ NÃO conta tentativa aqui!
    // Primeiro validamos

    if (guess < 1 || guess > maxNumber || isNaN(guess)) {
        document.getElementById('result-text').textContent =
            `Digite um número entre 1 e ${maxNumber}.`;
        return; // ⛔ NÃO CONTA tentativa
    }

    // Agora sim, palpite válido → conta tentativa
    attempts++;
    document.getElementById('attempts-count').textContent = attempts;

    if (guess === secretNumber) {

        document.getElementById('result-text').textContent =
            `🎉 Parabéns! Você acertou o número ${secretNumber}!`;
        document.getElementById('reset-button').style.display = "block";

    } else if (guess < secretNumber) {
        document.getElementById('result-text').textContent = "🔼 Muito baixo!";
    } else {
        document.getElementById('result-text').textContent = "🔽 Muito alto!";
    }
});
