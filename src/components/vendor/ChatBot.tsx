import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatBotProps = {
  vendor: {
    id: string
    name: string
    category: string
    description: string | null
    short_description: string | null
    location: string
    price_range_min: number | null
    price_range_max: number | null
    capacity_min: number | null
    capacity_max: number | null
  }
}

export function ChatBot({ vendor }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-gemini', {
        body: {
          message: userMessage,
          vendorContext: vendor
        }
      })

      if (error) throw error

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Erreur",
        description: "Impossible d'obtenir une réponse. Veuillez réessayer.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-medium">Chat avec l'assistant</h3>
        <p className="text-sm text-muted-foreground">
          Posez vos questions sur {vendor.name}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted max-w-[80%] rounded-lg p-3 mr-4">
                <p className="text-sm">En train d'écrire...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Posez votre question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}