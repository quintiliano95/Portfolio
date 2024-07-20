window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function getWeather(latitude, longitude) {
    const apiKey = 'f14497fe0950caded04c25c667f47774\n';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados do clima');
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            const cityName = data.name;
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description; // A descrição já está em português
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherDiv.innerHTML = `
                <img src="assets/img/portfolio/weather.png" class="img-weather" alt="">
                <div style="margin-top: 10px; color: white; font-size: 10px">
                    ${cityName} <br>
                    ${temperature} °C <br>
                    ${description}
                </div>
            `;
        })
        .catch(error => {
            console.error('Erro ao obter dados do clima:', error);
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeather(latitude, longitude);
        }, error => {
            console.error('Erro ao obter a localização:', error);
        });
    } else {
        console.error('Geolocalização não é suportada pelo seu navegador');
    }
}

function sendEmail() {
        // Inicializar o EmailJS
        (function() {
            emailjs.init("Q4PVXmqeRP_vYtMZa");
        })();

        document.getElementById('submitButton').addEventListener('click', function(event) {
            event.preventDefault();

            // Capturar os dados do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Configurar os parâmetros do EmailJS
            const templateParams = {
                name: name,
                email: email,
                phone: phone,
                message: message
            };

            // Enviar o e-mail
            emailjs.send("service_cgqj735", "template_xqb3x4e", templateParams)
            .then(function(response) {
                console.log("E-mail enviado com sucesso!", response);
                document.getElementById('submitSuccessMessage').classList.remove('d-none');
                document.getElementById('submitErrorMessage').classList.add('d-none');
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.error("Erro ao enviar o e-mail", error);
                document.getElementById('submitSuccessMessage').classList.add('d-none');
                document.getElementById('submitErrorMessage').classList.remove('d-none');
            });
        });
}