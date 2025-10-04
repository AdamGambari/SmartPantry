'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Camera, Upload, X, Check } from 'lucide-react'

interface ReceiptScannerProps {
  isOpen: boolean
  onClose: () => void
  onItemsExtracted: (items: Array<{ name: string; quantity: number; unit: string; price: number }>) => void
}

export default function ReceiptScanner({ isOpen, onClose, onItemsExtracted }: ReceiptScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [extractedItems, setExtractedItems] = useState<Array<{ name: string; quantity: number; unit: string; price: number }>>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // back camera on mobile
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
      }
    } catch (error) {
      console.error('Camera access denied:', error)
      alert('Camera access is required for receipt scanning')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)
        
        const imageData = canvas.toDataURL('image/jpeg')
        setPreview(imageData)
        processReceipt()
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setPreview(imageData)
        processReceipt()
      }
      reader.readAsDataURL(file)
    }
  }

  const processReceipt = async () => {
    setIsProcessing(true)
    
    // mock OCR processing
    setTimeout(() => {
      const mockItems = [
        { name: 'Milk 2%', quantity: 2, unit: 'cartons', price: 4.98 },
        { name: 'Bread Whole Wheat', quantity: 1, unit: 'loaf', price: 2.49 },
        { name: 'Eggs Large', quantity: 12, unit: 'eggs', price: 3.99 },
        { name: 'Bananas', quantity: 6, unit: 'bananas', price: 1.99 }
      ]
      
      setExtractedItems(mockItems)
      setIsProcessing(false)
    }, 2000)
  }

  const addItemsToPantry = () => {
    onItemsExtracted(extractedItems)
    onClose()
    resetScanner()
  }

  const resetScanner = () => {
    setPreview(null)
    setExtractedItems([])
    setIsScanning(false)
    setIsProcessing(false)
    
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Scan Receipt</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!preview && !isScanning && (
            <div className="space-y-4">
              <div className="text-center">
                <Camera className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">How would you like to scan?</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={startCamera}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium">Use Camera</p>
                  <p className="text-sm text-gray-600">Take a photo with your device</p>
                </button>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium">Upload Photo</p>
                  <p className="text-sm text-gray-600">Choose from your gallery</p>
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {isScanning && !preview && (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-gray-100 rounded-lg object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="flex gap-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capture Photo
                </button>
                <button
                  onClick={resetScanner}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {preview && (
            <div className="space-y-4">
              <div className="text-center">
                <Image
                  src={preview}
                  alt="Receipt preview"
                  width={400}
                  height={256}
                  className="max-w-full h-64 object-contain mx-auto rounded-lg border"
                />
              </div>

              {isProcessing && (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Processing receipt...</p>
                </div>
              )}

              {extractedItems.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Found Items:</h3>
                  
                  <div className="space-y-2">
                    {extractedItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} {item.unit} • ${item.price}
                          </p>
                        </div>
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={addItemsToPantry}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Add to Pantry
                    </button>
                    <button
                      onClick={resetScanner}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Scan Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
