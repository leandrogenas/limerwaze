var Controller = StateMachine.create({
    initial: 'nada',
    events: [
        {
            name: 'inicializacao',
            from: 'nada',
            to:   'pronto'
        },
        {
            name: 'busca',
            from: 'comecando',
            to:   'buscando'
        },
        {
            name: 'pausa',
            from: 'buscando',
            to:   'pausado'
        },
        {
            name: 'terminar',
            from: 'buscando',
            to:   'terminado'
        },
        {
            name: 'continuar',
            from: 'pausado',
            to:   'buscando'
        },
        {
            name: 'cancelar',
            from: 'pausado',
            to:   'pronto'
        },
        {
            name: 'modificar',
            from: 'terminado',
            to:   'modificado'
        },
        {
            name: 'reinicio',
            from: '*',
            to:   'pronto'
        },
        {
            name: 'limpar',
            from: ['terminado', 'modificado'],
            to:   'pronto'
        },
        {
            name: 'inicio',
            from: ['pronto', 'modificado', 'reiniciando'],
            to:   'comecando'
        },
        {
            name: 'reiniciar',
            from: ['buscando', 'terminado'],
            to:   'reiniciando'
        },
        {
            name: 'arrastarInicio',
            from: ['pronto', 'terminado'],
            to:   'arrastandoInicio'
        },
        {
            name: 'arrastarFim',
            from: ['pronto', 'terminado'],
            to:   'arrastandoFim'
        },
        {
            name: 'desenharParede',
            from: ['pronto', 'terminado'],
            to:   'desenhandoParede'
        },
        {
            name: 'apagarParede',
            from: ['pronto', 'terminado'],
            to:   'apagandoParede'
        },
        {
            name: 'descansar',
            from: ['arrastandoInicio', 'arrastandoFim', 'desenhandoParede', 'apagandoParede'],
            to  : 'pronto'
        },
    ],
});

$.extend(Controller, {
    mapas: [
        [
            [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,1,0],
            [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1],
            [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0],
            [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0]
        ],
        [
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,1,0,0,0,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,1,1,1,1,1,1,1,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
            [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0],
            [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
            [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1,0],
            [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,0],
            [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
            [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0]
        ],
        [
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,1,0,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
            [1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0],
            [0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1],
            [0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
        ],
        [
            [1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1],
            [1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1],
            [0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,1,1],
            [1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1],
            [1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,0,0,1,0,1,1],
            [1,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,0,1,1],
            [1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1],
            [1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,1],
            [1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,0,0,0,0,0,1,1],
            [1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1],
            [0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
            [1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1],
            [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,0,1],
            [0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,1],
            [1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
            [0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,1,0,0,1,0,1,1],
            [1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1]
        ],
        [
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,1,1,0,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,0],
            [1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0],
            [1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0],
            [0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0],
            [0,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,0,1,0],
            [0,1,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,1,0,1,0,0,1,0],
            [0,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0],
            [0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
            [0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
            [0,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1],
            [0,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0]
        ]
    ],

    // Tamanho da grade, linhas por colunas
    tamGrade: [45, 20],
    opsPorSegundo: 500,

    // Posição inicial
    inicioX: 0,
    inicioY: 0,

    // Posição final
    finalX: 0,
    finalY: 0,

    // Algoritmo de busca
    finder: null,

    // Representação da grade
    grade: null,

    // Caminho percorrido
    caminho: null,

    // Operações feitas na busca
    operacoes: null,

    // Quantidade total de operações
    qtdOperacoes: 0,

    /** Acionada no começo, ao carregar tudo
     *  Irá gerar e desenhar a grade, e definir propriedades iniciais
     *  [Nada] => [Pronto]
     */
    onleavenada: function(estado, de, para)
    {
        console.log(" C> Inicializando");
        var numCol = this.tamGrade[0],
            numLin = this.tamGrade[1];

        this.grade = new PF.Grid(numCol, numLin);
        this.$botoes = $('.control_button');

        // Inicializa a view
        View.inicializar({
            numCol: numCol,
            numLin: numLin
        });

        // Gera a visualização da grade
        View.gerarGrade(function() {
            Controller.setPosicaoInicialFinal();
            Controller.bindEventos();
            Controller.carregarMapa(3);
            Controller.transition(); // Vai para o proximo estado (Pronto)
        });

        // Atrela propriedades extras à classe de nó
        this.hookPathFinding();

        return StateMachine.ASYNC;
    },

    /** Acionada quando o estado está em pronto
     * Irá definir o estado inicial dos botões e as
     * suas respectivas funções de callback
     */
    onpronto: function(estado, de, para)
    {
        console.log(' C> [Pronto]');
        this.setEstadoBotoes({
            id: 1,
            text: 'Iniciar busca',
            enabled: true,
            callback: $.proxy(this.inicio, this),
        }, {
            id: 2,
            text: 'Pausar busca',
            enabled: false,
        }, {
            id: 3,
            text: 'Limpar paredes',
            enabled: true,
            callback: $.proxy(this.reinicio, this),
        });

    },

    /** Acionado quando uma parede precisa ser desenhada
     * Define o ponto selecionado como bloqueado
     */
    ondesenharParede: function(estado, de, para, gradeX, gradeY)
    {
        console.log(" C> [DesenharParede]");
        this.setLiberadoEm(gradeX, gradeY, false);
    },

    ondesenhandoParede: function()
    {
        console.log(" C> [DesenhandoParede]");
    },

    /** Acionado quando uma parede precisa ser apagada
     * Define o ponto selecionado como liberado
     */
    onapagarParede: function(estado, de, para, gradeX, gradeY)
    {
        console.log(" C> [ApagarParede]")
        this.setLiberadoEm(gradeX, gradeY, true);
    },

    onapagandoParede: function()
    {
        console.log(" C> [ApagandoParede]");
    },

    /** Acionado quando a busca é iniciada
     * Irá definir o algoritmo de busca e iniciar
     * o loop de busca
     */
    onbusca: function(estado, de, para)
    {
        console.log(" C> [Busca]");
        this.caminho = this.finder.findPath(
            this.inicioX, this.inicioY, this.finalX, this.finalY, this.grade.clone()
        );
        this.loop();
    },


    /** Acionada ao reiniciar a busca
     * Limpa todas as operações, passos e reinicia
     * o controlador
     */
    onreinicio: function()
    {
        console.log(" C> [Reinicio]");
        setTimeout(function() {
            Controller.limparOperacoes();
            Controller.limparPassos();
            Controller.inicio();
        }, View.efeitoColorirNode.duration * 1.2);
    },

    /** Acionada ao pausar a busca
     *
     */
    onpausa: function(estado, de, para)
    {
        console.log(" C> [Pausa]");
    },

    /** Acionada ao continuar a busca
     *
     */
    oncontinuar: function(estado, de, para)
    {
        console.log(" C> [Continuar]");
        this.loop();
    },

    /** Acionada ao cancelar a busca
     * Limpa as operações e passos
     */
    oncancelar: function(estado, de, para)
    {
        console.log(" C> [Cancelar]");
        this.limparOperacoes();
        this.limparPassos();

    },

    /** Acionada ao terminar a busca
     * Irá desenhar o caminho do início ao fim
     */
    onterminar: function(estado, de, para)
    {
        console.log(" C> [Terminar]");
        View.desenharCaminho(this.caminho);
    },

    /** Acionada ao limpar a grade
     * Irá limpar as operações e os passos
     */
    onlimpar: function(estado, de, para)
    {
        console.log(" C> [Limpar]");
        this.limparOperacoes();
        this.limparPassos();
    },

    /** Acionada ao modificar algum node da grade
     *
     */
    onmodificar: function(estado, de, para)
    {
        console.log(" C> [Modificar]");
    },

    /** Acionada ao início da busca
     * Irá limpar passos anteriores, liberar o botão de
     * pausa da busca e transicionar para o estado de busca
     */
    oncomecando: function(estado, de, para)
    {
        console.log(' C> [Comecando]');
        this.limparPassos();
        this.setEstadoBotoes({
            id: 2,
            enabled: true,
        });
        this.busca();

    },

    /** Acionada ao buscar
     * Irá definir os estados dos botões de acordo com as opções
     * disponíveis ao estar buscando
     */
    onbuscando: function(estado, de, para)
    {
        console.log(' C> [Buscando]');
        this.setEstadoBotoes({
            id: 1,
            text: 'Reiniciar busca',
            enabled: true,
            callback: $.proxy(this.reinicio, this),
        }, {
            id: 2,
            text: 'Pausar busca',
            enabled: true,
            callback: $.proxy(this.pausar, this),
        });
    },

    /** Acionada ao pausar a busca
     * Irá definir os estados dos botões de acordo
     * com o estado pausado da busca
     */
    onpausado: function(estado, de, para)
    {
        console.log('C> [Pausado]');
        this.setEstadoBotoes({
            id: 1,
            text: 'Continuar busca',
            enabled: true,
            callback: $.proxy(this.continuar, this),
        }, {
            id: 2,
            text: 'Cancelar busca',
            enabled: true,
            callback: $.proxy(this.cancelar, this),
        });
    },

    /** Acionado ao finalizar a busca
     * Irá reiniciar os estados dos botões para o seu original
     */
    onterminado: function(estado, de, para)
    {
        console.log(' C> [Finalizado]');
        this.setEstadoBotoes({
            id: 1,
            text: 'Reiniciar busca',
            enabled: true,
            callback: $.proxy(this.reinicio, this),
        }, {
            id: 2,
            text: 'Limpar caminho',
            enabled: true,
            callback: $.proxy(this.limpar, this),
        });


    },

    /** Acionado quando algo é modificado na grade
     * Irá definir o estado dos botões como o inicial,
     * apenas permitindo iniciar a busca e limpar o caminho
     * anteriormente desenhado
     */
    onmodificado: function(estado, de, para)
    {
        console.log(' C> [Modificado]');
        this.setEstadoBotoes({
            id: 1,
            text: 'Iniciar busca',
            enabled: true,
            callback: $.proxy(this.inicio, this),
        }, {
            id: 2,
            text: 'Limpar caminho',
            enabled: true,
            callback: $.proxy(this.limpar, this),
        });
    },

    /** Função que irá atrelar funções extras ao nó do Pathfinding.js,
     * permitindo o acesso dos nós abertos, fechados e testados
     */
    hookPathFinding: function() {
        console.log(" C> Configurando o pathfinder");
        PF.Node.prototype = {
            get opened() {
                return this._aberto;
            },
            set opened(v) {
                this._aberto = v;
                Controller.operacoes.push({
                    x: this.x,
                    y: this.y,
                    attr: 'aberto',
                    valor: v
                });
            },
            get closed() {
                return this._fechado;
            },
            set closed(v) {
                this._fechado = v;
                Controller.operacoes.push({
                    x: this.x,
                    y: this.y,
                    attr: 'fechado',
                    valor: v
                });
            },
            get tested() {
                return this._testado;
            },
            set tested(v) {
                this._testado = v;
                Controller.operacoes.push({
                    x: this.x,
                    y: this.y,
                    attr: 'testado',
                    valor: v
                });
            },
        };

        this.operacoes = [];
    },

    /** Atrela os eventos de cursor ao controlador,
     * para os seus tratamentos
     */
    bindEventos: function()
    {
        console.log(" C> Definindo eventos");
        $('#area_desenho').mousedown($.proxy(this.mousedown, this));
        $(window)
            .mousemove($.proxy(this.mousemove, this))
            .mouseup($.proxy(this.mouseup, this));
    },

    /** Função que desenha a busca iterativamente,
     * de acordo com a velocidade definida
     */
    loop: function()
    {
        console.log(" C> Loop");
        var intervalo = 1000 / this.opsPorSegundo;
        (function loop() {
            if (!Controller.is('buscando')) {
                return;
            }
            Controller.passo();
            setTimeout(loop, intervalo);
        })();
    },

    /** Representa cada 'passo' que o algoritmo faz para
     * chegar ao destino, e desenha isso na grade
     */
    passo: function()
    {
        console.log(" C> Passo");
        var operacoes = this.operacoes,
            op, suportado;

        do {
            if (!operacoes.length) {
                this.terminar();
                return;
            }
            op = operacoes.shift();
            suportado = View.opsSuportadas.indexOf(op.attr) !== -1;
        } while (!suportado);

        let lista = (op.attr == "aberto")
            ? $("#abertos")
            : $("#fechados");

        lista.append("<li>X: " + op.x + ", Y:" + op.y + "</li>");
        View.setAtributoEm(op.x, op.y, op.attr, op.valor);
    },

    /** Limpa o vetor de operações
     *
     */
    limparOperacoes: function()
    {
        console.log(" C> Limpando operações");
        this.operacoes = [];
    },

    /** Limpa os passos e caminho já desenhado
     * anteriormente pelo código, se houver.
     */
    limparPassos: function()
    {
        console.log(" C> Limpando passos");
        View.limparPassos();
        View.limparCaminho();
    },

    /** Limpa tudo da tela, incluindo caminhos, passos
     * e nós bloqueados
     */
    limparTudo: function()
    {
        this.limparPassos();
        View.limparNodesBloqueados();
    },

    /** Cria a representação da grade
     *
     */
    gerarGrade: function()
    {
        console.log(" C> Gerando a representação da grade");
        this.grade = new PF.Grid(this.tamGrade[0], this.tamGrade[1]);
    },

    /** Evento de tratamento quando houver algum clique na grade
     * Irá testar o estado atual do algoritmo e agir de acordo
     * com o que o usuário deseja, seja isso arrastar, colocar ou
     * tirar uma parede, arrastar os pontos iniciais e finais ou
     * qualquer outro evento de clique
     */
    mousedown: function (evento)
    {
        console.log(" C> Clicado");
        var coord = View.toGridCoordinate(evento.pageX, evento.pageY),
            gradeX = coord[0],
            gradeY = coord[1],
            grade  = this.grade;

        if (this.can('arrastarInicio') && this.isPosicaoInicial(gradeX, gradeY)) {
            this.arrastarInicio();
            return;
        }
        if (this.can('arrastarFim') && this.isPosicaoFinal(gradeX, gradeY)) {
            this.arrastarFim();
            return;
        }
        if (this.can('desenharParede') && grade.isWalkableAt(gradeX, gradeY)) {
            this.desenharParede(gradeX, gradeY);
            return;
        }
        if (this.can('apagarParede') && !grade.isWalkableAt(gradeX, gradeY)) {
            this.apagarParede(gradeX, gradeY);
        }
    },

    /** Evento de tratamento quando o mouse foi movido na tela
     * Irá tratar o movimento do mouse, para as ações que exigem
     * isso, como arrastar os pontos iniciais ou finais ou desenhar
     * a parede
     */
    mousemove: function(evento)
    {
        var coord = View.toGridCoordinate(evento.pageX, evento.pageY),
            grade = this.grade,
            gradeX = coord[0],
            gradeY = coord[1];

        if (this.isPosicaoInicialOuFinal(gradeX, gradeY)) {
            return;
        }

        switch (this.current) {
            case 'arrastandoInicio':
                if (grade.isWalkableAt(gradeX, gradeY)) {
                    this.setPosicaoInicial(gradeX, gradeY);
                }
                break;
            case 'arrastandoFim':
                if (grade.isWalkableAt(gradeX, gradeY)) {
                    this.setPosicaoFinal(gradeX, gradeY);
                }
                break;
            case 'desenhandoParede':
                this.setLiberadoEm(gradeX, gradeY, false);
                break;
            case 'apagandoParede':
                this.setLiberadoEm(gradeX, gradeY, true);
                break;
        }
    },

    /** Evento de tratamento quando o mouse parou de disparar o evento
     * de clique.
     * Irá parar qualquer ação que esteja sendo executada no momento,
     * e irá transicionar para o estado de descanso, para partir para o pronto
     * novamente
     */
    mouseup: function(evento)
    {
        console.log(" C> Botão solto");
        if (Controller.can('descansar')) {
            Controller.descansar();
        }
    },

    /** Define os estados dos botões de acordo com os parâmetros
     * informados, para controle de entrada do usuário
     */
    setEstadoBotoes: function()
    {
        console.log(" C> Definindo estado dos botões");
        $.each(arguments, function(i, opt) {
            var $botao = Controller.$botoes.eq(opt.id - 1);
            if (opt.text) {
                $botao.text(opt.text);
            }
            if (opt.callback) {
                $botao
                    .unbind('click')
                    .click(opt.callback);
            }
            if (opt.enabled === undefined) {
                return;
            } else if (opt.enabled) {
                $botao.removeAttr('disabled');
            } else {
                $botao.attr({ disabled: 'disabled' });
            }
        });
    },

    /** Define a posição inicial e final
     *
     */
    setPosicaoInicialFinal: function()
    {
        this.setPosicaoInicial(1, 15);
        this.setPosicaoFinal(37,17);
    },

    /** Define a posição inicial
     *
     */
    setPosicaoInicial: function(gradeX, gradeY)
    {
        console.log(" C> Definindo posição inicial");
        this.inicioX = gradeX;
        this.inicioY = gradeY;
        View.setPosicaoInicial(gradeX, gradeY);
    },

    /** Define a posição final
     *
     */
    setPosicaoFinal: function(gradeX, gradeY)
    {
        console.log(" C> Definindo posição final");
        this.finalX = gradeX;
        this.finalY = gradeY;
        View.setPosicaoFinal(gradeX, gradeY);
    },

    /** Define algum ponto como sendo liberado ou não,
     * atualizando a view de maneira adequada
     */
    setLiberadoEm: function(gradeX, gradeY, liberado)
    {
        console.log(" C> Definindo nó {"+gradeX+","+gradeY+"} como "+((liberado) ? "liberado" : "bloqueado"));
        this.grade.setWalkableAt(gradeX, gradeY, liberado);
        View.setAtributoEm(gradeX, gradeY, 'liberado', liberado);
    },

    /** Retorna se a posição informada é a inicial
     *
     */
    isPosicaoInicial: function(gradeX, gradeY)
    {
        return gradeX === this.inicioX && gradeY === this.inicioY;
    },

    /** Retorna se a posição informada é a final
     *
     */
    isPosicaoFinal: function(gradeX, gradeY)
    {
        return gradeX === this.finalX && gradeY === this.finalY;
    },

    /** Retorna se a posição informada é a inicial ou final
     *
     */
    isPosicaoInicialOuFinal: function(gradeX, gradeY)
    {
        return this.isPosicaoInicial(gradeX, gradeY) || this.isPosicaoFinal(gradeX, gradeY);
    },

    /** Carrega um mapa pré definido e define suas posições de parede
     * e liberados
     */
    carregarMapa: function(idxMapa)
    {
        console.log(" C> Carregando mapa");
        let mapa = this.mapas[idxMapa];

        let i, j;
        for(i=0; i<this.tamGrade[1]; i++) {
            for (j = 0; j < this.tamGrade[0]; j++) {
                this.grade.nodes[i][j].walkable = mapa[i][j];
                this.setLiberadoEm(j, i, mapa[i][j]);
            }
        }

    },

    /** Constrói uma representação de vetor a partir do estado
     * atual da grade, e retorna como string
     */
    imprimirMapa: function()
    {
        let i,j;
        var s = "[";
        for(i=0; i<this.tamGrade[1]; i++){
            s += "[";
            for(j=0; j<this.tamGrade[0]; j++){
                s += ((Controller.grade.nodes[i][j].walkable) ? "1," : "0,");
            }
            s += "] \n";
        }
        s += "]";
        return s;
    }

});
