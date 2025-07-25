import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, StopCircle } from "lucide-react"
import type { UseChatHelpers } from "@ai-sdk/react"

interface MessageInputProps extends Pick<UseChatHelpers, "input" | "handleInputChange" | "handleSubmit" | "status" | "stop"> {
  currentModeName: string | undefined
}

export function MessageInput({
  input,
  handleInputChange,
  handleSubmit,
  status,
  stop,
  currentModeName,
}: MessageInputProps) {
  return (
    <div className="p-4 bg-white border-t dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={`Ask ${currentModeName || "the assistant"}...`}
              disabled={status !== "ready"}
              autoFocus
            />
          </div>

          {status === "streaming" ? (
            <Button type="button" variant="outline" size="icon" onClick={() => stop()}>
              <StopCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || status !== "ready"}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}