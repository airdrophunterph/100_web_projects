import { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, image: '🎧', category: 'Electronics' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', category: 'Electronics' },
  { id: 3, name: 'Running Shoes', price: 79.99, image: '👟', category: 'Fashion' },
  { id: 4, name: 'Backpack', price: 49.99, image: '🎒', category: 'Fashion' },
  { id: 5, name: 'Coffee Maker', price: 59.99, image: '☕', category: 'Home' },
  { id: 6, name: 'Desk Lamp', price: 34.99, image: '💡', category: 'Home' },
  { id: 7, name: 'Wireless Mouse', price: 29.99, image: '🖱️', category: 'Electronics' },
  { id: 8, name: 'Plant Pot', price: 19.99, image: '🪴', category: 'Home' },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 p-4">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2 bg-white/20 text-white rounded-lg"
        >
          🛒 Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🛍️ Shop</h1>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-5xl text-center mb-3">{product.image}</div>
              <h3 className="text-white font-medium text-sm mb-1">{product.name}</h3>
              <div className="text-amber-400 font-bold mb-3">${product.price}</div>
              <button
                onClick={() => addToCart(product)}
                className="w-full py-2 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-400"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gray-900 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white/60 text-2xl">×</button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center text-white/40 py-12">Your cart is empty</div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white/10 rounded-lg p-3">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <div className="text-amber-400">${item.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white/20 rounded text-white"
                        >
                          -
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white/20 rounded text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-white mb-4">
                    <span>Subtotal</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
