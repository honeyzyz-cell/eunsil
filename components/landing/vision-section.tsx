"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Target, Compass } from "lucide-react";

export function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Users,
      title: "함께하는 성장",
      description: "서로의 경험과 지혜를 나누며 함께 성장하는 커뮤니티",
    },
    {
      icon: Target,
      title: "명확한 방향",
      description: "자기계발의 방향을 잃지 않도록 이끄는 가이드",
    },
    {
      icon: Compass,
      title: "균형 잡힌 삶",
      description: "일과 부업, 그리고 '나' 사이의 건강한 균형",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Vision Statement */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-primary-foreground/70 tracking-wider mb-4 block">
              커뮤니티 비전
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight text-balance">
              각자가 주인공인 행복한 삶을 돕는
              <br />
              <span className="text-accent">'인생 간호사'</span>가 되고 싶습니다
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              전문가로서의 도움을 넘어,
              우리가 서로의 성장을 응원하는 공간을 꿈꿉니다.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Target Audience */}
          <motion.div
            className="mt-20 text-center bg-primary-foreground/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-foreground/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-sm font-medium text-primary-foreground/60 tracking-wider uppercase mb-4">
              이런 분들과 함께하고 싶습니다
            </p>
            <p className="font-serif text-xl md:text-2xl text-primary-foreground leading-relaxed">
              직장에서도, 부업에서도 '나'를 잃지 않고
              <br className="hidden md:block" />
              자기계발을 지속하는 사람들
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
