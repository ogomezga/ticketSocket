const TicketControl = require('../models/ticket-control.js')

const ticketControl = new TicketControl();

const socketController = (socket) => {
    /* Acciones que van a emitir cuando un cliente conecta */
    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.emit('cola-ticket', ticketControl.tickets.length);

    socket.emit('ultimos-ticket', ticketControl.ultimos4);

    /* Acciones que van a escucharse cuando un cliente conecta o realiza una acción */
    socket.on('siguiente-ticket', (payload, callback) => {
        callback(ticketControl.siguiente());

        socket.broadcast.emit('cola-ticket', ticketControl.tickets.length);         // Notificar que hay un nuevo ticket pendiente de asignar
    });

    socket.on('atender-ticket', ({ escritorio }, callback) => {

        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        socket.broadcast.emit('ultimos-ticket', ticketControl.ultimos4);            // notificar cambio en los ultimos4
        //socket.emit('cola-ticket', ticketControl.tickets.length);       podría realizar ambos, así quito lógica del lado de cliente.
        socket.broadcast.emit('cola-ticket', ticketControl.tickets.length);         // Notificar que hay un ticket menos en la cola
        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });

}

module.exports = {
    socketController
}

