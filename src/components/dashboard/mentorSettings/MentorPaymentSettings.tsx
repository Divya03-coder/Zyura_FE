
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Trash2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import PaymentSettingsDialog from "./PaymentSettingsDialog"

interface SavedCard {
  id: string
  type: string
  last4: string
  expiry: string
  isDefault: boolean
}

const MentorPaymentSettings = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    { id: "1", type: "Visa", last4: "4242", expiry: "15/01/2024", isDefault: true },
    { id: "2", type: "Visa", last4: "4255", expiry: "16/02/2024", isDefault: false },
  ])

  const handleSetDefault = (cardId: string) => {
    setSavedCards(
      savedCards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    )
  }

  const handleDeleteCard = (cardId: string) => {
    setSavedCards(savedCards.filter((card) => card.id !== cardId))
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Saved Payment Methods */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <CardTitle>Payment Methods</CardTitle>
          <Button
            onClick={() => setOpenDialog(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer w-full sm:w-auto"
            size="sm"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Payment Gateway
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedCards.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No payment methods added yet</p>
            </div>
          ) : (
            savedCards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="font-medium">
                        {card.type} ******{card.last4}
                      </span>
                      {card.isDefault && (
                        <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expire date : {card.expiry}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {!card.isDefault && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSetDefault(card.id)}
                      className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto"
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <PaymentSettingsDialog open={openDialog} onOpenChange={setOpenDialog} />
    </div>
  )
}

export default MentorPaymentSettings;



// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { CreditCard, Trash2, Plus } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import PaymentSettingsDialog from "./PaymentSettingsDialog"

// const MentorPaymentSettings = () => {
//   const [openDialog, setOpenDialog] = useState(false)

//   const savedCards = [
//     { id: "1", type: "Visa", last4: "4242", expiry: "15/01/2024", isDefault: true },
//     { id: "2", type: "Visa", last4: "4255", expiry: "16/02/2024", isDefault: false },
//   ]

//   return (
//     <div className="space-y-6 pb-10">
//       {/* Saved Payment Methods */}
//       <Card>
//         <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
//           <CardTitle>Payment Methods</CardTitle>
//           <Button
//             onClick={() => setOpenDialog(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer w-full sm:w-auto"
//             size="sm"
//           >
//             <Plus className="mr-1 h-4 w-4" />
//             Add Payment Gateway
//           </Button>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {savedCards.map((card) => (
//             <div
//               key={card.id}
//               className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-4"
//             >
//               <div className="flex items-center gap-4">
//                 <CreditCard className="h-5 w-5 text-muted-foreground" />
//                 <div className="space-y-2">
//                   <div className="flex flex-wrap items-center gap-4">
//                     <span className="font-medium">
//                       {card.type} ******{card.last4}
//                     </span>
//                     {card.isDefault && (
//                       <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Default</Badge>
//                     )}
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     Expire date : {card.expiry}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-4">
//                 {!card.isDefault && (
//                   <Button
//                     variant="secondary"
//                     size="sm"
//                     className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto"
//                   >
//                     Set as Default
//                   </Button>
//                 )}
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-red-600 hover:text-red-700 cursor-pointer w-full sm:w-auto"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Dialog */}
//       <PaymentSettingsDialog open={openDialog} onOpenChange={setOpenDialog} />
//     </div>
//   )
// }

// export default MentorPaymentSettings;