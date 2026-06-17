# Desafio Técnico: Dashboard de Atendimentos - Luto Curitiba
Olá! Agradecemos o seu interesse em fazer parte do nosso time de Tecnologia da Informação. Este desafio foi desenhado para conhecermos melhor suas habilidades técnicas, arquiteturais e de resolução de problemas práticos.

## 1. Sobre a Luto Curitiba
Somos uma empresa de assistência e planos funerários com 30 anos de atuação no estado do Paraná. Nosso propósito é oferecer suporte completo e empático às famílias na organização de despedidas, cobrindo burocracias, cerimônias, sepultamento e cremação com excelência.

## 2. O Seu Papel na Empresa
Como Analista Desenvolvedor Pleno, você será responsável por escrever, testar, manter e evoluir nossas aplicações web e mobile. Além disso, atuará diretamente na automação de processos internos, colaborando de perto com stakeholders e contribuindo para a melhoria contínua e inovação dos nossos sistemas.

## 3. O Escopo do Desafio
Sua missão é construir um **Dashboard de Velórios**. Esse sistema será utilizado internamente e em painéis para disponibilizar, em uma **única tela**, o acompanhamento em tempo real de todos os velórios que estão atualmente **em andamento** no **Memorial Luto Curitiba**.

O desafio é dividido em três grandes pilares: **Interface (Frontend)**, **API (Backend)** e **Publicação (Deploy)**.

### Requisitos Funcionais (Interface e Regras de Negócio)
**Listagem de Velórios Ativos**: O dashboard deve exibir de forma clara e organizada todos os atendimentos em andamento. Cada registro deve conter:

* Nome completo do falecido.

* Nome da sala sendo usada para a cerimônia.

* Horário do início do velório.

* Horário do início do sepultamento.

* Local do sepultamento.

* Funerária responsável.

- Filtro Avançado por Registro de Óbito: No topo da página, deve haver um campo de busca/filtro. Ao digitar o número do Registro de Óbito do falecido, a listagem deve ser filtrada em tempo real (ou via botão de busca) para exibir apenas o atendimento correspondente a esse registro.

- Exportação de Banner em PDF: Cada atendimento listado na tela deve possuir um botão para "Exportar Banner". Ao clicar, o sistema deve gerar e baixar um arquivo PDF específico daquele atendimento.

- Regra do PDF: O documento gerado deve funcionar como um banner de identificação e conter estritamente: Nome completo do falecido, horário do início do velório, horário do início do sepultamento, local do sepultamento e a funerária responsável.

### Requisitos Técnicos e Arquitetura
Para o desenvolvimento desta solução, você deve utilizar obrigatoriamente a nossa stack padrão:

- **Frontend**: React (JavaScript/TypeScript).

- **Backend**: Node.js (construindo uma API REST segura).

- **Banco de Dados**: PostgreSQL (armazenando os dados estruturados de forma relacional).

- **Ambiente de Desenvolvimento**: Docker e Docker Compose (para orquestrar o ambiente local).

*Nota de Segurança Importante: O frontend (React) nunca deve se conectar diretamente ao banco de dados (PostgreSQL). Toda a comunicação e lógica de consultas e geração de PDFs devem passar pela API segura em Node.js.*

## 4. Requisito de Deploy (Publicação em Produção)
Para avaliarmos sua capacidade real de colocar sistemas no ar e lidar com variáveis de ambiente, caminhos de rede e conexões remotas, o deploy da aplicação na nuvem é obrigatório.

Você deverá realizar a publicação utilizando plataformas com camadas gratuitas (free tiers). Sugerimos as seguintes opções de mercado:

* **Frontend (React)**: <ins>Vercel</ins> ou Netlify.

* **Backend (Node.js)** e **Banco de Dados (PostgreSQL)**: <ins>Render</ins>, Railway, Fly.io ou <ins>Supabase</ins>.

## 5. Como Iniciar o Teste
1. Faça um Fork deste repositório para a sua conta pessoal do GitHub com seu nome.

2. Clone o seu Fork localmente na sua máquina.

3. Certifique-se de ter o Docker e o Docker Compose instalados.

4. Utilize a estrutura de arquivos fornecida e suba o ambiente básico de desenvolvimento com o comando:


```bash
   docker compose up -d
```

5. O container do banco de dados executará automaticamente o script contido na pasta `database/init.sql` na primeira inicialização, criando as tabelas relacionais e inserindo dados de mockup para seus testes locais.

---

## 6. O Que Será Avaliado?
* **Modelagem e Consultas Relacionais:** Sua capacidade de realizar JOINs eficientes entre as tabelas `pessoas`, `registros_obitos` e `velorios` para consolidar as informações.
* **Padrões de Projeto e Arquitetura:** Organização do código, separação de responsabilidades (Clean Code) e segurança na comunicação entre as camadas.
* **Resolução de Problemas:** Funcionamento correto do filtro por Registro de Óbito e a geração limpa do PDF.
* **Sucesso no Deploy:** Persistência e disponibilidade da aplicação nos links públicos fornecidos.

---

## 7. Instruções de Entrega
Ao finalizar o desafio, você deve:
1. Garantir que todo o código atualizado esteja com push feito no seu repositório do GitHub (seu Fork).
2. **Atualizar o topo deste arquivo README.md** incluindo claramente os seus links de produção:
   * **URL do Frontend no ar:** [Substitua por seu link da Vercel ou Netlify]
   * **URL da API Backend:** [Substitua por seu link do Render ou Railway]
3. Enviar o link do seu repositório para o responsável pelo seu processo seletivo na Luto Curitiba.

Desejamos muito sucesso no seu teste. Estamos ansiosos para ver sua solução!