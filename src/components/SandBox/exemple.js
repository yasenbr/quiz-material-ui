function extractErrorInfo(text) {
  if (text.includes("ReferenceError:")) {
    const lines = errorText.split("\n");

    let filePath = null;
    let lineWithError = null;
    let errorMessage = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("C:")) {
        filePath = line;
        // Check if there's a colon followed by a line number
        const lineMatch = line.match(/:(\d+)$/);
        if (lineMatch) {
          lineWithError = parseInt(lineMatch[1]);
        }
      } else if (line.includes("ReferenceError")) {
        errorMessage = line;
      }
    }

    return {
      filePath,
      lineWithError,
      errorMessage,
    };
  }else{
    return text;
  }
}

const errorInfo = extractErrorInfo(errorText);
console.log(errorInfo);