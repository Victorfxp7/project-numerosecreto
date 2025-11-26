// ===================== 1. DECLARAÇÃO DE VARIÁVEIS =====================

// Elementos de Navegação e UI
const header = document.querySelector(".header");
const backToTopButton = document.querySelector("#backToTopButton");
// const toggle = document.querySelector("#sw-checkbox"); // Removida, pois não foi usada
const menuLinks = document.querySelectorAll(".menu a");
const openMenuButtons = document.querySelectorAll(".open-menu");
const closeMenuButtons = document.querySelectorAll(".close-menu");


// Seções (Usadas para o Menu Ativo na Seção Atual)
const home = document.querySelector("#home");
const comoJogar = document.querySelector("#como-jogar");
const criador = document.querySelector("#criador");
// const contato = document.querySelector("#contato"); // Removida, pois a seção não existe mais no HTML

// ===================== 2. INICIALIZAÇÃO DE FUNÇÕES =====================

window.addEventListener("load", function begin() {
    // Chama o onScroll uma vez para configurar o estado inicial (nav e botão)
    onScroll();
});

// ===================== 3. LÓGICA DE SCROLL =====================

window.addEventListener("scroll", onScroll);
// onScroll(); // A chamada dentro de window.addEventListener("load") já é suficiente.

function onScroll() {
    // 1. Mostrar/Esconder a navegação (adiciona a classe 'scroll' ao header)
    if (header) {
        // Se a posição de scrollY for maior que 0, adiciona a classe 'scroll'
        header.classList.toggle("scroll", scrollY > 0); 
    }

    // 2. Mostrar/Esconder o botão Voltar ao Topo
    if (backToTopButton) {
        // Mostra o botão se o scroll for maior que 500px
        // Usamos a classe 'show' no CSS para controlar a opacidade/display
        backToTopButton.classList.toggle("show", scrollY > 500); 
    }

    // 3. Ativar o Menu na Seção Atual
    // NOTA: Chamamos apenas as seções que realmente existem no HTML
    activateMenuAtCurrentSection(home);
    activateMenuAtCurrentSection(comoJogar);
    activateMenuAtCurrentSection(criador);
}

/**
 * Adiciona a classe 'active' ao link de menu da seção que está na linha alvo.
 * @param {HTMLElement | null} section - O elemento da seção (e.g., #home).
 */
function activateMenuAtCurrentSection(section) {
    if (!section) return; // Sai da função se a seção não existir no HTML

    // Define a linha alvo como a metade da tela (Melhor experiência de usuário)
    const targetLine = scrollY + innerHeight / 2;
    
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Verifica se o topo da seção passou ou alcançou a linha alvo
    const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
    
    // Verifica se o fim da seção passou a linha alvo
    const sectionEndsAt = sectionTop + sectionHeight;
    const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

    // A seção está na área visível se o topo passou a linha E o fim não passou
    const sectionBoundaries =
        sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

    const sectionId = section.getAttribute("id");
    // Seleciona o link do menu correspondente (e.g., .menu a[href*="#home"])
    const menuElement = document.querySelector(`.menu a[href*="#${sectionId}"]`);
    if (!menuElement) return;

    // Remove e adiciona a classe 'active' conforme a condição
    menuElement.classList.remove("active");
    if (sectionBoundaries) menuElement.classList.add("active");
}


// ===================== 4. MENU (ABRIR / FECHAR) =====================

function openMenu() {
    document.body.classList.add("menu-expanded");
}

function closeMenu() {
    document.body.classList.remove("menu-expanded");
}

// Configura os botões de abrir/fechar (usando as classes do seu HTML)
openMenuButtons.forEach((btn) => {
    btn.addEventListener("click", openMenu);
});

closeMenuButtons.forEach((btn) => {
    btn.addEventListener("click", closeMenu);
});

// Fecha o menu ao clicar em qualquer link (garante que no mobile ele fecha)
menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});