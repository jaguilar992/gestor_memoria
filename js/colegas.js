// Todos los tamaños se manejan en MB
class colegas{
  constructor(n){
    this.memoria=n; /* n es el tamaño en MB*/
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
  particionar(i,size) { /* size es el tamaño (MB) del proceso que entra*/
    var t = this.particiones[i].tamano;
    if (size <= t && size <= t/2){
      var mitad = {tamano: t/2, proceso: null, ocupado: 0};
      var mitad2 = {tamano: t/2, proceso: null, ocupado: 0};
      this.particiones.splice(i,1);
      this.particiones.splice(i, 0, mitad, mitad2);
      return this.particionar(i,size);
    }else{
      return i;
    }
  }

  unir(i){
    var a = this.particiones[i-1];
    var p = this.particiones[i];
    var b = this.particiones[i+1];
    if (a!=undefined){
      if (a.proceso==null && a.tamano == p.tamano) {
        this.particiones.splice(i-1,1);
        this.particiones[i-1].tamano*=2;
        return this.unir(i-1);
      }
    }
    if(b!=undefined){
      if (b.proceso==null && b.tamano == p.tamano) {
        this.particiones.splice(i+1,1);
        this.particiones[i].tamano*=2;
        return this.unir(i);
      }
    }
    return true;
  }

  cargar(etiqueta, size){
    var tamano_optima = this.memoria;    // Valores de particion optima por defecto, tamano
    var optima = -1;     // Valores de particion optima por defecto, indice
    // Se recorren  las particiones en busca de una optima
    for(var i=0 ; i<this.particiones.length; i++){
      var p = this.particiones[i];
      var ocupado = p.proceso != null;
      if (!ocupado){ // Se analiza si la particion[i] esta ocupada por otro proceso
        // La particion a elegir sera la de menor tamaño que pueda contener al proceso
        if (p.tamano <= tamano_optima && p.tamano>=size){
          optima=i;
          tamano_optima = p.tamano;
        }
      }
    }

    if(optima!=-1){
      // Una vez elegida, si es necesario fragmentar mas la particion optima (indice), 
      // se hará llamando al metodo particionar
      this.particionar(optima, size);
      // Se agrega el proceso a la particion del tamaño reducido
      this.particiones[optima].ocupado = size;
      this.particiones[optima].proceso = etiqueta;
      this.refrescar();
      return true;
    }else{
      // Se regresa falso en caso de que ninguna particion cumpla con los requisitos
      // Es decir estén todas ocupadas o el proceso sobrepase el tamano en memoria
      return false;
    }
  }

  liberar(etiqueta){
    for (var i = 0; i<this.particiones.length; i++) {
      if (this.particiones[i].proceso==etiqueta){
        this.particiones[i].proceso=null;
        this.particiones[i].ocupado=0;
        this.unir(i);
        break;
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

var c = new colegas(1024);