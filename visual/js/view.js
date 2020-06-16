/**
 * The pathfinding visualization. Visualizção do caminho
 * It uses raphael.js to show the grids.
 */
var View = {
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

    efeitoColorirNode: {
        duracao: 50,
    },

    efeitoZoomNode: {
        duracao: 200,
        transform: 's1.2', // escala 1.2x
        transformBack: 's1.0',
    },

    estiloCaminho: {
        stroke: 'yellow',
        'stroke-width': 3,
    },

    $status: null,
    rects: null,
    numCol: 0,
    nulLin: 0,
    papel: null,
    tamanhoNode: 30,
    nodesBloqueados: null,
    nodeInicial: null,
    nodeFinal: null,
    opsSuportadas: ['aberto', 'fechado', 'testado'],

    inicializar: function(opcoes)
    {
        this.numCol      = opcoes.numCol;
        this.numLin      = opcoes.numLin;
        this.papel        = Raphael('area_desenho');
        this.$status       = $('#status');
    },

    /**
     * Generate the grade asynchronously. Gerar grade assincrono
     * This method will be a very expensive task.
     * Therefore, in order to not to block the rfimering of browser ui,
     * I decomposed the task into smaller ones. Each will only generate a linha. Tarefas decompostas em menores, que irão gerar apenas uma linha
     */
    gerarGrade: function(callback)
    {
        var i, j, x, y,
            rect,
            criarLinha, sleep, tasks,
            tamanhoNode   = this.tamanhoNode,
            estiloNormal = this.estiloNode.normal,
            numCol       = this.numCol,
            numLin       = this.numLin,
            papel        = this.papel,
            rects        = this.rects = [],
            $stats       = this.$status;

        papel.setSize(numCol * tamanhoNode, numLin * tamanhoNode);

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
                $stats.text(
                    'gerando grade ' +
                    Math.round((idxLinha + 1) / numLin * 100) + '%'
                );
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

    setPosicaoInicial: function(gradeX, gradeY)
    {
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

    setPosicaoFinal: function(gradeX, gradeY)
    {
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

    /**
     * Set the attribute of the node at the given coordinate. Set atributo do node pela coordenada
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
            console.error('unsupported operation: ' + attr + ':' + valor);
            return;
        }
    },

    colorirNode: function(node, cor)
    {
        node.animate({
            fill: cor
        }, this.efeitoColorirNode.duracao);
    },
    
    zoomNo: function(node) 
    {
        node.toFront().attr({
            transform: this.efeitoZoomNode.transform,
        }).animate({
            transform: this.efeitoZoomNode.transformBack,
        }, this.efeitoZoomNode.duracao);
    },
    
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
    
    limparPassos: function() 
    {
        var i, x, y, coord, coords = this.getCoordsSujas();
        for (i = 0; i < coords.length; ++i) {
            coord = coords[i];
            x = coord[0];
            y = coord[1];
            this.rects[y][x].attr(this.nodeStyle.normal);
            this.setCoordSuja(x, y, false);
        }
    },
    
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
    
    limparCaminho: function() 
    {
        if (this.path) {
            this.path.remove();
        }
    },
    
    /**
     * Helper function to convert the page coordinate to grade coordinate. Converte coordenada da pagina em coordenada na grade
     */
    toGridCoordinate: function(pageX, pageY) 
    {
        return [
            Math.floor(pageX / this.tamanhoNode),
            Math.floor(pageY / this.tamanhoNode)
        ];
    },
    
    /**
     * helper function to convert the grade coordinate to page coordinate. Converte coordenada da grade em coordenada da pagina
     */
    toPageCoordinate: function(gradeX, gradeY) 
    {
        return [
            gradeX * this.tamanhoNode,
            gradeY * this.tamanhoNode
        ];
    },
    
    mostrarStatus: function(opcoes) 
    {
        var texts = [
            'comprimento: ' + Math.round(opcoes.pathcomprimento * 100) / 100,
            'tempo: ' + opcoes.timeSpent + 'ms',
            'operations: ' + opcoes.operationCount
        ];

        $('#stats').show().html(texts.join('<br>'));
    },
    
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
