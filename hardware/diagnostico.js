const os = require('os');
const si = require('systeminformation');

// Configuração de cores para o terminal via códigos ANSI
const CORES = {
    reset: "\x1b[0m",
    brilhante: "\x1b[1m",
    cyan: "\x1b[36m",
    verde: "\x1b[32m",
    amarelo: "\x1b[33m",
    vermelho: "\x1b[31m",
    cinza: "\x1b[90m",
    fundo_azul: "\x1b[44m\x1b[37m"
};

// Função para desenhar barras de progresso textuais no console
function criarBarra(porcentagem) {
    const tamanhoMax = 20;
    const preenchido = Math.round((tamanhoMax * porcentagem) / 100);
    const barras = "#".repeat(preenchido);
    const espacos = " ".repeat(tamanhoMax - preenchido);
    
    let corBarra = CORES.verde;
    if (porcentagem >= 80) corBarra = CORES.vermelho;
    else if (porcentagem >= 50) corBarra = CORES.amarelo;

    return `[${corBarra}${barras}${CORES.cinza}${espacos}${CORES.reset}] ${porcentagem.toString().padStart(3)}%`;
}

// Função para formatar Bytes em GigaBytes de forma legível
function paraGB(bytes) {
    return (bytes / (1024 ** 3)).toFixed(2);
}

// Executa o diagnóstico inicial do Hardware (Roda apenas uma vez na inicialização)
async function exibirEspecificacoesFixas() {
    try {
        const cpuInfo = await si.cpu();
        const memInfo = await si.mem();
        const osInfo = await si.osInfo();
        const gpuInfo = await si.graphics();

        console.clear();
        console.log(`${CORES.fundo_azul} ================= DIAGNÓSTICO COMPLETO DE HARDWARE ================= ${CORES.reset}\n`);
        
        console.log(`${CORES.cyan}${CORES.brilhante}[SISTEMA OPERACIONAL]${CORES.reset}`);
        console.log(` Plataforma: ${osInfo.platform} (${osInfo.distro})`);
        console.log(`  Arquitetura: ${osInfo.arch} | Kernel: ${osInfo.kernel}\n`);

        console.log(`${CORES.cyan}${CORES.brilhante}[PROCESSADOR (CPU)]${CORES.reset}`);
        console.log(` Modelo: ${cpuInfo.manufacturer} ${cpuInfo.brand}`);
        console.log(`  Núcleos: ${cpuInfo.cores} Físicos | ${cpuInfo.processors} Threads`);
        console.log(` Clock Base: ${cpuInfo.speed} GHz\n`);

        console.log(`${CORES.cyan}${CORES.brilhante}[PLACA DE VÍDEO (GPU)]${CORES.reset}`);
        gpuInfo.controllers.forEach((gpu, index) => {
            console.log(` GPU #${index + 1}: ${gpu.model} (${gpu.vram ? gpu.vram + 'MB VRAM' : 'Memória Compartilhada'})`);
        });
        console.log("");
        
        console.log(`${CORES.cyan}${CORES.brilhante}[MEMÓRIA RAM TOTAL]${CORES.reset}`);
        console.log(` Capacidade Instalada: ${paraGB(memInfo.total)} GB\n`);

        console.log(`${CORES.cinza}Iniciando monitoramento dinâmico... Aguarde.${CORES.reset}`);
    } catch (erro) {
        console.error("Erro ao ler especificações técnicas:", erro);
    }
}

// Atualiza o consumo em tempo real a cada segundo
async function loopMonitoramento() {
    try {
        // Coleta métricas de carga e temperatura atuais
        const cargaCpu = await si.currentLoad();
        const temperaturaCpu = await si.cpuTemperature();
        const memoria = await si.mem();

        // Move o cursor do terminal de volta para a linha 16 para atualizar sem piscar a tela
        process.stdout.write("\x1b[16;1H");

        console.log(`${CORES.cyan}${CORES.brilhante}============= TELEMETRIA EM TEMPO REAL =============${CORES.reset}\n`);

        // 1. Monitoramento de CPU
        const cpuUsoGeral = Math.round(cargaCpu.currentLoad);
        let textoTemp = temperaturaCpu.main ? `${temperaturaCpu.main}°C` : "N/A";
        console.log(` Carga Global da CPU : ${criarBarra(cpuUsoGeral)} (Temp: ${textoTemp})`);

        // Detalhamento opcional por núcleo individual
        let infoNucleos = "   └─ Núcleos individuais: ";
        cargaCpu.cpus.forEach((cpu, i) => {
            infoNucleos += `[C${i}: ${Math.round(cpu.load)}%] `;
        });
        console.log(`${CORES.cinza}${infoNucleos}${CORES.reset}\n`);

        // 2. Monitoramento de Memória RAM
        const ramTotal = memoria.total;
        const ramUsada = memoria.active;
        const ramPorcentagem = Math.round((ramUsada / ramTotal) * 100);
        console.log(` Uso de Memória RAM   : ${criarBarra(ramPorcentagem)} (${paraGB(ramUsada)} GB / ${paraGB(ramTotal)} GB usados)\n`);

        // 3. Status de Alerta de Sobrecarga (Diagnóstico Dinâmico)
        console.log(`${CORES.cyan}${CORES.brilhante}[DIAGNÓSTICO E SAÚDE]${CORES.reset}`);
        if (cpuUsoGeral > 85 || ramPorcentagem > 85) {
            console.log(`  Status: ${CORES.vermelho}${CORES.brilhante}ALERTA CRÍTICO - Sobrecarga de hardware detectada!${CORES.reset}   `);
        } else if (cpuUsoGeral > 50 || ramPorcentagem > 50) {
            console.log(`  Status: ${CORES.amarelo}Atenção - Uso moderado/alto de recursos.${CORES.reset}            `);
        } else {
            console.log(` Status: ${CORES.verde}Sistema operando de forma estável.${CORES.reset}                        `);
        }

        console.log(`\n${CORES.cinza}Pressione [ Ctrl + C ] para fechar o diagnóstico.${CORES.reset}`);

    } catch (erro) {
        console.error("Erro no loop de telemetria:", erro);
    }
}

// Inicialização sequencial do programa
async function inicializar() {
    await exibirEspecificacoesFixas();
    // Executa imediatamente e depois repete a cada 1000 milissegundos
    setInterval(loopMonitoramento, 1000);
}

inicializar();