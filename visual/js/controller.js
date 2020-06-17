/**
 * The visualization Controller will works as a state machine. O Controller da visualização ira funcionar como uma maquina de estado
 * See files under the `doc` folder for transition descriptions.
 * See https://github.com/jakesgordon/javascript-state-machine
 * for the document of the StateMachine module.
 */
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
            [0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        ]
    ],

    tamGrade: [45, 20], // number of nodes horizontally and vertically
    opsPorSegundo: 300,

    inicioX: 0,
    inicioY: 0,

    finalX: 0,
    finalY: 0,

    finder: null,
    grade: null,
    caminho: null,
    operacoes: null,
    qtdOperacoes: 0,
    tempoTotal: 0,

    /**
     * Asynchronous transition from `nada` state to `Pronto` state.
     */
    onleavenada: function(estado, de, para)
    {
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
            Controller.carregarMapa(null);
            Controller.transition(); // Vai para o proximo estado (Pronto)
        });

        this.hookPathFinding();

        return StateMachine.ASYNC;
        // => Pronto
    },

    ondesenharParede: function(estado, de, para, gradeX, gradeY)
    {
        this.setLiberadoEm(gradeX, gradeY, false);
        // => DesenhandoParede
    },

    onapagarParede: function(estado, de, para, gradeX, gradeY)
    {
        this.setLiberadoEm(gradeX, gradeY, true);
        // => ApagandoParede
    },

    onbusca: function(estado, de, para)
    {
        var grade,
            tempoInicio, tempoFinal;

        tempoInicio = window.performance ? performance.now() : Date.now();
        grade = this.grade.clone();
        this.caminho = this.finder.findPath(
            this.inicioX, this.inicioY, this.finalX, this.finalY, grade
        );
        this.qtdOperacoes = this.operacoes.length;
        tempoFinal = window.performance ? performance.now() : Date.now();
        this.tempoTotal = (tempoFinal - tempoInicio).toFixed(4);

        this.loop();
        // => buscando
    },

    onreinicio: function()
    {
        // When clearing the colorized nodes, there may be
        // nodes still animating, which is an asynchronous procedure.
        // Therefore, we have to defer the `abort` routine to make sure
        // that all the animations are done by the time we limpa the colors.
        // The same reason applies for the `onreset` event handler.
        setTimeout(function() {
            Controller.limparOperacoes();
            Controller.limparPassos();
            Controller.inicio();
        }, View.efeitoColorirNode.duration * 1.2);
        // => reiniciando
    },

    onpausa: function(estado, de, para)
    {
        // => pausado
    },

    oncontinuar: function(estado, de, para)
    {
        this.loop();
        // => buscando
    },

    oncancelar: function(estado, de, para)
    {
        this.limparOperacoes();
        this.limparPassos();
        // => Pronto
    },

    onterminar: function(estado, from, to)
    {
        /*
        View.mostrarStats({
            pathLength: PF.Util.pathLength(this.path),
            timeSpent:  this.timeSpent,
            operationCount: this.operationCount,
        });
         */
        View.desenharCaminho(this.caminho);
        // => finalizado
    },

    onlimpar: function(estado, from, to)
    {
        this.limparOperacoes();
        this.limparPassos();
        // => Pronto
    },

    onmodify: function(estado, de, para)
    {
        // => modificado
    },

    onreinicio: function(estado, de, para)
    {
        setTimeout(function() {
            Controller.limparOperacoes();
            Controller.limparTudo();
            Controller.gerarGrade();
        }, View.efeitoColorirNode.duration * 1.2);
        // => Pronto
    },

    /**
     * The following functions are called on entering states.
     */

    onpronto: function(estado, de, para)
    {
        console.log('=> Pronto');
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
        // => [Comecando, ArrastandoInicio, ArrastandoFim, drawingStart, drawingEnd]
    },

    oncomecando: function(estado, de, para)
    {
        console.log('=> Comecando');
        // Clears any existing Busca progress
        this.limparPassos();
        this.setEstadoBotoes({
            id: 2,
            enabled: true,
        });
        this.busca();
        // => buscando
    },

    onbuscando: function(estado, de, para)
    {
        console.log('=> buscando');
        this.setEstadoBotoes({
            id: 1,
            text: 'Reiniciar busca',
            enabled: true,
            callback: $.proxy(this.reinicio, this),
        }, {
            id: 2,
            text: 'Pausar busca',
            enabled: true,
            callback: $.proxy(this.pausa, this),
        });
        // => [pausado, finalizado]
    },

    onpausado: function(estado, de, para)
    {
        console.log('=> pausado');
        this.setEstadoBotoes({
            id: 1,
            text: 'Continuar busca',
            enabled: true,
            callback: $.proxy(this.resume, this),
        }, {
            id: 2,
            text: 'Cancelar busca',
            enabled: true,
            callback: $.proxy(this.cancel, this),
        });
        // => [buscando, Pronto]
    },

    onterminado: function(estado, de, para)
    {
        console.log('=> finalizado');
        this.setEstadoBotoes({
            id: 1,
            text: 'Reiniciar busca',
            enabled: true,
            callback: $.proxy(this.reiniciar, this),
        }, {
            id: 2,
            text: 'Limpar caminho',
            enabled: true,
            callback: $.proxy(this.limpa, this),
        });

        let abertos = []
        let fechados = [];
        $.map(this.porratoda, function(node, i){
            if(node.aberto)
                $("#abertos").append("<li>X:" + node.x + ", Y:" + node.y);
            else
                $("#fechados").append("<li>X:" + node.x + ", Y:" + node.y);
        });


    },

    onmodificado: function(estado, de, para)
    {
        console.log('=> modificado');
        this.setEstadoBotoes({
            id: 1,
            text: 'Iniciar busca',
            enabled: true,
            callback: $.proxy(this.inicio, this),
        }, {
            id: 2,
            text: 'Limpar caminho',
            enabled: true,
            callback: $.proxy(this.limpa, this),
        });
    },

    /**
     * Define setters and getters of PF.Node, then we can get the operations
     * of the pathfinding.
     */
    porratoda: [],

    hookPathFinding: function() {

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
                Controller.porratoda.push({x: this.x, y: this.y, aberto: true})
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
                Controller.porratoda.push({x: this.x, y: this.y, aberto: false})
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
        $('#area_desenho').mousedown($.proxy(this.mousedown, this));
        $(window)
            .mousemove($.proxy(this.mousemove, this))
            .mouseup($.proxy(this.mouseup, this));
    },

    loop: function()
    {
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
        var operacoes = this.operacoes,
            op, suportado;

        do {
            if (!operacoes.length) {
                this.terminar(); // transit to `finalizado` state
                return;
            }
            op = operacoes.shift();
            suportado = View.opsSuportadas.indexOf(op.attr) !== -1;
        } while (!suportado);

        View.setAtributoEm(op.x, op.y, op.attr, op.valor);
    },

    limparOperacoes: function()
    {
        this.operacoes = [];
    },

    limparPassos: function()
    {
        View.limparPassos();
        View.limparCaminho();
    },

    limparTudo: function()
    {
        this.limparPassos();
        View.limparNosBloqueados();
    },

    gerarGrade: function()
    {
        this.grade = new PF.Grid(this.tamGrade[0], this.tamGrade[1]);
    },

    mousedown: function (evento)
    {
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
        console.log(gradeX, gradeY);
        console.log(grade.isWalkableAt(gradeX, gradeY));
        if (this.can('desenharParede') && grade.isWalkableAt(gradeX, gradeY)) {
            console.log("dasdas");
            this.desenharParede(gradeX, gradeY);
            return;
        }
        if (this.can('apagarParede') && !grade.isWalkableAt(gradeX, gradeY)) {
            console.log("teitei");
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
        if (Controller.can('descansar')) {
            Controller.descansar();
        }
    },

    setEstadoBotoes: function()
    {
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

    /**
     * When initializing, this method will be called to set the positions
     * of Inicio node and end node.
     * It will detect user's display size, and compute the best positions.
     */
    setPosicaoInicialFinal: function()
    {
        /*
        var width, height,
            marginRight, availWidth,
            centerX, centerY,
            endX, endY,
            nodeSize = View.nodeSize;

        width  = $(window).width();
        height = $(window).height();

        marginRight = $('#algorithm_panel').width();
        availWidth = width - marginRight;

        centerX = Math.ceil(availWidth / 2 / nodeSize);
        centerY = Math.floor(height / 2 / nodeSize);
         */

        //this.setPosicaoInicial(centerX - 5, centerY);
        //this.setPosicaoFinal(centerX + 5, centerY);

        //this.setPosicaoInicial(0, 3);
        //this.setPosicaoFinal(44,17);

        // this.setPosicaoInicial(1, 15);
        // this.setPosicaoFinal(25,0);

        this.setPosicaoInicial(1, 15);
        this.setPosicaoFinal(37,17);
    },

    setPosicaoInicial: function(gradeX, gradeY)
    {
        this.inicioX = gradeX;
        this.inicioY = gradeY;
        View.setPosicaoInicial(gradeX, gradeY);
    },

    setPosicaoFinal: function(gradeX, gradeY)
    {
        this.finalX = gradeX;
        this.finalY = gradeY;
        View.setPosicaoFinal(gradeX, gradeY);
    },

    setLiberadoEm: function(gradeX, gradeY, liberado)
    {
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

    carregarMapa: function(nego)
    {
        let mapa = this.mapas[2];

        let i, j;
        for(i=0; i<20; i++) {
            for (j = 0; j < 45; j++) {
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
