// Efeito da navbar ao rolar a página
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled'); // Adiciona cor/sombra
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle do menu mobile (abre/fecha o menu)
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animação do ícone hambúrguer
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fecha o menu mobile ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Rolagem suave ao clicar nos links do menu
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animação nos cards de serviços ao passar o mouse
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Intersection Observer — animações ao aparecer na tela
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animação dos números (contador)
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observa elementos que vão animar ao rolar
const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .info-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animação dos contadores na seção Sobre
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => observer.observe(stat));

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Lightbox da galeria (abre imagem grande ao clicar)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Estilos aplicados dinamicamente
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 40px;
            color: white;
            cursor: pointer;
            transition: color 0.3s ease;
        `;
        
        // Hover do botão de fechar
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#d4af37';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = 'white';
        });
        
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
});

// Envio do formulário
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Simula envio do formulário
    console.log('Form submitted:', formData);
    
    // Mensagem de sucesso
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #d4af37;
        color: #1a1a1a;
        padding: 20px 40px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        animation: slideDown 0.5s ease;
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);
    
    // Limpa o formulário
    contactForm.reset();
});

// Efeito parallax na seção hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Adiciona animações CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            top: -100px;
            opacity: 0;
        }
        to {
            top: 100px;
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            top: 100px;
            opacity: 1;
        }
        to {
            top: -100px;
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
