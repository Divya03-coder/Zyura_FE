import { useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { AnimatePresence, motion } from "framer-motion"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import master from "@/assets/dashboard/master.svg"
import visa from "@/assets/dashboard/visa.svg"
import web from "@/assets/dashboard/web.svg"

const gateways = [
  { id: "mastercard", name: "Mastercard", img: master },
  { id: "visa", name: "Visa Card", img: visa },
  { id: "webpay", name: "Web Pay", img: web },
]

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "India",
  "China",
  "Mexico",
  "Italy",
  "Spain",
  "South Korea",
  "Netherlands",
]

interface PaymentSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PaymentSettingsDialog = ({ open, onOpenChange }: PaymentSettingsDialogProps) => {
  const [selectedGateway, setSelectedGateway] = useState("mastercard")
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [formData, setFormData] = useState({
    cardNumber: "",
    country: "",
    cvc: "",
    zip: "",
  })

  // Popover open state
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const activeGateway = gateways.find((gw) => gw.id === selectedGateway)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", {
      gateway: selectedGateway,
      ...formData,
      expiryDate: expiryDate ? format(expiryDate, "MM/yy") : ""
    })
    onOpenChange(false)
    setFormData({ cardNumber: "", country: "", cvc: "", zip: "" })
    setExpiryDate(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            {/* Dialog Content */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-[95vw] sm:max-w-[600px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
              >
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6 p-6">
                    {/* Header */}
                    <h2 className="text-xl font-semibold text-gray-800">
                      Add Payment Methods
                    </h2>

                    {/* Gateway Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-normal text-gray-700">
                        Choose Your Payment Gateway:
                      </Label>
                      <div className="flex flex-col sm:flex-row flex-wrap gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        {gateways.map((gw) => (
                          <div key={gw.id} className="flex items-center gap-2">
                            <Checkbox
                              id={gw.id}
                              checked={selectedGateway === gw.id}
                              onCheckedChange={() => setSelectedGateway(gw.id)}
                              className={selectedGateway === gw.id ? "bg-black text-white border-black" : ""}
                            />
                            <img src={gw.img} alt={gw.name} className="h-6 w-auto" />
                            <Label
                              htmlFor={gw.id}
                              className="cursor-pointer text-sm font-normal text-gray-700"
                            >
                              {gw.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Form */}
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
                      {/* Card Logo */}
                      {activeGateway && (
                        <img
                          src={activeGateway.img}
                          alt={activeGateway.name}
                          className="h-8 w-auto mb-4"
                        />
                      )}

                      {/* Card Number */}
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number:</Label>
                        <Input
                          id="card-number"
                          placeholder="0123 4567 8901 2345"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, cardNumber: e.target.value })
                          }
                          className="border-gray-300"
                          required
                        />
                      </div>

                      {/* Country & Expiry Date */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country:</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) =>
                              setFormData({ ...formData, country: value })
                            }
                          >
                            <SelectTrigger className="w-full border-gray-300">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">Expiry Date:</Label>
                          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal border-gray-300 cursor-pointer",
                                  !expiryDate && "text-muted-foreground"
                                )}
                                onClick={() => setIsPopoverOpen(true)}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {expiryDate ? (
                                  format(expiryDate, "d MMMM, yyyy")
                                ) : (
                                  <span>Select a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={expiryDate}
                                onSelect={(date) => {
                                  if (date) {
                                    setExpiryDate(date)
                                    setIsPopoverOpen(false) // auto-close
                                  }
                                }}
                                // disabled={(date) => date < new Date()} // prevent past dates
                                captionLayout="label"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {/* CVC & ZIP */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC:</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={(e) =>
                              setFormData({ ...formData, cvc: e.target.value })
                            }
                            maxLength={4}
                            className="border-gray-300"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP:</Label>
                          <Input
                            id="zip"
                            placeholder="12345"
                            value={formData.zip}
                            onChange={(e) =>
                              setFormData({ ...formData, zip: e.target.value })
                            }
                            className="border-gray-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        className="w-auto bg-blue-600 hover:bg-blue-700 px-8"
                      >
                        Add Card
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Close Button */}
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default PaymentSettingsDialog;