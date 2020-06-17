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

        View.inicializar({
            numCol: numCol,
            numLin: numLin
        });
        View.gerarGrade(function() {
            Controller.setPosicaoInicialFinal();
            Controller.bindEventos();
            Controller.carregarMapa(3);
            Controller.transition(); // Vai para o proximo estado (Pronto)
        });

        this.hookPathFinding();

        return StateMachine.ASYNC;
    },

    /** Acionado quando uma parede precisa ser desenhada
     * Define o ponto selecionado como parede
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

    onapagarParede: function(estado, de, para, gradeX, gradeY)
    {
        console.log(" C> [ApagarParede]")
        this.setLiberadoEm(gradeX, gradeY, true);
    },

    onapagandoParede: function()
    {
        console.log(" C> [ApagandoParede]");
    },

    onbusca: function(estado, de, para)
    {
        console.log(" C> [Busca]");
        this.caminho = this.finder.findPath(
            this.inicioX, this.inicioY, this.finalX, this.finalY, this.grade.clone()
        );
        this.loop();
    },

    onreinicio: function()
    {
        console.log(" C> [Reinicio]");
        setTimeout(function() {
            Controller.limparOperacoes();
            Controller.limparPassos();
            Controller.inicio();
        }, View.efeitoColorirNode.duration * 1.2);
    },

    onpausa: function(estado, de, para)
    {
        console.log(" C> [Pausa]");
    },

    oncontinuar: function(estado, de, para)
    {
        console.log(" C> [Continuar]");
        this.loop();
    },

    oncancelar: function(estado, de, para)
    {
        console.log(" C> [Cancelar]");
        this.limparOperacoes();
        this.limparPassos();

    },

    onterminar: function(estado, from, to)
    {
        console.log(" C> [Terminar]");
        View.desenharCaminho(this.caminho);
    },

    onlimpar: function(estado, from, to)
    {
        console.log(" C> [Limpar]");
        this.limparOperacoes();
        this.limparPassos();
    },

    onmodificar: function(estado, de, para)
    {
        console.log(" C> [Modificar]");
    },

    onreinicio: function(estado, de, para)
    {
        console.log(" C> [Reinicio]");
        setTimeout(function() {
            Controller.limparOperacoes();
            Controller.limparTudo();
            Controller.gerarGrade();
        }, View.efeitoColorirNode.duration * 1.2);
    },

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

    bindEventos: function()
    {
        console.log(" C> Definindo eventos");
        $('#area_desenho').mousedown($.proxy(this.mousedown, this));
        $(window)
            .mousemove($.proxy(this.mousemove, this))
            .mouseup($.proxy(this.mouseup, this));
    },

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

    limparOperacoes: function()
    {
        console.log(" C> Limpando operações");
        this.operacoes = [];
    },

    limparPassos: function()
    {
        console.log(" C> Limpando passos");
        View.limparPassos();
        View.limparCaminho();
    },

    limparTudo: function()
    {
        this.limparPassos();
        View.limparNodesBloqueados();
    },

    gerarGrade: function()
    {
        console.log(" C> Gerando a representação da grade");
        this.grade = new PF.Grid(this.tamGrade[0], this.tamGrade[1]);
    },

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

    mouseup: function(evento)
    {
        console.log(" C> Botão solto");
        if (Controller.can('descansar')) {
            Controller.descansar();
        }
    },

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

    setPosicaoInicialFinal: function()
    {
        this.setPosicaoInicial(1, 15);
        this.setPosicaoFinal(37,17);
    },

    setPosicaoInicial: function(gradeX, gradeY)
    {
        console.log(" C> Definindo posição inicial");
        this.inicioX = gradeX;
        this.inicioY = gradeY;
        View.setPosicaoInicial(gradeX, gradeY);
    },

    setPosicaoFinal: function(gradeX, gradeY)
    {
        console.log(" C> Definindo posição final");
        this.finalX = gradeX;
        this.finalY = gradeY;
        View.setPosicaoFinal(gradeX, gradeY);
    },

    setLiberadoEm: function(gradeX, gradeY, liberado)
    {
        console.log(" C> Definindo nó {"+gradeX+","+gradeY+"} como "+((liberado) ? "liberado" : "bloqueado"));
        this.grade.setWalkableAt(gradeX, gradeY, liberado);
        View.setAtributoEm(gradeX, gradeY, 'liberado', liberado);
    },

    isPosicaoInicial: function(gradeX, gradeY)
    {
        return gradeX === this.inicioX && gradeY === this.inicioY;
    },

    isPosicaoFinal: function(gradeX, gradeY)
    {
        return gradeX === this.finalX && gradeY === this.finalY;
    },

    isPosicaoInicialOuFinal: function(gradeX, gradeY)
    {
        return this.isPosicaoInicial(gradeX, gradeY) || this.isPosicaoFinal(gradeX, gradeY);
    },

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

    imprimirMapa: function()
    {
        let i,j;
        var s = "[";
        for(i=0; i<20; i++){
            s += "[";
            for(j=0; j<45; j++){
                s += ((Controller.grade.nodes[i][j].walkable) ? "1," : "0,");
            }
            s += "] \n";
        }
        s += "]";
        return s;
    }

});
