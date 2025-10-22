interface Step {
  id: number;
  label: string;
  completed: boolean;
  active: boolean;
}

interface WizardProps {
  steps: Step[];
  onStepClick?: (stepId: number) => void;
}

export default function Wizard({ steps, onStepClick }: WizardProps) {
  const handleStepClick = (stepId: number) => {
    const clickedStepIndex = steps.findIndex(step => step.id === stepId);
    const allPreviousStepsCompleted = steps
      .slice(0, clickedStepIndex)
      .every(step => step.completed);

    if (allPreviousStepsCompleted || clickedStepIndex === 0) {
      onStepClick?.(stepId);
    }
  };

  const isStepClickable = (stepId: number) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    if (stepIndex === 0) return true; 
    
    return steps
      .slice(0, stepIndex)
      .every(step => step.completed);
  };

  return (
    <div className="intro-y box p-5 m-5">
      <div className="wizard flex flex-col lg:flex-row justify-center px-5 sm:px-20 relative">
        {/* Progress line */}
        <div className="wizard__line hidden lg:block w-2/3 bg-gray-200 absolute mt-5"></div>

        {steps.map((step) => {
          const clickable = isStepClickable(step.id);
          return (
            <div
              key={step.id}
              className={`intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10 ${
                !clickable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => clickable && handleStepClick(step.id)}
            >
              <button
                className={`w-10 h-10 rounded-full button ${
                  step.active
                    ? 'text-white bg-theme-1'
                    : step.completed
                    ? 'text-white bg-green-500'
                    : 'text-gray-600 bg-gray-200'
                }`}
                disabled={!clickable}
              >
                {step.id}
              </button>
              <div
                className={`lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto ${
                  step.active
                    ? 'font-medium text-gray-900'
                    : 'text-gray-700'
                }`}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}