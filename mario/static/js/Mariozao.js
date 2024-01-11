const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500)
}

document.addEventListener('keydown', jump);

setTimeout(() => {
    document.getElementById('open').hidden = true
    Swal.fire({
        title: "Clique em INICIAR para começar!",
        showClass: {
            popup: 'animated fadeInDown faster',
            icon: 'animated heartBeat delay-1s'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster',
        },
        confirmButtonColor: '#2E8B57',
        confirmButtonText: 'INICIAR',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        background: 'linear-gradient(#E0F6FF, #87CEEB)',
        imageUrl: "images/marioDancing.gif",

    }).then((result) => {
        if (result.isConfirmed) {
            startMario();
        }
    })
}, "3000");


function startMario() {
    document.getElementById('gameBoard').hidden = false
    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'images/game-over.png'
            mario.style.width = '80px'
            mario.style.left = '50px'
            Swal.fire({
                title: 'Xii, deu ruim!',
                html: '<h3>O que você deseja fazer?</h3>' +
                    '        <div class="loadingspinner">\n' +
                    '          <div id="square1"></div>\n' +
                    '          <div id="square2"></div>\n' +
                    '          <div id="square3"></div>\n' +
                    '          <div id="square4"></div>\n' +
                    '          <div id="square5"></div>\n' +
                    '        </div>' +
                    '        <div class="open" id="open">\n' +
                    '          <img src="images/mario-bros-xd.gif">\n' +
                    '          </div>',
                showCancelButton: true,
                confirmButtonText: `Reiniciar`,
                cancelButtonText: `Sair`,
                confirmButtonColor: '#2E8B57',
                cancelButtonColor: '#8B0000',
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: 'linear-gradient(#E0F6FF, #87CEEB)',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload(true);
              } else {
                 window.location.href = "https://www.linkedin.com/in/alexandre-quintiliano-561633152/"
              }
            })
            clearInterval(loop)
        }
    }, 10)
}
