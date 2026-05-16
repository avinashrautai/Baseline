"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Zap, Shield, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: "foundation",
    icon: Layers,
    title: "Build with confidence",
    description:
      "A modular foundation designed for scale. Start with structure, grow without chaos.",
  },
  {
    id: "performance",
    icon: Zap,
    title: "Fast by default",
    description:
      "Optimized interactions that feel instant. Every tap and transition — carefully considered.",
  },
  {
    id: "quality",
    icon: Shield,
    title: "Designed to last",
    description:
      "Clean architecture that evolves with your product. No shortcuts from day one.",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5 md:px-8">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-primary/80 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-foreground">B</span>
          </div>
          <span className="text-body font-medium text-foreground">Baseline</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-layer/50 flex items-center justify-center mb-8">
              {React.createElement(step.icon, {
                className: "h-5 w-5 text-primary",
                strokeWidth: 1.5,
              })}
            </div>

            <h1 className="text-heading-1 text-foreground mb-3">
              {step.title}
            </h1>
            <p className="text-body text-muted leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 inset-x-0 bg-background safe-bottom">
        <div className="max-w-sm mx-auto px-8 pb-10 pt-6">
          {/* Progress */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-6 bg-primary"
                    : index < currentStep
                    ? "w-1.5 bg-primary/40"
                    : "w-1.5 bg-layer"
                }`}
              />
            ))}
          </div>

          <Button className="w-full" size="lg" onClick={handleNext}>
            {currentStep < steps.length - 1 ? (
              <>
                Continue
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Get Started
                <Sparkles className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
