/**
 * The pathfinding visualization. Visualizção do caminho
 * It uses raphael.js to show the grids.
 */
var View = {

    // Definição de estilos de cada tipo de nó
    estiloNode: {
        normal: {
            fill: 'white',
            'stroke-opacity': 0.2,
        },
        bloqueado: {
            fill: 'grey',
            'stroke-opacity': 0.2,
        },
        inicio: {
            fill: '#0d0',
            'stroke-opacity': 0.2,
        },
        fim: {
            fill: '#e40',
            'stroke-opacity': 0.2,
        },
        aberto: {
            fill: 'rgba(169,64,179,0.93)',
            'stroke-opacity': 0.2,
        },
        fechado: {
            fill: '#afeeee',
            'stroke-opacity': 0.2,
        },
        falhou: {
            fill: '#ff8888',
            'stroke-opacity': 0.2,
        },
        testado: {
            fill: '#e5e5e5',
            'stroke-opacity': 0.2,
        },
    },

    // Definições de propriedade da ação de colorir
    efeitoColorirNode: {
        duracao: 50,
    },

    // Definições de propriedade da ação de zoom
    efeitoZoomNode: {
        duracao: 200,
        transform: 's1.2', // escala 1.2x
        transformBack: 's1.0',
    },

    // Estilo do caminho desenhado
    estiloCaminho: {
        stroke: 'yellow',
        'stroke-width': 3,
    },

    // Representação dos quadrados
    rects: null,

    // Número total de linhas e colunas
    numCol: 0,
    numLin: 0,

    // Representação da área de desenho
    papel: null,

    // Tamanho em px do quadrado
    tamanhoNode: 30,

    // Lista de nós bloqueados
    nodesBloqueados: null,

    // Nós inicial e final
    nodeInicial: null,
    nodeFinal: null,

    // Operações suportadas de busca
    opsSuportadas: ['aberto', 'fechado', 'testado'],

    /** Inicializa a View e define as propriedades iniciais
     *
     */
    inicializar: function(opcoes)
    {
        console.log(" V> Inicializando");
        this.numCol      = opcoes.numCol;
        this.numLin      = opcoes.numLin;
        this.papel        = Raphael('area_desenho');
    },

    /** Gera a grade linha por linha, sendo quebrado em 'tasks' que
     * irão fazer o trabalho de desenhar
     */
    gerarGrade: function(callback)
    {
        console.log(" V> Gerando grade");
        var i, j, x, y,
            rect,
            criarLinha, sleep, tasks,
            tamanhoNode   = this.tamanhoNode,
            estiloNormal = this.estiloNode.normal,
            numCol       = this.numCol,
            numLin       = this.numLin,
            papel        = this.papel,
            rects        = this.rects = [];

        // Tamanho da área de desenho
        papel.setSize(numCol * tamanhoNode, numLin * tamanhoNode);

        // Task de criar a linha
        criarLinha = function(idxLinha) {
            return function(done) {
                rects[idxLinha] = [];
                for (j = 0; j < numCol; ++j) {
                    x = j * tamanhoNode;
                    y = idxLinha * tamanhoNode;

                    rect = papel.rect(x, y, tamanhoNode, tamanhoNode);
                    rect.attr(estiloNormal);
                    rects[idxLinha].push(rect);
                }
                done(null);
            };
        };

        sleep = function(done) {
            setTimeout(function() {
                done(null);
            }, 0);
        };

        tasks = [];
        for (i = 0; i < numLin; ++i) {
            tasks.push(criarLinha(i));
            tasks.push(sleep);
        }

        async.series(tasks, function() {
            if (callback) {
                callback();
            }
        });

    },

    /** Define a posição inicial e pinta-o
     * da cor correspondente (vermelho)
     */
    setPosicaoInicial: function(gradeX, gradeY)
    {
        console.log(" V> Definindo posição inicial");
        var coord = this.toPageCoordinate(gradeX, gradeY);
        if (!this.nodeInicial) {
            this.nodeInicial = this.papel.rect(
                coord[0],
                coord[1],
                this.tamanhoNode,
                this.tamanhoNode
            ).attr(this.estiloNode.normal)
             .animate(this.estiloNode.inicio, 1000);
        } else {
            this.nodeInicial.attr({ x: coord[0], y: coord[1] }).toFront();
        }
    },

    /** Define a posição final e pinta-o
     * da cor correspondente (verde)
     */
    setPosicaoFinal: function(gradeX, gradeY)
    {
        console.log(" V> Definindo posição final");
        var coord = this.toPageCoordinate(gradeX, gradeY);
        if (!this.nodeFinal) {
            this.nodeFinal = this.papel.rect(
                coord[0],
                coord[1],
                this.tamanhoNode,
                this.tamanhoNode
            ).attr(this.estiloNode.normal)
             .animate(this.estiloNode.fim, 1000);
        } else {
            this.nodeFinal.attr({ x: coord[0], y: coord[1] }).toFront();
        }
    },

    /** Define o atributo de um nó em uma dada coordenada, de acordo
     * com suas propriedades, atribuindo estilos diferentes à ele,
     * como cor e traçado
     */
    setAtributoEm: function(gradeX, gradeY, attr, valor)
    {
        var color, estiloNode = this.estiloNode;
        switch (attr) {
        case 'liberado':
            color = valor ? estiloNode.normal.fill : estiloNode.bloqueado.fill;
            this.setLiberadoEm(gradeX, gradeY, valor);
            break;
        case 'aberto':
            this.colorirNode(this.rects[gradeY][gradeX], estiloNode.aberto.fill);
            this.setCoordSuja(gradeX, gradeY, true);
            break;
        case 'fechado':
            this.colorirNode(this.rects[gradeY][gradeX], estiloNode.fechado.fill);
            this.setCoordSuja(gradeX, gradeY, true);
            break;
        case 'testado':
            color = (valor === true) ? estiloNode.testado.fill : estiloNode.normal.fill;

            this.colorirNode(this.rects[gradeY][gradeX], color);
            this.setCoordSuja(gradeX, gradeY, true);
            break;
        default:
            return;
        }
    },

    /** Colore o nó informado de acordo com
     * a cor desejada
     */
    colorirNode: function(node, cor)
    {
        node.animate({
            fill: cor
        }, this.efeitoColorirNode.duracao);
    },

    /** Dá um efeito de zoom no nó selecionado
     *
     */
    zoomNo: function(node) 
    {
        node.toFront().attr({
            transform: this.efeitoZoomNode.transform,
        }).animate({
            transform: this.efeitoZoomNode.transformBack,
        }, this.efeitoZoomNode.duracao);
    },

    /** Define o nó em uma dada coordenada como liberado ou não,
     * aplicando os efeitos de transição e mudando suas cores
     * de acordo com o seu estado
     */
    setLiberadoEm: function(gradeX, gradeY, valor) 
    {
        var node, i, nodesBloqueados = this.nodesBloqueados;
        if (!nodesBloqueados) {
            nodesBloqueados = this.nodesBloqueados = new Array(this.numLin);
            for (i = 0; i < this.numLin; ++i) {
                nodesBloqueados[i] = [];
            }
        }
        node = nodesBloqueados[gradeY][gradeX];
        if (valor) {
            // Limpa node bloqueado
            if (node) {
                this.colorirNode(node, this.rects[gradeY][gradeX].attr('fill'));
                this.zoomNo(node);
                setTimeout(function() {
                    node.remove();
                }, this.efeitoZoomNode.duracao);
                nodesBloqueados[gradeY][gradeX] = null;
            }
        } else {
            // Desenha Node bloqueado
            if (node) {
                return;
            }
            node = nodesBloqueados[gradeY][gradeX] = this.rects[gradeY][gradeX].clone();
            this.colorirNode(node, this.estiloNode.bloqueado.fill);
            this.zoomNo(node);
        }
    },

    /** Limpa os passos (nós abertos e fechados) da grade
     *
     */
    limparPassos: function() 
    {
        var i, x, y, coord, coords = this.getCoordsSujas();
        for (i = 0; i < coords.length; ++i) {
            coord = coords[i];
            x = coord[0];
            y = coord[1];
            this.rects[y][x].attr(this.estiloNode.normal);
            this.setCoordSuja(x, y, false);
        }
    },

    /** Limpa os nós do tipo parede da grade
     *
     */
    limparNodesBloqueados: function() 
    {
        var i, j, nodesBloqueados = this.nodesBloqueados;
        if (!nodesBloqueados) {
            return;
        }
        for (i = 0; i < this.numLin; ++i) {
            for (j = 0 ;j < this.numCol; ++j) {
                if (nodesBloqueados[i][j]) {
                    nodesBloqueados[i][j].remove();
                    nodesBloqueados[i][j] = null;
                }
            }
        }
    },

    /** Desenha o caminho
     *
     */
    desenharCaminho: function(caminho) 
    {
        if (!caminho.length) {
            return;
        }
        var svgPath = this.montarCaminhoSVG(caminho);
        this.caminho = this.papel.path(svgPath).attr(this.estiloCaminho);
    },
    
    /**
     *  Dado o caminho, contruir sua representação SVG
     */
    montarCaminhoSVG: function(caminho) 
    {
        var i, strs = [], size = this.tamanhoNode;

        strs.push('M' + (caminho[0][0] * size + size / 2) + ' ' +
                  (caminho[0][1] * size + size / 2));
        for (i = 1; i < caminho.length; ++i) {
            strs.push('L' + (caminho[i][0] * size + size / 2) + ' ' +
                      (caminho[i][1] * size + size / 2));
        }

        return strs.join('');
    },

    /** Limpa o caminho em SVG
     *
     */
    limparCaminho: function() 
    {
        if (this.caminho) {
            this.caminho.remove();
        }
    },
    
    /** Função auxiliar para convertar a coordenada de página (bruta)
     *  para uma coordenada de grade
     */
    toGridCoordinate: function(pageX, pageY) 
    {
        return [
            Math.floor(pageX / this.tamanhoNode),
            Math.floor(pageY / this.tamanhoNode)
        ];
    },
    
    /** Função auxiliar para converter uma coordenada de grade
     * para uma coordenada de página (bruta)
     */
    toPageCoordinate: function(gradeX, gradeY) 
    {
        return [
            gradeX * this.tamanhoNode,
            gradeY * this.tamanhoNode
        ];
    },

    /** Marca uma dada coordenada como 'suja', ou seja
     * já acessada anteriormente e pintada como aberta
     * ou fechada
     */
    setCoordSuja: function(gradeX, gradeY, sujo) 
    {
        var x, y,
            numLin = this.numLin,
            numCol = this.numCol,
            coordSuja;

        if (this.coordSuja === undefined) {
            coordSuja = this.coordSuja = [];
            for (y = 0; y < numLin; ++y) {
                coordSuja.push([]);
                for (x = 0; x < numCol; ++x) {
                    coordSuja[y].push(false);
                }
            }
        }

        this.coordSuja[gradeY][gradeX] = sujo;
    },

    /** Obtém todas as coordenadas 'sujas'
     *
     */
    getCoordsSujas: function() 
    {
        var x, y,
            numLin = this.numLin,
            numCol = this.numCol,
            coordSuja = this.coordSuja,
            coords = [];

        if (coordSuja === undefined) {
            return [];
        }

        for (y = 0; y < numLin; ++y) {
            for (x = 0; x < numCol; ++x) {
                if (coordSuja[y][x]) {
                    coords.push([x, y]);
                }
            }
        }
        return coords;
    },
    
};
