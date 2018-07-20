// Algoritmo de mejor ajuste
class dinamico {
	constructor(n) {
    this.memoria = n;
		this.particiones = [{tamano: n, proceso: null, ocupado: 0}];
	}

  set(n) {
    if (this.particiones.length==0){
      this.memoria = n;
      this.refrescar();
    }
  }

  destroy() {
    this.particiones = [];
    this.refrescar();
  }

  cargar(etiqueta, size) {
    var optima = null;
    for (var i = 0; i < this.particiones.length; i++) {
      if (this.particiones[i].proceso == null 
          && this.particiones[i].tamano >= size) {
        if (optima != null) {
          if (this.particiones[i] < this.particiones[optima])
            optima = i;
        } else
          optima = i;
      }
    }

    if (optima != null) {
      this.particiones[optima].tamano -= size;
      this.particiones.splice(optima,0,{tamano: size, proceso: etiqueta, ocupado: size});
      this.refrescar();
    }

    return false;
  }

  liberar(etiqueta) {
    for (var i = 0; i < this.particiones.length; i++) {
      if (this.particiones[i].proceso == etiqueta) {
        this.particiones[i].proceso = null;
        this.particiones[i].ocupado = 0;
        this.unir(i);
        this.refrescar();
        return true;
      }
    }
    return false;
  }

  unir(i){
    var a = this.particiones[i-1];
    var p = this.particiones[i];
    var b = this.particiones[i+1];
    if (a!=undefined){
      if (a.proceso==null) {
        this.particiones[i].tamano += this.particiones[i-1].tamano;
        this.particiones.splice(i-1,1);
        return this.unir(i-1);
      }
    }
    if(b!=undefined){
      if (b.proceso==null) {
        this.particiones[i].tamano+=this.particiones[i+1].tamano;
        this.particiones.splice(i+1,1);
        return this.unir(i);
      }
    }
    return true;
  }

	refrescar() {
    var id='#div-memoria';
    $(id).html('');
    for (var p of this.particiones){
      var el = 
      "<div class='libre' style='width: "+(p.tamano / this.memoria)*100+"%'>";
        if(p.proceso!=null){
          el += 
          "<div class='ocupado' style='width: "+(p.ocupado / p.tamano) *100+"%'>"+
            "<p>"+p.proceso+"</p><p>"+format(p.ocupado)+"</p>"+
          "</div>";
        }else{
          el += 
            "<p>"+format(p.tamano)+"</p>";
        }
      el+=
      "</div>";
      $(id).append(el);
    }
  }
}

var din = new dinamico(1024);
