import { X, Send, Sparkles } from "lucide-react";
import { CgSpinner } from "react-icons/cg";

interface AiAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  generatedMessage: String | null;
  onSendMessage: (e: any) => void;
}

const AiAssistModal: React.FC<AiAssistModalProps> = ({
  isOpen,
  onClose,
  generatedMessage,
  onSendMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-lg glass-card">
        {/* Top glow accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

        <button
          onClick={onClose}
          className="flex absolute top-3 right-2 items-center justify-center w-8 h-8 rounded-full surface-secondary hover:surface-hover transition-colors"
        >
          <X className="w-4 h-4 text-secondary" />
        </button>
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-primary">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-primary">
              IntelliChat <br /> Generated Message
            </h2>
          </div>
        </div>

        {/* Message Display */}
        <div className="px-4 pb-6">
          <div className="p-4 surface-secondary rounded-xl border border-primary min-h-[100px] text-primary leading-relaxed mb-6">
            {generatedMessage ? (
              generatedMessage
            ) : (
              <div className="animated-loader">
                <CgSpinner className="spin" size={24} />
              </div>
            )}{" "}
          </div>

          {/* Action Buttons */}
          <div className="flex max-sm:flex-col items-center justify-end gap-3">
            <button onClick={onClose} className="btn-secondary w-full">
              Cancel
            </button>

            <button
              onClick={(e) => onSendMessage(e)}
              disabled={!generatedMessage}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>

        {/* Bottom accent glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default AiAssistModal;
