import HttpHelper from "./HttpHelper";
const URL = import.meta.env.VITE_QUESTIONS_API_URL;

console.log("env: ", URL);

class CompilerApi {
  static requestHeaders() {
    return { "Content-Type": "application/json" };
  }

  static getTask(lang: string) {
    // console.log("ip:", process.env);
    return HttpHelper.fetch(
      `${URL}/api/file/${lang}`,
      "GET",
      this.requestHeaders(),
      null
    );
  }

  static run(answer: any) {
    console.log("answer-compiler", answer);
    
    return HttpHelper.fetch(
      `${URL}/api/run`,
      "POST",
      this.requestHeaders(),
      JSON.stringify(answer)
    );
  }
}

export default CompilerApi;
