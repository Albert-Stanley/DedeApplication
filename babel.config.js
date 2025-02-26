module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind", // Isso está correto para usar o nativewind com JSX
        },
      ],
      "nativewind/babel", // Para as configurações do NativeWind
    ],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src", // Alias para a pasta src
            "tailwind.config": "./tailwind.config.js", // Alias para o arquivo de configuração do Tailwind
          },
        },
      ],
      [
        "module:react-native-dotenv", // Certifique-se de que o plugin está sendo aplicado corretamente
        {
          moduleName: "@env", // Nome do módulo que você usará para importar as variáveis de ambiente
          path: ".env", // Caminho para o arquivo .env
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
