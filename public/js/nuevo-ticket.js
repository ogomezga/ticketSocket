// Referencias del HTML
const lblNuevoTicket = document.querySelector( '#lblNuevoTicket' );
const btnCrear       = document.querySelector( '#btnCrear' );

const socket = io();

socket.on('connect', () => {                    // Connection event
    // console.log('Conectado');
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {                 // Desconnection event
    // console.log('Des-conectado');
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', ( ticket ) => {
    // console.log( ticket );
    lblNuevoTicket.innerText = 'Ticket ' + ticket;
});

btnCrear.addEventListener( 'click', () => {
    
    socket.emit('siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});