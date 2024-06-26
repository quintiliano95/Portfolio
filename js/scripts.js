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
            const temperature = data.main.temp;
            const description = data.weather[0].description; // A descrição já está em português
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherDiv.innerHTML = `
                <div class="row">               
                    <div class="col-4" id="weather" style="color: white; font-size: 10px">
                        <img src="assets/img/portfolio/weather.png" class="img-weather" alt="">${cityName}
                        <div>${temperature} °C</div>
                        <div class="">${description}</div>
                    </div>  
                    <div class="col-8 d-flex align-items-center justify-content-between p-3">
                        <img src="assets/img/portfolio/casa.png" style="height: 32px; margin-right: 15px" alt="">
                        <a href="#page-top">Alexandre Quintiliano</a>         
                    </div>  
                          
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
        // Importar o EmailJS
    const emailjs = require('emailjs-com');

    // Configurar suas credenciais
    emailjs.init("Q4PVXmqeRP_vYtMZa");

    // Enviar o e-mail
    emailjs.send("service_cgqj735", "template_xqb3x4e", {
        to: "recipient@example.com",
        cc: "cc@example.com",
        subject: "Assunto do E-mail",
        body: "Corpo do E-mail"
    })
    .then(function(response) {
        console.log("E-mail enviado com sucesso!", response);
    }, function(error) {
        console.error("Erro ao enviar o e-mail", error);
    });
}