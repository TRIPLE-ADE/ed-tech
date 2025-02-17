import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by EdTech AI. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:underline"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:underline"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
