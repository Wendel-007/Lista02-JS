let nav = document.querySelector("nav");

const urlJson = "./produtos.json";
let http = new XMLHttpRequest();
http.open('GET', urlJson);
http.responseType = 'json';
http.send();

http.onload = function() {
  conteudoJson = http.response;
  conteudoJson.forEach((produto, index) => {
    inserirConteudo(cria(), index);
  });
}

setTimeout(() => {
  let listaDeProdutos = document.querySelectorAll(".produto");

  listaDeProdutos.forEach((produto) => {
    
    let aux = produto.querySelector('.img img').getAttribute("src");
    let imgPrincipal = produto.querySelector('.img img');

    console.log(imgPrincipal);
    let minhaturas = produto.querySelectorAll(".mini img");

    minhaturas.forEach((m) => {
      m.addEventListener("mouseover", () => {
        minhaturas.forEach((m) => {
          m.classList.remove("selecionado");
          imgPrincipal.setAttribute("src", "");
        });
        m.classList.add("selecionado");
        imgPrincipal.setAttribute("src", m.getAttribute("src"));
      });
      m.addEventListener("mouseout", () => {
        imgPrincipal.setAttribute("src", aux);
        m.classList.remove("selecionado");
        console.log(aux)
      });
    });
  });
},1000);


function cria(){
    let produto = document.createElement("div");
    produto.classList = "produto";

    let sec1 = document.createElement("section");
    sec1.classList = "img";
    sec1.style.gridArea = "a";

    let sec2 = document.createElement("section");
    sec2.classList = "modelo";
    sec2.style.gridArea = "b";

    let sec3 = document.createElement("section");
    sec3.classList = "info";
    sec3.style.gridArea = "c";

    

    let sec4 = document.createElement("section");
    sec4.classList = "stars";
    sec4.style.gridArea = "d";

    let sec5 = document.createElement("section");
    sec5.classList = "mini";
    sec5.style.gridArea = "e";

    produto.appendChild(sec1);
    produto.appendChild(sec2);
    produto.appendChild(sec3);
    produto.appendChild(sec4);
    produto.appendChild(sec5);
    nav.appendChild(produto);

    return produto;
}

function inserirConteudo(produto, index) {
  let section = produto.querySelectorAll("section");

  let imgPrincipal = document.createElement("img");
  imgPrincipal.setAttribute("src", ((conteudoJson[index])['imagens'])['principal']);
  section[0].appendChild(imgPrincipal);

  let modelo = document.createElement("h2");
  modelo.textContent= (conteudoJson[index])['produto'];
  section[1].appendChild(modelo);

  let vendedor = document.createElement("p");
  vendedor.textContent = (conteudoJson[index])['vendedor'];
  vendedor.style.color = "rgb(150, 150, 150)";
  section[2].appendChild(vendedor);

  //PEQUENA MANIPULAÇÃO DEVIDO AO ERRO NA ESCRITA DOS PREÇOS NO ARQUIVO .JASON
  //-------------------------------------------------
  let valor = (((conteudoJson[index])['preco']));
  if(valor<10){
    let aux = valor;
    valor = (aux*1000);
  }
  //-------------------------------------------------

  let preco = document.createElement("p");
  preco.textContent = BRL(valor);
  preco.style.cssText = "font-weight: bold; font-size: 18pt;";
  section[2].appendChild(preco);

  let parcelas = document.createElement("p");
  parcelas.textContent = "Em até 10x de " + BRL((valor/10)) + " sem juros";
  parcelas.style.color = "rgb(0, 209, 0)"
  section[2].appendChild(parcelas);

  for(let i = 0;i < ((conteudoJson[index])['estrelas']) ; i++){
    let star = document.createElement("img");
    star.setAttribute("src", "https://icones.pro/wp-content/uploads/2021/02/icone-etoile-pourple.png");
    section[3].appendChild(star);
  }

  let miniaturas = ((conteudoJson[index])['imagens'])['variacoes'];
  
  miniaturas.forEach((mini, index) => {
    let img = document.createElement("img");
    img.setAttribute("src", mini);
    section[4].appendChild(img);
  });
}

function BRL(val) {
  return val.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})
};