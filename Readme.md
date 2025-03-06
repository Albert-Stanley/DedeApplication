# DedeApplication – Plataforma para a área da saúde (Freelancer)

**DedeApplication** é um aplicativo multi-plataforma (iOS, Android e Web) desenvolvido por **Albert Stanley** para médicos e hospitais, com o objetivo de facilitar o acesso às informações dos pacientes e formulários de forma rápida e eficiente. A aplicação foi construída para melhorar a gestão de dados no dia a dia hospitalar, permitindo que médicos tenham acesso rápido a informações cadastradas por secretárias ou enfermeiras.

O **backend**, desenvolvido por **Lorenzo Rocha**, segue o **padrão REST** e utiliza **ASP.NET**, **Redis** para cache e **MongoDB Atlas** para o banco de dados.

---

## 🚀 Tecnologias Utilizadas

### **Principais Tecnologias**:

- ![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)  
  **React Native** foi escolhido para o desenvolvimento multi-plataforma (iOS, Android e Web), permitindo uma única base de código para todos os dispositivos.  
  [Documentação React Native](https://reactnative.dev/)

- ![Expo](https://img.shields.io/badge/Expo-1B1F23?style=flat&logo=expo&logoColor=white)  
  **Expo** facilita o desenvolvimento e deploy, proporcionando uma experiência ágil e recursos prontos para uso, incluindo suporte Web.  
  [Documentação Expo](https://docs.expo.dev)

- ![GlueStack](https://img.shields.io/badge/GlueStack-FF6F00?style=flat&logo=tailwindcss&logoColor=white)  
  **GlueStack** foi escolhido pela integração com o **Tailwind CSS**, oferecendo uma interface moderna e responsiva com código otimizado.  
  [Documentação GlueStack](https://gluestack.io/ui/docs/home/overview/quick-start)

- ![Zod](https://img.shields.io/badge/Zod-2F3338?style=flat&logo=typescript&logoColor=white)  
  **Zod** garante a validação robusta de dados com esquemas tipados, proporcionando segurança ao lidar com dados no frontend.  
  [Documentação Zod](https://zod.dev/)

- ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4790?style=flat&logo=react-query&logoColor=white)  
  **TanStack Query** é utilizado para o gerenciamento de requisições e cache, otimizando a comunicação com o backend e melhorando o desempenho.  
  [Documentação TanStack Query](https://tanstack.com/query/latest)

- ![Expo Secure Store](https://img.shields.io/badge/Expo_SecureStore-4B6BFB?style=flat&logo=expo&logoColor=white)  
  **ExpoSecureStore** é utilizado para garantir o armazenamento seguro de dados sensíveis, como tokens de autenticação em dispositivos móveis (iOS e Android).  
  [Documentação Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)

- ![React Context](https://img.shields.io/badge/React_Context-61DAFB?style=flat&logo=react&logoColor=black)  
  **useContext** foi escolhido para gerenciar o estado global da aplicação, facilitando a autenticação e o compartilhamento de dados entre componentes.  
  [Documentação React Context](https://react.dev/reference/react/useContext)

- ![Expo Router](https://img.shields.io/badge/Expo_Router-1B1F23?style=flat&logo=expo&logoColor=white)  
  **Expo Router** é utilizado para a navegação entre telas, fornecendo uma maneira simples e eficaz de gerenciar as rotas no app.  
  [Documentação Expo Router](https://docs.expo.dev/versions/latest/sdk/router/)

### **Autenticação e Armazenamento Seguro**:

- **Para Mobile**: Utilizamos o **Expo Secure Store** para garantir o armazenamento seguro de dados sensíveis, como tokens de autenticação, nos dispositivos móveis (iOS e Android).
- **Para Web**: Para a versão web, a autenticação é gerida por **cookies HTTP Only**, garantindo maior segurança no armazenamento de tokens de autenticação, prevenindo acesso a partir de scripts no navegador.

---

## 🚀 Deploy

O deploy do projeto será feito em breve, e atualmente estamos em fase de testes para garantir a estabilidade da plataforma. O foco agora está em concluir as funcionalidades principais, realizar testes completos e garantir a integração com o backend de forma eficiente.

---

## 📌 Conecte-se com os Desenvolvedores

- [Lorenzo Rocha no LinkedIn](https://www.linkedin.com/in/lorenzo-rocha-179038284/) ![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)
- [Albert Stanley no LinkedIn](https://www.linkedin.com/in/albert-stanley/) ![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)

---
