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

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function sendEmail() {
        // Inicializar o EmailJS
        (function() {
            emailjs.init("Q4PVXmqeRP_vYtMZa");
        })();

            // Capturar os dados do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            if (!name || !message) {
                Swal.fire({
                    icon: "error",
                    text: "Verifique se os campos 'Nome', 'Mensagem' e 'Email' estão preenchidos!",
                });
                return; // Impede o envio do formulário
            }

            // Validação de e-mail
            if (!validateEmail(email)) {
                Swal.fire({
                  icon: "error",
                  text: "Por favor, insira um e-mail válido.",
                });
                return;
            }

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
                Swal.fire({
                  icon: "success",
                  text: "Mensagem enviada com sucesso!",
                });
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.error("Erro ao enviar o e-mail", error);
                Swal.fire({
                  icon: "error",
                  title: "Erro ao enviar a mensagem!",
                  text: "Favor, enviar um e-mail informando o erro para: alexandrequintili@outlook.com",
                  timer: 10000
                });
            });
}