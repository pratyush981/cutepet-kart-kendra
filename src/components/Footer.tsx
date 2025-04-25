
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Cutupet Center</h3>
            <p className="text-muted-foreground">
              Your trusted destination for adorable pets in India. We provide loving companions that bring joy to your home.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-petshop-purple transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/?category=dog" className="text-muted-foreground hover:text-petshop-purple transition">
                  Dogs
                </Link>
              </li>
              <li>
                <Link to="/?category=cat" className="text-muted-foreground hover:text-petshop-purple transition">
                  Cats
                </Link>
              </li>
              <li>
                <Link to="/?category=bird" className="text-muted-foreground hover:text-petshop-purple transition">
                  Birds
                </Link>
              </li>
              <li>
                <Link to="/?category=small-pet" className="text-muted-foreground hover:text-petshop-purple transition">
                  Small Pets
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-muted-foreground not-italic">
              <p>123 Pet Street</p>
              <p>New Delhi, India</p>
              <p>Email: info@cutupet.com</p>
              <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; 2025 Cutupet Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
