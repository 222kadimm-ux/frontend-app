import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const askAI = async () => {
    if (!question) return;
    setLoading(true);
    setTimeout(() => {
      setAnswer("هذه إجابة تجريبية. سيتم ربط الذكاء الاصطناعي قريباً!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="app-container">
      <header>
        <h1>💼 Pro Data Analyzer</h1>
        <p>منصة تحليل البيانات الذكية</p>
      </header>

      <main>
        <section className="upload-section">
          <h2>1. ارفع ملفك</h2>
          <input type="file" onChange={handleFileUpload} accept=".csv, .xlsx" />
          {file && <p>الملف المختار: {file.name}</p>}
        </section>

        <section className="chat-section">
          <h2>2. اسأل الذكاء الاصطناعي</h2>
          <input 
            type="text" 
            placeholder="اسأل عن بياناتك..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={askAI} disabled={loading}>
            {loading ? "جاري التفكير..." : "إرسال"}
          </button>
          
          {answer && (
            <div className="answer-box">
              <strong>الإجابة:</strong>
              <p>{answer}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
