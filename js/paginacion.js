class paginacion {
  constructor(n){
    this.memoria=n; /* n es el tamaño en MB*/
    this.particiones = [];
  }

  set(n){
    if (this.particiones.length==0){
      this.memoria = n;
      this.particionar();
      this.refrescar();
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

  particionar(valor) { /* size es el tamaño (MB) del proceso que entra*/
    this.tamPag = valor;
    for (var i=0; i<this.memoria / valor; i++){
      this.particiones.push({tamano: valor, proceso: null, ocupado: 0});
    }
  }

  cargar(etiqueta, size) {
    var paginas = Math.floor(size / this.tamPag);
    var pagExtra = (size % this.tamPag != 0) ? 1 : 0;

    if (this.verificar(paginas) + pagExtra){
      for (var i = 0; i < paginas; i++) {
        for (var j = 0; j < this.particiones.length; j++) {
          if (this.particiones[j].proceso == null) {
            this.particiones[j].proceso = etiqueta;
            this.particiones[j].ocupado = this.tamPag;
            break;
          }
        }
      }
      if (pagExtra) {
        for (var j = 0; j < this.particiones.length; j++) {
          if (this.particiones[j].proceso == null) {
            this.particiones[j].proceso = etiqueta;
            this.particiones[j].ocupado = size % this.tamPag;
            break;
          }
        }
      }
    }
    this.refrescar();
    return false;
  }

  verificar(paginas) {
    var temp = 0;

    for (var i = 0; i<this.particiones.length; i++) {
      if (this.particiones[i].proceso == null)
        temp++;
    }

    return paginas <= temp;
  }


  liberar(etiqueta){
    for (var i = 0; i<this.particiones.length; i++) {
      if (this.particiones[i].proceso==etiqueta){
        this.particiones[i].proceso=null;
        this.particiones[i].ocupado=0;
      }
    }
    this.refrescar();
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


var p = new paginacion(1024);