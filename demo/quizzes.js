/*
 * Preguntas de los quizzes para la versión demo (sin servidor).
 *
 * Las preguntas originales vivían en la base de datos del backend, que fue dado de baja.
 * Estas preguntas se redactaron a partir del contenido de cada módulo y respetan
 * la cantidad de preguntas que espera cada formulario del build:
 *   Módulo 1 -> 3 preguntas | Módulos 2 a 5 -> 2 preguntas
 *
 * Formato (el mismo que devolvía el API /ClientService/QuestionsAndAswers):
 *   questionEvalute : título de la pregunta
 *   questionDetail  : texto de apoyo (opcional)
 *   fieldType       : "RADIO_BUTTON"
 *   answers         : [{ idAnswer (número único > 0), detailAnswer, state (true = correcta) }]
 */
window.DEMO_QUIZZES = {
  1: [
    {
      questionEvalute: '¿Qué es la ASFI?',
      questionDetail: 'Selecciona la definición correcta.',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 101, detailAnswer: 'Un banco estatal que otorga créditos de vivienda.', state: false },
        { idAnswer: 102, detailAnswer: 'La institución que regula, controla y supervisa el funcionamiento del Sistema Financiero Boliviano.', state: true },
        { idAnswer: 103, detailAnswer: 'Una empresa privada que emite tarjetas de débito y crédito.', state: false }
      ]
    },
    {
      questionEvalute: '¿Cuál de las siguientes es una tarea esencial de la ASFI?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 111, detailAnswer: 'Emitir normas para regular las actividades de intermediación financiera y de valores.', state: true },
        { idAnswer: 112, detailAnswer: 'Fijar el precio de los productos de la canasta familiar.', state: false },
        { idAnswer: 113, detailAnswer: 'Abrir cuentas de ahorro a nombre de los consumidores.', state: false }
      ]
    },
    {
      questionEvalute: 'Uno de los objetivos de la regulación y supervisión financiera es:',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 121, detailAnswer: 'Garantizar que todas las personas obtengan un crédito.', state: false },
        { idAnswer: 122, detailAnswer: 'Eliminar las comisiones de todos los servicios financieros.', state: false },
        { idAnswer: 123, detailAnswer: 'Proteger los ahorros colocados en las entidades financieras autorizadas, fortaleciendo la confianza del público.', state: true }
      ]
    }
  ],
  2: [
    {
      questionEvalute: '¿Qué es un presupuesto?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 201, detailAnswer: 'El cálculo de tus ingresos, tus gastos y el saldo que te queda para ahorrar o invertir.', state: true },
        { idAnswer: 202, detailAnswer: 'El monto máximo que el banco te puede prestar.', state: false },
        { idAnswer: 203, detailAnswer: 'La lista de productos que ofrece una entidad financiera.', state: false }
      ]
    },
    {
      questionEvalute: 'Si necesitas ahorrar para el futuro y puedes inmovilizar tu dinero, ¿qué producto es una buena opción?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 211, detailAnswer: 'Cuenta corriente.', state: false },
        { idAnswer: 212, detailAnswer: 'Depósito a Plazo Fijo (DPF).', state: true },
        { idAnswer: 213, detailAnswer: 'Tarjeta prepagada.', state: false }
      ]
    }
  ],
  3: [
    {
      questionEvalute: '¿Qué es un crédito?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 301, detailAnswer: 'Un regalo de dinero que otorga el banco a sus clientes.', state: false },
        { idAnswer: 302, detailAnswer: 'Un préstamo de dinero que el deudor se compromete a devolver, junto con un interés, en un plazo definido.', state: true },
        { idAnswer: 303, detailAnswer: 'Un depósito que genera intereses a favor del cliente.', state: false }
      ]
    },
    {
      questionEvalute: '¿Qué significa el diferimiento de un crédito?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 311, detailAnswer: 'La eliminación definitiva del capital y los intereses.', state: false },
        { idAnswer: 312, detailAnswer: 'El cobro de interés sobre interés.', state: false },
        { idAnswer: 313, detailAnswer: 'La suspensión temporal del pago de cuotas, que se pagan al final del plan de pagos.', state: true }
      ]
    }
  ],
  4: [
    {
      questionEvalute: '¿Cuál es la diferencia principal entre una tarjeta de débito y una de crédito?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 401, detailAnswer: 'Con la de débito se usa el dinero de tu cuenta; con la de crédito, dinero prestado que debes pagar con intereses.', state: true },
        { idAnswer: 402, detailAnswer: 'La tarjeta de débito solo sirve en el exterior.', state: false },
        { idAnswer: 403, detailAnswer: 'No hay ninguna diferencia.', state: false }
      ]
    },
    {
      questionEvalute: '¿Qué es la Billetera Móvil?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 411, detailAnswer: 'Una billetera física con chip de seguridad.', state: false },
        { idAnswer: 412, detailAnswer: 'Un servicio ligado a una línea celular para cargar, enviar y efectivizar dinero electrónico.', state: true },
        { idAnswer: 413, detailAnswer: 'Una cuenta corriente que emite cheques.', state: false }
      ]
    }
  ],
  5: [
    {
      questionEvalute: '¿Qué es un Punto de Atención Financiera (PAF)?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 501, detailAnswer: 'Una aplicación móvil del banco.', state: false },
        { idAnswer: 502, detailAnswer: 'Un número telefónico de reclamos.', state: false },
        { idAnswer: 503, detailAnswer: 'Un espacio físico habilitado por una entidad supervisada para realizar operaciones o servicios financieros.', state: true }
      ]
    },
    {
      questionEvalute: '¿Cuál es una buena práctica al usar un cajero automático?',
      questionDetail: '',
      fieldType: 'RADIO_BUTTON',
      answers: [
        { idAnswer: 511, detailAnswer: 'Pedir ayuda a cualquier persona que esté cerca.', state: false },
        { idAnswer: 512, detailAnswer: 'Revisar que no haya objetos extraños en el teclado, la ranura o el dispensador.', state: true },
        { idAnswer: 513, detailAnswer: 'Anotar el PIN en la tarjeta para no olvidarlo.', state: false }
      ]
    }
  ]
};
