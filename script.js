document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const formularioContato = document.getElementById('formulario-contato');
    
    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }
    
    // Função para fechar o menu mobile
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
    
    // Função para adicionar classe ao header quando rolar a página
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Função para scroll suave
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop - 80;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        closeMobileMenu();
    }
    
    // Função para animar elementos quando entrarem na viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.servico-card, .sobre-image, .contato-form, .contato-info, .destaque-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Função para validar e enviar o formulário
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Aqui você adicionaria a lógica para enviar o formulário
        // Por enquanto, apenas mostramos um alerta
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        this.reset();
    }
    
    // Event Listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    navLinksItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    if (formularioContato) {
        formularioContato.addEventListener('submit', handleFormSubmit);
    }
    
    // Inicializar funções
    handleScroll();
    animateOnScroll();
    
    // Adicionar classe CSS para animações após carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});

// Adicionar estilos CSS para animações
document.head.insertAdjacentHTML('beforeend', `
<style>
    .servico-card, .sobre-image, .contato-form, .contato-info, .destaque-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .servico-card.animate, .sobre-image.animate, .contato-form.animate, .contato-info.animate, .destaque-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .servico-card:nth-child(1) { transition-delay: 0.1s; }
    .servico-card:nth-child(2) { transition-delay: 0.2s; }
    .servico-card:nth-child(3) { transition-delay: 0.3s; }
    .servico-card:nth-child(4) { transition-delay: 0.4s; }
    
    .destaque-item:nth-child(1) { transition-delay: 0.1s; }
    .destaque-item:nth-child(2) { transition-delay: 0.2s; }
    .destaque-item:nth-child(3) { transition-delay: 0.3s; }
    .destaque-item:nth-child(4) { transition-delay: 0.4s; }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
</style>
`);