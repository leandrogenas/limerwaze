/**
 * Um nó na grade
 * Guarda informações básicas sobre um nó e atributos adicionais conforme
 * necessário pelo algoritmo
 */
function Node(x, y, walkable) {
    /**
     * Coordenada X do nó
     */
    this.x = x;

    /**
     * Coordenada Y do nó
     * @type number
     */
    this.y = y;

    /**
     * Se o nó pode ou não ser percorrido
     * @type boolean
     */
    this.walkable = (walkable === undefined ? true : walkable);

}

module.exports = Node;
