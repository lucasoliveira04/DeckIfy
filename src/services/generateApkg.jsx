import axios from "axios";

// Função para enviar dados e gerar o arquivo .apkg
export const generateApkg = async (deckName, cards) => {
  const jsonContent = JSON.stringify({ deckName, cards }, null, 2);

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/convert",
      jsonContent,
      {
        headers: {
          "Content-Type": "application/json", // Enviando os dados como JSON
        },
        responseType: "blob", // Esperando o arquivo como Blob
      }
    );

    // Extrai o nome do arquivo da resposta
    const contentDisposition = response.headers["content-disposition"];
    const fileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `${deckName}.apkg`; // Usa o nome do deck se não houver nome no cabeçalho

    // Cria um link para download do arquivo gerado
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Define o nome correto para o arquivo
    document.body.appendChild(link);
    link.click(); // Inicia o download
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
  }
};
