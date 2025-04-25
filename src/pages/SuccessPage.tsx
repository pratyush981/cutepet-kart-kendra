
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const SuccessPage = () => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ["#9b87f5", "#FFDEE2", "#FEF7CD"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-petshop-green rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been placed successfully. We'll be in touch shortly with more information about your new pet(s)!
          </p>
          
          <div className="bg-petshop-gray p-4 mb-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Order Confirmation</p>
            <p className="font-medium text-lg">#{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="font-medium mb-4">What happens next?</h2>
            <ol className="text-left space-y-3">
              <li className="flex items-start">
                <span className="bg-petshop-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                  1
                </span>
                <span>
                  <span className="font-medium">Verification Call</span>
                  <p className="text-sm text-muted-foreground">Our team will call you within 24 hours to verify your order and address.</p>
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-petshop-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                  2
                </span>
                <span>
                  <span className="font-medium">Preparation</span>
                  <p className="text-sm text-muted-foreground">We'll prepare your pet(s) and their starter kit for delivery.</p>
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-petshop-purple text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                  3
                </span>
                <span>
                  <span className="font-medium">Delivery</span>
                  <p className="text-sm text-muted-foreground">Your new pet(s) will be delivered to your doorstep with care.</p>
                </span>
              </li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button asChild className="bg-petshop-purple hover:bg-petshop-dark-purple">
              <a href="mailto:support@cutupet.com">Contact Support</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
