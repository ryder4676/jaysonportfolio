import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Search, 
  Filter,
  ChevronDown,
  ArrowRightToLine,
  Glasses,
  UserCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew: boolean;
  rating: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Designer Silk Dress",
    price: 299.99,
    category: "Dresses",
    image: "bg-gradient-to-r from-pink-300 to-pink-500",
    isNew: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 189.99,
    category: "Tops",
    image: "bg-gradient-to-r from-amber-300 to-amber-500",
    isNew: false,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Leather Handbag",
    price: 349.99,
    category: "Accessories",
    image: "bg-gradient-to-r from-gray-700 to-gray-900",
    isNew: true,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Designer Sunglasses",
    price: 179.99,
    category: "Accessories",
    image: "bg-gradient-to-r from-blue-300 to-blue-500",
    isNew: false,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Tailored Blazer",
    price: 259.99,
    category: "Outerwear",
    image: "bg-gradient-to-r from-indigo-300 to-indigo-500",
    isNew: true,
    rating: 4.5,
  },
  {
    id: 6,
    name: "High-Waisted Jeans",
    price: 149.99,
    category: "Bottoms",
    image: "bg-gradient-to-r from-blue-400 to-blue-600",
    isNew: false,
    rating: 4.4,
  },
];

const categories = [
  "All",
  "Dresses",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
];

export default function BoutiqueStoreDemo() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 400]);

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const handleTryOn = (product: Product) => {
    setSelectedProduct(product);
    setShowVirtualTryOn(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/portfolio/boutiquestore">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">LUXE Boutique</h1>
          </div>
          
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-md mx-8">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {showVirtualTryOn ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setShowVirtualTryOn(false)}
              >
                <Glasses className="h-4 w-4" />
                Exit Try-On
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex items-center gap-2"
                onClick={() => setShowVirtualTryOn(true)}
              >
                <Glasses className="h-4 w-4" />
                Virtual Try-On
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {wishlist.length}
                </Badge>
              )}
            </Button>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="container mx-auto max-w-md">
                  <DrawerHeader>
                    <DrawerTitle>Shopping Bag</DrawerTitle>
                    <DrawerDescription>
                      {cart.length === 0 
                        ? "Your shopping bag is empty" 
                        : `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your bag`
                      }
                    </DrawerDescription>
                  </DrawerHeader>
                  {cart.length > 0 && (
                    <div className="p-4">
                      <div className="space-y-4">
                        {cart.map(productId => {
                          const product = products.find(p => p.id === productId);
                          if (!product) return null;
                          
                          return (
                            <div key={productId} className="flex items-center gap-4">
                              <div className={`w-16 h-16 rounded ${product.image}`}></div>
                              <div className="flex-1">
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.category}</p>
                                <p className="font-medium">${product.price.toFixed(2)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="border-t border-b py-4 my-4">
                        <div className="flex justify-between mb-2">
                          <span>Subtotal</span>
                          <span>
                            ${cart.reduce((total, id) => {
                              const product = products.find(p => p.id === id);
                              return total + (product?.price || 0);
                            }, 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Shipping</span>
                          <span>Calculated at checkout</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <DrawerFooter>
                    <Button disabled={cart.length === 0}>
                      Checkout
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Continue Shopping</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showVirtualTryOn ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Virtual Try-On</h2>
            
            {selectedProduct ? (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className={`aspect-[3/4] rounded-lg ${selectedProduct.image} shadow-md mb-4`}></div>
                  <h3 className="text-lg font-medium">{selectedProduct.name}</h3>
                  <p className="text-gray-500 mb-4">${selectedProduct.price.toFixed(2)}</p>
                  <Button className="w-full" onClick={() => addToCart(selectedProduct.id)}>
                    Add to Bag
                  </Button>
                </div>
                
                <div className="md:w-1/2">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
                    <div className="text-center p-6">
                      <Glasses className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium mb-2">Virtual Model</h3>
                      <p className="text-gray-500 mb-4">
                        Upload your photo to see how this item would look on you
                      </p>
                      <Button variant="outline">
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Glasses className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">Select an Item to Try On</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Choose any product from our collection to see how it would look on you using our virtual try-on technology
                </p>
                <Button onClick={() => setShowVirtualTryOn(false)}>
                  Browse Products
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Featured banner */}
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg shadow-md p-6 mb-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Spring Collection 2025</h2>
              <p className="mb-4 max-w-md">Discover our exquisite new arrivals featuring premium fabrics and timeless designs</p>
              <Button variant="secondary">
                Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Categories */}
            <div className="flex overflow-x-auto py-2 mb-6 gap-2 no-scrollbar">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="container mx-auto max-w-md">
                    <DrawerHeader>
                      <DrawerTitle>Filter Products</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Price Range</h3>
                      <div className="mb-2">
                        <Slider
                          defaultValue={[0, 400]}
                          max={500}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button onClick={() => {}}>
                        Apply Filters
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters</p>
                <Button variant="outline" onClick={() => {
                  setActiveCategory("All");
                  setPriceRange([0, 400]);
                }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative">
                      <div className={`aspect-[3/4] ${product.image}`}></div>
                      <button 
                        className="absolute top-3 right-3 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                      >
                        <Heart 
                          className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                        />
                      </button>
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                          NEW
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                        <Button variant="secondary" onClick={() => handleTryOn(product)}>
                          <Glasses className="h-4 w-4 mr-2" />
                          Try It On
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center text-amber-500 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                      </div>
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <p className="font-bold">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Bag
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}