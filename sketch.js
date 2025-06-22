// Variáveis globais
let stages = []; // Lista de etapas da jornada
let currentStage = 0; // Etapa atual
let alpha = 0; // Controle de transparência (fade-in)
let fadingIn = true; // Controle de efeito de transição
let truckX = -100; // Posição inicial do caminhão (fora da tela)
let truckSpeed = 2; // Velocidade de movimento do caminhão

// Variáveis da animação de crescimento
let growth = 0;
let maxGrowth = 60;
let growthSpeed = 0.5;

function setup() {
  createCanvas(700, 500); // Define o tamanho da tela
  textAlign(CENTER, CENTER); // Centraliza o texto
  rectMode(CENTER); // Alinha os retângulos pelo centro

  // Definindo as etapas da jornada
  stages = [
    {
      name: "Plantio",
      color: color(230, 250, 230),
      description:
        "O solo é cuidadosamente preparado com nutrientes e aeração. Depois, as sementes de cenoura são plantadas em linhas, criando as condições ideais para o crescimento.",
    },
    {
      name: "Crescimento",
      color: color(200, 240, 200),
      description:
        "As sementes germinam, e as folhas começam a aparecer acima do solo, enquanto a raiz da cenoura cresce debaixo da terra ao longo de semanas.",
    },
    {
      name: "Colheita",
      color: color(255, 245, 200),
      description:
        "As cenouras atingiram o tamanho ideal! Agora é hora de retirá-las com cuidado do solo, garantindo que fiquem inteiras e de boa qualidade.",
    },
    {
      name: "Processamento",
      color: color(255, 230, 180),
      description:
        "Depois da colheita, as cenouras passam por uma limpeza, são selecionadas por tamanho e qualidade, e são embaladas para o transporte.",
    },
    {
      name: "Transporte",
      color: color(220, 230, 250),
      description:
        "As cenouras são carregadas em caminhões que percorrem longas distâncias até chegar aos centros de distribuição e mercados locais.",
    },
    {
      name: "Mercado",
      color: color(255, 220, 230),
      description:
        "Já nos mercados, as cenouras são organizadas nas prateleiras e feiras, prontas para serem escolhidas pelos consumidores.",
    },
    {
      name: "Cozinha",
      color: color(255, 200, 200),
      description:
        "Agora em casa, a cenoura é lavada, cortada e pode ser consumida crua, cozida ou como ingrediente de várias receitas deliciosas.",
    },
  ];
}

function draw() {
  background(stages[currentStage].color); // Cor de fundo de cada etapa

  // Transição de entrada (fade-in)
  if (fadingIn && alpha < 255) {
    alpha += 5;
  }

  // Título principal
  fill(50, alpha);
  textSize(28);
  textStyle(BOLD);
  text("A Jornada da Cenoura", width / 2, 50);

  let centerY = height / 2 + 20;

  // Ícone ou animação da etapa
  push();
  tint(255, alpha); // Controle de transparência
  drawIcon(stages[currentStage].name, width / 2, centerY - 80);
  pop();

  // Nome da etapa
  fill(80, alpha);
  textSize(22);
  textStyle(BOLD);
  text(stages[currentStage].name, width / 2, centerY - 30);

  // Texto descritivo (justificado)
  fill(30, alpha);
  textSize(14);
  textStyle(NORMAL);
  drawJustifiedText(
    stages[currentStage].description,
    width / 2 - 250,
    centerY,
    500,
    150
  );
}

// Avança para a próxima etapa ao clicar
function mousePressed() {
  currentStage++;
  if (currentStage >= stages.length) {
    currentStage = 0; // Volta ao início após a última etapa
  }
  alpha = 0;
  fadingIn = true;
  truckX = -100; // Reinicia a posição do caminhão

  // Reinicia a animação de crescimento ao voltar para "Crescimento"
  if (stages[currentStage].name === "Crescimento") {
    growth = 0;
  }
}

// Função que desenha o ícone ou animação de cada etapa
function drawIcon(name, x, y) {
  noStroke();
  switch (name) {
    case "Plantio":
      // Solo
      fill(139, 69, 19);
      rect(x, y + 30, 120, 30, 10);

      // Semente
      fill(160, 82, 45);
      ellipse(x, y + 20, 10, 10);
      break;

    case "Crescimento":
      // Solo
      fill(139, 69, 19);
      rect(x, y + 30, 120, 30, 10);

      // Crescimento da planta (animação)
      if (growth < maxGrowth) {
        growth += growthSpeed;
      }

      // Haste
      fill(34, 139, 34);
      rect(x, y + 30 - growth / 2, 10, growth, 5);

      // Folhas
      ellipse(
        x,
        y + 30 - growth,
        map(growth, 0, maxGrowth, 0, 30),
        map(growth, 0, maxGrowth, 0, 30)
      );
      break;

    case "Colheita":
      // Solo
      fill(139, 69, 19);
      rect(x, y + 30, 120, 30, 10);

      // Cenoura (triângulo laranja)
      fill(255, 140, 0);
      triangle(x, y, x - 15, y + 40, x + 15, y + 40);

      // Folhagem verde
      fill(34, 139, 34);
      ellipse(x, y - 10, 20, 10);
      break;

    case "Processamento":
      // Máquina de processamento
      fill(192, 192, 192);
      rect(x, y, 80, 30, 5);

      // Luz de indicação
      fill(255, 140, 0);
      ellipse(x, y - 20, 15, 15);
      break;

    case "Transporte":
      // Caminhão animado com melhor visual
      truckX += truckSpeed;
      if (truckX > width + 100) truckX = -100; // Volta ao início da tela
      // Corpo do caminhão
      fill(70, 130, 180); // Azul claro
      rect(truckX + 40, y, 90, 30, 5);

      // Cabine
      fill(30, 80, 130); // Azul escuro
      rect(truckX + 100, y + 5, 40, 35, 5);

      // Janela da cabine
      fill(173, 216, 230); // Azul claro da janela
      rect(truckX + 110, y, 20, 15, 3);

      // Rodas
      fill(50);
      ellipse(truckX + 20, y + 20, 20, 20);
      ellipse(truckX + 90, y + 20, 20, 20);
      ellipse(truckX + 120, y + 20, 20, 20);

      // Aros
      fill(150);
      ellipse(truckX + 20, y + 20, 10, 10);
      ellipse(truckX + 90, y + 20, 10, 10);
      ellipse(truckX + 120, y + 20, 10, 10);
      break;

    case "Mercado":
      // Toldo da banca
      fill(255, 0, 0);
      triangle(x - 30, y - 10, x + 30, y - 10, x, y - 40);

      // Produtos expostos (cenouras, frutas)
      fill(255, 140, 0);
      for (let i = -20; i <= 20; i += 20) {
        ellipse(x + i, y + 10, 12, 12);
      }
      break;

    case "Cozinha":
      // Bancada ou fogão
      fill(169, 169, 169);
      rect(x, y, 50, 25, 5);

      fill(105, 105, 105);
      rect(x, y - 10, 60, 5);

      // Panela ou alimento
      fill(255, 140, 0);
      rect(x, y + 20, 10, 10);
      break;
  }
}

// Função para exibir texto justificado dentro de uma área
function drawJustifiedText(txt, x, y, w, h) {
  let words = txt.split(" ");
  let line = "";
  let lines = [];
  textAlign(LEFT, TOP);

  // Quebra o texto em linhas com base na largura disponível
  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + " ";
    let testWidth = textWidth(testLine);
    if (testWidth > w && line !== "") {
      lines.push(line.trim());
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  // Calcula a altura de início para centralizar verticalmente o bloco de texto
  let lineHeight = 18;
  let startY = y + (h - lines.length * lineHeight) / 2;

  // Desenha linha por linha, com espaçamento entre palavras para justificar
  for (let i = 0; i < lines.length; i++) {
    let wordsInLine = lines[i].split(" ");
    let totalWords = wordsInLine.length;
    let totalWidth = textWidth(lines[i]);
    let space = (w - totalWidth) / max(1, totalWords - 1);

    let cursorX = x;
    for (let j = 0; j < totalWords; j++) {
      text(wordsInLine[j], cursorX, startY + i * lineHeight);
      cursorX +=
        textWidth(wordsInLine[j]) + (i !== lines.length - 1 ? space : 6);
    }
  }
}
