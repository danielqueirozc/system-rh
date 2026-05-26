import { Fragment } from "react"
import { cn } from "@/lib/utils"

type Step = {
  label: string
}

type StepperProps = {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full lg:w-lg px-4 py-4 mt-4 mb-4">

      {/* Linha 1: círculos + conectores */}
      <div className="flex items-center">
        {steps.map((_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep
          const isLast = index === steps.length - 1

          return (
            <Fragment key={stepNumber}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border shrink-0 transition-colors",
                  isActive || isCompleted
                    ? "bg-blue-700 border-blue-700 text-white"
                    : "bg-white border-purple text-gray-400"
                )}
              >
                {stepNumber}
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2",
                    isCompleted ? "bg-blue-700" : "bg-purple"
                  )}
                />
              )}
            </Fragment>
          )
        })}
      </div>

      {/* Linha 2: labels */}
      <div className="flex mt-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep

          return (
            <div
              key={stepNumber}
              className={cn(
                "text-xs font-medium shrink-0 flex-1",
                isActive ? "text-blue-700" : "text-gray-400"
              )}
            >
              {step.label}
            </div>
          )
        })}
      </div>

    </div>
  )
}
