const path = require('path');
const fs = require('fs');

class Ticket {

    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.tickets  = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    /* Iniciar la app cargando el día de hoy o reiniciando */
    init() {
        const { hoy, tickets, ultimos4, ultimo } = require('../db/data.json');
        
        if ( hoy === this.hoy ) {
            this.tickets  = tickets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;
        } else {                                // es otro día por lo que reinicio mi db.
            this.guardarDB();
        }
    }

    /* Método para en caso de cambiar de día reiniciar el fichero DB */
    guardarDB() {
        const dbPath = path.join( __dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );
    }

    /* Método que añade un nuevo ticket a un escritorio */
    siguiente() {
        this.ultimo += 1 ;
        this.tickets.push( new Ticket( this.ultimo, null ) );

        this.guardarDB();
        return 'Ticket ' + this.ultimo;
    }

    /* Método que recoge un nuevo ticket a ser atendido */
    atenderTicket( escritorio ){
        
        if ( this.tickets.length === 0 ) {      // no tenemos tickets
            return null;
        }

        //const ticket = this.tickets[0];
        const ticket = this.tickets.shift();    // Es lo mismo pero el shift a demás de retornarlo, lo borra del arreglo.
        ticket.escritorio = escritorio;         // le asignamos el escritorio donde va a ser atendido.

        this.ultimos4.unshift( ticket );        // Lo añadimos a los últimos 4 que van a ser los que estén en pantalla.

        if ( this.ultimos4.length > 4 ) {       // Si es mayor de 4 borramos el último.
            this.ultimos4.splice(-1, 1);
        }

        this.guardarDB();
        return ticket;
    }

    /* Método que retornar los tickets sin atender
    cola() {
        return this.tickets.filter(( ticket ) => {
           return !ticket.escritorio
        }).length;
    } */
}

module.exports = TicketControl;