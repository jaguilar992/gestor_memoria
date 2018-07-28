// Todos los tamaños se manejan en MB
class colegas{
  constructor(n){
    this.memoria=n; /* n es el tamaño en MB*/
    this.colArb = new arbol(n);
    this.particiones = [];
  }

  set(n){
    if (this.particiones.length==0){
      this.memoria = n;
      this.reset();
    }
  }

  destroy(){
    this.particiones = [];
    this.refrescar();
  }

  reset(){
    var principal = {tamano:this.memoria, proceso: null, ocupado: 0}
    this.particiones = [];
    this.particiones.push(principal);
    this.refrescar();
  }

  // Crea sucesivamente, si es necesario,
  // particiones a la mitad hasta encontrar aquella que se ajuste al tamaño del proceso

  cargar(etiqueta, size){
    if (this.colArb.cargarProceso(etiqueta, size)) {
      this.particiones = [];
      this.colArb.recorrer(this.particiones);
      this.refrescar(); 
    }
  }

  liberar(etiqueta){
    if(this.colArb.liberarProceso(etiqueta)) {
      this.colArb.unir();
      this.particiones = [];
      this.colArb.recorrer(this.particiones);
      this.refrescar();
    }
  }

  //Impresion
  refrescar(){
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

var c = new colegas(1024);