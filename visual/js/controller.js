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
            name: 'final',
            from: 'buscando',
            to:   'finalizado'
        },
        {
            name: 'retomado',
            from: 'pausado',
            to:   'buscando'
        },
        {
            name: 'cancelado',
            from: 'pausado',
            to:   'pronto'
        },
        {
            name: 'modificar',
            from: 'finalizado',
            to:   'modificado'
        },
        {
            name: 'restaurado',
            from: '*',
            to:   'pronto'
        },
        {
            name: 'limpo',
            from: ['finalizado', 'modificado'],
            to:   'pronto'
        },
        {
            name: 'comeco',
            from: ['pronto', 'modificado', 'reiniciando'],
            to:   'inicio'
        },
        {
            name: 'reiniciar',
            from: ['buscando', 'finalizado'],
            to:   'reiniciando'
        },
        {
            name: 'arrastaInicio',
            from: ['pronto', 'finalizado'],
            to:   'arrastandoInicio'
        },
        {
            name: 'arrastaFim',
            from: ['pronto', 'finalizado'],
            to:   'arrastandoFim'
        },
        {
            name: 'desenhaParede',
            from: ['pronto', 'finalizado'],
            to:   'desenhandoParede'
        },
        {
            name: 'apagaParede',
            from: ['pronto', 'finalizado'],
            to:   'apagandoParede'
        },
        {
            name: 'parado',
            from: ['arrastandoInicio', 'arrastandoFim', 'desenhandoParede', 'apagandoParede'],
            to  : 'pronto'
        },
    ],
});

$.extend(Controller, {
    mapa1: [
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
     * Asynchronous transition from `none` state to `Pronto` state.
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
            //Controller.carregarMapa(null);
            Controller.transition(); // Vai para o proximo estado (Pronto)
        });

        this.hookPathFinding();

        return StateMachine.ASYNC;
        // => Pronto
    },

    ondesenhaParede: function(estado, de, para, gradeX, gradeY)
    {
        this.setLiberadoEm(gradeX, gradeY, false);
        // => DesenhandoParede
    },

    onapagaParede: function(estado, de, para, gradeX, gradeY)
    {
        this.setLiberadoEm(gradeX, gradeY, true);
        // => ApagandoParede
    },

    onbusca: function(estado, de, para)
    {
        var grade,
            tempoInicio, tempoFinal,
            finder = Panel.getFinder();

        tempoInicio = window.performance ? performance.now() : Date.now();
        grade = this.grade.clone();
        this.caminho = finder.findPath(
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

    onresume: function(estado, de, para)
    {
        this.loop();
        // => buscando
    },

    oncancel: function(estado, de, para)
    {
        this.limparOperacoes();
        this.limparPassos();
        // => Pronto
    },

    onfinish: function(estado, from, to)
    {
        View.mostrarStats({
            pathLength: PF.Util.pathLength(this.path),
            timeSpent:  this.timeSpent,
            operationCount: this.operationCount,
        });
        View.desenharCaminho(this.path);
        // => finalizado
    },

    onclear: function(estado, from, to)
    {
        this.limparOperacoes();
        this.limparPassos();
        // => Pronto
    },

    onmodify: function(estado, de, para)
    {
        // => modificado
    },

    onreset: function(estado, de, para)
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
            text: 'Inicio Busca',
            enabled: true,
            callback: $.proxy(this.inicio, this),
        }, {
            id: 2,
            text: 'pausa Busca',
            enabled: false,
        }, {
            id: 3,
            text: 'limpa Walls',
            enabled: true,
            callback: $.proxy(this.reset, this),
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
            text: 'reiniciar Busca',
            enabled: true,
            callback: $.proxy(this.reiniciar, this),
        }, {
            id: 2,
            text: 'pausa Busca',
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
            text: 'Resume Busca',
            enabled: true,
            callback: $.proxy(this.resume, this),
        }, {
            id: 2,
            text: 'Cancel Busca',
            enabled: true,
            callback: $.proxy(this.cancel, this),
        });
        // => [buscando, Pronto]
    },

    onfinalizado: function(estado, de, para)
    {
        console.log('=> finalizado');
        this.setEstadoBotoes({
            id: 1,
            text: 'reiniciar Busca',
            enabled: true,
            callback: $.proxy(this.reiniciar, this),
        }, {
            id: 2,
            text: 'limpa Path',
            enabled: true,
            callback: $.proxy(this.limpa, this),
        });
    },

    onmodificado: function(estado, de, para)
    {
        console.log('=> modificado');
        this.setEstadoBotoes({
            id: 1,
            text: 'Inicio Busca',
            enabled: true,
            callback: $.proxy(this.Inicio, this),
        }, {
            id: 2,
            text: 'limpa Path',
            enabled: true,
            callback: $.proxy(this.limpa, this),
        });
    },

    /**
     * Define setters and getters of PF.Node, then we can get the operations
     * of the pathfinding.
     */
    hookPathFinding: function() {

        PF.Node.prototype = {
            get aberto() {
                return this._aberto;
            },
            set aberto(v) {
                this._aberto = v;
                Controller.operacoes.push({
                    x: this.x,
                    y: this.y,
                    attr: 'aberto',
                    valor: v
                });
            },
            get fechado() {
                return this._fechado;
            },
            set fechado(v) {
                this._fechado = v;
                Controller.operacoes.push({
                    x: this.x,
                    y: this.y,
                    attr: 'fechado',
                    valor: v
                });
            },
            get testado() {
                return this._testado;
            },
            set testado(v) {
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
                this.final(); // transit to `finalizado` state
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
        this.Grade = new PF.Grid(this.tamGrade[0], this.tamGrade[1]);
    },

    mousedown: function (evento)
    {
        var coord = View.toGridCoordinate(evento.pageX, evento.pageY),
            gradeX = coord[0],
            gradeY = coord[1],
            grade  = this.grade;

        if (this.can('arrastaInicio') && this.isPosicaoInicial(gradeX, gradeY)) {
            this.arrastaInicio();
            return;
        }
        if (this.can('arrastaFim') && this.isPosicaoFinal(gradeX, gradeY)) {
            this.arrastaFim();
            return;
        }
        if (this.can('desenhaParede') && grade.isWalkableAt(gradeX, gradeY)) {
            this.desenhaParede(gradeX, gradeY);
            return;
        }
        if (this.can('apagaParede') && !grade.isWalkableAt(gradeX, gradeY)) {
            this.apagaParede(gradeX, gradeY);
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
        if (Controller.can('parado')) {
            Controller.parado();
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
        this.setPosicaoInicial(0, 0);
        this.setPosicaoFinal(1,1);
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

    carregarMapa: function(mapa)
    {
        let i, j;

        var str = "";
        for(i=0; i<20; i++) {
            for (j = 0; j < 45; j++)
                str += this.mapa1[i][j] + ",";

            str += "\n";
        }
        console.log(str);

        for(i=0; i<10; i++)
            for(j=0; j<30; j++)
                this.setLiberadoEm(i, j, this.mapa1[i][j]);

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
