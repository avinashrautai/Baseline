"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  ArrowRight,
  Layers,
  Zap,
  Shield,
  Check,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ANIMATION } from "@/constants";

const steps = [
  {
    id: "foundation",
    icon: Layers,
    title: "Build with confidence",
    description:
      "A modular foundation designed for scale. Start with structure, grow without chaos. Every component is production-ready from day one.",
    features: [
      "Modular component architecture",
      "Consistent design tokens",
      "Scalable folder structure",
    ],
  },
  {
    id: "performance",
    icon: Zap,
    title: "Fast by default",
    description:
      "Optimized interactions that feel instant. Every tap, every transition, every render cycle — carefully considered for the best possible experience.",
    features: [
      "Sub-100ms interactions",
      "Intelligent loading states",
      "Smooth 60fps animations",
    ],
  },
  {
    id: "quality",
    icon: Shield,
    title: "Designed to last",
    description:
      "Clean architecture that evolves with your product. No shortcuts, no hacks, no technical debt from day one. Built by engineers who ship.",
    features: [
      "TypeScript throughout",
      "Accessibility-first patterns",
      "Comprehensive documentation",
    ],
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

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between p-5 md:px-8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">B</span>
          </div>
          <span className="text-body font-semibold text-foreground">Baseline</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSkip}>
          Skip intro
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: ANIMATION.duration.page, ease: ANIMATION.ease.default }}
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-16 h-16 rounded-2xl bg-layer flex items-center justify-center mb-8"
            >
              {React.createElement(step.icon, {
                className: "h-7 w-7 text-primary",
                strokeWidth: 1.5,
              })}
            </motion.div>

            {/* Step indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-overline text-muted uppercase tracking-widest mb-4"
            >
              Step {currentStep + 1} of {steps.length}
            </motion.div>

            {/* Title */}
            <h1 className="text-heading-1 md:text-display text-foreground mb-3">
              {step.title}
            </h1>

            {/* Description */}
            <p className="text-body text-muted leading-relaxed mb-8 max-w-sm">
              {step.description}
            </p>

            {/* Features list */}
            <div className="w-full max-w-xs space-y-3">
              {step.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.25 }}
                  className="flex items-center gap-3 text-left"
                >
                  <div className="w-5 h-5 rounded-md bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-body-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur-md border-t border-border-subtle safe-bottom">
        <div className="max-w-md mx-auto px-6 py-5 md:px-8">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-5">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-8 bg-primary"
                    : index < currentStep
                    ? "w-1.5 bg-primary/50"
                    : "w-1.5 bg-layer"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <Button className="w-full" size="lg" onClick={handleNext}>
            {currentStep < steps.length - 1 ? (
              <>
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-1.5" />
                Get Started
              </>
            )}
          </Button>

          {/* Secondary hint */}
          {currentStep === steps.length - 1 && (
            <p className="text-caption text-muted text-center mt-3">
              You can always revisit this from Settings
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
