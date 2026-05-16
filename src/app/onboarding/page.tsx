"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    icon: Layers,
    title: "Build with confidence",
    description:
      "A modular foundation designed for scale. Start with clarity, grow without chaos.",
  },
  {
    icon: Zap,
    title: "Fast by default",
    description:
      "Optimized interactions that feel instant. Every tap, every transition — considered.",
  },
  {
    icon: Shield,
    title: "Designed to last",
    description:
      "Clean architecture that evolves with your product. No technical debt from day one.",
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

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-5">
        <Button variant="ghost" size="sm" onClick={handleSkip}>
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-layer flex items-center justify-center mb-8">
              {React.createElement(steps[currentStep].icon, {
                className: "h-7 w-7 text-primary",
                strokeWidth: 1.5,
              })}
            </div>

            {/* Text */}
            <h1 className="text-heading-1 text-foreground mb-3">
              {steps[currentStep].title}
            </h1>
            <p className="text-body text-muted leading-relaxed">
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-8 pb-12 safe-bottom">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-6 bg-primary"
                  : index < currentStep
                  ? "w-1.5 bg-primary/40"
                  : "w-1.5 bg-layer"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleNext}
        >
          {currentStep < steps.length - 1 ? "Continue" : "Get Started"}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
