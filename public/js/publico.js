/* Referencias del HTML */
const lblTicket1     = document.querySelector( '#lblTicket1' );
const lblTicket2     = document.querySelector( '#lblTicket2' );
const lblTicket3     = document.querySelector( '#lblTicket3' );
const lblTicket4     = document.querySelector( '#lblTicket4' );
const lblEscritorio1 = document.querySelector( '#lblEscritorio1' );
const lblEscritorio2 = document.querySelector( '#lblEscritorio2' );
const lblEscritorio3 = document.querySelector( '#lblEscritorio3' );
const lblEscritorio4 = document.querySelector( '#lblEscritorio4' );

const socket = io();

socket.on('ultimos-ticket', ( ultimos4 ) => {                    // Connection event
    if ( ultimos4 ) {

        const audio = new Audio('../audio/new-ticket.mp3');
        audio.play();
        
        ultimos4.forEach( (ticket, i) => {
            switch (i) {
                case 0:
                    lblTicket1.innerText = 'Ticket ' + ticket.numero;
                    lblEscritorio1.innerText = ticket.escritorio;
                    break;

                case 1:
                    lblTicket2.innerText = 'Ticket ' + ticket.numero;
                    lblEscritorio2.innerText = ticket.escritorio;
                    break;

                case 2:
                    lblTicket3.innerText = 'Ticket ' + ticket.numero;
                    lblEscritorio3.innerText = ticket.escritorio;
                    break;

                case 3:
                    lblTicket4.innerText = 'Ticket ' + ticket.numero;
                    lblEscritorio4.innerText = ticket.escritorio;
                    break;
            
                default:
                    break;
            }
        });
    }
});