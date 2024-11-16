// MIT License
// Copyright (c) 2024 Jeferson
//
// Esse código funciona ativando e desativando folhas
// de estilo CSS para que seja possível alternar entre
// os esquemas de cores claro e escuro em uma página HTML.
//


// Argumentos a serem passados no construtor da classe
//
//  {
//    documentRef: Document,  * referencia o documento no qual o esquema de cores funcionará
//    lightCSS:HTMLElement, * referencia à folha css "light"
//    darkCSS:HTMLElement,  * referencia à folha css "dark"
//    defaultScheme: string, * escolher entre "light" ou "dark",
//                              se nenhum for definido o padrão é "light"
//    schemeButton: HTMLButtonElement * o botão que aciona a mudança do esquema de cores
//  }
//
// Exemplo:
// const colorScheme = new ColorScheme({
// documentRef:document,
// lightCSS:document.getElementById("light-css"),
// darkCSS:document.getElementById("dark-css"),
// schemeButton:document.getElementById("bt-mudar-esquema")
// })
//

// Classe contendo as funcionalidades para o esquema de cor dinâmico
export class ColorScheme {
    // Os args contem as configurações
    // mencionadas previamente
    constructor(args) {
        if (!args) {
            throw new Error("ColorScheme: Nenhum argumento encontrado");
        }

        // Referências para o documento HTML e os arquivos CSS
        this.documentRef = args.documentRef;
        const _lightCSS = args.lightCSS;
        const _darkCSS = args.darkCSS;

        // Verifica se existe erro ao encontrar os arquivos CSS
        if (!_lightCSS || !_darkCSS) {
            throw new Error("Elementos CSS não encontrados");
        }

        this.lightCSS = _lightCSS;
        this.darkCSS = _darkCSS;
        if(args.defaultScheme === null || args.defaultScheme === undefined){
            this.defaultScheme="dark";
        }
        this.defaultScheme = args.defaultScheme;
        if(this.defaultScheme!=="dark" && this.defaultScheme!=="light"){
            this.defaultScheme = "light";
        }
        this.schemeButton = args.schemeButton;
        this.isDarkMode = (this.defaultScheme === "dark");

        // Aplica o esquema inicial
        this.useScheme({ skipToggle: true });
        this.schemeButton.addEventListener("click",()=>{this.useScheme({});})
    }

    // Função para aplicar o tema atual
    useScheme(args){
        if (!args.skipToggle) {
            this.isDarkMode = !this.isDarkMode;
        }

        if (this.isDarkMode) {
            this.lightCSS.disabled = true;
            this.darkCSS.disabled = false;
        } else {
            this.lightCSS.disabled = false;
            this.darkCSS.disabled = true;
        }
    }

    // Tenta usar o esquema de cores preferido pelo navegador
    useBrowserTheme(windowRef) {
        const browserDarkMode = windowRef.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = browserDarkMode;
        this.useScheme({ skipToggle: true });
    }
}