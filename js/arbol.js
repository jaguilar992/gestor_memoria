class arbol {
	constructor(size) {
		this.raiz = {
			proceso: null, 
			size: size,
			esp: 0, 
			padre: false, 
			nIzq: null, 
			nDer: null};
	}

	cargarProceso(proceso, size, subArb=this) {
		if (subArb.raiz.padre) {
			if (subArb.raiz.nIzq.raiz.proceso == null 
				&& subArb.buscarEspacio(size, subArb.raiz.nIzq)) {
				return subArb.cargarProceso(proceso, size, subArb.raiz.nIzq);
			} else if (subArb.raiz.nDer.raiz.proceso == null
				&& subArb.buscarEspacio(size, subArb.raiz.nDer)){
				return subArb.cargarProceso(proceso, size, subArb.raiz.nDer);
			} else {
				return false;
			}
		} else if (subArb.raiz.size > size && size > subArb.raiz.size / 2) {
			if (subArb.raiz.proceso == null) {
				subArb.raiz.proceso = proceso;
				subArb.raiz.esp = size;
				return true;
			}
		} else {
			subArb.raiz.nIzq = new arbol(subArb.raiz.size / 2);
			subArb.raiz.nDer = new arbol(subArb.raiz.size / 2);
			subArb.raiz.padre = true;
			return subArb.cargarProceso(proceso, size, subArb);
		}
	}

	liberarProceso(proceso, subArb=this) {
		if (subArb.raiz.proceso == proceso) {
			subArb.raiz.proceso = null;
			subArb.raiz.esp = 0;
			return true;
		} else if (subArb.raiz.nIzq != null) {
			var temp = subArb.liberarProceso(proceso, subArb.raiz.nIzq);
			if (!temp) {
				temp = subArb.liberarProceso(proceso, subArb.raiz.nDer);
			} 
			return temp;
		}

		return false;
	}

	unir(subArb=this) {
		if (subArb.raiz.padre) {
			subArb.unir(subArb.raiz.nIzq);
			subArb.unir(subArb.raiz.nDer);
			if (subArb.raiz.nIzq.raiz.proceso == null 
				&& subArb.raiz.nDer.raiz.proceso == null
				&& !subArb.raiz.nIzq.raiz.padre 
				&& !subArb.raiz.nDer.raiz.padre) {
				subArb.raiz.nIzq = null;
				subArb.raiz.nDer = null;
				subArb.raiz.padre = false;
			}
		}
	}

	buscarEspacio(size, subArb=this) {
		if (!subArb.raiz.padre && subArb.raiz.size > size 
			&& subArb.raiz.proceso == null) {
			return true;
		} else if (subArb.raiz.nIzq != null) {
			var temp = subArb.buscarEspacio(size, subArb.raiz.nIzq);
			if (!temp) {
				temp = subArb.buscarEspacio(size, subArb.raiz.nDer);
			} 
			return temp;
		}

		return false;
	}

	recorrer(l=[], subArb = this) {
		if (subArb.raiz.nIzq != null) {
			subArb.recorrer(l, subArb.raiz.nIzq);
			subArb.recorrer(l, subArb.raiz.nDer);
		} else {
			if (!subArb.raiz.padre) {
				l.push({tamano: subArb.raiz.size, 
					proceso: subArb.raiz.proceso, 
					ocupado: subArb.raiz.esp});
				/*if (subArb.raiz.proceso != null) {
					console.log(subArb.raiz.proceso + " " + subArb.raiz.size 
						+ " " + subArb.raiz.esp);
				} else { 
					console.log("libre " + subArb.raiz.size + " " 
						+subArb.raiz.esp);
				}*/
			}
		}
	}
}

// var ar = new arbol(1024);