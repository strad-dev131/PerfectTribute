export function SayariWall() {
  const sayaris = [
    {
      content: "Me adhura hu tum meri kami ho, tum mano ya na mano lekin tum mere liye bni ho",
      author: "Vivaan's Original",
      emoji: "💖",
      testId: "sayari-1"
    },
    {
      content: "Wah tumhari ye masumiyat bhi kamal h, chura ke dil mera puchti ho kya haal h",
      author: "Vivaan's Original",
      emoji: "😍",
      testId: "sayari-2"
    },
    {
      content: "Rakha h sada apne bajuon pe aitbar.\nTagat kisi ki dekh kr fidda nhi hua.\nMaksad h zindagi ka humari to jitna\nHum harne ke waste peeda nahi huye",
      author: "Vivaan's Original",
      emoji: "💪",
      testId: "sayari-3"
    },
    {
      content: "Bhale pesa nahi kama paye mene.\nLekin pyar bht kamaya hai.\nTum jo pese se bhi n khrid skte.\nVivaan ne bhaichara banaya h",
      author: "Vivaan's Original",
      emoji: "🤝",
      testId: "sayari-4"
    },
    {
      content: "Nadan nahi hu.\nLekin nadiyan psnd hai.\npese ki kimat krte hoge pese vale.\nHum to logo kr chehre ki muskan psnd h",
      author: "Vivaan's Original",
      emoji: "😊",
      testId: "sayari-5"
    }
  ];

  const stats = [
    { label: "Sayaris Created", value: "500+", testId: "stat-sayaris" },
    { label: "Groups Managed", value: "10+", testId: "stat-groups" },
    { label: "Lives Touched", value: "1000+", testId: "stat-lives" },
    { label: "Smiles Created", value: "∞", testId: "stat-smiles" }
  ];

  return (
    <section className="py-20 paisley-bg relative" data-testid="sayari-wall-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-bold text-gradient mb-4" data-testid="sayari-wall-title">
            📜 Vivaan's Sayari Wall
          </h2>
          <p className="text-gray-300 text-lg" data-testid="sayari-wall-subtitle">
            Famous quotes and sayaris that made us all smile!
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sayaris.map((sayari, index) => (
              <div 
                key={index}
                className={`saying-card rounded-2xl p-6 hover-glow ${index === 2 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                data-testid={sayari.testId}
              >
                <div className="font-dancing text-lg md:text-xl text-neon-gold mb-4 text-center whitespace-pre-line leading-relaxed" data-testid={`${sayari.testId}-content`}>
                  "{sayari.content}" {sayari.emoji}
                </div>
                <div className="text-center text-sm text-gray-400" data-testid={`${sayari.testId}-author`}>
                  - {sayari.author}
                </div>
              </div>
            ))}
          </div>
          
          {/* Fun Stats */}
          <div className="mt-12 glass-card rounded-2xl p-6" data-testid="fun-stats">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {stats.map((stat, index) => (
                <div key={index} data-testid={stat.testId}>
                  <div className={`text-2xl font-bold ${index % 2 === 0 ? 'text-neon-cyan' : 'text-neon-gold'}`} data-testid={`${stat.testId}-value`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400" data-testid={`${stat.testId}-label`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
