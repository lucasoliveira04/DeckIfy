import axios from "axios";

export const generateApkg = async (deckName, cards, setProgress) => {
  const jsonContent = JSON.stringify({ deckName, cards }, null, 2);

  try {
    const response = await axios.post(
      "https://anki-convert-file-api.onrender.com/convert",
      jsonContent,
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentage);
          }
        },
      }
    );

    console.log("Resposta:", response);

    const contentDisposition = response.headers["content-disposition"];
    const fileName = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `${deckName}.apkg`;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
  }
};
