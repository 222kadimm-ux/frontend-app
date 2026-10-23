import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  // ضع رابط Render هنا
  const API_URL = "https://YOUR_RENDER_URL_HERE.onrender.com"; 

  const askAI = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            question: question,
            data_summary: "بيانات تجريبية: المنتج A مبيعات 1000، المنتج B مبيعات 500" 
        })
      });
      const data = await response.json();
      setAnswer(data.answer || data.detail);
    } catch (error) {
      setAnswer("حدث خطأ في الاتصال بالخادم. تأكد من تشغيل API.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>💼 Pro Data Analyzer</h1>
        <p>مدعوم بالذكاء الاصطناعي</p>
      </header>
      <main>
        <section className="chat-section">
          <h2>اسأل بياناتك</h2>
          <input 
            type="text" 
            placeholder="مثال: ما هو أفضل منتج؟" 
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
