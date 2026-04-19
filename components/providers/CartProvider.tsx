'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Course } from '@/types';

interface CartItem {
  course: Course;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  total: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (course: Course) => {
    setItems((prev) => {
      const already = prev.find((i) => i.course.id === course.id);
      if (already) return prev; // no duplicados
      return [...prev, { course }];
    });
    setIsOpen(true); // abre el drawer automáticamente
  };

  const removeFromCart = (courseId: string) =>
    setItems((prev) => prev.filter((i) => i.course.id !== courseId));

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, { course }) => sum + course.discountPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
