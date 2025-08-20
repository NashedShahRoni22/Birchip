'use client';

import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, MapPin } from 'lucide-react';

export default function FoodOrderModal({ isOpen, onClose, selectedFood }) {
    const [roomNumber, setRoomNumber] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleSubmitOrder = async () => {
        if (!roomNumber.trim()) {
            alert('Please enter your room number');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate order processing
        try {
            // Here you would typically send the order to your backend
            const orderData = {
                foodName: selectedFood?.name,
                price: selectedFood?.price,
                quantity: quantity,
                roomNumber: roomNumber.trim(),
                totalAmount: (selectedFood?.price * quantity).toFixed(2),
                timestamp: new Date().toISOString()
            };

            console.log('Order submitted:', orderData);
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert(`Order placed successfully! Your ${selectedFood?.name} will be delivered to room ${roomNumber}.`);
            
            // Reset form and close modal
            setRoomNumber('');
            setQuantity(1);
            onClose();
        } catch (error) {
            console.error('Order submission failed:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalAmount = selectedFood ? (selectedFood.price * quantity).toFixed(2) : '0.00';

    if (!isOpen || !selectedFood) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative p-6 pb-4 border-b border-gray-100">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <ShoppingCart className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
                    </div>
                    <p className="text-gray-600">Fill in the details to complete your food order</p>
                </div>

                {/* Order Summary */}
                <div className="p-6 pb-4">
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                        <div className="flex items-center gap-3">
                            {selectedFood.icon}
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{selectedFood.name}</p>
                                <p className="text-sm text-gray-600">${selectedFood.price.toFixed(2)} each</p>
                            </div>
                        </div>
                    </div>

                    {/* Room Number Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                Room Number
                            </div>
                        </label>
                        <input
                            type="text"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            placeholder="Enter your motel room number"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder:text-gray-500"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Quantity
                        </label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1 || isSubmitting}
                                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Minus className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="flex-1 text-center">
                                <span className="text-2xl font-bold text-gray-900">{quantity}</span>
                            </div>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                disabled={isSubmitting}
                                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Plus className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-primary/5 rounded-2xl p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                            <span className="text-2xl font-bold text-primary">${totalAmount}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitOrder}
                            disabled={isSubmitting || !roomNumber.trim()}
                            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-button disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-5 h-5" />
                                    Place Order
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}