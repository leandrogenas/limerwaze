/**
 * The pathfinding visualization. Visualizção do caminho
 * It uses raphael.js to show the grids.
 */
var View = {
    nodeSize: 30, // Largura e altura de um node
    nodeStyle: {
        normal: {
            fill: 'white',
            'stroke-opacity': 0.2, // Borda
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
            fill: '#98fb98',
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
    nodeColorizeEffect: {
        duracao: 50,
    },
    nodeZoomEffect: {
        duracao: 200,
        transform: 's1.2', // escala 1.2x
        transformBack: 's1.0',
    },
    pathStyle: {
        stroke: 'yellow',
        'stroke-width': 3,
    },
    supportedOperations: ['aberto', 'fechado', 'testado'],
    init: function(opts) {
        this.numCol      = opts.numCol;
        this.numLin      = opts.numLin;
        this.papel        = Raphael('DesenhaArea');
        this.$stats       = $('#stats');
    },
    /**
     * Generate the grade asynchronously. Gerar grade assincrono
     * This method will be a very expensive task.
     * Therefore, in order to not to block the rfimering of browser ui,
     * I decomposed the task into smaller ones. Each will only generate a linha. Tarefas decompostas em menores, que irão gerar apenas uma linha
     */
    GerarGrade: function(callback) {
        var i, j, x, y,
            rect,
            normalStyle, nodeSize,
            CriarLinha, sleep, tasks,
            nodeSize    = this.nodeSize,
            normalStyle = this.nodeStyle.normal,
            numCol     = this.numCol,
            numLin     = this.numLin,
            papel       = this.papel,
            rects       = this.rects = [],
            $stats      = this.$stats;

        papel.setSize(numCol * nodeSize, numLin * nodeSize);

        CriarLinha = function(rowId) {
            return function(done) {
                rects[rowId] = [];
                for (j = 0; j < numCol; ++j) {
                    x = j * nodeSize;
                    y = rowId * nodeSize;

                    rect = papel.rect(x, y, nodeSize, nodeSize);
                    rect.attr(normalStyle);
                    rects[rowId].push(rect);
                }
                $stats.text(
                    'gerando grade ' +
                    Math.round((rowId + 1) / numLin * 100) + '%'
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
            tasks.push(CriarLinha(i));
            tasks.push(sleep);
        }

        async.series(tasks, function() {
            if (callback) {
                callback();
            }
        });
    },
    setinicioPos: function(GradeX, GradeY) {
        var coord = this.toPageCoordinate(GradeX, GradeY);
        if (!this.inicioNode) {
            this.inicioNode = this.papel.rect(
                coord[0],
                coord[1],
                this.nodeSize,
                this.nodeSize
            ).attr(this.nodeStyle.normal)
             .animate(this.nodeStyle.inicio, 1000);
        } else {
            this.inicioNode.attr({ x: coord[0], y: coord[1] }).toFront();
        }
    },
    setfimPos: function(GradeX, GradeY) {
        var coord = this.toPageCoordinate(GradeX, GradeY);
        if (!this.fimNode) {
            this.fimNode = this.papel.rect(
                coord[0],
                coord[1],
                this.nodeSize,
                this.nodeSize
            ).attr(this.nodeStyle.normal)
             .animate(this.nodeStyle.fim, 1000);
        } else {
            this.fimNode.attr({ x: coord[0], y: coord[1] }).toFront();
        }
    },
    /**
     * Set the attribute of the node at the given coordinate. Set atributo do node pela coordenada
     */
    setAttributeAt: function(GradeX, GradeY, attr, value) {
        var color, nodeStyle = this.nodeStyle;
        switch (attr) {
        case 'walkable':
            color = value ? nodeStyle.normal.fill : nodeStyle.bloqueado.fill;
            this.setWalkableAt(GradeX, GradeY, value);
            break;
        case 'aberto':
            this.colorizeNode(this.rects[GradeY][GradeX], nodeStyle.aberto.fill);
            this.setCoordDirty(GradeX, GradeY, true);
            break;
        case 'fechado':
            this.colorizeNode(this.rects[GradeY][GradeX], nodeStyle.fechado.fill);
            this.setCoordDirty(GradeX, GradeY, true);
            break;
        case 'testado':
            color = (value === true) ? nodeStyle.testado.fill : nodeStyle.normal.fill;

            this.colorizeNode(this.rects[GradeY][GradeX], color);
            this.setCoordDirty(GradeX, GradeY, true);
            break;
        case 'parent':
            // XXX: Maybe draw a line from this node to its parent?
            // This would be expensive.
            break;
        default:
            console.error('unsupported operation: ' + attr + ':' + value);
            return;
        }
    },
    colorizeNode: function(node, color) {
        node.animate({
            fill: color
        }, this.nodeColorizeEffect.duracao);
    },
    zoomNode: function(node) {
        node.toFront().attr({
            transform: this.nodeZoomEffect.transform,
        }).animate({
            transform: this.nodeZoomEffect.transformBack,
        }, this.nodeZoomEffect.duracao);
    },
    setWalkableAt: function(GradeX, GradeY, value) {
        var node, i, bloqueadoNodes = this.bloqueadoNodes;
        if (!bloqueadoNodes) {
            bloqueadoNodes = this.bloqueadoNodes = new Array(this.numLin);
            for (i = 0; i < this.numLin; ++i) {
                bloqueadoNodes[i] = [];
            }
        }
        node = bloqueadoNodes[GradeY][GradeX];
        if (value) {
            // Limpa node bloqueado
            if (node) {
                this.colorizeNode(node, this.rects[GradeY][GradeX].attr('fill'));
                this.zoomNode(node);
                setTimeout(function() {
                    node.remove();
                }, this.nodeZoomEffect.duracao);
                bloqueadoNodes[GradeY][GradeX] = null;
            }
        } else {
            // Desenha Node bloqueado
            if (node) {
                return;
            }
            node = bloqueadoNodes[GradeY][GradeX] = this.rects[GradeY][GradeX].clone();
            this.colorizeNode(node, this.nodeStyle.bloqueado.fill);
            this.zoomNode(node);
        }
    },
    clearFootprints: function() {
        var i, x, y, coord, coords = this.getDirtyCoords();
        for (i = 0; i < coords.comprimento; ++i) {
            coord = coords[i];
            x = coord[0];
            y = coord[1];
            this.rects[y][x].attr(this.nodeStyle.normal);
            this.setCoordDirty(x, y, false);
        }
    },
    clearbloqueadoNodes: function() {
        var i, j, bloqueadoNodes = this.bloqueadoNodes;
        if (!bloqueadoNodes) {
            return;
        }
        for (i = 0; i < this.numLin; ++i) {
            for (j = 0 ;j < this.numCol; ++j) {
                if (bloqueadoNodes[i][j]) {
                    bloqueadoNodes[i][j].remove();
                    bloqueadoNodes[i][j] = null;
                }
            }
        }
    },
    DesenhaCaminho: function(path) {
        if (!path.comprimento) {
            return;
        }
        var svgPath = this.buildSvgPath(path);
        this.path = this.papel.path(svgPath).attr(this.pathStyle);
    },
    /**
     *  Dado o caminho, contruir sua representação SVG
     */
    buildSvgPath: function(path) {
        var i, strs = [], size = this.nodeSize;

        strs.push('M' + (path[0][0] * size + size / 2) + ' ' +
                  (path[0][1] * size + size / 2));
        for (i = 1; i < path.comprimento; ++i) {
            strs.push('L' + (path[i][0] * size + size / 2) + ' ' +
                      (path[i][1] * size + size / 2));
        }

        return strs.join('');
    },
    limparCaminho: function() {
        if (this.path) {
            this.path.remove();
        }
    },
    /**
     * Helper function to convert the page coordinate to grade coordinate. Converte coordenada da pagina em coordenada na grade
     */
    toGridCoordinate: function(pageX, pageY) {
        return [
            Math.floor(pageX / this.nodeSize),
            Math.floor(pageY / this.nodeSize)
        ];
    },
    /**
     * helper function to convert the grade coordinate to page coordinate. Converte coordenada da grade em coordenada da pagina
     */
    toPageCoordinate: function(GradeX, GradeY) {
        return [
            GradeX * this.nodeSize,
            GradeY * this.nodeSize
        ];
    },
    showStats: function(opts) {
        var texts = [
            'comprimento: ' + Math.round(opts.pathcomprimento * 100) / 100,
            'tempo: ' + opts.timeSpent + 'ms',
            'operations: ' + opts.operationCount
        ];
        $('#stats').show().html(texts.join('<br>'));
    },
    setCoordDirty: function(GradeX, GradeY, isDirty) {
        var x, y,
            numLin = this.numLin,
            numCol = this.numCol,
            coordDirty;

        if (this.coordDirty === undefined) {
            coordDirty = this.coordDirty = [];
            for (y = 0; y < numLin; ++y) {
                coordDirty.push([]);
                for (x = 0; x < numCol; ++x) {
                    coordDirty[y].push(false);
                }
            }
        }

        this.coordDirty[GradeY][GradeX] = isDirty;
    },
    getDirtyCoords: function() {
        var x, y,
            numLin = this.numLin,
            numCol = this.numCol,
            coordDirty = this.coordDirty,
            coords = [];

        if (coordDirty === undefined) {
            return [];
        }

        for (y = 0; y < numLin; ++y) {
            for (x = 0; x < numCol; ++x) {
                if (coordDirty[y][x]) {
                    coords.push([x, y]);
                }
            }
        }
        return coords;
    },
};
