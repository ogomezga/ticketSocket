/* Referencias del HTML */
const lblEscritorio     = document.querySelector( '#lblEscritorio' );
const btnAtenderTicket  = document.querySelector( '#btnAtenderTicket' );
const lblTicket         = document.querySelector( 'small' );
const lblPendientes     = document.querySelector( '#lblPendientes' );
const divAlerta         = document.querySelector( '.alert' );

/* Referencias query params chrome/firefox */
const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ) {    // comprobamos si mediante url nos envían el valor correcto.
    window.location = 'index.html';         // sino retornamos al inicio.
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');

lblEscritorio.innerText     = escritorio;
lblTicket.innerText         = 'Nadie';
lblPendientes.style.display = 'none';
divAlerta.style.display     = 'none';

const socket = io();

socket.on('connect', () => {                    // Connection event
    // console.log('Conectado');
    btnAtenderTicket.disabled = false;
});

socket.on('disconnect', () => {                 // Desconnection event
    // console.log('Des-conectado');
    btnAtenderTicket.disabled = true;
});

socket.on('cola-ticket', ( payload ) => {
    if ( payload ) {
        divAlerta.style.display = 'none';
        lblPendientes.style.display = '';
        return lblPendientes.innerText     = payload;
    }

    divAlerta.style.display = '';
});

btnAtenderTicket.addEventListener( 'click', () => {
    
    socket.emit('atender-ticket', { escritorio }, ( { ok, ticket, msg} ) => {
        if ( !ok ) {
            lblTicket.innerText = 'Nadie';
            lblPendientes.style.display = 'none';
            return divAlerta.style.display = '';
        }
        
        lblPendientes.innerText = Number( lblPendientes.innerText ) - 1; 
        lblTicket.innerText = 'Ticket ' + ticket.numero;
    });

});