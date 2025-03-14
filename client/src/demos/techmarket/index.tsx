import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { ShoppingCart, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Ultra HD Smart TV",
    price: 899.99,
    image: "bg-gradient-to-r from-blue-400 to-blue-600",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "bg-gradient-to-r from-purple-400 to-purple-600",
    category: "Audio"
  },
  {
    id: 3,
    name: "Professional DSLR Camera",
    price: 1299.99,
    image: "bg-gradient-to-r from-gray-700 to-gray-900",
    category: "Photography"
  },
  {
    id: 4,
    name: "Smartphone with AI Camera",
    price: 799.99,
    image: "bg-gradient-to-r from-indigo-400 to-indigo-600",
    category: "Mobile"
  },
];

type CartItem = {
  product: Product;
  quantity: number;
};

export default function TechMarketDemo() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Link href="/portfolio/techmarket">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Project
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center">TechMarket</h1>
        <Button 
          variant="outline" 
          className="relative" 
          onClick={() => setShowCart(!showCart)}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      {showCart ? (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Shopping Cart</span>
                <Button variant="ghost" onClick={() => setShowCart(false)}>Continue Shopping</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded ${item.product.image} flex items-center justify-center text-white`}>
                          <ShoppingCart className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.product.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.product.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 h-8 w-8"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {cartItems.length > 0 && (
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex justify-between w-full text-lg font-medium">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full">Checkout</Button>
              </CardFooter>
            )}
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className={`h-40 ${product.image} flex items-center justify-center text-white`}>
                <ShoppingCart className="h-12 w-12 opacity-50" />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">{product.category}</Badge>
                <h3 className="font-bold mb-2">{product.name}</h3>
                <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}