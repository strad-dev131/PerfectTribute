export function SkillsTribute() {
  const skills = [
    {
      icon: "👑",
      title: "Leadership Master",
      description: "Bhai ki leadership skills ki toh baat hi kuch aur hai! TeamX se lekar Global Hub tak, sabko manage karta hai like a boss!",
      testId: "skill-leadership"
    },
    {
      icon: "🎭",
      title: "Sayari King", 
      description: "Sayari mein bhi master hai Vivaan Bhai! Har line mein emotion, har word mein magic. Poetry ka asli raja!",
      testId: "skill-sayari"
    },
    {
      icon: "😉",
      title: "Charm & Style",
      description: "Flirt bhi kare, manage bhi kare! Vivaan bhai, aap toh sab kuch karte ho with perfect style!",
      testId: "skill-charm"
    },
    {
      icon: "📱",
      title: "Group Manager",
      description: "Telegram groups ki jaan hai Vivaan Bhai! Gossip Edge ho ya koi aur, sabko sambhalta hai perfectly!",
      testId: "skill-group-manager"
    },
    {
      icon: "🤝",
      title: "True Friend",
      description: "Dosti mein bhi number one! Har mushkil mein saath, har khushi mein double. Yahi toh hai asli yaar!",
      testId: "skill-friendship"
    },
    {
      icon: "⭐",
      title: "Inspiration",
      description: "Sabke liye inspiration hai Vivaan! Personality se lekar skills tak, sab kuch perfect. Real legend!",
      testId: "skill-inspiration"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" data-testid="skills-tribute-section">
      {/* Background decorative elements */}
      <div className="absolute inset-0 paisley-bg opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-bold text-gradient mb-4" data-testid="skills-title">
            🌟 Vivaan Bhai Ki Qualities
          </h2>
          <p className="text-gray-300 text-lg" data-testid="skills-subtitle">
            Har field mein expert, har dil mein special!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 hover-glow group"
              data-testid={skill.testId}
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:animate-bounce" data-testid={`${skill.testId}-icon`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl font-poppins font-semibold text-neon-gold mb-3" data-testid={`${skill.testId}-title`}>
                  {skill.title}
                </h3>
                <p className="text-gray-300 font-medium" data-testid={`${skill.testId}-description`}>
                  "{skill.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
