"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            최고은
          </h3>

          {/* Tagline */}
          <p className="text-muted-foreground text-center max-w-md">
            1,000명의 마지막을 통해 배운,
            <br />
            당신의 오늘을 간호합니다.
          </p>

          {/* Divider */}
          <div className="w-16 h-px bg-border my-4" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by 최고은
          </p>

          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Choi Go-eun. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
