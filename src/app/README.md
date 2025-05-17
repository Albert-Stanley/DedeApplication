# Diretório `app` - Roteamento com Expo Router

Este diretório é a raiz para o sistema de roteamento baseado em arquivos do [Expo Router](https://docs.expo.dev/router/introduction/). A estrutura de arquivos e pastas aqui define diretamente as rotas navegáveis da aplicação.

## Como Funciona

- **Definição de Rotas:** Cada arquivo `.tsx` (ou `.js`) dentro de `app/` ou seus subdiretórios se torna uma rota na aplicação.

  - `app/index.tsx` -> Rota `/`
  - `app/Login.tsx` -> Rota `/login`
  - `app/onboarding/StepOne.tsx` -> Rota `/onboarding/stepone`

- **Layouts (`_layout.tsx`):** Arquivos nomeados `_layout.tsx` definem um componente de layout para um segmento de rota (o diretório onde residem e seus filhos).

  - O `app/_layout.tsx` é o layout raiz, ideal para provedores globais (Context API, QueryClient, Temas) e navegação de nível superior (Stack, Tabs, Drawer).
  - Layouts podem ser aninhados. Por exemplo, `app/(tabs)/_layout.tsx` definiria um layout de abas para as rotas dentro do grupo `(tabs)`.

- **Grupos de Rota (`(nome_do_grupo)/`):** Diretórios com nomes entre parênteses, como `(auth)` ou `(app)`, são usados para organizar rotas ou aplicar um layout específico a um conjunto de rotas sem afetar o caminho da URL.

  - `app/(auth)/Login.tsx` -> Rota `/login` (o `(auth)` não faz parte da URL, mas pode ter seu próprio `_layout.tsx`).
  - Isso é útil para separar fluxos, como autenticação (`(auth)`) da aplicação principal (`(app)`), cada um com seu próprio wrapper de layout.

- **Rotas Dinâmicas:** Podem ser criadas usando colchetes no nome do arquivo.
  - `app/user/[id].tsx` -> Rota `/user/:id` (ex: `/user/123`)
  - `app/posts/[...slug].tsx` -> Rota `/posts/*` (catch-all)

## Estrutura e Conexão com `src/features`

Os arquivos de rota neste diretório (`app/**/*.tsx`) devem ser "finos". Sua principal responsabilidade é:

1.  Definir a rota para o Expo Router.
2.  Importar o componente de tela correspondente de `src/features/[nomeDaFeature]/screens/`.
3.  Renderizar esse componente de tela.

**Exemplo (`app/(auth)/Login.tsx`):**

```tsx
// app/(auth)/Login.tsx
import LoginScreen from "@/features/auth/screens/LoginScreen"; // Importa a tela real
import React from "react";

export default function LoginPage() {
  // Pode adicionar lógica específica da rota aqui, se mínimo, ou passar props.
  return <LoginScreen />;
}
```
